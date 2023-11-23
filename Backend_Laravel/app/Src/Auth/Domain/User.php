<?php

namespace App\Src\Auth\Domain;

class User
{
    private ?int $_id;
    private ?string $_name;
    private string $_username;
    private ?string $_password;
    public function __construct(
        ?int $id = null,
        ?string $name = null,
        string $username,
        ?string $password = null
    ) {
        $this->_id = $id;
        $this->_name = $name;
        $this->_username = $username;
        $this->_password = $password;
    }

    public function id(): ?int
    {
        return $this->_id;
    }
    public function name(): ?string
    {
        return $this->_name;
    }
    public function username(): string
    {
        return $this->_username;
    }

    public function password(): ?string
    {
        return $this->_password;
    }

    public function toCollection()
    {
        return collect($this);
    }

    public function toArray(): array
    {
        return [
            "id" => $this->id(),
            "name" => $this->name(),
            "username" => $this->username()
        ];
    }
}
