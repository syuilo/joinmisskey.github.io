git fetch
cd pages/ja
git add --all
git commit -a -m '%1'
git push
cd ../en
git pull origin pages/ja
git push