---
title: Misskeyインストール方法詳説
description: サーバーへMisskeyをインストールし公開する方法の一挙手一投足を解説する。
layout: wiki
rank: 1
next: /wiki/developers/email
---
## はじめに
この記事では、[リポジトリに同梱されている『Misskey構築の手引き』 (setup.md)](https://github.com/syuilo/misskey/blob/master/docs/setup.ja.md)を基に、サーバーへMisskeyをインストールし公開する方法の一挙手一投足を解説する。

Bashのコマンド入力、いくつかの設定ファイルの編集、そしてブラウザの操作だけで設定が完了するようにしている。インストールするソフトウェアについて簡単に説明しているが、気にする必要はない。

大まかな流れは上の**目次**をクリックし展開することで確認できる。

この記事では、具体性を重視し、特定の環境に特化した記述をしている。  
OSの違い、Misskey本体や依存するソフトウェアのバージョンアップで変わってしまった部分等あるかもしれないが、ご容赦願いたい。

わからない単語については、[『「分かりそう」で「分からない」でも「分かった」気になれるIT用語辞典』](https://wa3.i-3-i.info/)で調べて分かった気になってほしい。

## 環境と条件
- OSは**Ubuntu 18.04.1 LTS**を利用する。
- ハードウェア要件としては、CPUは最近のものなら最小限で動く。アーキテクチャは**amd64**として解説を進める。  
  メモリは1GB程度あればよい。  
  Amazon EC2なら`micro`のつくインスタンスタイプが最低限。
- 独自のドメインを購入し、CloudFlareを使用する。
  * ドメインは[Google Domains](https://domains.google/intl/ja_jp/)などで予め用意しておくこと。
  * ここではドメインを`example.tld`として解説を進めるので、自分が買ったドメインに適宜置き換えて読むこと。
- CloudFlareとサーバーとの通信にはHTTPSを使用し、証明書の生成にLet's Encryptを使用する。
- Misskeyの実行ではDockerは使用しないが、証明書の生成で利用することになる。  
  MisskeyをDockerで実行する方法は[公式の『Dockerを使ったMisskey構築方法』](https://github.com/syuilo/misskey/blob/master/docs/docker.ja.md)を参照のこと。
- nginxを使用する。
- ElasticSearchは使用しない。
- ほとんどのコマンドにroot権限が必要なため、**root**でコマンドを実行していく。  
  一般ユーザーでログインしている場合は`sudo su -`を実行すればrootに切り替わる。

## nanoの使い方
今回はテキストエディターにnanoを使う。次のように起動する。

```bash
nano /path/to/file
```

一般的な矢印ボタンや<kbd>Home</kbd>/<kbd>End</kbd>などを利用してカーソルを移動できる。

終了は<kbd>Ctrl+X</kbd>で、変更を保存するか聞かれた場合<kbd>Y</kbd>(Yes)を入力し<kbd>Enter</kbd>すると保存できる。

下部にコマンド一覧が表示されるので、`^`を<kbd>Ctrl</kbd>、`M-`を<kbd>Alt</kbd>と読み替えて参考にしよう。

## ユーザーの作成
Misskeyはrootで実行しない方がよいため、専用のユーザーを作成する。

```bash
adduser --disabled-password --disabled-login misskey
```

また、作業用のユーザーとして`user`というユーザーを使用するものとする。  
misskeyの他にユーザーがあれば`user`をそれに置き換えること。  
なければ、以下のようにして作業用ユーザーを作成する。

```bash
adduser user
# パスワードを設定（覚えておくこと）

usermod -aG sudo user
```

## 基本的なソフトウェアのインストールと設定
基本的なソフトウェアのインストールを行う。

### Node.js
Node.jsは、サーバーサイドJavaScript環境であり、Misskeyの基本的な実行環境である。

ここでは、Node.jsのバージョン管理に[**n**](https://github.com/tj/n)を使用する。

```bash
apt update
apt install -y nodejs npm
npm i -g n
n latest
```

Node.jsがインストールされたので、バージョンを確認する。

```bash
node -v
```

`v13.1.0`などと表示されればOK。`v8.x.x`のように表示された場合は、サーバーを再起動してもう一度確認してみてほしい。

### PostgreSQL
PostgreSQLは、オブジェクト関係データベース管理システムであり、Misskeyが種々のデータを保存するために必要不可欠なソフトだ。

#### インストール
##### if: Raspberry Piのなど場合
Raspberry Piなどのarmhf機では、通常通りaptでインストールしよう。

```bash
apt install postgresql
```

##### else: それ以外の場合
シェルスクリプトを実行し、最新バージョンをインストールしよう。

```bash
wget https://salsa.debian.org/postgresql/postgresql-common/raw/master/pgdg/apt.postgresql.org.sh
sh apt.postgresql.org.sh -i -v 12
```

##### endif;

systemctlでデーモンの状態を確認。

```bash
systemctl status postgresql
```

activeならOK。そうでなければ次のコマンドを実行。

```bash
systemctl start postgresql
systemctl enable postgresql
```

#### ユーザーとデータベースの作成
psqlを起動。

```bash
sudo -u postgres psql
```

ユーザーを作成。ユーザー名を`misskey`、パスワードを`hoge`としている。  
当然ながら、パスワードは`hoge`では不適切であるから自分で考えて設定すること。

```sql
create role misskey LOGIN CREATEDB PASSWORD 'hoge';
```

データベースを作成。データベース名を`mk1`、オーナーを`misskey`としている。

```sql
create database mk1 owner misskey;
```

### Redis
Redisは、NoSQLのインメモリデータベースソフトであり、MisskeyのAPIや連合との通信等を管理するために利用する。

```bash
apt install software-properties-common
add-apt-repository ppa:chris-lea/redis-server
apt update
apt install redis-server
systemctl start redis-server
systemctl enable redis-server
```

systemctlでデーモンの状態を確認。

```
systemctl status redis-server
```

activeならOK。

### nginx
nginxは、主としてリバースプロキシに用いられるWebサーバーソフトである。Misskeyには必須ではないが、キャッシュ等をするとパフォーマンスが向上するためインストールしておく。

```bash
apt install -y curl gnupg2 ca-certificates lsb-release
echo "deb http://nginx.org/packages/ubuntu `lsb_release -cs` nginx" | tee /etc/apt/sources.list.d/nginx.list
curl -fsSL https://nginx.org/keys/nginx_signing.key | apt-key add -
apt update
apt install -y nginx
```

systemctlでデーモンの状態を確認。

```bash
systemctl status nginx
```

activeならOK。そうでなければ、次のコマンドを実行。

```bash
systemctl start nginx
systemctl enable nginx
```

http://localhost にアクセスし、**Welcome to nginx!**と表示されればOK。

<small>https://nginx.org/en/linux_packages.html#Ubuntu</small>

### その他
Git（バージョン管理ソフト）およびbuild-essential（Misskeyのビルド時に必要）をインストールする。

```
apt update
apt install -y git build-essential
```

## 追加の設定とインストール
サーバーをインターネットに公開する準備をする。

### ファイヤーウォール
今回は、ファイヤーウォールとしてufwを使用する。

次では、接続許可をホワイトリスト形式とし、22番SSHポートを接続回数制限を設けながら開放、80番HTTPポート及び443番HTTPSポートを開放とした。

```bash
ufw enable
ufw default deny
ufw limit 22
ufw allow 80
ufw allow 443
```

ufwのステータスを確認しておく。

```bash
ufw status
```

### CloudFlare
CloudFlareは、自分のドメインに対してDNSサーバー・リバースプロキシ・CDNをいっぺんに提供してくれるたいへん便利なサービスである。  
CloudFlareを経由せずにサーバーを公開することも可能だが、たいへん便利なので導入することをお勧めする。

[CloudFlareにサインアップ](https://dash.cloudflare.com/sign-up)し、購入したドメインを案内に従って登録する。  
DNSの登録画面でサーバーのIPアドレスを入力しておくとよい。  
ドメインを購入した所によっては適用に3日程度かかる場合がある。

### Certbot (Let's Encrypt) の設定
HTTPS･WSS通信に使用する証明書をCloudFlareを使う方式でLet's Encryptから取得する。

#### Dockerのインストール
Dockerについての説明は[こちら](https://knowledge.sakura.ad.jp/13265/)が詳しいが、今は気にすることはない。

```bash
wget https://get.docker.com/ -O get-docker.sh
sh get-docker.sh
```

dockerのバージョンを確認する。

```bash
docker version
```

#### Certbotで証明書を取得
まず、CloudFlareの情報を記載した設定ファイル`/etc/cloudflare/cloudflare.ini`を作成する。

```bash
mkdir /etc/cloudflare
nano /etc/cloudflare/cloudflare.ini
```

`dns_cloudflare_email`（下の例では`hoge@fuga.foo`）にはCloudFlareで登録しているメールアドレスを設定する。

`dns_cloudflare_api_key`（下の例の`xxx...`）は、次の手順で取得できる。

1. ブラウザでCloudFlareにログイン
2. 右上をクリック
3. My Profileを選択
4. API Tokensを選択
5. Global API KeyのViewを選択
6. パスワードを入力しreCAPTCHAを解除、Viewを選択

```ini
dns_cloudflare_email = hoge@fuga.foo
dns_cloudflare_api_key = xxxxxxxxxxxxxxxxxxxxxxxxxx
```

これを保存し、パーミッションを`600`に設定。  

```bash
chmod 600 /etc/cloudflare/cloudflare.ini
```

準備ができたのでコマンドを実行する。**途中の2箇所の`example.tld`は自分のものに置き換えること**。

```bash
docker run -it --rm -v "/etc/letsencrypt:/etc/letsencrypt" -v "/var/lib/letsencrypt:/var/lib/letsencrypt" -v "/etc/cloudflare:/etc/cloudflare" --dns=8.8.8.8 certbot/dns-cloudflare:latest certonly -d example.tld -d *.example.tld --dns-cloudflare --dns-cloudflare-credentials /etc/cloudflare/cloudflare.ini --dns-cloudflare-propagation-seconds 50
```

**Congratulations!**と表示されたらOK。生成された`.pem`ファイルのパスは今後使うので記録しておくこと。

#### 証明書の更新をcronで設定
取得した証明書は3か月で切れてしまうので、自動で更新するようにcronで設定する。

```bash
nano /etc/cron.d/certbot
```

次を貼り付けて保存する。ちなみにこれは毎月1日4時0分に更新するという内容である。

```pure
00 04 01 * * root /usr/bin/docker run -it --rm -v "/etc/letsencrypt:/etc/letsencrypt" -v "/var/lib/letsencrypt:/var/lib/letsencrypt" -v "/etc/cloudflare:/etc/cloudflare" --dns=8.8.8.8 certbot/dns-cloudflare:latest renew
```

cronを再起動。

```bash
systemctl restart cron
```

<small>https://blog.hanhans.net/2018/12/05/update-certificate/</small>

## Misskeyのインストール
これで前準備はあらかた終わったので、Misskeyを準備していく。

[setup.mdの3.](https://github.com/syuilo/misskey/blob/master/docs/setup.ja.md#3-misskey%E3%81%AE%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB)を順に実行する。なお、一部アレンジを加えている。

`misskey`ユーザーに変更。

```bash
su - misskey
```

Gitでファイル類を展開。

```bash
git clone -b master git://github.com/syuilo/misskey.git
cd misskey
git checkout master
```

必要なnpmパッケージをインストール。

```bash
npx yarn install
```

## Misskeyを設定する
### default.yml
設定ファイル`.config/default.yml`を作成。

```bash
nano .config/default.yml
```

次の内容を貼り付け、適宜置き換える。設定値の変更が必要な箇所は`●`で、これまでの流れの中で設定した値を用いる箇所は`〇`で示した。  
この設定ファイルはYAML形式で書かれており、行頭のスペースの数などを間違えるとMisskeyが動かないので、特に注意すること。

設定できる値と記述方法は[`.config/example.yml`](https://github.com/syuilo/misskey/blob/develop/.config/example.yml)に書かれている。

```yaml
# ● Misskeyを公開するURL
url: https://example.tld/

# 　 ポートを3000とする。
port: 3000

# ● PostgreSQLの設定。
db:
  host: localhost
  port: 5432
  db  : mk1     # 〇 PostgreSQLのデータベース名
  user: misskey # 〇 PostgreSQLのユーザー名
  pass: hoge    # ● PostgreSQLのパスワード

# 　 Redisの設定。
redis:
  host: localhost
  port: 6379

# 　 IDタイプの設定。
id: 'aid'

# 　 最初に登録したユーザーを自動的にadmin（管理者）とするかどうか。
# 　 するなら true , しないなら false 。
autoAdmin: true

```

指定できたら保存する。

### nginxの設定
nginxの設定を行う。

ルート権限で行う。

```bash
# いったん作業用ユーザーに切り替え
su - user
# パスワードを求められる

sudo su -
# パスワードを求められる
```

Misskey付属の設定ファイル[`docs/examples/misskey.nginx`](https://github.com/syuilo/misskey/blob/master/docs/examples/misskey.nginx)を`/etc/nginx/sites-available/misskey.conf`として保存し、nanoで開く。

```bash
cp /home/misskey/misskey/docs/examples/misskey.nginx /etc/nginx/conf.d/misskey.conf
nano /etc/nginx/conf.d/misskey.conf
```

次の部分を自分のものに書き換える。

- 18行目と30行目のドメイン名
- 34-35行目の証明書へのパスをCertbotで取得したものに

変更を保存する。

設定ファイルがきちんと機能するか確認。

```bash
nginx -t
```

OKならば、nginxデーモンを再起動。

```bash
systemctl restart nginx
```

ステータスを確認。

```bash
systemctl status nginx
```

activeであればOK。

## Misskeyのビルド
misskeyユーザーにログインし直す。

```bash
su - misskey
```

ビルドをする。yes we can...

```bash
NODE_ENV=production npx yarn build
```

### サーバーでビルドできない場合
サーバーのマシンスペックが低すぎてビルドが不可能な場合、ローカル環境（Windows、Macでもよい）でビルドしSFTPやSCPで転送することでも対応できる。  
ビルドにはメモリが2GB程度必要と言われている。

1. サーバーと同じバージョンのNode.jsをインストール
  * Windowsではnが利用できないので注意。
2. Git clone、もしくはGitHubからMisskeyのソースをダウンロードする
3. サーバーと同様の`.config/default.yml`を作成
4. `npx yarn install`
5. `NODE_ENV=production npx yarn build`
6. 生成されたbuiltフォルダーをサーバーにコピー

## データベースの初期化
```bash
npx yarn run init
```

## Misskeyを起動する
```bash
NODE_ENV=production yarn start
```

**Now listening on port 3000 on http://example.tld** と表示されたら、設定したURLにアクセスする。

Misskeyのウェルカムページが表示されるはずだ。

アカウントの作成、ノートの作成やファイルのアップロードといった一通りの操作が正しく行えるか確認しよう。

### アクセスできない場合
#### CloudFlareのDNSを確認する
CloudFlareのDNS設定が正しいIPアドレスになっているかもう一度確認しよう。

#### ルーターの設定を確認する
自宅サーバーの場合、ルーターがサーバーと外部との80ポート・443ポートの通信を許可する設定になっているかどうか確認しよう。

## Misskeyのデーモンを作成
いったん<kbd>Ctrl+C</kbd>でプロセスをキルし、Misskeyをデーモンで起動する設定をしよう。

ルート権限で行う。

```bash
# いったん作業用ユーザーに切り替え
su - user
# パスワードを求められる

sudo su -
# パスワードを求められる
```

`/etc/systemd/system/misskey.service`を作成する。

```bash
nano /etc/systemd/system/misskey.service
```

次の内容を貼り付け、保存する。

```ini
[Unit]
Description=Misskey daemon

[Service]
Type=simple
User=misskey
ExecStart=/usr/local/bin/npm start
WorkingDirectory=/home/misskey/misskey
Environment="NODE_ENV=production"
TimeoutSec=60
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=misskey
Restart=always

[Install]
WantedBy=multi-user.target
```

systemdを設定し、misskeyデーモンを開始。

```bash
systemctl daemon-reload
systemctl enable misskey
systemctl start misskey
```

systemctlでデーモンの状態を確認。起動に少し時間がかかるため、15秒程度待ってからのほうが良い。

```bash
systemctl status misskey
```

activeならOK。

**これでMisskeyのインストールはほぼ完了だ。**

## ドライブの保存先の設定（オプション）
初期設定では、ドライブのファイルはワーキングディレクトリの`files`ディレクトリ（つまり`/home/misskey/misskey/files`）に直接保存される。  
サーバーのストレージが限られている場合、他の場所に保存する必要がある。

### オブジェクトストレージを使用する
VPSはディスク容量が制限されており単価が高いため、オブジェクトストレージの利用は必須に近い。

管理画面のインスタンスタブ（`/admin/instance`）の**ドライブの設定**でオブジェクトストレージを設定できる。

公式インスタンスの[misskey.io](../culture/instances/misskey.io)では、オブジェクトストレージにDigitalOcean Spacesを利用している。  
[こちらのリンク <small>https://m.do.co/c/bb9c27bc1a07</small>](https://m.do.co/c/bb9c27bc1a07)からDigitalOceanに登録すると、**$50分のクレジットがもらえる**のでぜひ登録してみてほしい。  
クレジットカードを持っていない方も、PayPalアカウントで登録できる。

### 外部ストレージにシンボリックリンクを張る
自宅サーバーなどでオブジェクトストレージを契約するほどではないものの、ストレージの容量が足りない等の理由で保存先を変更したい場合がある。  
このような場合、`files`ディレクトリとしてシンボリックリンクを作ることで外部ストレージ等にファイルを保存できる。

## インスタンスの種々の設定
その他様々なインスタンスの設定があるが、管理画面のインスタンスタブ（`/admin/instance`）にて設定できる内容とその方法を確認できる。

また、このサイトにもいくつかの記事があるので参考にしてほしい。  
[→ **開発者・運営者向け情報#その他の個別記事**](./#その他の個別記事)
