<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Item;
use Illuminate\Http\Request;

class ItemController extends Controller
{
    public function index()
    {
        return Item::with('category', 'provider')->get();
    }

    public function store(Request $request)
    {
        return Item::create($request->all());
    }

    public function show($id)
    {
        return Item::with('category', 'provider')->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $item = Item::findOrFail($id);
        $item->update($request->all());
        return $item;
    }

    public function destroy($id)
    {
        Item::destroy($id);
        return response()->json(['deleted' => true]);
    }
}
