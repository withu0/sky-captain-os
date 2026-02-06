<?php

namespace App\Http\Requests\Settings;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AddressStoreRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'last_name' => ['required', 'string', 'max:255'],
            'first_name' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:20'],
            'postal_code_1' => ['required', 'string', 'size:3', 'regex:/^[0-9]+$/'],
            'postal_code_2' => ['required', 'string', 'size:4', 'regex:/^[0-9]+$/'],
            'prefecture' => ['required', 'string', Rule::in(self::prefectures())],
            'city' => ['required', 'string', 'max:255'],
            'street' => ['required', 'string', 'max:255'],
            'building' => ['nullable', 'string', 'max:255'],
        ];
    }

    /**
     * @return array<int, string>
     */
    public static function prefectures(): array
    {
        return [
            '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県',
            '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県',
            '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県',
            '静岡県', '愛知県', '三重県', '滋賀県', '京都府', '大阪府', '兵庫県',
            '奈良県', '和歌山県', '鳥取県', '島根県', '岡山県', '広島県', '山口県',
            '徳島県', '香川県', '愛媛県', '高知県', '福岡県', '佐賀県', '長崎県',
            '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県',
        ];
    }
}
