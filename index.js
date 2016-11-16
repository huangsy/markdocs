var chalk = require('chalk');
var program = require('commander');

var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var gutil = require('gulp-util');
var rename = require('gulp-rename');
var gulpJsdoc2md = require('gulp-jsdoc-to-markdown');

var template = path.resolve(__dirname, 'templates', 'readme.hbs');

program
    .command('build')
    .action(build);

function build() {
    gulp.src('./src/**/*.js')
        .pipe(gulpJsdoc2md({ template: fs.readFileSync(template, 'utf8') }))
        .on('error', function (err) {
            gutil.log(chalk.red('jsdoc2md failed'), err.message)
        })
        .pipe(rename(function (path) {
            path.extname = '.md'
        }))
        .pipe(gulp.dest('api'));
    gutil.log(chalk.green('Build Success!'));
}
