<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Src\Auth\Infrastructure\MeCommand;
use App\Src\Auth\Infrastructure\Repository\JWTAuthRepository;
use Illuminate\Http\Request;

class Me extends Controller
{
    private $jwtAuthRepository;
    public function __construct()
    {
        $this->jwtAuthRepository = new JWTAuthRepository();
    }
    public function __invoke()
    {
        return response()->json((new MeCommand($this->jwtAuthRepository))->execute(),200);
    }
}
