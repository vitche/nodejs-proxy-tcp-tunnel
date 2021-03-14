FROM alpine:latest

RUN apk update
RUN apk add openssh
RUN echo -e "Port 22\nGatewayPorts yes\n" >> /etc/ssh/sshd_config
RUN ssh-keygen -A

EXPOSE 22

CMD ["/usr/sbin/sshd", "-D", "-e", "-f", "/etc/ssh/sshd_config"]
