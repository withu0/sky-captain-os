type Props = {
    children: React.ReactNode;
};

export function SkyCaptainAuthCard({ children }: Props) {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <div className="w-full max-w-md border border-[#B8D4E8] rounded-lg bg-white p-8 shadow-sm">
                <div className="text-center mb-8">
                    <h1
                        className="text-purple text-2xl font-bold mb-1"
                        style={{ fontFamily: 'var(--font-mplus2)' }}
                    >
                        天空隊長
                    </h1>
                    <p className="text-purple text-sm border-b border-purple pb-0.5 w-fit mx-auto">
                        てんくうたいちょう
                    </p>
                </div>
                {children}
            </div>
        </div>
    );
}
