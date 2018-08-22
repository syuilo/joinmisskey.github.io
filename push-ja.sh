#!/bin/sh
git fetch 
cd docs
git add --all
git commit -a -m '%1'
git push
cd ../
cd pages/ja
git add --all
git commit -a -m '%1'
git push
cd ../..
git add --all
git commit -a -m '%1'
git push
