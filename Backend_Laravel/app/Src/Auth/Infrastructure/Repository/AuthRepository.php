<?php

declare(strict_types=1);

namespace App\Src\Auth\Infrastructure\Repository;

use App\Src\Auth\Domain\Contracts\AuthContract;
use App\Src\Auth\Domain\Credentials;
use App\Src\Auth\Infrastructure\Traits\MeTrait;
use App\Src\Auth\Infrastructure\Traits\UserRegistrationTrait;
use Illuminate\Support\Facades\Auth;

final class AuthRepository implements AuthContract
{
    use UserRegistrationTrait, MeTrait;
    public function login(Credentials $credentials): bool
    {
        return (Auth::attempt(
            [
                "email" => $credentials->username(),
                "password" => $credentials->password()
            ],
            $credentials->remember()
        ));
    }
    public function logout(): bool
    {
        Auth::logout();
        request()->session()->invalidate();
        request()->session()->regenerateToken();
        return true;
    }
}
