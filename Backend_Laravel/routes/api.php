<?php

use Illuminate\Http\Request;
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

Route::prefix("")->middleware(['web'])->group(function(){
    Route::get("languages",App\Http\Controllers\Languages\Show::class);
    Route::post("languages/{lang}",App\Http\Controllers\Languages\Change::class);
    Route::post("login",App\Http\Controllers\Auth\Login::class);
    // Protected routes
    Route::middleware(["api"])->group(function(){
        Route::post("logout",App\Http\Controllers\Auth\Logout::class);
    });
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
