---
title: 18/8/20 misskey.ioサービス停止について
description: DDoS攻撃によるサービス停止と新環境について
layout: blog
date: 2018-08-20T13:00:01+09:00
thumbnail: /files/images/imports/2018/07/omachikudasai.jpg
author:
  name: aqz
  url: https://misskey.io/@aqz
  avatar: aqz
category: ニュースリリース
amp: true
---
2018年8月20日、misskey.ioが長時間にわたり停止しました。

## 経過
- [**02:19**](https://misskey.m544.net/notes/5b79a6b87c920841f66547a0) misskey.ioに接続できないことを認識
- [**02:23**](https://misskey.m544.net/notes/5b79a7a97c920841f66547fc) サーバーにSSH接続できないことを確認
- [**02:39**](https://misskey.m544.net/notes/5b79ab3751eabc3fc6ef198e) 原因が[DDoS攻撃](https://ddosmon.net/explore/150.95.142.132)を受けたことによるVPSホスティング会社のインターネット切断と特定
- サーバー移行作業を開始
- [**10:41**](https://misskey.m544.net/notes/5b7a1c3765a223067a9f895a) 新環境によりサービス再開
  * リモートからサービス停止中に受け取れなかった投稿を受け取るため、数時間にわたり負荷が高く不安定な状況が継続 [*](https://misskey.xyz/notes/5b7a293f8c93bc0048ac2612)
    - 主にデータベースがボトルネック[*](https://misskey.xyz/notes/5b7a2111803b9100313bebca)[*](https://misskey.xyz/notes/5b7a28f40280600036dbd06d)

## 今回の復旧と新環境について
https://misskey.xyz/notes/5b7a271283a513002a4b234c  
もし仮にサーバーが復活しても、また攻撃を受ければ再度インターネット遮断の恐れがあり、またアカウント自体の停止も考えられます。サービスを提供できません。  
そこで、[村上さん(arkjp氏)](https://misskey.io/@AureoleArk)がサーバーを貸してくれることになりました。さらに、データも無事救出され、ユーザーの皆さんのデータが失われずに済みました。  

**要するに村上さんのおかげにゃので村上さんを崇めてください**

これからは、村上さんがサーバー管理者となり、村上さん宅サーバーでの運用となります。

### 新環境概要
CloudFlareも併用しています。

#### ハードウェア
サーバー Xeon E3-1240 v2 *2 / RAM: 16GB
台数 4台

#### ソフトウェア
- OpenStack
- Kubernetes (Misskey)
- Docker - Alpine Linux (minio)

#### DBバックアップ
- スナップショット: 5分毎 1024個まで保持
- バックアップ: 1時間毎 保存数無制限
- フルバックアップ: 1日毎 保存数無制限

[*](https://misskey.xyz/notes/5b7a2aa00280600036dbd1cb)[*](https://misskey.xyz/notes/5b7a2ae20280600036dbd1fd)[*](https://misskey.xyz/notes/5b7a2b7f0280600036dbd28e)[*](https://misskey.xyz/notes/5b7a2be20280600036dbd2ce)[*](https://misskey.xyz/notes/5b7a305a0280600036dbd633)[*](https://misskey.xyz/notes/5b7a30d40280600036dbd683)[*](https://misskey.xyz/notes/5b7a2a100280600036dbd15e)

なお、**検索機能が復活しました。**

## 関連する事象
該当時間帯、複数の日本語圏のFediverseインスタンスにDDoS攻撃が行われました。  
DDoSを受けたと報告されているインスタンスを以下に示します。

- mstdn.jp[*](https://misskey.m544.net/notes/5b79bfd951eabc3fc6ef1d18)[*](https://mstdn.jp/@nullkal/100579630034603133)[*](https://misskey.xyz/notes/5b7a47b00280600036dbe1d5)
- msky.cafe[*](https://msky.cafe/notes/5b79ac3af94195003e74266e)
- misskey.jp[*](https://msky.cafe/notes/5b79b975b8beba0048d70ec9)
- misskey.m544.net[*](https://misskey.m544.net/notes/5b7a05b561ba9a4cf71c1917)
