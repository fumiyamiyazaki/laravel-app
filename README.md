### clone後

```
docker compose up -d

// localhost:8080で、/data/public/../vendor/autoload.phpを開くのに失敗している場合はappコンテナに入り下記実行
docker compose exec app bash
// 権限を付与
chmod -R 777 storage bootstrap/cache
composer install

// 500エラー（アプリケーション暗号化キーが指定されていない）発生時は下記実行（appコンテナ内）
// .envがない場合は.env.exampleをコピーして作成
cp .env.example .env
// アプリケーションキーの作成
php artisan key:generate

// public/storage から storage/app/public へのシンボリックリンクを張る
// システムで生成したファイル等をブラウザからアクセスできるよう公開するため
php artisan storage:link
```
