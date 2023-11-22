<?php

declare(strict_types=1);

namespace App\Src\Auth\Infrastructure;

use App\Src\Auth\Application\LogoutUseCase;
use App\Src\Auth\Domain\Contracts\AuthContract;
use App\Src\Auth\Infrastructure\Repository\JWTAuthRepository;
use Illuminate\Http\JsonResponse;

final class LogoutCommand
{
    private $contract;
    public function __construct(
        AuthContract $contract
    )
    {
        $this->contract = $contract;
    }

    public function execute(): bool|JsonResponse
    {
        return (new LogoutUseCase($this->contract))->execute();
    }
}
