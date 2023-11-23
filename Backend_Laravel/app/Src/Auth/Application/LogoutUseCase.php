<?php

declare(strict_types=1);

namespace App\Src\Auth\Application;

use App\Src\Auth\Domain\Contracts\AuthContract;
use Illuminate\Http\JsonResponse;

final class LogoutUseCase
{
    private $authContract;
    public function __construct(
        AuthContract $authContract
    ) {
        $this->authContract = $authContract;
    }
    public function execute(): bool|JsonResponse
    {
        return $this->authContract->logout();
    }
}
