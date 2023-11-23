<?php

namespace App\Src\Auth\Infrastructure\Traits;

use App\Src\Auth\Domain\User;

trait MeTrait
{
    public function me() : ?User
    {
        $user = auth()->user();
        return new User(
            $user->id,
            $user->name,
            $user->email
        );
    }
}
