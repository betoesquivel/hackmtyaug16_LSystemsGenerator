'use strict';

var generate = require('./gen_lsystem.js').handler;

module.exports.generateLSystem = (event, context, cb) => {
  const params = Object.assign({}, event);
  generate(params, cb);
};
