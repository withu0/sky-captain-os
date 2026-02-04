<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use Symfony\Component\HttpFoundation\Response;

class ForceHttpsForNgrok
{
    public function handle(Request $request, Closure $next): Response
    {
        $host = $request->getHost();
        if (str_contains($host, 'ngrok') || str_contains($host, 'ngrok-free')) {
            URL::forceScheme('https');
        }

        return $next($request);
    }
}
