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







Route::get('/login', function () {
    return view('login'); // resources/views/login.blade.php
})->name('login');

Route::get('/admin/utilisateurs', function () {
    return view('admin-utilisateurs'); // resources/views/admin-utilisateurs.blade.php
})->middleware(['auth', 'admin']);



// -----------------------------
// AUTH
// -----------------------------
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// -----------------------------
// USERS (ADMIN only)
// -----------------------------
Route::middleware('admin')->group(function () {
    Route::get('/users', [UserController::class, 'index']);        // Liste tous les utilisateurs
    Route::get('/users/{user}', [UserController::class, 'show']);  // Détail d’un utilisateur
});

// -----------------------------
// CATEGORIES (ADMIN only)
// -----------------------------
Route::resource('categories', CategoryController::class)->middleware('admin');

// -----------------------------
// ITEMS (ADMIN / PROVIDER)
// -----------------------------
Route::resource('items', ItemController::class)->middleware('provider'); 
// Note: filtre admin/provider géré dans le Controller si nécessaire

// -----------------------------
// BOOKINGS (ADMIN / PROVIDER / CLIENT)
// -----------------------------
Route::resource('bookings', BookingController::class)->middleware('client'); 
// Note: filtre admin/provider/client géré dans Controller

// -----------------------------
// CONVERSATIONS (ADMIN / PARTICIPANT)
// -----------------------------
Route::resource('conversations', ConversationController::class)
    ->only(['index', 'store', 'show'])
    ->middleware('client'); 
// Vérifie dans Controller si l’utilisateur est participant

// -----------------------------
// MESSAGES (ADMIN / PARTICIPANT)
// -----------------------------
Route::post('/messages', [MessageController::class, 'store'])->middleware('client'); 
// Vérifie dans Controller si l’utilisateur est participant

// -----------------------------
// SYSTEM SETTINGS (ADMIN only)
// -----------------------------
Route::get('/settings', [SystemSettingController::class, 'index'])->middleware('admin');
Route::post('/settings', [SystemSettingController::class, 'store'])->middleware('admin');
