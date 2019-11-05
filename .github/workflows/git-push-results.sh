#!/bin/sh
git fetch
cd docs
git add --all
git commit -a -m auto-built
git push --force-with-lease origin master
cd ../dist
git add --all
git commit -a -m auto-built
git push --force-with-lease origin dist
cd ..
