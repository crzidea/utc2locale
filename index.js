#!/bin/env node
var stream = require('stream');
var util = require('util');

function utc2locale(utcString) {
  return utcString.toString().replace(
    /\w{3}, \d+ \w{3} \d{4} \d+:\d+:\d+ GMT/g,
    function(utcTime) {
      return new Date(utcTime);
    }
  );
}

function Transformer() {
  stream.Transform.call(this);
}
util.inherits(Transformer, stream.Transform);

Transformer.prototype._transform = function(chunk, encoding, callback) {
  if (!chunk) return;
  var offset = 0;
  for (var i = 0, l = chunk.length; i < l; i ++) {
    var end = i + 3;
    if ('GMT' == chunk.slice(i, end)) {
      var utc = chunk.slice(offset, end);
      var locale = utc2locale(utc);
      this.push(locale);
      offset = end;
    }
    var start = i - 26;
    if (offset < start) {
      var tmp = chunk.slice(offset, start);
      this.push(tmp);
      offset = start;
    }
  }
  var rest = chunk.slice(offset);
  this.push(rest);
  callback();
};

if (!module.parent) {
  var transformer = new Transformer();
  process.stdin.pipe(transformer).pipe(process.stdout);
} else {
  module.export = Transformer();
}
