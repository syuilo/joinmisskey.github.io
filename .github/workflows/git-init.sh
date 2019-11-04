#!/bin/sh
git init
git remote add origin https://luckybeast:$LB_TOKEN@github.com/joinmisskey/joinmisskey.github.io
git config --global user.name "luckybeast"
git config --global user.email "remu.teshigawara@gmail.com"
git fetch
git checkout src
