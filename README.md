# joinmisskey.github.io

https://github.com/syuilo/misskey

## Usage

### Install

1. Install Node.js
2. make a new folder
3. `git init`
4. `git remote add origin https://github.com/joinmisskey/joinmisskey.github.io.git`
5. `git checkout src`
6. `npm install`
7. `npm install gulp -g`
8. `git worktree add docs master; git worktree add pages/ja pages/ja;`

### Build

1. Get campaign number and barer token of Patreon and make `./.config/keys.json`: 
  ```
  {
      "patreon": {
          "campaign": "xxxxxxx"
          "barer": "_……"
      }
  }
  ```
1. `gulp prebuild-files`  
   Run whenever you append images.  
   If you work on a forked repository, you never have to run this command, probably.
2. `gulp`

### Test

`gulp local-server`

### Translation

#### Add new language
First, folk this repository, set yours as 'origin' on git and set this one as 'upstream'.

1. `cd pages/ja`
2. `git checkout -b pages/<languagecode>`
3. `git checkout pages/ja`
4. `cd ../..`
5. `git worktree add pages/<languagecode> pages/<languagecode>`
6. `cd pages/<languagecode>`
7. `git push --set-upstream origin pages/<languagecode>`
8. `cd ../..`
9. Add the language in these files: `README.md`(l13), `.config/lang.json`, `theme/pug/includes/_includes_head.pug`.
10. Commit these changes to your folk.
11. Make [new issue](https://github.com/joinmisskey/joinmisskey.github.io/issues/new) to ask aqz or syuilo to add a new language.
    We will make branch `pages/<languagecode>`
12. Make pull requests of 2 branches, `pages/<languagecode>` and `src`.

## LICENSES

### CONTENTS

`pages/**/*`: Only translation

### SYSTEM

`scripts/**/*`: based on source of misskey, under AGPLv3

the others: "maqz" system, under CC0