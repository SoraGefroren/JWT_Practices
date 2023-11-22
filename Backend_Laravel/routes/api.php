<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Auth endpoints
Route::prefix("")->middleware(['web'])->group(function () {
    Route::post("login", App\Http\Controllers\Auth\Login::class);
    Route::post("registration", App\Http\Controllers\Auth\Registration::class);
    // Protected auth endpoints
    Route::middleware(["auth:api"])->group(function () {
        Route::post("logout", App\Http\Controllers\Auth\Logout::class);
        Route::get("me", App\Http\Controllers\Auth\Me::class);
    });
});

// Languages endpoints
Route::prefix("languages")->middleware(['web'])->group(function () {
    Route::get("", App\Http\Controllers\Languages\Show::class);
    Route::post("{lang}", App\Http\Controllers\Languages\Change::class);
});
