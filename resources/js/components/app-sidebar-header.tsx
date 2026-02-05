// File: resources/layouts/app/app-header-layout.tsx
import React, { useState } from 'react';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-white border-b border-gray-200">
            {/* Top Banner */}
            <div className="bg-gray-100 text-center py-2 px-4">
                <p className="text-sm text-gray-700">
                    送料無料キャンペーン実施中！ 5,000円以上お買い上げで送料無料
                </p>
            </div>

            {/* Main Header */}
            <div className="container mx-auto px-4">
                {/* Brand and Top Links Row */}
                <div className="flex flex-col md:flex-row justify-between items-center py-4 gap-4">
                    {/* Brand */}
                    <div className="flex flex-col items-center md:items-start">
                        <div className="flex items-center space-x-3">
                            {/* Replace with your actual logo */}
                            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-sm">A</span>
                            </div>
                            <div>
                                <a href="/" className="no-underline">
                                    <h1 className="text-xl font-bold text-gray-900 tracking-tight hover:text-red-600 transition-colors">
                                        アスガール颗粒
                                    </h1>
                                </a>
                                <p className="text-xs text-gray-500 mt-1">
                                    公式オンラインショップ
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Search Bar - Centered on desktop, full width on mobile */}
                    <div className="w-full md:w-1/3 lg:w-1/2">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="商品を検索..."
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                            />
                            <svg
                                className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                    </div>

                    {/* User Actions - Desktop */}
                    <div className="hidden md:flex items-center space-x-6">
                        <a
                            href="/auth/register"
                            className="text-sm text-gray-700 hover:text-red-600 whitespace-nowrap no-underline"
                        >
                            新規会員登録
                        </a>
                        <span className="text-gray-300">|</span>
                        <a
                            href="/auth/login"
                            className="text-sm text-gray-700 hover:text-red-600 whitespace-nowrap no-underline"
                        >
                            ログイン
                        </a>
                        <a
                            href="/favorites"
                            className="flex flex-col items-center text-sm text-gray-700 hover:text-red-600 no-underline"
                        >
                            <svg
                                className="w-6 h-6 mb-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                />
                            </svg>
                            お気に入り
                        </a>
                        <a
                            href="/mypage"
                            className="flex flex-col items-center text-sm text-gray-700 hover:text-red-600 no-underline"
                        >
                            <svg
                                className="w-6 h-6 mb-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                            </svg>
                            マイページ
                        </a>
                        <a
                            href="/cart"
                            className="flex flex-col items-center text-sm text-gray-700 hover:text-red-600 no-underline relative"
                        >
                            <div className="relative">
                                <svg
                                    className="w-6 h-6 mb-1"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    3
                                </span>
                            </div>
                            カート
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden flex items-center space-x-2 text-gray-700"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                            />
                        </svg>
                        <span className="text-sm">メニュー</span>
                    </button>
                </div>

                {/* Main Navigation - Category Menu */}
                <nav className="hidden md:flex justify-center space-x-8 py-4 border-t border-gray-200">
                    <a
                        href="/"
                        className="text-gray-700 hover:text-red-600 font-medium text-sm no-underline"
                    >
                        ホーム
                    </a>
                    <a
                        href="/products"
                        className="text-gray-700 hover:text-red-600 font-medium text-sm no-underline"
                    >
                        商品一覧
                    </a>
                    <a
                        href="/new-arrivals"
                        className="text-gray-700 hover:text-red-600 font-medium text-sm no-underline"
                    >
                        新着商品
                    </a>
                    <a
                        href="/best-sellers"
                        className="text-gray-700 hover:text-red-600 font-medium text-sm no-underline"
                    >
                        ベストセラー
                    </a>
                    <a
                        href="/sale"
                        className="text-red-600 font-medium text-sm no-underline"
                    >
                        セール
                    </a>
                    <a
                        href="/about"
                        className="text-gray-700 hover:text-red-600 font-medium text-sm no-underline"
                    >
                        会社概要
                    </a>
                    <a
                        href="/contact"
                        className="text-gray-700 hover:text-red-600 font-medium text-sm no-underline"
                    >
                        お問い合わせ
                    </a>
                </nav>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden border-t border-gray-200 py-4">
                        <div className="space-y-4">
                            {/* User Actions - Mobile */}
                            <div className="grid grid-cols-2 gap-4 pb-4 border-b">
                                <a
                                    href="/auth/register"
                                    className="bg-red-600 text-white py-2.5 text-center rounded text-sm no-underline"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    新規会員登録
                                </a>
                                <a
                                    href="/auth/login"
                                    className="bg-gray-100 text-gray-700 py-2.5 text-center rounded text-sm no-underline"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    ログイン
                                </a>
                            </div>

                            <div className="space-y-2">
                                <a
                                    href="/favorites"
                                    className="flex items-center space-x-3 py-2 text-gray-700 no-underline"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                        />
                                    </svg>
                                    <span>お気に入り</span>
                                </a>
                                <a
                                    href="/mypage"
                                    className="flex items-center space-x-3 py-2 text-gray-700 no-underline"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>
                                    <span>マイページ</span>
                                </a>
                                <a
                                    href="/cart"
                                    className="flex items-center space-x-3 py-2 text-gray-700 no-underline"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <div className="relative">
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                            />
                                        </svg>
                                        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                            3
                                        </span>
                                    </div>
                                    <span>カート</span>
                                </a>
                            </div>

                            {/* Navigation Links - Mobile */}
                            <div className="pt-4 border-t space-y-2">
                                <a
                                    href="/"
                                    className="block py-2 text-gray-700 no-underline"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    ホーム
                                </a>
                                <a
                                    href="/products"
                                    className="block py-2 text-gray-700 no-underline"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    商品一覧
                                </a>
                                <a
                                    href="/new-arrivals"
                                    className="block py-2 text-gray-700 no-underline"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    新着商品
                                </a>
                                <a
                                    href="/best-sellers"
                                    className="block py-2 text-gray-700 no-underline"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    ベストセラー
                                </a>
                                <a
                                    href="/sale"
                                    className="block py-2 text-red-600 no-underline"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    セール
                                </a>
                                <a
                                    href="/about"
                                    className="block py-2 text-gray-700 no-underline"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    会社概要
                                </a>
                                <a
                                    href="/contact"
                                    className="block py-2 text-gray-700 no-underline"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    お問い合わせ
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;