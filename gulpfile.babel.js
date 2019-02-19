'use strict';

import plugins from 'gulp-load-plugins';
import yargs from 'yargs';
import browser from 'browser-sync';
import gulp from 'gulp';
import panini from 'panini';
import rimraf from 'rimraf';
import sherpa from 'style-sherpa';
import yaml from 'js-yaml';
import fs from 'fs';
import webpackStream from 'webpack-stream';
import webpack2 from 'webpack';
// import named from 'vinyl-named';
// import uncss from 'uncss';
import autoprefixer from 'autoprefixer';
import rename from 'gulp-rename';
// import ts from 'gulp-typescript';
import sourcemaps from 'gulp-sourcemaps';
import mergeCSS from 'gulp-merge-css';
import insert from 'gulp-insert';
import concat from 'gulp-concat';


// const tsProject = ts.createProject('tsconfig.json');

// Load all Gulp plugins into one variable
const $ = plugins();

// Check for --production flag
const PRODUCTION = !!(yargs.argv.production);

// Load settings from settings.yml
const {COMPATIBILITY, PORT, UNCSS_OPTIONS, PATHS} = loadConfig();

function loadConfig() {
  let ymlFile = fs.readFileSync('config.yml', 'utf8');
  return yaml.load(ymlFile);
}

// Build the "dist" folder by running all of the below tasks
// Sass must be run later so UnCSS can search for used classes in the others assets.
gulp.task('build',
  gulp.series(clean, gulp.parallel(pages, thirdPartyScripts, scripts, images, copy), sass, styleGuide));

// Build the site, run the server, and watch for file changes
gulp.task('default',
  gulp.series('build', server, watch));

// Delete the "dist" folder
// This happens every time a build starts
function clean(done) {
  rimraf(PATHS.dist, done);
}

// Copy files out of the assets folder
function copy() {
  return gulp.src(PATHS.miscAssets)
    .pipe(gulp.dest(PATHS.dist + '/assets'));
}

// Copy page templates into finished HTML files
function pages() {
  return gulp.src(`${PATHS.pageTemplates}/**/*.{html,hbs,handlebars}`)
    .pipe(panini({
      root: PATHS.pageTemplates,
      layouts:  PATHS.layouts,
      partials:  PATHS.partials,
      data:  PATHS.data,
      helpers: PATHS.helpers
    }))
    .pipe(rename((path) => {
      path.extname = ".html";
    }))
    .pipe(gulp.dest(PATHS.dist));
}

// Load updated HTML templates and partials into Panini
function resetPages(done) {
  panini.refresh();
  done();
}

// Generate a style guide from the Markdown content and HTML template in styleguide/
function styleGuide(done) {
  sherpa(`${PATHS.styleGuide}/index.md`, {
    output: PATHS.dist + '/styleguide.html',
    template: `${PATHS.styleGuide}/template.hbs`
  }, done);
}

// Compile Sass into CSS
// In production, the CSS is compressed
function sass() {

  return gulp.src(`${PATHS.src}/**/*.scss`)
    .pipe($.sass().on('error', $.sass.logError))
    .pipe(mergeCSS({ name: 'app.css' }))
    .pipe(gulp.dest(`${PATHS.dist}/assets/css`));
}

let webpackConfig = {
  mode: (PRODUCTION ? 'production' : 'development'),
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ["@babel/preset-env"],
            compact: false
          }
        }
      }
    ]
  },
  devtool: !PRODUCTION && 'source-map'
};

function thirdPartyScripts() {
  return gulp.src(PATHS.thirdParty)
    .pipe(gulp.dest(`${PATHS.dist}/assets/js`));
}

// Transpiles and combines typescript and javascript into one file
// In production, the file is minified
function scripts() {
  return gulp.src(`${PATHS.src}/**/*.js`)
    .pipe(sourcemaps.init())
    // .pipe(ts({
    //   noImplicitAny: true,
    //   outFile: 'app.js' // We can remove this to build js files separately
    // }))
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write())
    .pipe(insert.wrap('(function(window,document,jQuery){', '})(window,document,jQuery);'))
    .pipe(gulp.dest(`${PATHS.dist}/assets/js`));
}

// Copy images to the "dist" folder
// In production, the images are compressed
function images() {
  return gulp.src(PATHS.imageAssets)
    .pipe($.if(PRODUCTION, $.imagemin([
      $.imagemin.jpegtran({progressive: true}),
    ])))
    .pipe(gulp.dest(`${PATHS.dist}/assets/img`));
}

// Start a server with BrowserSync to preview the site in
function server(done) {
  browser.init({
    server: PATHS.dist, port: PORT
  }, done);
}

// Reload the browser with BrowserSync
function reload(done) {
  browser.reload();
  done();
}

// Watch for changes to static assets, pages, Sass, and JavaScript
function watch() {
  gulp.watch(PATHS.miscAssets, gulp.series(copy, reload));
  gulp.watch(`${PATHS.pageTemplates}/**/*.{html,hbs}`).on('all', gulp.series(pages, reload));
  gulp.watch(`src/{layouts,components}/**/*.{html,hbs}`).on('all', gulp.series(resetPages, pages, reload));
  gulp.watch(`${PATHS.data}/**/*.{json,yml}`).on('all', gulp.series(resetPages, pages, reload));
  gulp.watch(`src/**/*.scss`).on('all', gulp.series(sass, reload));
  gulp.watch(`src/**/*.js`).on('all', gulp.series(scripts, reload));
  gulp.watch(PATHS.imageAssets).on('all', gulp.series(images, reload));
  gulp.watch(`${PATHS.styleGuide}/**`).on('all', gulp.series(styleGuide, reload));
}
