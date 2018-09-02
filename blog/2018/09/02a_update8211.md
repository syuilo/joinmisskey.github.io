---
title: "最近の更新 ～8.21.1"
description: 
layout: blog
date: 2018-09-02T16:45:00+09:00
thumbnail: /files/images/imports/2018/08/kiha110-2.jpg
author:
  name: aqz
  url: https://misskey.xyz/@aqz
  avatar: aqz
category: 更新
amp: true
---
対象バージョン: 8.15.0, 8.16.0, 8.17.0, 8.18.0, 8.19.0, 8.19.1, 8.20.0, 8.21.0, 8.21.1

## ActivityPub関連修正
ざっくり言うと、PeerTubeと連携できない問題やアカウントのアップデートに関する問題、セキュリティの問題が修正されました。  
[#2530](https://github.com/syuilo/misskey/pull/2530), [#2547](https://github.com/syuilo/misskey/pull/2547), [#2555](https://github.com/syuilo/misskey/pull/2555), [#2570](https://github.com/syuilo/misskey/pull/2570)

ActivityPub関連ではまだ解決されていない不具合や実装できていない機能もあるようです。  
aqz(筆者)はAPに疎いため詳しく伝えきれません……。

## 機能向上
### デッキが正式版に
デッキから(Beta)が取れました。[*](https://github.com/syuilo/misskey/commit/e50fa4762dea5dd802dd8a1abbd94ffce7bfb444)

#### タイトルをクリックすると上に戻る
待望の機能が追加されました。タイトルをクリックするとスクロールが上に戻ります。  
従来あった開閉機能は、左側をクリックすることで利用できます。 [*](https://github.com/syuilo/misskey/commit/bffb9a5c451260b9b6b67df4972e28b895319825)

#### URLプレビュー
DeckでもURLプレビューが表示されるようになりました。 [*](https://github.com/syuilo/misskey/commit/488bbc96510990afeb9afe3ce5e68e001d514e3e)

### モバイルの投稿フォームが使いやすく
モバイルの新規投稿フォームが使いやすくなりました。  
投稿画面を開いてもタイムラインが戻らなくなりました。 [*](https://github.com/syuilo/misskey/commit/6819eb3b4da43665de8e159d774b3f2325ddfe0b), [*](https://github.com/syuilo/misskey/commit/7559b8da6c1b3c1bebd0355891d788f11bafa4ea), [*](https://github.com/syuilo/misskey/commit/5209a584a2ed76057ec5edc351cf155154f3f68f)

まったく違う投稿にリプライ・Renoteしてしまう問題、および新規登録フォームが表示されない問題は修正されています。 [*](https://github.com/syuilo/misskey/commit/63e2dbbb0d1b9be3aba6afc8ec7ddb5f84c193cf), [*](https://github.com/syuilo/misskey/commit/f1d65a66b465a18d200f922fac03384bee7d6f69)

### その他
- 寄付者にサーバーの設定を適用 [#2494](https://github.com/syuilo/misskey/pull/2494)
- モバイルでもサウンドが鳴るように [*](https://github.com/syuilo/misskey/commit/2762b78bcca788ae7fb0a53b1913bf2207a66e8b)
- 時計の表示がデフォルトに [*](https://github.com/syuilo/misskey/commit/f92745e381d0bd864367aee57f8e093d9806c526)
- 開発モードでは警告が表示されるように [*](https://github.com/syuilo/misskey/commit/f0abc4642969587039909d5f50adb7d4592f48ba)
- クライアントバージョンにノイズを含めるように [*](https://github.com/syuilo/misskey/commit/fd07f00d140d8a703f8f3438d42eb014aabe91fc)
- リモートの投稿のハイパーリンクをなるべく正しく処理するように [#2339](https://github.com/syuilo/misskey/pull/2339)
- dependencies(依存関係)をチェックしないように [#2577](https://github.com/syuilo/misskey/pull/2577)
- コードの読みやすさ、パフォーマンスに関する変更

## 不具合修正

### その他
- ダークモードになっていなかった部分があった [#2507](https://github.com/syuilo/misskey/pull/2507), [#2557](https://github.com/syuilo/misskey/pull/2557),[*](https://github.com/syuilo/misskey/commit/29b2bdf613efb6e1db10c830012e84270a480fa8), [*](https://github.com/syuilo/misskey/commit/4d6b9f62e5a66171ffcb791904f3e20358d84e78)
- ドライブ→メニュー→[アバターに設定]するとファイル選択ウィンドウが出てくる [#2509](https://github.com/syuilo/misskey/pull/2509)
- アバターやバナーに画像ファイル以外を設定できてしまう [#2511](https://github.com/syuilo/misskey/pull/2511), [#2512](https://github.com/syuilo/misskey/pull/2512), [#2550](https://github.com/syuilo/misskey/pull/2550)
- 「Misskeyについて」にアクセスできない・ドキュメント(URL: `/docs`)が壊れている [*](https://github.com/syuilo/misskey/commit/2de8e8c35803d77af1d6eae78d619f9b57c86bd7)
- Google Mapsのリンクがhttpだった [#2524](https://github.com/syuilo/misskey/pull/2524)
- プッシュ購読APIがサーバー公開鍵を返さない [*](https://github.com/syuilo/misskey/commit/4c6fb60dd25d7e2865fc7c4d97728593ffc3c902)
- メッセージのデザイン [*](https://github.com/syuilo/misskey/commit/9e318d5ebc1abd01059d68eacdf42605efdeb334)