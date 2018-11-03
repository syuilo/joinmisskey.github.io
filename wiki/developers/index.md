---
title: 開発者・運営者向け情報
description: インスタンス運営方法 / Misskey本体開発 / API など
layout: wiki
has_child: false
rank: 98
---
## インスタンスを設立する
### セットアップから自力で行う
Misskeyを自力で運営するには、VPSを借りるか自分でサーバーを設備する必要がある。

[セットアップガイド](https://github.com/syuilo/misskey/blob/master/docs/setup.ja.md) / [運営ガイド](https://github.com/syuilo/misskey/blob/master/docs/manage.ja.md)

### ホスティングサービスを利用する
Misskeyのセットアップを省き、Misskeyのインスタンスを貸し出すサービスを利用できるかもしれない。

ベータテストとして[Hostdon Beta ProgramでMisskeyのインスタンスを借りることができる。](https://beta.hostdon.jp/)[(ブログ記事)](../../blog/2018/08/12_3_hostdon/)  
申し込みは既に終了している。

### インスタンスの運営
[運営ガイド](https://github.com/syuilo/misskey/blob/master/docs/manage.ja.md)に従って自分をadminにすると、管理画面(URL: `/admin`)が利用できるようになる。

管理画面ではインスタンスのステータスの閲覧や各種設定を行うことができる。

## Misskey本体開発
MisskeyはGitHub上でソースコードを公開しており、自分で改造したりMisskeyに改善の提案を行ったりすることができる。  
[→ GitHubリポジトリ](https://github.com/syuilo/misskey)

Pull RequestやIssueをお待ちしている。

## APIを利用してアプリを作成する
MisskeyはAPIを公開している。(というよりは、Webクライアント自体がAPIを利用している。)  
APIの使い方についてはインスタンスごとのドキュメント`/docs/ja-JP/about`を参照されたい。

APIに限らず、ActivityPubで接続して投稿を管理するやり方もあるだろう(ActivityPubもAPIの一種類だが)。

## 翻訳
Crowdin上でMisskeyの翻訳に参加できる。  
[→ Misskeyの翻訳](https://github.com/syuilo/misskey/blob/master/docs/translate.ja.md)
