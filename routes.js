var express = require('express');
var path = require('path');
var url = require('valid-url');
var router = express.Router();

//GET homepage
router.get('/', function(req, res, next) {
  res.render('index');
});

//communication with generator.js
router.get('/snap', function (req, rez, next) {
  var md5 = require('md5');
  var width = req.query.width,
      website = req.query.url;

  if (!isNan(width) && url.isUri(website)) {
    //Do stuff here
    var hash = md5(website);
    var savePath = path.join(__dirname, 'public', 'screenshots', hash) + '.png';
    var cmd = [pathToPhantom(), 'generator.js', website, savePath, width, 1].join(' ');
    var exec = require('child_process').exec;

    exec(cmd, function(error) {
      if (error) {
        res.status(422);
        return res.json({ message: 'Try reloading the page?' });
      }
      return res.json({ path: '/screenshots/' + hash + '.png' });
    })
  } else {
    res.status(422);
    return res.json({ message: 'please enter a valid url' });
  }
});

function pathToPhanton() {
  var childProcess = require('child_process')
  var phantom = require('phantomjs-prebuilt')
  var binPath = phantomjs.path


  return path.join(__dirname, 'phantomjs-script.js', phantom);

  // childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
  //   // handle results
  // })
}

module.exports = router;
