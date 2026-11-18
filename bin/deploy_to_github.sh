#!/usr/bin/env bash
rm -rf dist
pnpm build #--base='/mangosteen-react-1-preview/'
cd dist || exit
git init
git add .
git commit -m deploy
git remote add origin git@github.com:xmasuhai/mangosteen-react-1-preview.git
git push -f origin master:master
cd - || exit
echo "https://xmasuhai.github.io/mangosteen-react-1-publish/"
