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
describe("SSH proxy", () => {
  test("should start an SSH reverse port forwarding", (done) => {
    let tunnelFactory = require('../main');
    let tunnel = tunnelFactory
      .from(undefined, 5984)
      .through("ssh", "34.239.11.167", 7443, "hysh", "pass@word1")
      .to("0.0.0.0", 5984)
      .start()
    done();
  });
});