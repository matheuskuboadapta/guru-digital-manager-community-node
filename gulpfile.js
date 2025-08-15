const gulp = require('gulp');

gulp.task('build:icons', function() {
  return gulp.src('src/**/*.svg')
    .pipe(gulp.dest('dist/'));
});
