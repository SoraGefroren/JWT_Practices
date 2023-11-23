<?php

declare(strict_types=1);

namespace App\Src\Auth\Infrastructure;

use App\Src\Auth\Application\LoginUseCase;
use App\Src\Auth\Domain\Contracts\AuthContract;
use App\Src\Auth\Domain\Credentials;
use App\Src\Auth\Infrastructure\Repository\JWTAuthRepository;
use Illuminate\Http\JsonResponse;

final class LoginCommand
{
    private $contract;
    public function __construct(
        AuthContract $contract
    )
    {
        $this->contract = $contract;
    }

    public function execute(string $username, string $password): bool|JsonResponse
    {
        return (new LoginUseCase($this->contract))->execute(new Credentials($username, $password));
    }
}
