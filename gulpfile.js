/**
 * Created by Agwayambadde on 10/21/2015.
 */
(function () {
    'use strict';

    var gulp = require('gulp');
    var concat = require('gulp-concat');
    var jshint = require('gulp-jshint');
    var uglify = require('gulp-uglify');
    var jasmine = require('gulp-jasmine-phantom');
    var sass = require('gulp-sass');
    var sourcemaps = require('gulp-sourcemaps');
    var autoprefixer = require('gulp-autoprefixer');

    var bowerSources = ['bower_components/jquery/dist/jquery.min.js',
        'bower_components/bootstrap/dist/**/*.min.js',
        'bower_components/angular/angular.min.js'];

    gulp.task('default', ['buildAngular', 'unitTests', 'sass']);
    gulp.task('buildAppSource', buildAppSource);
    gulp.task('buildAngular', ['buildAppSource', 'unitTests'], buildAngular);


    function buildAngular() {
        return gulp.src(bowerSources)
            .pipe(concat('vendor.js'))
            .pipe(gulp.dest('www/js'));
    }

    function buildAppSource() {
        return gulp.src(['app/**/*.js'])
            .pipe(concat('app.js'))
            .pipe(jshint())
            .pipe(jshint.reporter('default'))
            //.pipe(jshint.reporter('jshint-stylish'))  uses the stylish output of the files
            //.pipe(jshint.reporter('fail'))  // signals for the pipeline to stop if an error happened
            .pipe(uglify())
            .pipe(gulp.dest('www/js'));
    }

    gulp.task('unitTests', function () {
        return gulp.src('specs/tests.js')
            .pipe(jasmine());
    });

    gulp.task('sass', function () {
        return gulp.src('sass/*.scss')
            .pipe(sourcemaps.init())
            .pipe(sass({outputStyle: 'compressed'}))
            .pipe(sourcemaps.write())
            .pipe(autoprefixer())
            .pipe(gulp.dest('www/css'));
    });


}());