import del from 'del';
import gulp from 'gulp';
import browserSync from 'browser-sync';
// import uglify from 'gulp-uglify';
import ts from 'gulp-typescript';
import sourcemaps from 'gulp-sourcemaps';
import handlebars from 'gulp-compile-handlebars';
import rename from 'gulp-rename';
import wrap from 'gulp-wrap';
const tsProject = ts.createProject('tsconfig.json');

const server = browserSync.create();

const buildPath = 'build';
const paths = {
  scripts: {
    src: 'src/**.ts',
    dest: `${buildPath}/scripts/`
  },
  hbs: {
    layout: 'src/layout.hbs',
    templates: 'src/components**/[^_]*.hbs',
    partials: ['src/components**/_*.hbs'],
    pages: ['src/pages/**.hbs'],
    dest:  `${buildPath}/`
  }
};

function registerHbsPartials() {


    // gulp.src('src/components/**/_*.hbs')
    //   .pipe(hbsAll('html', {
    //     context: {foo: 'bar'},
    //
    //     partials: ['templates/partials/**/*.hbs'],}))
    //   .pipe(rename('index.html'))
    //   .pipe(htmlmin({collapseWhitespace: true}))
    //   .pipe(gulp.dest(''));


  // Might need to be in the serve to reduce overhead / caching issues
  return gulp.src(`src/**/_*.hbs`)
    .pipe(handlebars())
    .pipe(wrap('Handlebars.registerPartial(<%= processPartialName(file.relative) %>, Handlebars.template(<%= contents %>));', {}, {
      imports: {
        processPartialName: function(fileName) {
          // Strip the extension and the underscore
          // Escape the output with JSON.stringify
          return JSON.stringify(path.basename(fileName, '.js').substr(1));
        }
      }
    })).pipe(gulp.dest('build/js/'));
}
function hbsCompile() {

  return gulp.src(paths.hbs.src)
    .pipe(handlebars({}, {}))
    .pipe(rename((path) => {
      path.extname = '.html';
    }))
    .pipe(gulp.dest(buildPath));
  //
  // return gulp.src('source/templates/*.hbs')
  //   .pipe(handlebars())
  //   // .pipe(wrap('Handlebars.template(<%= contents %>)'))
  //   // .pipe(declare({
  //   //   namespace: 'MyApp.templates',
  //   //   noRedeclare: true, // Avoid duplicate declarations
  //   // }))
  //   // .pipe(concat('templates.js'))
  //   .pipe(gulp.dest(`${buildPath}`));
}

function tsCompile() {
  return gulp.src(paths.scripts.src)
    .pipe(sourcemaps.init()) // This means sourcemaps will be generated
    .pipe(tsProject({
      outFile: 'app.js'
    }))
    .pipe(sourcemaps.write()) // Now the sourcemaps are added to the .js file
    .pipe(gulp.dest(paths.scripts.dest));
}
const clean = () => del([buildPath]);

function reload(done) {
  server.reload();
  done();
}

function serve(done) {

  server.init({
    server: {
      baseDir: `./${buildPath}`
    }
  });
  done()
}

const watchTs = () => gulp.watch(paths.scripts.src, gulp.series(tsCompile, reload));
const watchHbs = () => gulp.watch(paths.hbs.src, gulp.series(hbsCompile, reload));

const dev = gulp.series(clean, registerHbsPartials, tsCompile, hbsCompile, serve, watchTs, watchHbs);

export default dev