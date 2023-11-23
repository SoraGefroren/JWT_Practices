<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Src\Auth\Infrastructure\LoginCommand;
use App\Src\Auth\Infrastructure\Repository\JWTAuthRepository;

class Login extends Controller
{
    private $jwtAuthRepository;
    public function __construct()
    {
        $this->jwtAuthRepository = new JWTAuthRepository();
    }
    public function __invoke(LoginRequest $request)
    {
        return (new LoginCommand($this->jwtAuthRepository))->execute($request->email, $request->password);
    }
}
