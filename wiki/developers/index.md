---
title: 開発者・運営者向け情報
description: インスタンス運営方法 / Misskey本体開発 / API など
layout: index
has_child: false
rank: 98
---
## インスタンスを構築する
### セットアップから自力で行う
Misskeyを自力で構築・運営するには、VPSを借りるか自分でサーバーを設備する必要がある。  
とは言っても、最近のマシンならば最小限より少し上程度のスペックで動作するため、身構える必要はない。

[**Misskeyインストール方法詳説**](installation)  
[セットアップガイド](https://github.com/syuilo/misskey/blob/master/docs/setup.ja.md)

#### わからないことがあったら
エラーが発生したなどわからないことがあれば、まず開発者に聞いてみよう。

[syuilo](../culture/users/syuilo)や[aqz](../culture/users/aqz)など開発者に、エラーログ等困っていることの詳細をリプライで送ってほしい。

もしくは、[Fedeloper Folum](https://forum.fedeloper.jp/)で質問してみよう。

### ホスティングサービスを利用する
サーバーがなくともMisskeyのインスタンスをホスティングし貸し出すサービスが将来的にできるかもしれないが、今現在そのようなサービスはない。

## インスタンスを閉鎖する
インスタンスを閉鎖する場合、一定期間、HTTPステータスコード**410 Gone**を発信することが望ましい。

## Misskey本体開発
MisskeyはGitHub上でソースコードを公開しており、自分で改造したりMisskeyに改善の提案を行ったりすることができる。  
[GitHubリポジトリ](https://github.com/syuilo/misskey)

Pull RequestやIssueをお待ちしている。

### BountySource
BountySourceでGitHubのIssueに対し報奨金を付けることができる。

[→ BountySource](https://www.bountysource.com/teams/misskey)

## APIを利用してアプリを作成する
MisskeyはAPIを公開している。  
Misskey Web自体も同様のAPIを利用して通信しているため、サードパーティのアプリケーションでもほぼ全ての操作を行える。

[**APIの利用方法**](api)  
[**ストリーミングAPIの利用方法**](websocket)

ActivityPubでインスタンスと通信することもできる。[<small>参考</small>](https://argrath.ub32.org/slide/2019/0830/builderscon.html#/)

## 翻訳
Crowdin上でMisskeyの翻訳に参加できる。  
[Crowdin](https://crowdin.com/project/misskey)

## その他の個別記事
