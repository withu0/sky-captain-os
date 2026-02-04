# Share the app via ngrok (for client review)

When a **client** opens your ngrok URL, their browser must load JS/CSS from the **same origin** (the ngrok URL). It cannot load from `http://127.0.0.1:5173` (your Vite dev server), so you must **not** use the Vite dev server when sharing.

## Steps (do this when sharing with the client)

1. **Build the frontend** (creates `public/build/`):
   ```bash
   npm run build
   ```

2. **Start only the PHP server** (do not run `npm run dev`):
   ```bash
   php artisan serve
   ```

3. **In another terminal, start ngrok:**
   ```bash
   ngrok http 8000
   ```

4. Share the `https://xxxx.ngrok-free.dev` URL. The client may need to click **"Visit Site"** on ngrok’s interstitial page.

5. When you’re done sharing, stop both `php artisan serve` and ngrok. To develop again with hot reload, run `composer dev` or `npm run dev` + `php artisan serve` as usual.

## Why

- With `npm run dev`, the HTML points to `http://127.0.0.1:5173` (Vite dev server). The client’s browser cannot reach your machine and gets CORS errors.
- With `npm run build` and only `php artisan serve`, the HTML points to `/build/assets/...` on the same ngrok origin, so everything loads correctly.
