#!/usr/bin/env node
var chalk = require('chalk');
var program = require('commander');

var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var gulpJsdoc2md = require('gulp-jsdoc-to-markdown');
var pkg = require('./package.json');
var pwd = process.env.PWD;

var srcPath = path.resolve(pwd, 'src', '**', '*.js');
var template = path.resolve(__dirname, 'templates', 'readme.hbs');

function build() {
    gulp.src(srcPath)
        .pipe(gulpJsdoc2md({ template: fs.readFileSync(template, 'utf8') }))
        .on('error', function (err) {
            gutil.log(chalk.red('jsdoc2md failed'), err.message)
        })
        .pipe(concat('README.md'))
        .pipe(gulp.dest('api'))
}

program
    .version(pkg.version)
    .command('build')
    .action(build);

program.parse(process.argv);
