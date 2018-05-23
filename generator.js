var args = require('system').args;
var page = require('webpage').create();

var url = args[1];
var save = args[2];
var width = args[3];
var height = args[4];

page.viewportSize = { width: width, height: height };

page.open(url, function () {
    page.render(save);
    phantom.exit();
});
