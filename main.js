const {exec} = require('child_process');
module.exports.from = function (localHost, localPort) {
    return {
        through: function (proxyType, proxyHost, proxyPort) {
            return {
                to: function (serverHost, serverPort) {
                    return {
                        start: function () {
                            let command = 'ncat -l ' + localHost + ' ' + localPort + ' --keep-open --sh-exec "ncat --proxy ' + proxyHost + ':' + proxyPort + ' --proxy-type ' + proxyType + ' ' + serverHost + ' ' + serverPort + '"';
                            return exec(command, (error, stdout, stderr) => {
                                if (error) {
                                    throw error;
                                }
                            });
                        }
                    }
                }
            }
        }
    }
};
