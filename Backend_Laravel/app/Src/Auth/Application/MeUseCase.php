<?php

declare(strict_types=1);

namespace App\Src\Auth\Application;

use App\Src\Auth\Domain\Contracts\AuthContract;
use App\Src\Auth\Domain\User;

final class MeUseCase
{
    private $authContract;
    public function __construct(
        AuthContract $authContract
    ) {
        $this->authContract = $authContract;
    }

    public function execute(): ?User
    {
        return $this->authContract->me();
    }
}
