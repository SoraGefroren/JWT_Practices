<?php

declare(strict_types=1);

namespace App\Src\Auth\Infrastructure;

use App\Src\Auth\Application\RegistrationUseCase;
use App\Src\Auth\Domain\Contracts\AuthContract;
use App\Src\Auth\Domain\User;

final class RegistrationCommand
{
    private $contract;
    public function __construct(
        AuthContract $contract
    )
    {
        $this->contract = $contract;
    }

    public function execute(string $name,string $username, string $password): array
    {
        return (new RegistrationUseCase($this->contract))->execute(new User(null,$name,$username, $password))->toArray();
    }
}
