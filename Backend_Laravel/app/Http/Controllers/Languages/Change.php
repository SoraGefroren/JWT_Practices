<?php

namespace App\Http\Controllers\Languages;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;

class Change extends Controller
{
    public function __invoke(Request $request, string $lang)
    {
        $request->session()->put('locale', $lang);
        App::setLocale($lang);
        return redirect()->back();
    }
}
