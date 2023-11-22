<?php
declare(strict_types=1);

namespace App\Src\Auth\Infrastructure\Repository;

use App\Src\Auth\Domain\Contracts\AuthContract;
use App\Src\Auth\Domain\Credentials;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

final class JWTAuthRepository implements AuthContract
{
    public function login(Credentials $credentials) : JsonResponse
    {
        if(!$token = Auth::guard('api')->attempt(["email" => $credentials->username(),"password"=>$credentials->password()])){
            return response()->json([ "message" => "Unauthorized" ],401);
        }
        return response()->json([ "message"=>"Successfully logged in","user" => Auth::user(), "token" => "Bearer ".$token ],200);
    }
    public function logout() : JsonResponse
    {
        Auth::logout();
        return response()->json([ "message" => "Successfully logged out" ],200);
    }
}