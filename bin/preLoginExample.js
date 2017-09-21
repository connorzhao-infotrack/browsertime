'use strict';
let config = require('../config'),
    log = require('intel');
/*
  Here's an example of how you can use a preTask to login the user
  and then measure/get metrics from pages as an authenticated user
  */

module.exports = {
  run(context) {
    var userName = config.username;
    var password = config.password;
    var quickLogin = 'https://search.infotrack.com.au/login.ashx?username=&password=&entrypoint=SecurePages/QuickReport.aspx';
    var quickLoginWithUserAndPass = quickLogin.substring(0, 52)+userName+quickLogin.substring(52, 62)+password+quickLogin.substring(62, quickLogin.count);
    return context.runWithDriver((driver) => {
      // Go to Wikipedias login URL
      return driver.get(quickLoginWithUserAndPass)
        // .then(() => {
        //   // You need to find the form, the login input fields and the
        //   // password field. Just add you name and password and submit the form
        //   // For more docs, checkout the NodeJS Selenium version
        //   // http://selenium.googlecode.com/git/docs/api/javascript/index.html

        //   // we fetch the selenium webdriver from context
        //   var webdriver = context.webdriver;
        //   // before you start, make your username and password

        //   log.debug(userName);
        //   var loginForm = driver.findElement(webdriver.By.css('form'));
        //   var loginInput = driver.findElement(webdriver.By.id('username'));
        //   loginInput.sendKeys(userName);
        //   var passwordInput = driver.findElement(webdriver.By.id('password'));
        //   passwordInput.sendKeys(password);
        //   return loginForm.submit();
        //   // this example skips waiting for the next page and validating that the login was successful.
        // });
    })
  }
};
