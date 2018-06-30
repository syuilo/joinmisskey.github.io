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
3. `cd ../../`
4. `git worktree add pages/<languagecode> pages/<languagecode>`
5. Add the language in these files: `README.md`, `.config/default.json`, `theme/pug/includes/_includes_head.pug`

## LICENSES

### CONTENTS

./pages/**/*

Only translation

### SYSTEM

except ./pages/**/*

"maqz" system under CC0