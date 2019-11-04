#!/bin/sh
git fetch
cd docs
git add --all
git commit -a -m auto-built
git push origin master
cd ../dist
git add --all
git commit -a -m auto-built
git push origin dist
cd ..
