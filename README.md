# nodejs-proxy-tcp-tunnel
Node.js library for tunneling TCP connections through a proxy
## TCP tunnel over a proxy
```shell
# TODO:
```
## Reverse SSH tunnel
### Starting an SSH end-point in Docker
```shell
docker run -dit -p 7443:22 --name shell-ssh-proxy vitche/shell-ssh-proxy
```
### Adding an SSH user
```shell
docker exec -it shell-ssh-proxy adduser {logOn}
```