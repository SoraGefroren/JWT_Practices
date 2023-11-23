<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Src\Auth\Infrastructure\LogoutCommand;
use App\Src\Auth\Infrastructure\Repository\JWTAuthRepository;
use Illuminate\Http\Request;

class Logout extends Controller
{
    private $jwtAuthRepository;
    public function __construct()
    {
        $this->jwtAuthRepository = new JWTAuthRepository();
    }
    public function __invoke()
    {
        return (new LogoutCommand($this->jwtAuthRepository))->execute();
    }
}
