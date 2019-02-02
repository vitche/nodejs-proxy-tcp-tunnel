const cache = require('memory-cache');
const {exec} = require('child_process');
module.exports.from = function (localHost, localPort) {
    return {
        through: function (proxyType, proxyHost, proxyPort) {
            return {
                to: function (serverHost, serverPort) {
                    return {
                        start: function () {
                            let key = localHost + ':' + localPort;
                            let tunnel = cache.get(key);
                            if (tunnel) {
                                return tunnel;
                            }
                            let command = 'ncat -l ' + localHost + ' ' + localPort + ' --keep-open --sh-exec "ncat --proxy ' + proxyHost + ':' + proxyPort + ' --proxy-type ' + proxyType + ' ' + serverHost + ' ' + serverPort + '"';
                            console.log('Establishing tunnel: ' + command);
                            let process = exec(command, (error, stdout, stderr) => {
                                if (error) {
                                    throw error;
                                }
                            });
                            tunnel = {
                                process: process,
                                close: function () {
                                    process.kill();
                                    cache.del(key);
                                }
                            };
                            cache.put(key, tunnel);
                            return tunnel;
                        }
                    }
                }
            }
        }
    }
};
