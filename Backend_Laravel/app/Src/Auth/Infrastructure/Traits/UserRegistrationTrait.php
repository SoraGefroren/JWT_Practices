<?php

namespace App\Src\Auth\Infrastructure\Traits;

use App\Models\User as ModelsUser;
use App\Src\Auth\Domain\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;

trait UserRegistrationTrait
{
    public function registration(User $user) : ?User
    {
        $user = ModelsUser::firstOrCreate([
            "email" => $user->username()
        ],[
            "name" => $user->name(),
            "password" => Hash::make($user->password()),
            "email_verified_at" => Carbon::now(),
            "created_at" => Carbon::now(),
        ]);
        return new User(
            $user->id,
            $user->name,
            $user->email
        );
    }
}
