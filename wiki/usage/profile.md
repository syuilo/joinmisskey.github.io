---
title: プロフィール
description: 他のユーザーについて知り、自分についての情報を知ってもらおう。
layout: wiki
rank: 10
prev: /wiki/usage/drive/
next: /wiki/usage/integration/
---
[外部サービス連携とEメールについては別ページを参照のこと。](../integration/)

## ユーザーページ
ユーザーページ（URL:`/@username`）で自分や他のユーザーのプロフィールを見られる。

リモートのユーザーのプロフィールは不正確かもしれない。そのユーザーが所属するインスタンスのプロフィールを確認されたい。

## プロフィール設定
設定画面で自分のプロフィールを編集することができる。

プロフィールを設定したら、**保存**を押すのを忘れないようにしよう。

### 自己紹介
「自己紹介」欄では、[MFM](../mfm/)を使いながらあなたについて自由に記述することができる。  
自己紹介に[ハッシュタグ](../hashtag/)を含めると、「みつける」画面の「人気のタグ」に表示され、共通の話題を持ったユーザーがあなたを見つけやすくなる。

### バッジ
#### Cat
「このアカウントはCatです」を有効にすると、あなたはCatになる。  
投稿内で名前の横にcatと表示される。

アイコンに猫耳が生え、投稿の「な」が「にゃ」に変換される。

Catであることはリモートにも伝わる。

#### Bot
「このアカウントはBotです」を有効にすると、このアカウントはBotとして認識されるようになる。  
投稿内で名前の横にbotと表示され、ユーザーページでロボットのマークが付く。

**注意: **botであることはリモートにも伝播する。Botを受け付けない設定のインスタンスがあり、そのようなインスタンスのユーザーには一切関わることができない。

Misskeyには「Botからのフォローだけ承認制にする」オプションがあり、こちらも`設定` > `プロフィール`で有効にできる。

### 管理者が設定するバッジ
#### admin
管理者がユーザーにadminを設定すると、投稿内で名前の横に赤い枠と文字でadminと表示される。

このバッジが付いているユーザーは管理者である。管理者は管理画面（URL: `/admin`）が利用できる。

#### ★
投稿内で名前の横に青い★は**公式バッジ**で、これ付いているユーザーは管理者から「公式である」と認められている。