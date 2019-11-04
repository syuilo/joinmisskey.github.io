#!/bin/sh
git config --global user.name "luckybeast"
git config --global user.email "remu.teshigawara@gmail.com"
git fetch
git checkout src
git worktree add docs master
git worktree add dist dist
git worktree add pages/ja pages/ja
git worktree add pages/en pages/en
git worktree add pages/fr pages/fr
