const gulp = require('gulp');

gulp.task('build:icons', function() {
  return gulp.src('src/**/*.{svg,png}')
    .pipe(gulp.dest('dist/'));
});
