const Handlebars  = require('handlebars');

/**
 {{#times 10}}
    <span>{{this}}</span>
 {{/times}}
 */
Handlebars.registerHelper('times', function(n, block) {
  let accum = '';
  for(let i = 0; i < n; ++i)
    accum += block.fn(i);
  return accum;
});