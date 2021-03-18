require("dotenv").config();

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
      .from(
        process.env.FROM_HOST,
        process.env.FROM_PORT
      )
      .through(
        process.env.PROXY_TYPE,
        process.env.PROXY_HOST,
        process.env.PROXY_PORT,
        process.env.PROXY_USER,
        process.env.PROXY_PASSWORD
      )
      .to(
        process.env.SERVER_HOST,
        process.env.SERVER_PORT
      )
      .start();
    done();
  });
});
