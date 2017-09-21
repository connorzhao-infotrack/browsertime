#!/usr/bin/env node
'use strict';

let Engine = require('../').Engine,
  config = require('../config'),
  browserScripts = require('../lib/support/browserScript'),
  logging = require('../').logging,
  cli = require('../lib/support/cli'),
  StorageManager = require('../lib/support/storageManager'),
  Promise = require('bluebird'),
  merge = require('lodash.merge'),
  isEmpty = require('lodash.isempty'),
  forEach = require('lodash.foreach'),
  pick = require('lodash.pick'),
  fs = require('fs'),
  path = require('path'),
  log = require('intel'),
  request = require('request');

Promise.promisifyAll(fs);

function parseUserScripts(scripts) {
  if (!Array.isArray(scripts)) scripts = [scripts];

  return Promise.reduce(
    scripts,
    (results, script) =>
    browserScripts
    .findAndParseScripts(path.resolve(script), 'custom')
    .then(scripts => merge(results, scripts)), {}
  );
}

function run(url, options, elasticUrl) {
  let engine = new Engine(options);

  log.info('Running %s for url: %s', options.browser, url);
  if (log.isEnabledFor(log.DEBUG)) {
    log.debug('Running with options: %:2j', options);
  }

  const scriptCategories = browserScripts.allScriptCategories;
  let scriptsByCategory = browserScripts.getScriptsForCategories(
    scriptCategories
  );

  if (options.script) {
    const userScripts = parseUserScripts(options.script);
    scriptsByCategory = Promise.join(
      scriptsByCategory,
      userScripts,
      (scriptsByCategory, userScripts) => merge(scriptsByCategory, userScripts)
    );
  }

  engine
    .start()
    .then(function () {
      return engine.run(url, scriptsByCategory);
    })
    .then(function (result) {
      let saveOperations = [];

      const storageManager = new StorageManager(url, options);
      const harName = options.har ? options.har : 'browsertime';
      const jsonName = options.output ? options.output : 'browsertime';
      const btData = pick(result, [
        'info',
        'browserScripts',
        'statistics',
        'visualMetrics',
        'timestamps'
      ]);
      if (!isEmpty(btData)) {
        request({
          url: elasticUrl,
          method: "POST",
          json: true, // <--Very important!!! 
          body: btData
        });
      }
      return Promise.all(saveOperations).then(() => {
        log.info(
          'Wrote data to %s',
          elasticUrl
        );
        return result;
      });
    })
    .catch(function (e) {
      log.error('Error running browsertime', e);
      throw e;
    })
    .finally(function () {
      log.debug('Stopping Browsertime');
      running = false;
      return engine
        .stop()
        .tap(() => {
          log.debug('Stopped Browsertime');
        })
        .catch(e => {
          log.error('Error stopping Browsertime!', e);

          process.exitCode = 1;
        });
    })
    .catch(function () {
      process.exitCode = 1;
    })
  //.finally(process.exit); // explicitly exit to avoid a hanging process
}
var running = false;
if (log.isEnabledFor(log.CRITICAL)) {
  // TODO change the threshold to VERBOSE before releasing 1.0
  Promise.longStackTraces();
}
let cliResult = cli.parseCommandLine();
cliResult.options.preScript = __dirname + config.prescript;
config.username = cliResult.options.username;
config.password = cliResult.options.password;
logging.configure(cliResult.options);


log.info("#RUN test 1 website 1");
log.info("userName " + config.username);
log.info("password " + config.password);
running = true;
run(config.url[0], cliResult.options, config.elasticPostUrl[0]);
let i = 1;
var blockTime = 0;
const UrlNum = config.url.length;
setInterval(function () {
  if (!running) {
    blockTime = 0;
    let index = i % UrlNum;
    cliResult.options.preScript = __dirname + config.prescript;
    running = true;
    run(config.url[index], cliResult.options, config.elasticPostUrl[index],running);
    log.info("#RUN test " + (Math.floor(i / UrlNum) + 1) + " website " + (index + 1));
    i++;
  }else {
    if(blockTime<3){
      log.info("BLOCKED, try to run but the chrome is in used times: "+blockTime);
      blockTime++;
    }else{
      //TODO: need to clean the environment
      log.info("BLOCKED, continue blocked for 3 times, false release the block");
      running = false;
    }
  }
}, config.runInterval / UrlNum);