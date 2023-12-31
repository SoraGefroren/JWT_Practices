<?php
declare(strict_types=1);
namespace App\Src\Auth\Domain\Contracts;

use App\Src\Auth\Domain\Credentials;
use App\Src\Auth\Domain\User;
use Illuminate\Http\JsonResponse;

interface AuthContract
{
    public function login(Credentials $credentials) : bool|JsonResponse;
    public function logout() : bool|JsonResponse; 
    public function me() : ?User; 
    public function registration(User $user) : ?User; 
}
