<?php
namespace App\Src\Auth\Domain;
class Credentials
{
    private string $_username;
    private string $_password;
    private bool $_remember;
    public function __construct(
        string $username,
        string $password,
        bool $remember = false
    )
    {
        $this->_username = $username;
        $this->_password = $password;
        $this->_remember = $remember;
    }

    public function username() : string
    {
        return $this->_username;
    }

    public function password() : string
    {
        return $this->_password;
    }
    public function remember() : bool
    {
        return $this->_remember;
    }

    public function toCollection()
    {
        return collect($this);
    }

    public function toArray() : array
    {
        return [
            "email" => $this->username(),
            "password" => $this->password(),
            "remember" => $this->remember()
        ];
    }
}
