module.exports = {
    start: function (test) {
        let port = 80;
        let proxyPort = 9050;
        let tunnel = require('../main');
        let process = tunnel
            .from('TODO: localHost', port)
            .through('socks5', 'TODO: proxyHost', proxyPort)
            .to('TODO: serverHost', port)
            .start();
        test.done();
    }
};
