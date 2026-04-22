<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return auth()->check()
        ? redirect()->route('dashboard')
        : redirect()->guest(route('login'));
})->name('home');

// Redirect root dashboard to role-specific dashboard
Route::middleware(['auth', 'verified'])->get('/dashboard', function () {
    return redirect()->route(auth()->user()->getDashboardRoute());
})->name('dashboard');

require __DIR__.'/settings.php';
require __DIR__.'/admin.php';
require __DIR__.'/hr.php';
require __DIR__.'/employee.php';
