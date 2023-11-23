@ECHO OFF
echo Starting JWT Laravel setup...
echo Installing composer dependencies...
:: Executing composer 2 dependencies
call composer install
echo Composer dependencies installed
echo Executing laravel settings
if EXIST %cd%\public\storage (
    echo Storage symlink exists
) else (
    echo Creating storage symlink...
    call php artisan storage:link
)
echo Executing fresh migrations and seeders...
php artisan migrate 
php artisan db:seed
php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"
findstr "JWT_SECRET" ".env" >nul
if %errorlevel% equ 0 (
    echo JWT token already setted
) else (
    echo Setting JWT token
    php artisan jwt:secret
)
php artisan vendor:publish --tag=lang
echo Laravel settings installed
call composer dump-autoload
echo Installing and transpilling npm dependencies...
call npm install
call npm run build
echo npm dependencies installed