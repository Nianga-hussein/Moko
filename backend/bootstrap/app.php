<?php

use Illuminate\Foundation\Application;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function ($middleware) {
        // Aliases corrects
        $middleware->alias([
            'auth'     => \App\Http\Middleware\Authenticate::class,
            'admin'    => \App\Http\Middleware\AdminMiddleware::class,
            'provider' => \App\Http\Middleware\ProviderMiddleware::class,
            'client'   => \App\Http\Middleware\ClientMiddleware::class,
        ]);
    })
    ->withExceptions(function ($exceptions) {
        //
    })
    ->create();
