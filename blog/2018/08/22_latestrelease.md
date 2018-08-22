---
title: 最近の更新 ～7.3.0
description: Catがリモートに伝播したりなど
layout: blog
date: 2018-08-22T11:00:01+09:00
thumbnail: /files/images/imports/2018/07/akibabara.jpg
author:
  name: aqz
  url: https://misskey.xyz/@aqz
  avatar: aqz
category: 更新
amp: true
---
## 更新
### リモートでもにゃんにゃん
Catであることがリモートにも伝達されるようになりました。 [*](https://github.com/syuilo/misskey/commit/2536bfb5f50eacd7dc14b18210e2ea490dcea548)

### わかりやすいリバーシ
リバーシの盤面で、黒側のアイコンが黒く、白側のアイコンが白く表示されるオプションが追加されました。 [*](https://github.com/syuilo/misskey/pull/2364)[*](https://github.com/syuilo/misskey/commit/ef0793311f838c50b9f1acb8f6dda97f677c0700)

### 管理者向け
#### サーバー設定の変更が容易に
ビルドの際、設定ファイル不要になりました。 [*](https://github.com/syuilo/misskey/commit/6ecb88b0d1e8fd2bbea00995e552f8b98e4cdeb8)

#### adminがadminを凍結できないように
adminが間違って(?)adminを凍結できないようになりました。 [*](https://github.com/syuilo/misskey/commit/30444e5f1abcefeef49cd54d44ff0c8db79d41c2)

### 不具合修正

- ドライブで削除された画像がフォトストリームで表示されてしまう [*](https://github.com/syuilo/misskey/commit/fe1e60a28cae3ce8932c9aa57b15532ec0b76057)
- ドキュメントの修正 [*](https://github.com/syuilo/misskey/commit/c3747db6701527c3f45c654ac217a5624241580c)
- ホーム画面のナビゲーションの「開発者」のリンクが動作しない [*](https://github.com/syuilo/misskey/commit/dccc2c60e3e28bc2960d8e79a72ef91c9d53a271)
- ログインできない問題 [*](https://github.com/syuilo/misskey/commit/933e25804cfbd3a86f3597083282a6ac96b5fff1)
  * [その原因(7.1.2)](https://github.com/syuilo/misskey/commit/2c9bacfceade688865ad1e8533ca494dd34d0ee5)
- 起動時にデータベース接続チェックでエラーが確認できない [*](https://github.com/syuilo/misskey/pull/2388)
- ActivityPubに送られるデータのContent-Typeが間違っている [*](https://github.com/syuilo/misskey/pull/2385)
- ActivityPubに送られた非公開投稿がある条件で見えてしまう [*](https://github.com/syuilo/misskey/pull/2381)