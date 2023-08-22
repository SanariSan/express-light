#!/bin/bash

docker build -t express-light .
docker run --rm --name express-light -p 80:80 express-light