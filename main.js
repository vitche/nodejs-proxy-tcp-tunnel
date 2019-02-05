const cache = require('memory-cache');
const psTree = require('ps-tree');
const {exec} = require('child_process');
var killTree = function (pid, signal, callback) {
    signal = signal || 'SIGKILL';
    psTree(pid, function (error, children) {
        [pid].concat(
            children.map(function (p) {
                return p.PID;
            })
        ).forEach(function (tpid) {
            try {
                process.kill(tpid, signal)
            }
            catch (error) {
                callback(error);
            }
        });
        callback();
    });
};
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
                            let childProcess = exec(command, (error, stdout, stderr) => {
                                if (stdout) {
                                    console.log('Tunnel output: ' + stdout);
                                }
                                if (stderr) {
                                    console.log('Tunnel error: ' + stderr);
                                }
                            });
                            tunnel = {
                                process: childProcess,
                                close: function (callback) {
                                    killTree(childProcess.pid, 'SIGKILL', function (error) {
                                        if (!error) {
                                            cache.del(key);
                                        }
                                        callback(error);
                                    });
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
