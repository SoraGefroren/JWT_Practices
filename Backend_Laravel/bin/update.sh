composer install
php artisan migrate
php artisan db:seed
php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"
php artisan vendor:publish --tag=lang
composer dump-autoload
npm install
npm run build