import React, { useEffect, useState } from 'react'

function SplashScreen({ onDone }) {
    const [progress, setProgress] = useState(0)
    const [exiting, setExiting] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setProgress(100)
        }, 100)
        const exit = setTimeout(() => {
            setExiting(true)
            setTimeout(onDone, 800)
        }, 2000)
        return () => { clearTimeout(timer); clearTimeout(exit) }
    }, [])

    return (
        <div className={`fixed inset-0 z-10000 flex items-center justify-center flex-col bg-[#0f172a] ${exiting ? 'splash-exit' : ''}`}>
            <div className="text-center fade-in">
                <div className="text-6xl font-extrabold text-white mb-2 tracking-tight">
                    Get<span className="text-sky-400">Gəl</span>
                </div>
            </div>
            <div className="w-48 h-1 bg-white/10 rounded-full mt-12 overflow-hidden">
                <div className="h-full bg-sky-400 rounded-full transition-all duration-1800 ease-linear" style={{ width: `${progress}%` }} />
            </div>
        </div>
    )
}
export default SplashScreen