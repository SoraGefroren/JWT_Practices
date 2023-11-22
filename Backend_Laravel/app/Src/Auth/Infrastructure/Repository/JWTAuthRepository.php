<?php
declare(strict_types=1);

namespace App\Src\Auth\Infrastructure\Repository;

use App\Src\Auth\Domain\Contracts\AuthContract;
use App\Src\Auth\Domain\Credentials;
use App\Src\Auth\Domain\User;
use App\Src\Auth\Infrastructure\Traits\MeTrait;
use App\Src\Auth\Infrastructure\Traits\UserRegistrationTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

final class JWTAuthRepository implements AuthContract
{
    use UserRegistrationTrait, MeTrait;
    public function login(Credentials $credentials) : JsonResponse
    {
        if(!$token = Auth::guard('api')->attempt(["email" => $credentials->username(),"password"=>$credentials->password()])){
            return response()->json([ "message" => "Unauthorized" ],401);
        }
        $user = new User(
            Auth::guard('api')->user()->id,
            Auth::guard('api')->user()->name,
            Auth::guard('api')->user()->email,
        );
        return response()->json([ "message"=>"Successfully logged in","user" => $user->toArray(), "token" => "Bearer ".$token ],200);
    }
    public function logout() : JsonResponse
    {
        Auth::logout();
        return response()->json([ "message" => "Successfully logged out" ],200);
    }
}