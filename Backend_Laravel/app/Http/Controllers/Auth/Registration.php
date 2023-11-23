<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegistrationRequest;
use App\Src\Auth\Infrastructure\RegistrationCommand;
use App\Src\Auth\Infrastructure\Repository\JWTAuthRepository;

class Registration extends Controller
{
    public $jwtAuthRepository;
    public function __construct(){
        $this->jwtAuthRepository = new JWTAuthRepository();
    }
    public function __invoke(RegistrationRequest $request)
    {
        $command = new RegistrationCommand($this->jwtAuthRepository);
        $user = $command->execute($request->name,$request->email,$request->password);
        return response()->json($user,200);
    }
}
