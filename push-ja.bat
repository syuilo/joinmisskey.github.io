git fetch 
cd docs
git add --all
git commit -a -m %1
git push origin master
cd ..
git add --all
git commit -a -m %1
git push origin src