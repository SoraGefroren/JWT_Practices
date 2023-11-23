<?php

declare(strict_types=1);

namespace App\Src\Auth\Application;

use App\Src\Auth\Domain\Contracts\AuthContract;
use App\Src\Auth\Domain\Credentials;
use Illuminate\Http\JsonResponse;

final class LoginUseCase
{
    private $authContract;
    public function __construct(
        AuthContract $authContract
    ) {
        $this->authContract = $authContract;
    }

    public function execute(Credentials $credentials): bool|JsonResponse
    {
        return $this->authContract->login($credentials);
    }
}
