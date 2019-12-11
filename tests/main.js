module.exports = {
    start: function (test) {
        let port = 80;
        let proxyPort = 9050;
        let tunnelFactory = require('../main');
        let tunnel = tunnelFactory
            .from('TODO: localHost', port)
            .through('socks5', 'TODO: proxyHost', proxyPort)
            .to('TODO: serverHost', port)
            .start();
        setTimeout(function () {
            tunnel.close(function () {
                test.done();
            });
        }, 1000);
    }
};
