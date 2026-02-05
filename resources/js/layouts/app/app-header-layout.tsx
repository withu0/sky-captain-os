// File: resources/layouts/app/app-header-layout.tsx
import React, { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    {
      href: '/auth/register',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      ),
      label: '新規会員登録',
    },
    {
      href: '/auth/login',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
        </svg>
      ),
      label: 'ログイン',
    },
    {
      href: '/favorites',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      label: 'お気に入り',
    },
    {
      href: '/mypage',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      label: 'マイページ',
    },
    {
      href: '/cart',
      icon: (
        <span className="relative inline-block">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] rounded-full min-w-[1rem] h-4 flex items-center justify-center px-1">
            3
          </span>
        </span>
      ),
      label: 'カート',
    },
  ];

  return (
    <header className="bg-white border-b border-gray-200">
      {/* Main Header - Image style: logo left, nav right */}
      <div className="container mx-auto px-4">
        <div className="flex flex-row justify-between items-center py-4 gap-4">
          {/* Brand: Logo + Site Title */}
          <a href="/" className="flex items-center gap-3 no-underline group">
            <img
              src="/images/天空隊長.png"
              alt="天空隊長"
              className="h-12 w-auto object-contain max-w-[3rem]"
            />
            <div>
              <h1 className="text-lg font-bold text-red-600 tracking-tight group-hover:text-red-700 transition-colors leading-tight">
                天空隊長
              </h1>
              <p className="text-xs text-gray-500 leading-tight">
                公式オンラインショップ
              </p>
            </div>
          </a>

          {/* User Actions - Desktop: Icon above text, horizontally spaced */}
          <div className="hidden md:flex items-end gap-8">
            {navItems.map(({ href, icon, label }) => (
              <a
                key={href}
                href={href}
                className="flex flex-col items-center gap-1 text-gray-600 hover:text-red-600 no-underline transition-colors min-w-[4rem]"
              >
                <span>{icon}</span>
                <span className="text-xs font-medium">{label}</span>
              </a>
            ))}
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