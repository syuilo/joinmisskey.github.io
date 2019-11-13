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

[**インストール方法詳説**](installation/)  
[セットアップガイド](https://github.com/syuilo/misskey/blob/master/docs/setup.ja.md)  
[運営ガイド](https://github.com/syuilo/misskey/blob/master/docs/manage.ja.md)

#### わからないことがあったら
エラーが発生したなどわからないことがあれば、まず開発者に聞いてみよう。  
@syuilo@misskey.ioをはじめとする共同開発者に、困っていることの詳細を載せてリプライを送ってほしい。

もしくは、[Fedeloper Folum](https://forum.fedeloper.jp/)で質問してみよう。

### ホスティングサービスを利用する
サーバーがなくともMisskeyのインスタンスをホスティングし貸し出すサービスが将来的にできるかもしれないが、今はそのようなサービスはない。

### インスタンスの運営
[運営ガイド](https://github.com/syuilo/misskey/blob/master/docs/manage.ja.md)にしたがって自分をadminにすると、管理画面（URL: `/admin`）が利用できるようになる。

管理画面ではインスタンスのステータスの閲覧や各種設定を行うことができる。

## インスタンスを閉鎖する
インスタンスを閉鎖する場合、一定期間、HTTPステータスコード**410 Gone**を発信することが望ましい。

## Misskey本体開発
MisskeyはGitHub上でソースコードを公開しており、自分で改造したりMisskeyに改善の提案を行ったりすることができる。  
[→ GitHubリポジトリ](https://github.com/syuilo/misskey)

Pull RequestやIssueをお待ちしている。

## APIを利用してアプリを作成する
MisskeyはAPIを公開している。(Misskey Web自体もAPIを利用して通信している。)  
Misskey APIの使い方についてはインスタンスごとのドキュメント`/docs/ja-JP/about`を参照されたい。

MisskeyのAPIに限らず、ActivityPubで接続してノートを管理するやり方もある。

## 翻訳
Crowdin上でMisskeyの翻訳に参加できる。  
[→ Misskeyの翻訳](https://github.com/syuilo/misskey/blob/master/docs/translate.ja.md)

## その他の個別記事
