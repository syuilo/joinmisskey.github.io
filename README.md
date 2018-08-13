# joinmisskey.github.io

https://github.com/syuilo/misskey

## Usage

### Install

1. Install Node.js
2. `git checkout src`
3. `npm install`
4. `npm install gulp -g`
5. `git worktree add docs master; git worktree add pages/ja pages/ja;`

### Build

1. `gulp prebuild-files`  
   Run whenever you append images.  
   If you work on a forked repository, you never have to run this command, probably.
2. `gulp`

### Test

`gulp local-server`

### Translation

#### Add new language

1. `cd pages/ja`
2. `git checkout -b pages/<languagecode>`
3. `git checkout -b pages/ja`
4. `cd ../../`
5. `git worktree add pages/<languagecode> pages/<languagecode>`
6. Add the language in these files: `README.md`(l13), `.config/lang.json`, `theme/pug/includes/_includes_head.pug`
7. Ask aqz or syuilo to add a new language as [new issue](https://github.com/joinmisskey/joinmisskey.github.io/issues/new)

## LICENSES

### CONTENTS

pages/**/*: Only translation

### SYSTEM

scripts/**/*: based on source of misskey, under AGPLv3

the others: "maqz" system, under CC0