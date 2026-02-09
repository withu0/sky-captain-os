import { SkyCaptainHeadbar } from '@/components/sky-captain-headbar';
import { toUrl } from '@/lib/utils';
import { Head, Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { ArrowRight } from '@/components/icon/ArrowRight';
import { purchase } from '@/routes';

export default function Landing() {
    const [count, setCount] = useState(8);

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth >= 1280) {
                setCount(16);
            } else if (window.innerWidth >= 1024) {
                setCount(12);
            } else if (window.innerWidth >= 768) {
                setCount(10);
            } else {
                setCount(8);
            }
        }
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return (
        <>
            <Head>
                <title>お酒を飲む前後の二日酔い対策サプリなら天空隊長 | てんくうたいちょー</title>
                <meta name="description" content="天空隊長（てんくうたいちょー）は、アルコール摂取の前後に飲むことで翌日の二日酔いを大幅に軽減するサプリです。また日本国内初、NMN（美容成分）を配合しておりますので、飲んだ後の美しさにもこだわりを持っています。多くの方に飲みやすいようにフレーバーや味はラムネ味となっており、飲んだ後も後味が残らない美味しくて飲みやすいサプリとなっています。" />
            </Head>
            <div className="min-h-screen bg-white relative">
                <SkyCaptainHeadbar />
                <section className="relative w-full pt-8 pb-12 px-4 md:px-8 lg:px-16">
                    <div className="max-w-[1000px] mx-auto relative">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between justify-end items-end w-full gap-[42px]">
                            <div className="text-[#5e225e] text-center md:w-fit w-full">
                                <div className="text-center">
                                    <div
                                        style={{
                                            fontFamily: 'Noto Sans JP, sans-serif',
                                            fontWeight: 400,
                                            fontStyle: 'normal',
                                            fontSize: '16px',
                                            lineHeight: '100%',
                                            letterSpacing: '0.04em',
                                        }}
                                    >
                                        明日も美しく 空を馳せる{' '}
                                        <span
                                            className="text-sm md:text-base underline -underline-offset-3 decoration-[#D4AC4C]"
                                            style={{ textDecorationThickness: 5, fontWeight: 600 }}
                                        >
                                            「お酒好きのおとも」
                                        </span>
                                    </div>
                                    <h1 className="text-[69px] md:text-[99px] font-bold leading-none mt-1 inline-block border-b-2 border-[#5e225e] pb-1" style={{ fontFamily: 'var(--font-mplus2)' }}>
                                        天空隊長
                                    </h1>
                                    <div className="text-[10px] md:text-[13px] font-normal py-1 mt-3 text-center" style={{ letterSpacing: "1.2em" }}>
                                        てんくうたいちょー
                                    </div>
                                </div>
                                <div className="space-y-8 mt-4  md:block hidden">
                                    <div className="items-center justify-center gap-3 md:gap-4">
                                        <img src="/images/天空隊長成分.png" alt="天空隊長成分" />
                                    </div>
                                    <div className="text-dark text-base md:text-lg font-normal">
                                        内容量 <span className="text-[24px]">3</span>g
                                        <span className="px-2"> / </span>
                                        MADE IN JAPAN
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col lg:gap-12 gap-[23px] relative md:w-fit w-full">
                                <div className="flex flex-col gap-2 md:gap-3 text-right md:text-[28px] text-base items-end">
                                    <div className="bg-gold px-5 py-1 w-fit">
                                        サッととける顆粒タイプ
                                    </div>
                                    <div className="bg-gold px-5 py-1 w-fit">
                                        NMN（美容成分）配合
                                    </div>
                                    <div className="bg-gold px-5 py-1 w-fit">
                                        飲みやすいラムネ味
                                    </div>
                                </div>
                                <div className="lg:hidden flex justify-end">
                                    <img src="/images/天空隊長成分-sp.png" alt="天空隊長成分-sp.png" />
                                </div>
                                <div className="flex gap-6 md:justify-end justify-center w-full">
                                    <div className="w-[120px] flex flex-col items-center justify-center gap-4">
                                        <div className="text-white text-base font-semibold text-center bg-dark rounded-full px-3 py-0.5 w-full">
                                            飲む前に！
                                        </div>
                                        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M60.0001 28.3757C61.8892 27.2674 63.3622 25.5695 64.1928 23.5429C65.0234 21.5163 65.1657 19.2731 64.5979 17.1578C64.03 15.0425 62.7834 13.1721 61.0495 11.8339C59.3155 10.4958 57.1903 9.76391 55.0001 9.75071C54.0223 9.77408 53.0534 9.94259 52.1251 10.2507C51.7655 9.14078 51.152 8.13004 50.3332 7.29887C49.5144 6.46769 48.513 5.83899 47.4086 5.46277C46.3042 5.08655 45.1273 4.97317 43.9714 5.13166C42.8155 5.29014 41.7125 5.71612 40.7501 6.37571C39.2054 4.89224 37.3355 3.79011 35.2895 3.15716C33.2435 2.52422 31.0779 2.37796 28.9654 2.73005C26.8529 3.08214 24.8518 3.92284 23.1216 5.18514C21.3915 6.44745 19.9802 8.09645 19.0001 10.0007H18.7501C16.0869 9.98821 13.5057 10.9209 11.4657 12.6328C9.42561 14.3447 8.05902 16.7249 7.60904 19.3497C7.15906 21.9746 7.65487 24.674 9.00826 26.9677C10.3616 29.2613 12.4848 31.0005 15.0001 31.8757" stroke="#231C1D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M37.5 40V65M25 40V65M50 40V65M60 32.5H65C66.9891 32.5 68.8968 33.2902 70.3033 34.6967C71.7098 36.1032 72.5 38.0109 72.5 40V55C72.5 56.9891 71.7098 58.8968 70.3033 60.3033C68.8968 61.7098 66.9891 62.5 65 62.5H60M60 27.5V73.75C60 74.7446 59.6049 75.6984 58.9016 76.4016C58.1984 77.1049 57.2446 77.5 56.25 77.5H18.75C17.7554 77.5 16.8016 77.1049 16.0983 76.4016C15.3951 75.6984 15 74.7446 15 73.75V27.5H60Z" stroke="#231C1D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M60 57.5H65C65.663 57.5 66.2989 57.2366 66.7678 56.7678C67.2366 56.2989 67.5 55.663 67.5 55V40C67.5 39.337 67.2366 38.7011 66.7678 38.2322C66.2989 37.7634 65.663 37.5 65 37.5H60" stroke="#231C1D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>

                                    </div>
                                    <div className="w-[140px] flex flex-col items-center justify-center gap-4">
                                        <div className="text-white text-base font-semibold text-center bg-dark rounded-full px-3 py-0.5 w-full">
                                            飲んだ後も！
                                        </div>
                                        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clipPath="url(#clip0_55_359)">
                                                <path d="M38.997 43.7334L45.4675 19.5852M51.0711 46.9686L57.5416 22.8205M26.923 40.4981L33.3934 16.35M15.3226 45.1544L10.4929 43.8603C8.57158 43.3455 6.93344 42.0885 5.93887 40.3658C4.94431 38.6432 4.6748 36.596 5.18962 34.6747L9.07191 20.1858C9.58673 18.2645 10.8437 16.6263 12.5664 15.6318C14.289 14.6372 16.3362 14.3677 18.2575 14.8825L23.0871 16.1766M14.0285 49.984L25.9988 5.30993C26.2563 4.34926 26.8847 3.53019 27.7461 3.03291C28.6074 2.53563 29.631 2.40087 30.5916 2.65828L66.8139 12.364C67.7745 12.6214 68.5936 13.2499 69.0909 14.1112C69.5882 14.9725 69.7229 15.9961 69.4655 16.9568L57.4951 61.6309L14.0285 49.984Z" stroke="#231C1D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M21.7955 21.0057L16.9659 19.7116C16.3254 19.54 15.6431 19.6298 15.0688 19.9614C14.4946 20.2929 14.0756 20.8389 13.904 21.4794L10.0217 35.9683C9.85014 36.6087 9.93997 37.2911 10.2715 37.8653C10.603 38.4395 11.1491 38.8585 11.7895 39.0301L16.6191 40.3242" stroke="#231C1D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M26.2217 70.6562C26.1843 70.135 26.0901 69.6208 25.9411 69.125C24.819 64.625 20.639 58.75 20.639 58.75C20.639 58.75 16.4591 64.625 15.3089 69.125C15.1599 69.6208 15.0657 70.135 15.0283 70.6562C15.0283 70.8125 15.0003 70.9687 15.0003 71.125C14.9929 71.9566 15.1331 72.7816 15.4128 73.5527C15.6925 74.3237 16.1062 75.0256 16.6302 75.618C17.1542 76.2104 17.7781 76.6816 18.466 77.0046C19.154 77.3276 19.8925 77.4959 20.639 77.5C21.3832 77.4918 22.1187 77.3205 22.8034 76.9957C23.4881 76.6709 24.1087 76.199 24.6297 75.607C25.1507 75.015 25.5619 74.3145 25.8399 73.5455C26.1179 72.7765 26.2571 71.954 26.2497 71.125C26.2497 70.9687 26.2497 70.8125 26.2217 70.6562Z" stroke="#231C1D" strokeWidth="1.25" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_55_359">
                                                    <rect width="80" height="80" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </div>
                                </div>

                                <div className="absolute top-15 left-0 md:hidden block">
                                    <img
                                        src="/images/天空隊長-sp.png"
                                        alt="天空隊長"
                                        className="w-[163px] h-[163px] object-contain relative z-10"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 items-center justify-center lg:block hidden">
                            <div className="relative">
                                <img
                                    src="/images/天空隊長.png"
                                    alt="天空隊長"
                                    className="w-[338px] h-[338px] object-contain relative z-10"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="w-full py-8 md:py-12 px-4 md:px-8 lg:px-16">
                    <div className="max-w-[1000px] mx-auto">
                        <div className="flex flex-col items-center md:flex-row justify-around gap-6 md:gap-10">
                            <div className="bg-white flex flex-col gap-4 w-fit">
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-end gap-1 ">
                                        <div className="flex flex-col items-center justify-center w-[68px] h-[60px] gap-1 border border-purple  leading-none">
                                            <div className="text-purple text-base text-center leading-none">
                                                <span className="md:text-[32px] text-center pr-1">5</span>袋
                                            </div>
                                            <div className="text-purple text-base" style={{ letterSpacing: "-16%" }}>
                                                セット
                                            </div>
                                        </div>
                                        <div className="text-dark text-[64px] lg:text-6xl leading-none font-bold">
                                            <div className='text-sm text-dark text-center font-light'>
                                                メーカー希望小売価格
                                            </div>
                                            <div>
                                                1,900
                                            </div>
                                        </div>
                                        <div className="flex flex-col justify-between gap-1">
                                            <div className="border border-dark px-[3px] py-0.5 font-noto leading-none text-[13px]">
                                                <span style={{ letterSpacing: "0.12em" }}>税込</span>
                                            </div>
                                            <div className="text-dark text-[32px] leading-none">
                                                <span style={{ letterSpacing: "-12%" }}>円</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center gap-0.5 text-white bg-gold h-9">
                                    <span className="text-[20px]">1袋あたり</span>
                                    <span className="text-[32px]">380</span>
                                    <span className="text-[20px]">円</span>
                                </div>
                                <Link href={`${toUrl(purchase())}?quantity=5`} className="inline-flex flex-row flex-nowrap items-center justify-center gap-1 bg-[#FFF8F8] border border-[#ED0000] rounded-full px-4 py-2 cursor-pointer whitespace-nowrap">
                                    <span className="text-[#ED0000] text-base">購入する</span>
                                    <span className="shrink-0"><ArrowRight color="#ED0000" /></span>
                                </Link>
                            </div>

                            <div className="bg-white flex flex-col gap-4 w-fit">
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-end gap-1 ">
                                        <div className="flex flex-col items-center justify-center w-[68px] h-[60px] gap-1 border border-purple  leading-none">
                                            <div className="text-purple text-base text-center leading-none">
                                                <span className="md:text-[32px] text-center pr-1">10</span>袋
                                            </div>
                                            <div className="text-purple text-base" style={{ letterSpacing: "-16%" }}>
                                                セット
                                            </div>
                                        </div>
                                        <div className="text-dark text-[64px] lg:text-6xl leading-none font-bold">
                                            <div className='text-sm text-dark text-center font-light'>
                                                メーカー希望小売価格
                                            </div>
                                            <div>
                                                3,800
                                            </div>
                                        </div>
                                        <div className="flex flex-col justify-between gap-1">
                                            <div className="border border-dark px-[3px] py-0.5 font-noto leading-none text-[13px]">
                                                <span style={{ letterSpacing: "0.12em" }}>税込</span>
                                            </div>
                                            <div className="text-dark text-[32px] leading-none">
                                                <span style={{ letterSpacing: "-12%" }}>円</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center gap-0.5 text-white bg-gold h-9">
                                    <span className="text-[20px]">1袋あたり</span>
                                    <span className="text-[32px]">380</span>
                                    <span className="text-[20px]">円</span>
                                </div>
                                <Link href={`${toUrl(purchase())}?quantity=10`} className="inline-flex flex-row flex-nowrap items-center justify-center gap-1 bg-[#FFF8F8] border border-[#ED0000] rounded-full px-4 py-2 cursor-pointer whitespace-nowrap">
                                    <span className="text-[#ED0000] text-base">購入する</span>
                                    <span className="shrink-0"><ArrowRight color="#ED0000" /></span>
                                </Link>
                            </div>

                            <div className="bg-white flex flex-col gap-4 w-fit">
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-end gap-1 ">
                                        <div className="flex flex-col items-center justify-center w-[68px] h-[60px] gap-1 border border-purple  leading-none">
                                            <div className="text-purple text-base text-center leading-none">
                                                <span className="md:text-[32px] text-center pr-1">20</span>袋
                                            </div>
                                            <div className="text-purple text-base" style={{ letterSpacing: "-16%" }}>
                                                セット
                                            </div>
                                        </div>
                                        <div className="text-dark text-[64px] lg:text-6xl leading-none font-bold">
                                            <div className='text-sm text-dark text-center font-light'>
                                                メーカー希望小売価格
                                            </div>
                                            <div>
                                                6,400
                                            </div>
                                        </div>
                                        <div className="flex flex-col justify-between gap-1">
                                            <div className="border border-dark px-[3px] py-0.5 font-noto leading-none text-[13px]">
                                                <span style={{ letterSpacing: "0.12em" }}>税込</span>
                                            </div>
                                            <div className="text-dark text-[32px] leading-none">
                                                <span style={{ letterSpacing: "-12%" }}>円</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center gap-0.5 text-white bg-gold h-9">
                                    <span className="text-[20px]">1袋あたり</span>
                                    <span className="text-[32px]">320</span>
                                    <span className="text-[20px]">円</span>
                                </div>
                                <Link href={`${toUrl(purchase())}?quantity=20`} className="inline-flex flex-row flex-nowrap items-center justify-center gap-1 bg-[#FFF8F8] border border-[#ED0000] rounded-full px-4 py-2 cursor-pointer whitespace-nowrap">
                                    <span className="text-[#ED0000] text-base">購入する</span>
                                    <span className="shrink-0"><ArrowRight color="#ED0000" /></span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="relative w-full md:py-20 py-8 lg:px-16 px-4 md:px-8">
                    <div
                        className="absolute inset-0 w-full h-full bg-repeat pointer-events-none z-0 opacity-50 bg-[url('/images/pattern.jpg')]"
                        aria-hidden="true"
                    />
                    <div className="max-w-[1000px] mx-auto relative z-10  shadow-[4px_4px_4px_3px_rgba(0,0,0,0.06)]">
                        <div className="md:space-y-16 space-y-8 bg-white md:py-10 py-5 md:px-[68px] px-4">
                            <div className="flex flex-col items-center gap-4 md:gap-10">
                                <div className="relative w-full flex justify-center items-center">
                                    <div
                                        className="h-[44px] md:h-[60px] lg:h-[60px] flex items-center justify-center px-2"
                                        style={{
                                            width: '100%',
                                            background: '#6D286A',
                                            clipPath: "polygon(0 100%, 96% 100%, 100% 0, 4% 0)",
                                        }}
                                    >
                                        <span className="text-white font-bold md:text-[26px] text-[18px] leading-tight md:leading-none tracking-wide text-center" style={{
                                            letterSpacing: '0.02em',
                                        }}>アミノ酸をバランスよく配合！</span>
                                    </div>
                                </div>
                                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-15 max-w-[626px]">
                                    <img
                                        src="/images/1.png"
                                        alt="アミノ酸"
                                        className="w-40 h-28 md:w-60 md:h-42 object-cover"
                                    />
                                    <div className="text-[#231C1D] text-[13px] md:text-base leading-relaxed max-w-md">
                                        お酒を飲む前にしっかりケアしたい方のために、必須アミノ酸を含む９種類のアミノ酸とNMN（美容成分）をバランスよく配合しました。しました。
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col items-center gap-4 md:gap-10">
                                <div className="relative w-full">
                                    <div
                                        className="h-[44px] md:h-[60px] lg:h-[60px] flex items-center justify-center px-2"
                                        style={{
                                            width: '100%',
                                            background: '#6D286A',
                                            clipPath: "polygon(0 100%, 96% 100%, 100% 0, 4% 0)",
                                        }}
                                    >
                                        <span className="text-white font-bold md:text-[26px] text-[18px] leading-tight md:leading-none tracking-wide text-center" style={{
                                            letterSpacing: '0.02em',
                                        }}>ラムネ風味で飲みやすい</span>
                                    </div>
                                </div>
                                <div className="flex flex-col md:flex-row-reverse items-center gap-6 md:gap-15 max-w-[575px]">
                                    <img
                                        src="/images/2.png"
                                        alt="ラムネ風味"
                                        className="w-40 h-40 md:w-60 md:h-51 object-cover"
                                    />
                                    <div className="text-[#231C1D] text-[13px] md:text-base leading-relaxed max-w-md">
                                        クセのない爽やかなラムネ風味で飲みやすく、水にサッと溶ける顆粒タイプなので気軽に飲めます。お酒の前の新習慣としておすすめです。
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col items-center gap-4 md:gap-10">
                                <div className="relative w-full">
                                    <div
                                        className="min-h-[56px] md:min-h-[60px] py-2 md:py-2.5 px-3 md:px-4 flex items-center justify-center leading-tight md:leading-none"
                                        style={{
                                            width: '100%',
                                            background: '#6D286A',
                                            clipPath: "polygon(0 100%, 96% 100%, 100% 0, 4% 0)",
                                        }}
                                    >
                                        <span className="text-white font-bold md:text-[26px] text-[16px] leading-tight md:leading-none tracking-wide text-center" style={{
                                            letterSpacing: '0.02em',
                                        }}>水無しで摂取できるので外出先や出先でも飲める！</span>
                                    </div>
                                </div>
                                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-15 max-w-[507px]">
                                    <img
                                        src="/images/3.png"
                                        alt="水無し摂取"
                                        className="w-36 h-44 md:w-43 md:h-50 object-cover"
                                    />
                                    <div className="text-[#231C1D] text-[13px] md:text-base leading-relaxed max-w-md">
                                        天空隊長は飲みやすい顆粒タイプで作られていますので、水があるとき、ないときどちらでも気軽に摂取いただけます。
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col items-center gap-4 md:gap-10">
                                <div className="relative w-full">
                                    <div
                                        className="min-h-[56px] md:min-h-[60px] py-2 md:py-2.5 px-3 md:px-4 flex items-center justify-center leading-tight md:leading-none"
                                        style={{
                                            width: '100%',
                                            background: '#6D286A',
                                            clipPath: "polygon(0 100%, 96% 100%, 100% 0, 4% 0)",
                                        }}
                                    >
                                        <span className="text-white font-bold md:text-[26px] text-[16px] leading-tight md:leading-none tracking-wide text-center" style={{
                                            letterSpacing: '0.02em',
                                        }}>美容成分（NMN）配合！お肌の調子を整えます！</span>
                                    </div>
                                </div>
                                <div className="flex flex-col md:flex-row-reverse items-center gap-6 md:gap-15 max-w-[575px]">
                                    <img
                                        src="/images/4.png"
                                        alt="NMN配合"
                                        className="w-40 h-44 md:w-60 md:h-55 object-cover"
                                    />
                                    <div className="text-[#231C1D] text-[13px] md:text-base leading-relaxed max-w-md">
                                        天空隊長は二日酔いサプリとは日本初となる美容成分のNMNを配合しています。そのため、飲み過ぎた日も少しだけお酒を飲んだ日も天空隊長を事前に摂取しておくことで、明日の美容を保つことに役立ちます。
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10 md:mt-20 mt-8">
                        <div className="flex flex-col items-center md:flex-row justify-around gap-6 md:gap-10 bg-white max-w-[1000px] mx-auto py-8 md:py-10 px-4 md:px-5  shadow-[4px_4px_4px_3px_rgba(0,0,0,0.06)]">
                            <div className="bg-white flex flex-col gap-3 md:gap-4 w-fit">
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-end gap-1">
                                        <div className="flex flex-col items-center justify-center w-[56px] h-[50px] md:w-[68px] md:h-[60px] gap-0.5 md:gap-1 border border-purple leading-none">
                                            <div className="text-purple text-sm md:text-base text-center leading-none">
                                                <span className="md:text-[32px] text-[24px] text-center pr-0.5 md:pr-1">5</span>袋
                                            </div>
                                            <div className="text-purple text-xs md:text-base" style={{ letterSpacing: "-16%" }}>
                                                セット
                                            </div>
                                        </div>
                                        <div className="text-dark text-[48px] md:text-[64px] lg:text-6xl font-semibold leading-none">
                                            <div className='text-sm text-dark text-center font-light'>
                                                メーカー希望小売価格
                                            </div>
                                            <div>
                                                1,900
                                            </div>
                                        </div>
                                        <div className="flex flex-col justify-between gap-1">
                                            <div className="border border-dark px-[2px] md:px-[3px] py-0.5 font-noto leading-none text-[11px] md:text-[13px]">
                                                <span style={{ letterSpacing: "0.12em" }}>税込</span>
                                            </div>
                                            <div className="text-dark text-[24px] md:text-[32px] leading-none">
                                                <span style={{ letterSpacing: "-12%" }}>円</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center gap-0.5 text-white bg-gold h-8 md:h-9">
                                    <span className="text-[16px] md:text-[20px]">1袋あたり</span>
                                    <span className="text-[24px] md:text-[32px]">380</span>
                                    <span className="text-[16px] md:text-[20px]">円</span>
                                </div>
                                <Link href={`${toUrl(purchase())}?quantity=5`} className="inline-flex flex-row flex-nowrap items-center justify-center gap-1 bg-[#FFF8F8] border border-[#ED0000] rounded-full px-3 py-1.5 md:px-4 md:py-2 cursor-pointer whitespace-nowrap">
                                    <span className="text-[#ED0000] text-sm md:text-base">購入する</span>
                                    <span className="shrink-0"><ArrowRight color="#ED0000" /></span>
                                </Link>
                            </div>

                            <div className="bg-white flex flex-col gap-3 md:gap-4">
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-end gap-1">
                                        <div className="flex flex-col items-center justify-center w-[56px] h-[50px] md:w-[68px] md:h-[60px] gap-0.5 md:gap-1 border border-purple leading-none">
                                            <div className="text-purple text-sm md:text-base text-center leading-none">
                                                <span className="md:text-[32px] text-[24px] text-center pr-0.5 md:pr-1">10</span>袋
                                            </div>
                                            <div className="text-purple text-xs md:text-base" style={{ letterSpacing: "-16%" }}>
                                                セット
                                            </div>
                                        </div>
                                        <div className="text-dark text-[48px] md:text-[64px] lg:text-6xl font-semibold leading-none">
                                            <div className='text-sm text-dark text-center font-light'>
                                                メーカー希望小売価格
                                            </div>
                                            <div>
                                                3,800
                                            </div>
                                        </div>
                                        <div className="flex flex-col justify-between gap-1">
                                            <div className="border border-dark px-[2px] md:px-[3px] py-0.5 font-noto leading-none text-[11px] md:text-[13px]">
                                                <span style={{ letterSpacing: "0.12em" }}>税込</span>
                                            </div>
                                            <div className="text-dark text-[24px] md:text-[32px] leading-none">
                                                <span style={{ letterSpacing: "-12%" }}>円</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center gap-0.5 text-white bg-gold h-8 md:h-9">
                                    <span className="text-[16px] md:text-[20px]">1袋あたり</span>
                                    <span className="text-[24px] md:text-[32px]">380</span>
                                    <span className="text-[16px] md:text-[20px]">円</span>
                                </div>
                                <Link href={`${toUrl(purchase())}?quantity=10`} className="inline-flex flex-row flex-nowrap items-center justify-center gap-1 bg-[#FFF8F8] border border-[#ED0000] rounded-full px-3 py-1.5 md:px-4 md:py-2 cursor-pointer whitespace-nowrap">
                                    <span className="text-[#ED0000] text-sm md:text-base">購入する</span>
                                    <span className="shrink-0"><ArrowRight color="#ED0000" /></span>
                                </Link>
                            </div>

                            <div className="bg-white flex flex-col gap-3 md:gap-4">
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-end gap-1">
                                        <div className="flex flex-col items-center justify-center w-[56px] h-[50px] md:w-[68px] md:h-[60px] gap-0.5 md:gap-1 border border-purple leading-none">
                                            <div className="text-purple text-sm md:text-base text-center leading-none">
                                                <span className="md:text-[32px] text-[24px] text-center pr-0.5 md:pr-1">20</span>袋
                                            </div>
                                            <div className="text-purple text-xs md:text-base" style={{ letterSpacing: "-16%" }}>
                                                セット
                                            </div>
                                        </div>
                                        <div className="text-dark text-[48px] md:text-[64px] lg:text-6xl font-semibold leading-none">
                                            <div className='text-sm text-dark text-center font-light'>
                                                メーカー希望小売価格
                                            </div>
                                            <div>
                                                6,400
                                            </div>
                                        </div>
                                        <div className="flex flex-col justify-between gap-1">
                                            <div className="border border-dark px-[2px] md:px-[3px] py-0.5 font-noto leading-none text-[11px] md:text-[13px]">
                                                <span style={{ letterSpacing: "0.12em" }}>税込</span>
                                            </div>
                                            <div className="text-dark text-[24px] md:text-[32px] leading-none">
                                                <span style={{ letterSpacing: "-12%" }}>円</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center gap-0.5 text-white bg-gold h-8 md:h-9">
                                    <span className="text-[16px] md:text-[20px]">1袋あたり</span>
                                    <span className="text-[24px] md:text-[32px]">320</span>
                                    <span className="text-[16px] md:text-[20px]">円</span>
                                </div>
                                <Link href={`${toUrl(purchase())}?quantity=20`} className="inline-flex flex-row flex-nowrap items-center justify-center gap-1 bg-[#FFF8F8] border border-[#ED0000] rounded-full px-3 py-1.5 md:px-4 md:py-2 cursor-pointer whitespace-nowrap">
                                    <span className="text-[#ED0000] text-sm md:text-base">購入する</span>
                                    <span className="shrink-0"><ArrowRight color="#ED0000" /></span>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10 md:mt-20 mt-8">
                        <div className="mx-auto max-w-[1000px] bg-purple  shadow-[4px_4px_4px_3px_rgba(0,0,0,0.06)]">
                            <div className="py-4 md:py-5 mx-4 md:mx-[68px]">
                                <div className="text-gold md:text-[26px] text-[18px] font-bold text-center py-2.5 md:py-3 md:px-4 px-2 border-gold border-t border-b-4">
                                    天空隊長はこうして生まれた！
                                </div>
                            </div>

                            <div className="relative bg-dark md:min-h-[514px] min-h-[400px] overflow-hidden mb-6 md:mb-8">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <img
                                        src="/images/mask-group.png"
                                        alt="天空隊長"
                                        className="w-[400px] h-[430px] md:w-[589px] md:h-[589px] object-cover"
                                    />
                                </div>

                                <div className="relative z-10 flex items-center justify-center md:min-h-[514px] min-h-[400px] p-4 md:p-8">
                                    <div className="flex flex-col-reverse items-center gap-3 md:gap-[15px] leading-[0.8] text-dark [writing-mode:vertical-rl] text-base md:text-xl font-noto ">
                                        <div>毎日を楽しむ人の強い味方です。</div>
                                        <div>納得のいく形でようやく完成。</div>
                                        <div>複数の試作を重ね、成分・味ともに</div>
                                        <div>という一言から生まれた本商品。</div>
                                        <div className="relative inline-block text-center font-bold">
                                            <span className="relative z-10">「翌日をラクに過ごしたい」</span>
                                            <span
                                                className="absolute top-0 bottom-0 -right-0.5 md:w-5 w-4 bg-gold pointer-events-none"
                                                aria-hidden
                                            />
                                        </div>
                                        <div>お酒の場が多い方の</div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="relative z-10 md:mt-20 mt-8">
                        <div className="mx-auto max-w-[1000px] bg-white py-8 md:py-10 px-4 md:px-5 shadow-[4px_4px_4px_3px_rgba(0,0,0,0.06)]">
                            <div className="flex flex-col items-center gap-6 md:gap-10">
                                <h2 className="text-[#682E53] text-[24px] md:text-[32px] font-mplus2 font-semibold text-center">
                                    「天空隊長」
                                </h2>
                                <div className="flex flex-col md:flex-row items-start gap-6 md:gap-20 w-full max-w-[481px]">
                                    <div className="text-[#682E53] text-sm md:text-base font-normal whitespace-nowrap">
                                        原材料
                                    </div>
                                    <div className="text-[#682E53] text-sm md:text-base font-normal leading-relaxed flex-1">
                                        マルトース（国内製造）、マルチトール、L-オルニチン塩酸塩、L-シトルリン、β-ニコチンアミド･モノヌクレオチド、酢酸菌エキス末（大豆･かにを含む）、酵母エキス末／香料、クエン酸、L-アラニン、L-グルタミン、L-アルギニン、L-ロイシン、L-バリン、L-イソロイシン、L-シスチン、ビタミンC、ナイアシン、甘味料（ステビア）、パントテン酸カルシウム、ビタミンB1、ビタミンB6、ビタミンB2、ビタミンB12
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="w-full py-12 md:py-20 px-4 md:px-8 lg:px-16 bg-white">
                    <div className="max-w-[1000px] mx-auto">
                        <div className="flex flex-col items-center gap-4 md:gap-[25px]">
                            <h2 className="text-purple md:text-[26px] text-[18px] font-normal text-center">
                                お問い合わせ
                            </h2>
                            <div className="flex flex-col items-center gap-2 md:gap-2.5">
                                <div className="text-[#1F1F1F] text-[11px] md:text-xs text-center" style={{ letterSpacing: "0.05em" }}>
                                    営業時間：9:00~18:00 定休日：土日
                                </div>
                                <a href="mailto:support@genee.jp" className="flex items-center justify-center gap-1 bg-gold px-3 py-2 hover:opacity-90 cursor-pointer">
                                    <div className="text-white text-sm md:text-base font-normal">
                                        お問い合わせはこちらから
                                    </div>
                                    <ArrowRight color="white" />
                                </a>
                            </div>
                            <div className="flex flex-col items-center gap-2 md:gap-3 mt-4 md:mt-6">
                                <div className="text-[#1F1F1F] text-xs md:text-sm text-center">
                                    販売会社：株式会社GeNEEメディカルケア
                                </div>
                                <div className="text-[#1F1F1F] text-xs md:text-sm text-center">
                                    住所：東京都港区六本木1-4-5森ビルアークヒルズサウスタワー
                                </div>
                                <div className="text-[#1F1F1F] text-xs md:text-sm text-center">
                                    お問い合わせ先：03-4500-8258
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
