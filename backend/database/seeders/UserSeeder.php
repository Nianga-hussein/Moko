<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'full_name' => 'Admin Moko',
            'email' => 'admin@moko.com',
            'phone_number' => '699000001',
            'password_hash' => Hash::make('password123'),
            'role' => 'admin',
            'is_verified' => true,
        ]);

        User::create([
            'full_name' => 'Provider One',
            'email' => 'provider1@moko.com',
            'phone_number' => '699000002',
            'password_hash' => Hash::make('password123'),
            'role' => 'provider',
            'is_verified' => true,
        ]);

        User::create([
            'full_name' => 'Provider Two',
            'email' => 'provider2@moko.com',
            'phone_number' => '699000003',
            'password_hash' => Hash::make('password123'),
            'role' => 'provider',
            'is_verified' => true,
        ]);

        User::create([
            'full_name' => 'Client One',
            'email' => 'client1@moko.com',
            'phone_number' => '699000004',
            'password_hash' => Hash::make('password123'),
            'role' => 'client',
            'is_verified' => true,
        ]);

        User::create([
            'full_name' => 'Client Two',
            'email' => 'client2@moko.com',
            'phone_number' => '699000005',
            'password_hash' => Hash::make('password123'),
            'role' => 'client',
            'is_verified' => true,
        ]);
    }
}
