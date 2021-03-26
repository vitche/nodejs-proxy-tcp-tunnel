FROM ubuntu:latest

RUN apt -y update
RUN apt -y upgrade

RUN mkdir /run/sshd

RUN apt -y install openssh-server
RUN echo "\nPort 22\nGatewayPorts yes\nAllowTcpForwarding yes\nClientAliveInterval 30\n" >> /etc/ssh/sshd_config
RUN ssh-keygen -A

EXPOSE 22

CMD ["/usr/sbin/sshd", "-D", "-e", "-f", "/etc/ssh/sshd_config"]
