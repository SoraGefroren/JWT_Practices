<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Src\Auth\Infrastructure\LoginCommand;

class Login extends Controller
{
    public function __invoke(LoginRequest $request)
    {
        return (new LoginCommand)->execute($request->email,$request->password);
    }
}
