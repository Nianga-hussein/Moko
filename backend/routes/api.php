<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ItemController;
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\ConversationController;
use App\Http\Controllers\Api\MessageController;
use App\Http\Controllers\Api\SystemSettingController;
use App\Http\Controllers\Api\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Routes pour l'application FlyNow / MoKo
|
*/

// -----------------------------
// AUTHENTIFICATION (public)
// -----------------------------
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// -----------------------------
// ROUTES ADMIN (auth + rôle admin)
// -----------------------------
Route::middleware(['auth:sanctum', 'admin'])->group(function () {

    // Users
    Route::get('/users', [UserController::class, 'index']);          // Liste tous les utilisateurs
    Route::get('/users/{user}', [UserController::class, 'show']);    // Détail d’un utilisateur

    // Categories
    Route::apiResource('categories', CategoryController::class);

    // System settings
    Route::get('/settings', [SystemSettingController::class, 'index']);
    Route::post('/settings', [SystemSettingController::class, 'store']);
});

// -----------------------------
// ROUTES PROVIDER (auth + rôle provider)
// -----------------------------
Route::middleware(['auth:sanctum', 'provider'])->group(function () {
    Route::apiResource('items', ItemController::class);
});

// -----------------------------
// ROUTES CLIENT / PARTICIPANT (auth + rôle client)
// -----------------------------
Route::middleware(['auth:sanctum', 'client'])->group(function () {

    // Bookings (admin / provider / client géré dans le controller)
    Route::apiResource('bookings', BookingController::class);

    // Conversations
    Route::apiResource('conversations', ConversationController::class)
        ->only(['index', 'store', 'show']);

    // Messages
    Route::post('/messages', [MessageController::class, 'store']);
});
