---
title: joinmisskey編集方法
description: Wikiを含めたjoinmisskeyの編集方法。
layout: wiki
has_child: false
rank: 199
---
1. GitHubにアカウントを作る
2. [joinmisskeyのリポジトリ](https://github.com/joinmisskey/joinmisskey.github.io)をForkする
3. `pages/ja`内の該当するファイルを編集する
  * Markdown(`.md`)かPug(`.pug`)で書かれている
  * 各ファイルには先頭の`--- ~ ---`でYAML FrontMatterが設定されている
4. 編集が終わったらプルリクエストを出す
5. aqzやsyuiloがマージする
6. aqzがビルドすれば、変更が反映される