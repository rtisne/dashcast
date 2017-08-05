var nodecastor = require('nodecastor'),
  util = require('util');
nodecastor.scan()
  .on('online', function(d) {
    console.log("New device: ", d.id, d.friendlyName);
    d.on('connect', function(c) {
      d.status(function(err, s) {
        if (err) return console.error(err);
        console.log('Chromecast status', util.inspect(s));
        d.application('84912283', function(err, a) {
          if (err) return console.error(err);
          console.log('Application', util.inspect(a));
          a.run('urn:x-cast:madmod.dashcast', function(err, s) {
            if (err) return console.error(err);
            s.send({ url: "http://codepen.io/fleeting/full/xklfq/" });
          });
        });
      });
    });
  })
  .on('offline', function(d) {
    console.log('Removed device', util.inspect(d));
  })
  .start();
