<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        return Category::with('children')->get();
    }

    public function store(Request $request)
    {
        return Category::create($request->all());
    }

    public function show($id)
    {
        return Category::with('items')->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);
        $category->update($request->all());
        return $category;
    }

    public function destroy($id)
    {
        Category::destroy($id);
        return response()->json(['deleted' => true]);
    }
}
