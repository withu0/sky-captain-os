<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\AddressStoreRequest;
use App\Http\Requests\Settings\AddressUpdateRequest;
use App\Models\Address;
use Illuminate\Http\RedirectResponse;

class AddressController extends Controller
{
    public function store(AddressStoreRequest $request): RedirectResponse
    {
        $request->user()->addresses()->create($request->validated());

        return back();
    }

    public function update(AddressUpdateRequest $request, Address $address): RedirectResponse
    {
        if ($address->user_id !== $request->user()->id) {
            abort(403);
        }

        $address->update($request->validated());

        return back();
    }

    public function destroy(Address $address): RedirectResponse
    {
        if ($address->user_id !== $request->user()->id) {
            abort(403);
        }

        $address->delete();

        return back();
    }
}
