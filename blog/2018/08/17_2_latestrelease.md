---
title: 最近の更新 ～6.2.0
description: いろいろ更新しました。
layout: blog
date: 2018-08-17T09:00:01+09:00
thumbnail: /files/images/imports/2018/07/flower.jpg
author:
  name: aqz
  url: https://misskey.xyz/@aqz
  avatar: aqz
category: ニュースリリース
amp: true
---
## 更新

### メジャーバージョンアップ
オブジェクトストレージを使用している場合、設定ファイルの`drive.config.secure`を`drive.config.useSSL`にリネームしてください。

[Migtration](https://github.com/syuilo/misskey/blob/master/CHANGELOG.md#600)

### リアクションを付けやすく
他の人がつけたリアクションをクリックすると自分もそのリアクションを付けられるようになりました。

### ローカルにRenoteを表示しない
ちょうどMastodonのようにローカルにRenoteを表示しないオプションを作成しました。

従来からも、引用フォームを開いて公開範囲を指定すると範囲を指定したRenoteができます。合わせてご利用ください。

### サムネイル画像の生成
Misskeyに読み込まれる画像サイズが軽くなります。表示の高速化や通信量の低減が期待できます。

### その他

#### MFMを少しいい感じに
MFMが少しいい感じになりました。少し。

#### 新しい顔文字
~~謎機能~~ランダム顔文字入力ボタンに新たな顔文字が追加されました。

#### バグの修正
既知のバグがすべて修正されたわけではありませんが、できる限りのことはやりました。

例えば、モバイルからプロフィールが更新できない問題を修正しました。

## 近況報告
### 大盛況
Mastodonの波に乗ってユーザーが急増しました。  
TwitterのUser Streams廃止と凍結祭りが影響しているようです。

三大インスタンス(mstdn.jp、friends.nico、pawoo.net)もユーザー数とトゥート数が急増し、それ以外のインスタンスも全体的に増えているようです。

Eugen氏が運営するmastodon.socialは新規登録を閉じ、代替の登録先としてknzk.meをお勧めしています。[*](https://misskey.xyz/notes/5b75a45805b00f56a1aacf57)

### 新しいインスタンス
[misskey.jp](https://misskey.jp)、[misskeyちほー](https://mk.kemono-friends.info)が開設された模様です。

**インスタンス一覧** : [Wiki](../../../../wiki/instances/) / [fediverse network](https://fediverse.network/misskey)

自分でサーバーを立てて[新規登録を停止し](https://github.com/yuzulabo/misskey/pull/1)一人だけで利用する「おひとり様インスタンス」も立ち始めています。