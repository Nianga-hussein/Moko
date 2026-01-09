<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Test User avec full_name
        User::factory()->create([
            'full_name' => 'Test User',
            'email' => 'test@example.com',
            'phone_number' => '699000000',
            'password_hash' => Hash::make('password123'),
            'role' => 'client',
            'is_verified' => true,
        ]);

        // Appel du seeder UserSeeder pour ajouter 5 utilisateurs
        $this->call([
            UserSeeder::class,
        ]);
    }
}
