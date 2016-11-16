#!/usr/bin/env node
var program = require('commander');

var fs = require('fs');
var path = require('path');
var pkg = require('./package.json');
var commands = {
    init: require('./commands/init'),
    build: require('./commands/build')
};

var defaultConfPath = path.resolve(__dirname, 'nd.conf.json');
var confPath = './nd.conf.json';
var config = {};

fs.access(confPath, function(err) {
    if (!err) {
        config = require(confPath);
    } else {
        config = require(defaultConfPath);
    }
    initCommands();
});

function initCommands() {
    program.version(pkg.version);

    for (key in commands) {
        program
            .command(key)
            .action(commands[key].bind(this, config));
    }

    program.parse(process.argv);
}
