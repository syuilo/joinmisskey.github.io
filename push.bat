cd docs
git add --all
git commit -a -m %1
git push
cd ../pages/ja
git add --all
git commit -a -m %1
git push
cd ../..
git add --all
git commit -a -m %1
git push