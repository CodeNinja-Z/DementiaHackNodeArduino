'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');


gulp.task('node:start', function () {
  nodemon({
    script: 'server.js',
    ext: 'js html',
    env: { 'NODE_ENV': 'development' }
  })
})

gulp.task('default',
  [
    'node:start'
  ]
);
