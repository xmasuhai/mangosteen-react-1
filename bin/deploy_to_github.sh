#!/usr/bin/env bash
rm -rf dist
pnpm build
cd dist
git init
git add .
git commit -m deploy
git remote add origin git@github.com:xmasuhai/mangosteen-react-1-preview.git
git push -f origin master:master
cd -