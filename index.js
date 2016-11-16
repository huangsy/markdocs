#!/usr/bin/env node
var chalk = require('chalk');
var program = require('commander');

var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var gulpJsdoc2md = require('gulp-jsdoc-to-markdown');

var template = path.resolve(__dirname, 'templates', 'readme.hbs');

function build() {
    gulp.src('./src/**/*.js')
        .pipe(gulpJsdoc2md({ template: fs.readFileSync(template, 'utf8') }))
        .on('error', function (err) {
            gutil.log(chalk.red('jsdoc2md failed'), err.message)
        })
        .pipe(concat('README.md'))
        .pipe(gulp.dest('api'));
    gutil.log(chalk.green('Build Success!'));
}

program
    .version('1.0.0')
    .command('build')
    .action(build);

program.parse(process.argv);
