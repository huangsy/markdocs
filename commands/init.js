/**
 * 初始化配置项
 */
var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
var gulp = require('gulp');
var gutil = require('gulp-util');

var confPath = './nd.conf.json';
var defaultConfPath = path.resolve(__dirname, 'nd.conf.json');

module.exports = function() {
    fs.access(confPath, function(err) {
        if (!err) {
            gutil.log(chalk.red('配置项已存在，不需要重复初始化!'));
            return false;
        }
        gutil.log(chalk.blue('开始初始化配置项...'));
        gulp.src(defaultConfPath)
            .pipe(gulp.dest('.'))
            .on('end', function() {
                gutil.log(chalk.green('nd.conf.json 创建成功!'));
            });
    });
}