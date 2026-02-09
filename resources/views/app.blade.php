<!DOCTYPE html>
<html lang="ja" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="google" content="notranslate">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        {{-- Inline script to detect system dark mode preference and apply it immediately --}}
        <script>
            (function() {
                const appearance = '{{ $appearance ?? "system" }}';

                if (appearance === 'system') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                    if (prefersDark) {
                        document.documentElement.classList.add('dark');
                    }
                }
            })();
        </script>

        {{-- Inline style to set the HTML background color based on our theme in app.css --}}
        <style>
            html {
                background-color: oklch(1 0 0);
            }

            html.dark {
                background-color: oklch(0.145 0 0);
            }
        </style>

        <title inertia>{{ config('app.name', '天空隊長') }}</title>

        <link rel="icon" href="/favicon.ico" sizes="any">
        <link rel="icon" href="/favicon.svg" type="image/svg+xml">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png">

        {{-- Open Graph / Slack, Facebook, LinkedIn, etc. --}}
        <meta property="og:type" content="website">
        <meta property="og:url" content="{{ url()->current() }}">
        <meta property="og:title" content="お酒を飲む前後の二日酔い対策サプリなら天空隊長 | てんくうたいちょー">
        <meta property="og:description" content="天空隊長（てんくうたいちょー）は、アルコール摂取の前後に飲むことで翌日の二日酔いを大幅に軽減するサプリです。また日本国内初、NMN（美容成分）を配合しておりますので、飲んだ後の美しさにもこだわりを持っています。">
        <meta property="og:image" content="{{ url('images/天空隊長.png') }}">
        <meta property="og:locale" content="ja_JP">
        <meta property="og:site_name" content="天空隊長">

        {{-- Twitter Card --}}
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="お酒を飲む前後の二日酔い対策サプリなら天空隊長 | てんくうたいちょー">
        <meta name="twitter:description" content="天空隊長（てんくうたいちょー）は、アルコール摂取の前後に飲むことで翌日の二日酔いを大幅に軽減するサプリです。また日本国内初、NMN（美容成分）を配合しておりますので、飲んだ後の美しさにもこだわりを持っています。">
        <meta name="twitter:image" content="{{ url('images/天空隊長.png') }}">

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=M+PLUS+2:wght@100;200;300;400;500;600;700;800;900&family=M+PLUS+Rounded+1c&family=Noto+Sans+JP:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">

        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
