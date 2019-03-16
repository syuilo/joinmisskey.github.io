---
title: joinmisskeyについて
description: Wikiを含めたjoinmisskeyの編集方法や、支援方法について。
layout: wiki
has_child: false
rank: 199
---
## joinmisskeyの製作・管理について
Misskeyはしゅいろが行っているが、joinmisskeyの製作・編集は[aqz](../culture/users/aqz/)が行っている。

## joinmisskeyを支援する
もしこのサイトの情報が役に立ったならば、ぜひ支援をお願いしたい。

*詳細は[tamaina.github.io#寄付(https://tamaina.github.io/)を参照。*

### joinmisskeyの編集方法
1. GitHubにアカウントを作る
2. [joinmisskeyのリポジトリ](https://github.com/joinmisskey/joinmisskey.github.io)をForkする
3. `pages/(言語)`内の該当するファイルを編集する
  * 文書ファイルはMarkdown(`.md`)かPug(`.pug`)で書かれている
  * 各ファイルには先頭の`--- ~ ---`でYAML FrontMatterが設定されている
4. 編集が終わったらプルリクエストを出す
5. aqzが精査し、OKであればマージする
6. aqzがビルドすれば、変更が反映される
