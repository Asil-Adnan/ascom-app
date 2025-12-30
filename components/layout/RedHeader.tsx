import Image from 'next/image';


export function RedHeader() {
    return (
        <div className="w-full h-24 bg-gradient-to-r from-red-600 to-red-500 shadow-xl relative flex items-center justify-center rounded-b-[3rem] z-40 ml-[-1px]">
            <div className="relative w-56 h-16 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20 flex items-center justify-center px-4">
                <Image
                    src="/brand/logo-white.png"
                    alt="AllSupport"
                    width={200}
                    height={50}
                    className="object-contain"
                    priority
                />
            </div>
        </div>
    );
}

