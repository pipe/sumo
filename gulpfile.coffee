gulp          = require('gulp-param')(require('gulp'), process.argv)
browserSync   = require 'browser-sync'

gulp.task 'browser-sync', ->
  browserSync.init null, ->
    proxy: "localhost:8080"

gulp.task 'default', ['browser-sync'], ->