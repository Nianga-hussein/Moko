<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Conversation;
use Illuminate\Http\Request;

class ConversationController extends Controller
{
    public function index()
    {
        return Conversation::with('messages')->get();
    }

    public function store(Request $request)
    {
        return Conversation::create($request->all());
    }

    public function show($id)
    {
        return Conversation::with('messages')->findOrFail($id);
    }
}
