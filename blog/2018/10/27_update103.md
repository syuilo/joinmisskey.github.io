---
title: "最近の更新 ～10.33.0"
description: 
layout: blog
date: 2018-10-27T07:00:00+09:00
thumbnail: /files/images/imports/2018/08/115.jpg
author:
  name: aqz
  url: https://misskey.xyz/@aqz
  avatar: aqz
category: 更新
amp: true
---
2週間分の更新をすべて網羅するのはつらいので、今回は参照を付けましたが、かなり手を抜いています。  
「🎨」や「Fix Bug」というコメントの変更をほぼピックアップしていません。

## Features - 新要素

- 諸々のリクエストにプロキシを使えるように(未完成) [*](https://github.com/syuilo/misskey/commit/a7237d157a353eddb41a0f2cbc6c1719cec31d50)
- connectedイベントはpongパラメータがtrueの時だけ発行するように [*](https://github.com/syuilo/misskey/commit/2b536a744391fe3c44accac7993ef9910c911248)
- botからのフォローを拒否する機能 [*](https://github.com/syuilo/misskey/commit/65e5cfa68eee619843192f3bf2a3e901a0910101)
- タイムライン読み込み時モックが出るように [*](https://github.com/syuilo/misskey/commit/0f8847bb747d71ad4ea045128e4e968883bc8556)
- User Recommendationを利用しているときその情報を`api/meta`に表示 [#2902](https://github.com/syuilo/misskey/pull/2902)
- デスクトップでナビゲーションを横にも表示できるように [*](https://github.com/syuilo/misskey/commit/99073b56df45772a87a5d54f010e960cc8e82904)
- いくつかの[テスト](https://github.com/syuilo/misskey/tree/develop/test)を追加 (人間がやる知識や知能を測るテストではなくて、Misskeyのプログラムがきちんと動くかの機械的なテスト)
- RSSにキャッシュを利用 [#2915](https://github.com/syuilo/misskey/pull/2915)
- オブジェクトストレージのファイル名を変更 [*](https://github.com/syuilo/misskey/commit/cfbb6e8092e7579385d0e31dfe44e8dab57f2add), [*](https://github.com/syuilo/misskey/commit/704e217dbbcd30a75667670d99bb1a01eaee2442)
- HSTSをオプションに [*](https://github.com/syuilo/misskey/commit/61f86dcb2b9cec8d55cf6a77f592ba359ff8b52b)
- デッキでユーザーなどのオブジェクトをクリックしたとき、新しいカラムに表示するように [#2930](https://github.com/syuilo/misskey/pull/2933), [*](https://github.com/syuilo/misskey/commit/77ddd778be3346dac0decf60c1156fde636416cb)
  * 設定で無効化可能。
- 未読の投稿をすべて既読にできるように [*](https://github.com/syuilo/misskey/commit/fb5f6fdc103e83652415a3f1379a01f1fb487585)
- デッキのカラムを左揃えか中央揃えか選択できるように [*](https://github.com/syuilo/misskey/commit/6c1f1ffdb1f0af467def794025f09eb5b75b2546)
- デッキをデフォルトのUIにできるように [*](https://github.com/syuilo/misskey/commit/f14c372f5e051c4d1520776a8d306bf673900477)
- デッキでもタブが非表示のときタブタイトルで新着投稿を表示 [*](https://github.com/syuilo/misskey/commit/e8de29ae79f8b4157f6522ed895b2415fa3c877a)
- RP → RN [*](https://github.com/syuilo/misskey/commit/e0d6f7c7c4eeb3a9e19ec87b96538e5a4202b2d2)
- デッキのキーボード操作の強化
- "!","?"をハッシュタグと認識しないように [*](https://github.com/syuilo/misskey/commit/70d0937aab71de6e9fb475e01940bebde3b6d77d)
- ファイル作成APIのforce [*](https://github.com/syuilo/misskey/commit/c4e8cabae90b59d5842db2f789eb0cd8ee1fcac4)
- 多言語化
- 統計を種類で分割 [*](https://github.com/syuilo/misskey/commit/969b6dbcad813201f15ac25a2e750748a18bad42)
- 統計のデータ通信量を削減 [*](https://github.com/syuilo/misskey/commit/fed04ef5aedc7facf677180e45e92ae6137199a5)
- ユニークインクリメント(統計) [*](https://github.com/syuilo/misskey/commit/6cccd9d2885af94277070056c8f00cb7a87c3a05)
- ユーザーごとの統計
- **…という感じで統計がよりパワーアップした**
- ドライブファイルをオブジェクトストレージ保存時にファイル名が提供されていなくても、MIMEから拡張子を付ける [#2979](https://github.com/syuilo/misskey/pull/2979)
- ドライブ内の特定のファイルが使われている投稿を一覧する機能(APIのみ) [*](https://github.com/syuilo/misskey/commit/19af2d7a7ba3b582fd321bd202701d07d2e12f03)
- ドライブのフォルダーの削除 [*](https://github.com/syuilo/misskey/commit/9f981d875afef35329268e6a7dc5d35d8a854c72), [*](https://github.com/syuilo/misskey/commit/fc372496da7925887667dcc51236e52490bbe3ae)
- APIコンソール(`設定` > `API`) [*](https://github.com/syuilo/misskey/commit/e0bf522e7fc29e17b61d0a067e700728b089527b)
- リポジトリのCIやパッケージなどを再整備 GreenkeeperをやめてDependabotを採用するなど

## Bug fixes - 不具合修正

- 投稿ドキュメントが壊れる [*](https://github.com/syuilo/misskey/commit/3961fd08c9ade1bb034fe79894c81833cf4e0266)
- 非ASCIIなドメインへのメンションの修正 [#2903](https://github.com/syuilo/misskey/pull/2903)
- モバイルで画像を閲覧注意にできない [*](https://github.com/syuilo/misskey/commit/88fbc53e3703d830c1f645a29b6d6c611eff3384)
- リモートからの画像が常に直リンになってしまう [*](https://github.com/syuilo/misskey/commit/46d3293eddd54123e52ceedf0a2617728dede383)
- 未読が既読にならない [*](https://github.com/syuilo/misskey/commit/00290fbf75859055422ff6239f6a55425981ebfe)
- ファイルに関するいくつかの修正 [#2968](https://github.com/syuilo/misskey/pull/2968)
- フォトストリームがオリジナル画像 [#2971](https://github.com/syuilo/misskey/pull/2971)
- ユーザーページのog:thumbnail [#2972](https://github.com/syuilo/misskey/pull/2972)
- スクロール位置が一番上でないときに来た投稿のタイトル通知について、画面を一番上までスクロールしても通知が残り続ける [*](https://github.com/syuilo/misskey/commit/80e52c57e1eee8a433b43ca768978b63128113b7)
