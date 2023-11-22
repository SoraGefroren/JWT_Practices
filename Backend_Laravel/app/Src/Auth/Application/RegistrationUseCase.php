<?php

declare(strict_types=1);

namespace App\Src\Auth\Application;

use App\Src\Auth\Domain\Contracts\AuthContract;
use App\Src\Auth\Domain\User;

final class RegistrationUseCase
{
    private $authContract;
    public function __construct(
        AuthContract $authContract
    ) {
        $this->authContract = $authContract;
    }

    public function execute(User $user): ?User
    {
        return $this->authContract->registration($user);
    }
}
