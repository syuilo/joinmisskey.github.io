---
title: 最近の更新 ～8.3.1
description: 特に目立った変更はないです
layout: blog
date: 2018-08-24T07:00:00+09:00
thumbnail: /files/images/imports/2018/08/e7.jpg
author:
  name: aqz
  url: https://misskey.io/@aqz
  avatar: aqz
category: 更新
amp: true
---
## 更新
対象バージョン 7.4.0, 7.4.1, 8.0.0, 8.1.0, 8.2.0, 8.3.0, 8.3.1

- モバイルでもミュートできるように [#2396](https://github.com/syuilo/misskey/pull/2396)
- 管理画面で1時間ごとの統計が見られるように [*](https://github.com/syuilo/misskey/commit/71a5662195b4b6a8d4d2c2fc357752b9da350b6f)
- グラフ改良 [*](https://github.com/syuilo/misskey/commit/4dee7d91b17148c5c3ee12c3bee193fccaeb22b6)[*](https://github.com/syuilo/misskey/commit/a294a881ec479b1a90b2c3ade4a160ddd2a03dac)
- 管理画面で招待制のオンオフを切り替えられるように [*](https://github.com/syuilo/misskey/commit/8ba178f795c771fd84739f4ff5ce65f135ca69ca)
- ナビゲーションに管理画面へのリンクが付いた [*](https://github.com/syuilo/misskey/pull/2412/commits/d98c67e13c1d9a12921f436c1434b902b66e34c8)
- ローカライズが良い感じになった
  * 言語コードが2文字から地域を含むコード(ja-JPなど)に
- ベースページのキャッシュが弱く [#2438](https://github.com/syuilo/misskey/pull/2438)

リストはコミット順ではありません。

### 【管理者向け】Migration
~~確かにバージョンは上がりました。しかしなんと、Migrationは不要です！そのままアップデートできます。~~**CHANGELOGが更新されていなかっただけでMigrationはありました。**

起動する前に、`node cli/migration/8.0.0`してください。

### 不具合修正
- `misskey.instance/@username@misskey.instance`で何も表示されない [#2419](https://github.com/syuilo/misskey/pull/2419)
- フォローリクエストが存在しないとき問題が起きる [*](https://github.com/syuilo/misskey/commit/e31a2f7e55bb96d661945d0475cc5cc678c0eb18)
- ローカライズ諸変更の際、新たに発生した不具合の修正
- Spotifyが埋め込みで表示が崩れる [#2424](https://github.com/syuilo/misskey/pull/2424)
- 存在しないAPIエンドポイントでも200が返っていた [#2436](https://github.com/syuilo/misskey/pull/2436)

リストはコミット順ではありません。

## その他
新たに作業のためのブランチ「develop」が追加されました。これからはmasterブランチでも絶対に動きます。恐らくは。
