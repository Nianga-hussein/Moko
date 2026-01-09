<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function index()
    {
        return Booking::with('item', 'user')->get();
    }

    public function store(Request $request)
    {
        return Booking::create($request->all());
    }

    public function show($id)
    {
        return Booking::with('item', 'user')->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $booking = Booking::findOrFail($id);
        $booking->update($request->all());
        return $booking;
    }

    public function destroy($id)
    {
        Booking::destroy($id);
        return response()->json(['deleted' => true]);
    }
}
