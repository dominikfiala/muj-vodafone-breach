var LOGIN_URL, LOGIN_USERNAME, LOGIN_PASSWORD, casper;

casper = require('casper').create({
    waitTimeout: 20000,
    viewportSize: {
        width: 1024,
        height: 768
    },
    // verbose: true,
    // logLevel: 'debug',
    userAgent: 'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)'
});

if (!casper.cli.has('username') && !casper.cli.has('password')) {
    casper.echo('Usage: $ casperjs login.js --username=USERNAME --password=PASSWORD').exit(-1);
}

LOGIN_URL = 'https://www.vodafone.cz/muj/prihlaseni';

LOGIN_USERNAME = casper.cli.get('username');
LOGIN_PASSWORD = casper.cli.get('password');

phantom.cookiesEnabled = true;

casper.start(LOGIN_URL, function() {
    this.log('Logging in', 'debug');
    this.fillSelectors('#login-form', {
        '#username': LOGIN_USERNAME,
        '#password': LOGIN_PASSWORD
    }, true);
}).waitForUrl('https://www.vodafone.cz/muj/', function() {
    var out = this.evaluate(function() {
        var msg;
        var acc;
        if (document.querySelector('.msgContent')) {
          msg = document.querySelector('.msgContent').innerHTML;
        }
        if (document.querySelector('.msisdnAccount strong')) {
          acc = document.querySelector('.msisdnAccount strong').innerHTML;
        }

        return {
          msg: msg,
          acc: acc
        };
    })

    console.log(JSON.stringify(out))
}).run();
