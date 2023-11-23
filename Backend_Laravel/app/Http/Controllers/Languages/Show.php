<?php

namespace App\Http\Controllers\Languages;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;

class Show extends Controller
{
    public function __invoke()
    {
        return response()->json(["message" => App::getLocale()],200);
    }
}
