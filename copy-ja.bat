git fetch
cd pages/ja
git add --all
git commit -a -m %1
git push
cd ../en
git pull origin pages/en
git pull origin pages/ja
git push
cd ../fr
git pull origin pages/fr
git pull origin pages/ja
git push
cd ../..