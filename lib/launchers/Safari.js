var fs = require('fs');
var path = require('path');

var BaseBrowser = require('./Base');
var util = require("util");
var helper = require("../helper");
var _ = require('lodash');

var SafariBrowser = function () {
    BaseBrowser.apply(this, arguments);

    this._start = function (url) {
        var HTML_TPL = path.normalize(__dirname + '/../../static/safari.html');
        var self = this;

        fs.readFile(HTML_TPL, function (err, data) {
            var content = data.toString().replace('%URL%', url);
            var staticHtmlPath = self._tempDir + '/redirect.html';

            fs.writeFile(staticHtmlPath, content, function () {
                self._execCommand(self._getCommand(), [staticHtmlPath]);
            });
        });
    };
};
util.inherits(SafariBrowser, BaseBrowser);

_.merge(SafariBrowser.prototype, {
    name: 'Safari',

    DEFAULT_CMD: {
        darwin: '/Applications/Safari.app/Contents/MacOS/Safari'
    },
    ENV_CMD: 'SAFARI_BIN'
});


// PUBLISH
module.exports = SafariBrowser;
