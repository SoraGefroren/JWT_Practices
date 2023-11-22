<?php

declare(strict_types=1);

namespace App\Src\Auth\Infrastructure;

use App\Src\Auth\Application\LoginUseCase;
use App\Src\Auth\Domain\Credentials;
use App\Src\Auth\Infrastructure\Repository\JWTAuthRepository;

final class LoginCommand
{
    private $repository;
    public function __construct()
    {
        $this->repository = new JWTAuthRepository();
    }

    public function execute(string $username, string $password){
        return (new LoginUseCase($this->repository))->execute(new Credentials($username,$password));
    }
}
