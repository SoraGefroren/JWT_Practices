<?php

namespace Database\Seeders;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::updateOrCreate([
            "email" => "jwt.testing@yopmail.com"
        ],[
            "name" => "Jwt User Testing",
            "email_verified_at" => Carbon::now(),
            "password" => Hash::make("!P455w0rd!")
        ]);
    }
}
