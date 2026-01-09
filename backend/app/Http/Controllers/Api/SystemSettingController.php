<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SystemSetting;
use Illuminate\Http\Request;

class SystemSettingController extends Controller
{
    public function index()
    {
        return SystemSetting::all();
    }

    public function store(Request $request)
    {
        return SystemSetting::updateOrCreate(
            ['setting_key' => $request->setting_key],
            $request->all()
        );
    }
}
