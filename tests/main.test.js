describe("SOCKS5 proxy", () => {
  test("should start a SOCKS5 tunnel", (done) => {
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
        done();
      });
    }, 1000);
  });
});
