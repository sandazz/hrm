<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class AdminUserController extends Controller
{
    public function index(): Response
    {
        $users = User::whereIn('role', ['admin', 'hr'])
            ->orderBy('role')
            ->orderBy('name')
            ->get(['id', 'name', 'email', 'role', 'is_active', 'created_at']);

        return Inertia::render('admin/users/index', [
            'users' => $users,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name'     => ['required', 'string', 'max:255'],
            'email'    => ['required', 'email', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8'],
            'role'     => ['required', Rule::in(['admin', 'hr'])],
        ]);

        User::create([
            'name'               => $validated['name'],
            'email'              => $validated['email'],
            'password'           => Hash::make($validated['password']),
            'role'               => $validated['role'],
            'email_verified_at'  => now(),
            'is_active'          => true,
        ]);

        return back()->with('success', 'User created successfully.');
    }

    public function destroy(User $user): RedirectResponse
    {
        abort_if($user->id === auth()->id(), 403, 'You cannot delete your own account.');
        abort_if(! in_array($user->role, ['admin', 'hr']), 403, 'Forbidden.');

        $user->delete();

        return back()->with('success', 'User deleted successfully.');
    }
}
