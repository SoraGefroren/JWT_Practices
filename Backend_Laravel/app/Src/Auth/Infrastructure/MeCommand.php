<?php

declare(strict_types=1);

namespace App\Src\Auth\Infrastructure;

use App\Src\Auth\Application\MeUseCase;
use App\Src\Auth\Application\RegistrationUseCase;
use App\Src\Auth\Domain\Contracts\AuthContract;
use App\Src\Auth\Domain\User;

final class MeCommand
{
    private $contract;
    public function __construct(
        AuthContract $contract
    )
    {
        $this->contract = $contract;
    }

    public function execute(): array
    {
        return (new MeUseCase($this->contract))->execute()->toArray();
    }
}
