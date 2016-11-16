/**
 * 创建文档
 */
var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
var gulp = require('gulp');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var template = path.resolve(__dirname, '..', 'templates', 'readme.hbs');
var gulpJsdoc2md = require('gulp-jsdoc-to-markdown');

module.exports = function(config) {
    template = config.template || template;
    gutil.log(chalk.blue('src: ' + config.src));
    gutil.log(chalk.blue('dest: ' + config.dest));
    gutil.log(chalk.blue('template: ' + template));
    gulp.src(config.src)
        .pipe(gulpJsdoc2md({ template: fs.readFileSync(template, 'utf8') }))
        .on('error', function (err) {
            gutil.log(chalk.red('jsdoc2md failed'), err.message)
        })
        .pipe(concat('README.md'))
        .pipe(gulp.dest(config.dest))
        .on('end', function() {
            gutil.log(chalk.green('文档创建成功!'))
        });
}