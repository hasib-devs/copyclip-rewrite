"use client";

import { useEffect, useState } from "react";

export default function SplashScreen() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => {
                if (prevProgress >= 100) {
                    clearInterval(timer);
                    return 100;
                }
                return prevProgress + 10;
            });
        }, 200);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div className="flex flex-col h-[620px] w-[400px] bg-zinc-50 rounded-lg overflow-hidden border border-zinc-200 shadow-lg items-center justify-center">
            <div className="flex flex-col items-center">
                {/* App Logo */}
                <div className="w-24 h-24 mb-6">
                    {/* Using the provided app icon */}
                    <img
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/app-icon-CxDWu6HSLFsSScnkZt6rVJSWB1i2kC.png"
                        alt="Clipboard Manager"
                        className="w-full h-full object-contain"
                    />
                </div>

                <h1 className="text-2xl font-bold text-zinc-800 mb-2">Clipboard Manager</h1>
                <p className="text-zinc-500 mb-6">Your clipboard, organized</p>

                {/* Loading bar */}
                <div className="w-48 h-1.5 bg-zinc-200 rounded-full overflow-hidden">
                    <div className="h-full bg-zinc-800 transition-all duration-200 ease-out" style={{ width: `${progress}%` }} />
                </div>
            </div>
        </div>
    );
}
