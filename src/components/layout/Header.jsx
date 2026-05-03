import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { FiMoon, FiSun, FiArrowLeft, FiUser } from 'react-icons/fi'

function Header({ onMenuOpen }) {
    const { user, darkMode, setDarkMode } = useApp()
    const navigate = useNavigate()
    const location = useLocation()

    const isHome = location.pathname === '/'
    const titles = {
        '/food': 'GetGəl Gıda',
        '/market': 'GetGəl Pazarı',
        '/trips': 'Yolculuqlarım',
        '/profile': 'Hesabım',
        '/login': 'Daxil ol',
        '/register': 'Qeydiyyat',
    }
    const title = titles[location.pathname]

    return (
        <header className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-4 shadow-md" style={{ background: '#1A4162' }}>
            <div className="flex items-center gap-3">
                {!isHome ? (
                    <button onClick={() => navigate(-1)} className="text-white p-1.5 rounded-full hover:bg-white/20 transition">
                        <FiArrowLeft size={20} />
                    </button>
                ) : (
                    <button onClick={onMenuOpen} className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center font-bold text-[#1A4162] text-lg">
                            {user ? user.name[0].toUpperCase() : 'G'}
                        </div>
                    </button>
                )}
                <div className="flex items-center gap-2">
                    <span className="text-white font-bold text-xl tracking-tight">
                        {title || <><span className="text-white">Get</span><span className="text-sky-300">Gəl</span></>}
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-2">

                {!user && isHome && (
                    <button onClick={() => navigate('/login')} className="p-2 rounded-full bg-white/15 text-white hover:bg-white/25 transition">
                        <FiUser size={18} />
                    </button>
                )}
            </div>
        </header>
    )
}
export default Header