---
title: 開発者・運営者向け情報
description: インスタンス運営方法 / Misskey本体開発 / API など
layout: index
has_child: false
rank: 98
---
## インスタンスを設立する
### セットアップから自力で行う
Misskeyを自力で運営するには、VPSを借りるか自分でサーバーを設備する必要がある。

[セットアップガイド](https://github.com/syuilo/misskey/blob/master/docs/setup.ja.md) / [運営ガイド](https://github.com/syuilo/misskey/blob/master/docs/manage.ja.md)

#### わからないことがあったら
エラーが発生したなどわからないことがあれば、まず開発者に聞いてみよう。  
@syuilo@misskey.xyzをはじめとする共同開発者に、困っていることの詳細を載せてをリプライを送ってほしい。

もしくは、[Fedeloper Folum](https://forum.fedeloper.jp/)で質問してみよう。

### ホスティングサービスを利用する
Misskeyのセットアップを省き、Misskeyのインスタンスを貸し出すサービスを利用できるかもしれない。

~~ベータテストとして[Hostdon Beta ProgramでMisskeyのインスタンスを借りることができる。](https://beta.hostdon.jp/)[(ブログ記事)](../../blog/2018/08/12_3_hostdon/)~~  
申し込みは終了した。

### インスタンスの運営
[運営ガイド](https://github.com/syuilo/misskey/blob/master/docs/manage.ja.md)にしたがって自分をadminにすると、管理画面（URL: `/admin`）が利用できるようになる。

管理画面ではインスタンスのステータスの閲覧や各種設定を行うことができる。

## Misskey本体開発
MisskeyはGitHub上でソースコードを公開しており、自分で改造したりMisskeyに改善の提案を行ったりすることができる。  
[→ GitHubリポジトリ](https://github.com/syuilo/misskey)

Pull RequestやIssueをお待ちしている。

## APIを利用してアプリを作成する
MisskeyはAPIを公開している。(Misskey Web自体もAPIを利用して通信している。)  
Misskey APIの使い方についてはインスタンスごとのドキュメント`/docs/ja-JP/about`を参照されたい。

MisskeyのAPIに限らず、ActivityPubで接続して投稿を管理するやり方もある。

## 翻訳
Crowdin上でMisskeyの翻訳に参加できる。  
[→ Misskeyの翻訳](https://github.com/syuilo/misskey/blob/master/docs/translate.ja.md)

## その他の個別記事