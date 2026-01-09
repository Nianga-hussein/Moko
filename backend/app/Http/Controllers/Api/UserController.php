<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    // Liste tous les utilisateurs
    public function index()
    {
        $users = User::with('companies')->get()->map(function ($user) {
            return [
                'id' => $user->id,
                'full_name' => $user->full_name,
                'avatar_url' => $user->avatar_url ?? 'assets/media/default-avatar.png',
                'phone_number' => $user->phone_number,
                'role' => $user->role,
                'is_verified' => $user->is_verified,
                'balance' => '0 FCFA',          // placeholder
                'transactions' => 0,            // placeholder
                'withdrawals' => 0,             // placeholder
                'reservations' => 0,            // placeholder
                'companies' => $user->companies->pluck('name')->join(','),
            ];
        });

        return response()->json($users);
    }

    // Détails d'un utilisateur
    public function show(User $user)
    {
        return response()->json([
            'id' => $user->id,
            'full_name' => $user->full_name,
            'email' => $user->email,
            'phone_number' => $user->phone_number,
            'role' => $user->role,
            'avatar_url' => $user->avatar_url ?? 'assets/media/default-avatar.png',
            'is_verified' => $user->is_verified,
            'address' => $user->address,
            'city' => $user->city,
            'balance' => '0 FCFA',          // placeholder
            'transactions' => 0,            // placeholder
            'withdrawals' => 0,             // placeholder
            'reservations' => 0,            // placeholder
            'companies' => $user->companies->pluck('name'),
            'created_at' => $user->created_at->format('d M Y'),
        ]);
    }
}
