import AddressController from '@/actions/App/Http/Controllers/Settings/AddressController';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { PREFECTURES } from '@/lib/prefectures';
import { toUrl } from '@/lib/utils';
import { checkout } from '@/routes';
import { Form, Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { Plus, Pencil, ChevronLeft } from 'lucide-react';

type Address = {
    id: number;
    last_name: string;
    first_name: string;
    phone: string;
    postal_code_1: string;
    postal_code_2: string;
    prefecture: string;
    city: string;
    street: string;
    building: string | null;
};

export default function AddressesEdit({
    addresses = [],
    returnTo,
}: {
    addresses?: Address[];
    returnTo?: string | null;
}) {
    const [editingAddress, setEditingAddress] = useState<Address | null>(null);
    const addressFormProps = editingAddress
        ? AddressController.update.form(editingAddress.id)
        : AddressController.store.form();

    const inputClass =
        'block w-full rounded border border-[#D9D9D9] bg-white px-3 py-2.5 text-[14px] text-[#231C1D] focus:outline-none focus:ring-2 focus:ring-[#D4AC4C]/40';
    const labelClass = 'text-[14px] font-medium text-[#231C1D]';

    return (
        <AppLayout sidebar={false}>
            <Head title="お届け先住所を編集 | 天空隊長" />
            <div className="mx-auto w-full max-w-[980px] px-4 pt-4 pb-8">
                <div className="flex items-center gap-3">
                    <a
                        href={returnTo || toUrl(checkout())}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#D9D9D9] bg-white text-[#231C1D] hover:bg-[#F5F5F5]"
                        aria-label="戻る"
                        onClick={(e) => {
                            e.preventDefault();
                            router.visit(returnTo || toUrl(checkout()), { preserveState: false });
                        }}
                    >
                        <ChevronLeft className="size-5" />
                    </a>
                    <h1 className="text-[20px] font-bold text-[#231C1D]">
                        お届け先住所を編集
                    </h1>
                </div>
                <hr className="mt-3 border-t border-[#D9D9D9]" />

                <div className="mt-6 space-y-6">
                    <section className="rounded-[3px] border border-[#D9D9D9] bg-white p-6 shadow-sm">
                        <div className="flex flex-col gap-3">
                            <Link
                                href="#address-form"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setEditingAddress(null);
                                    document
                                        .getElementById('address-form')
                                        ?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="flex items-center gap-1.5 text-[14px] font-medium text-[#2563eb] hover:underline"
                            >
                                <Plus className="size-4" aria-hidden />
                                新しい住所
                            </Link>
                            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-stretch sm:justify-start">
                                {addresses.map((addr) => (
                                    <div
                                        key={addr.id}
                                        className="w-full sm:max-w-[320px] rounded-[3px] border border-[#E5E5E5] bg-[#FAFAFA] p-4"
                                    >
                                        <p className="text-[14px] font-medium text-[#231C1D]">
                                            {addr.last_name} {addr.first_name}{' '}
                                            {addr.phone}
                                        </p>
                                        <p className="mt-1 text-[13px] text-[#666]">
                                            〒{addr.postal_code_1}-
                                            {addr.postal_code_2}
                                        </p>
                                        <p className="text-[13px] text-[#666]">
                                            {addr.prefecture}
                                            {addr.city}
                                            {addr.street}
                                            {addr.building
                                                ? ` ${addr.building}`
                                                : ''}
                                        </p>
                                        <div className="mt-2 flex justify-end">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setEditingAddress(addr);
                                                    document
                                                        .getElementById(
                                                            'address-form'
                                                        )
                                                        ?.scrollIntoView({
                                                            behavior: 'smooth',
                                                        });
                                                }}
                                                className="text-[14px] font-medium text-[#2563eb] hover:underline"
                                            >
                                                <span className="inline-flex items-center gap-1">
                                                    <Pencil className="size-3.5" />
                                                    編集
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section
                        id="address-form"
                        className="scroll-mt-4 rounded-[3px] border border-[#D9D9D9] bg-white p-6 shadow-sm"
                    >
                        <h2 className="text-base font-bold text-[#231C1D]">
                            お届け先住所を編集
                        </h2>
                        <Form
                            key={editingAddress?.id ?? 'new'}
                            {...addressFormProps}
                            options={{ preserveScroll: true }}
                            resetOnSuccess={!editingAddress}
                            className="mt-4 grid gap-4"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label
                                                htmlFor="last_name"
                                                className={labelClass}
                                            >
                                                氏名（性）
                                            </Label>
                                            <Input
                                                id="last_name"
                                                name="last_name"
                                                defaultValue={
                                                    editingAddress?.last_name ??
                                                    ''
                                                }
                                                className={inputClass}
                                                autoComplete="family-name"
                                            />
                                            <InputError
                                                message={errors.last_name}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label
                                                htmlFor="first_name"
                                                className={labelClass}
                                            >
                                                氏名（名）
                                            </Label>
                                            <Input
                                                id="first_name"
                                                name="first_name"
                                                defaultValue={
                                                    editingAddress?.first_name ??
                                                    ''
                                                }
                                                className={inputClass}
                                                autoComplete="given-name"
                                            />
                                            <InputError
                                                message={errors.first_name}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label
                                            htmlFor="phone"
                                            className={labelClass}
                                        >
                                            電話番号
                                        </Label>
                                        <Input
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            defaultValue={
                                                editingAddress?.phone ?? ''
                                            }
                                            placeholder="例: 090-0000-0000"
                                            className={inputClass}
                                            autoComplete="tel"
                                        />
                                        <InputError message={errors.phone} />
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="grid gap-2">
                                            <Label
                                                htmlFor="postal_code_1"
                                                className={labelClass}
                                            >
                                                郵便番号
                                            </Label>
                                            <Input
                                                id="postal_code_1"
                                                name="postal_code_1"
                                                defaultValue={
                                                    editingAddress?.postal_code_1 ??
                                                    ''
                                                }
                                                placeholder="例: 000"
                                                className={inputClass}
                                                maxLength={3}
                                                autoComplete="postal-code"
                                            />
                                            <InputError
                                                message={errors.postal_code_1}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label
                                                htmlFor="postal_code_2"
                                                className="invisible"
                                            >
                                                郵便番号（下4桁）
                                            </Label>
                                            <Input
                                                id="postal_code_2"
                                                name="postal_code_2"
                                                defaultValue={
                                                    editingAddress?.postal_code_2 ??
                                                    ''
                                                }
                                                placeholder="例: 0000"
                                                className={inputClass}
                                                maxLength={4}
                                            />
                                            <InputError
                                                message={errors.postal_code_2}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label
                                            htmlFor="prefecture"
                                            className={labelClass}
                                        >
                                            都道府県
                                        </Label>
                                        <select
                                            id="prefecture"
                                            name="prefecture"
                                            defaultValue={
                                                editingAddress?.prefecture ?? ''
                                            }
                                            className={`${inputClass} flex h-10 items-center justify-between`}
                                            aria-invalid={!!errors.prefecture}
                                        >
                                            <option value="">
                                                都道府県を選択する
                                            </option>
                                            {PREFECTURES.map((p) => (
                                                <option key={p} value={p}>
                                                    {p}
                                                </option>
                                            ))}
                                        </select>
                                        <InputError
                                            message={errors.prefecture}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label
                                            htmlFor="city"
                                            className={labelClass}
                                        >
                                            市区町村
                                        </Label>
                                        <Input
                                            id="city"
                                            name="city"
                                            defaultValue={
                                                editingAddress?.city ?? ''
                                            }
                                            placeholder="例: 〇〇市〇〇町"
                                            className={inputClass}
                                            autoComplete="address-level2"
                                        />
                                        <InputError message={errors.city} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label
                                            htmlFor="street"
                                            className={labelClass}
                                        >
                                            丁目・番地・号（数字は半角数字）
                                        </Label>
                                        <Input
                                            id="street"
                                            name="street"
                                            defaultValue={
                                                editingAddress?.street ?? ''
                                            }
                                            placeholder="例: 1-2-3"
                                            className={inputClass}
                                            autoComplete="address-line1"
                                        />
                                        <InputError
                                            message={errors.street}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label
                                            htmlFor="building"
                                            className={labelClass}
                                        >
                                            建物名/部屋番号
                                        </Label>
                                        <Input
                                            id="building"
                                            name="building"
                                            defaultValue={
                                                editingAddress?.building ?? ''
                                            }
                                            placeholder="例: 〇〇マンション"
                                            className={inputClass}
                                            autoComplete="address-line2"
                                        />
                                        <InputError
                                            message={errors.building}
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full rounded-[4px] bg-[#D4AC4C] px-8 py-2.5 text-base font-medium text-white hover:bg-[#D4AC4C]/90"
                                        data-test="use-address-button"
                                    >
                                        この住所を使用
                                    </Button>
                                </>
                            )}
                        </Form>
                    </section>
                </div>
            </div>
        </AppLayout>
    );
}
