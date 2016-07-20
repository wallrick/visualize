const restify = require('restify');
const Zabbix = require('zabbix');
const async = require('async');

const server = restify.createServer();
const zabbix = new Zabbix('http://localhost/api_jsonrpc.php','admin', 'zabbix');

//const express = require('express');
//const app = express();

server.use(function(req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');
  next();
});

zabbix.login(function (err, resp, body) {
  if (!err) {
    console.log("Authenticated! AuthID is: " + zabbix.authid);
  }
});

server.get('/zabbix/items/:hostid', function(req,res,cb) {
  async.series([
    function(callback) {
      zabbix.call("item.get",
        {
          "hostids" : req.params.hostid.toString(),
        "limit" : '50',
        "sortfield" : 'itemid'
        }
        ,function (err, resp, body) {
          if (!err) {
            res.send(body.result);
            console.log("FINISHED items get: " + req.params.hostid);
          }
          else {
            res.send("ERROR: " + err);
            console.log("ERROR: " + err);
          }
      callback(null, 'item.get');
        });
    }]);

  return cb();

});

server.get('/zabbix/history/:itemid', function(req,res,cb) {
  async.series([
    function(callback) {
      zabbix.call("history.get",
        {
          "itemids" : req.params.itemid.toString(),
        "limit" : '50',
        "sortfield" : 'clock'
        }
        ,function (err, resp, body) {
          if (!err) {
            res.send(body.result);
            console.log("FINISHED history get: " + req.params.itemid);
          }
          else {
            res.send("ERROR: " + err);
            console.log("ERROR: " + err);
          }
      callback(null, 'history.get');
        });
    }]);

  return cb();
});

server.get('/zabbix/hosts', function(req,res,cb) {
  async.series([
    function(callback) {
      zabbix.call("host.get",
        {
          "limit" : '1000',
        "sortfield" : 'name'
        }
        ,function (err, resp, body) {
          if (!err) {
            res.send(body.result);
            console.log("FINISHED");
          }
          else {
            res.send("ERROR: " + err);
            console.log("ERROR: " + err);
          }
      callback(null, 'history.get');
        });
    }]);

  return cb();

});

server.listen(3000, function() {
  console.log('%s listening at %s', server.name, server.url);
});


// ./zabbixDumpItemValues.js 79606
