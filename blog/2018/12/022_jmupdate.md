---
title: "joinmisskey更新"
description: スクリプトの改良
layout: blog
date: 2018-12-02T03:55:00+09:00
thumbnail: /files/images/imports/2018/09/wet.jpg
author:
  name: aqz
  url: https://misskey.io/@aqz
  avatar: aqz
category: joinmisskey
amp: true
---
joinmisskeyを更新しました。

## スクリプトの改良
- gulp-webpack → webpack-stream
  * Tree Shakingが適用されるように
- uglifyjs → terser
- babelによるpolyfillの適用
- pjax関連のコードを統合
- 一部のFontAwesomeアイコンはスクリプトから挿入するように
  * HTMLのサイズが大幅に削減される

## event-streamを排除
joinmisskeyのgulpfile.jsでは、問題のevent-streamをgulpのストリームのマージに利用していました。そこで、Promise.all(およびmerge-stream)の利用でevent-streamを排除しました。

なんかmerge-streamだとうまく動かなかったので、ストリームをPromiseに変換して、Promise.allで処理しました。正直良く解りませんが…まあいいでしょう。Promise.all方式を利用するストリームマージライブラリ出せば売れる気がする。知らんけど。