var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', function() {
    // return gulp.src('scss/**/*.scss')
    return gulp.src('timer/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
        errLogToConsole:true,
        outputStyle: 'expanded'
    }))
    // .pipe(sourcemaps.write('../maps'))
    // .pipe(gulp.dest('css/'))
    .pipe(sourcemaps.write('../timer/maps'))
    .pipe(gulp.dest('timer/'))
});

gulp.task('watch', function() {
    // gulp.watch('scss/**/*.scss', ['sass']);
    gulp.watch('timer/**/*.scss', ['sass']);
});