import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { FiCreditCard, FiTag, FiStar, FiClock, FiShield, FiFileText, FiHelpCircle, FiInfo, FiX, FiUser, FiLogOut, FiShoppingBag, FiShoppingCart } from 'react-icons/fi'

function Sidebar({ open, onClose }) {
    const { user, logout, darkMode } = useApp()
    const navigate = useNavigate()

    function go(path) {
        navigate(path)
        onClose()
    }

    const menuItems = [
        { icon: FiCreditCard, label: 'Ödəniş', path: '/profile?tab=payment' },
        { icon: FiTag, label: 'Promosiyalar', sub: 'Promokodu daxil edin', badge: 'YENİ', path: '/profile?tab=promos' },
        { icon: FiStar, label: 'Abunəliklər', path: '/profile?tab=subs' },
        { icon: FiClock, label: 'Səfərlərim', path: '/trips' },
        { icon: FiShield, label: 'Təhlükəsizlik', path: '/profile?tab=security' },
        { icon: FiHelpCircle, label: 'Dəstək', path: '/profile?tab=support' },
        { icon: FiInfo, label: 'Haqqında', path: '/profile?tab=about' },
    ]

    return (
        <>
            <div className={`fixed inset-0 z-1999 bg-black transition-opacity duration-300 ${open ? 'opacity-50' : 'opacity-0 pointer-events-none'}`} onClick={onClose} />

            <div className={`fixed left-0 top-0 h-full w-80 z-2000 transform transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'} ${darkMode ? 'bg-slate-900 text-white' : 'bg-white'} shadow-2xl flex flex-col`}>
                <div className="gradient-brand p-6 pb-5">
                    <button onClick={onClose} className="absolute top-4 right-4 text-white/70 hover:text-white">
                        <FiX size={20} />
                    </button>
                    <div className="flex items-center gap-3 mt-2">
                        <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-2xl text-white border-2 border-white/30">
                            <FiUser />
                        </div>
                        <div>
                            <h2 className="font-bold text-xl text-white">{user?.name || 'Qonaq'}</h2>
                            <p className="text-white/70 text-sm">{user?.phone || 'Hesabım'}</p>
                        </div>
                    </div>
                    {user && (
                        <div className="flex items-center gap-2 mt-3">
                            <span className="text-yellow-300 text-lg">★</span>
                            <span className="text-white font-semibold text-sm">5.00 Dəyərləndirmə</span>
                        </div>
                    )}
                </div>

                <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                    {menuItems.map((item, i) => (
                        <button key={i} onClick={() => go(item.path)} className="menu-item w-full text-left">
                            <item.icon size={18} />
                            <div className="flex-1">
                                <p className="font-medium text-sm">{item.label}</p>
                                {item.sub && <p className="text-xs text-gray-400">{item.sub}</p>}
                            </div>
                            {item.badge && (
                                <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{item.badge}</span>
                            )}
                        </button>
                    ))}
                </nav>

                <div className={`p-4 border-t ${darkMode ? 'border-slate-700' : 'border-gray-100'} space-y-1`}>
                    <button onClick={() => go('/food')} className="menu-item w-full text-left">
                        <FiShoppingBag size={18} />
                        <span className="font-medium text-sm">GetGəl Restoran</span>
                    </button>
                    <button onClick={() => go('/market')} className="menu-item w-full text-left">
                        <FiShoppingCart size={18} />
                        <span className="font-medium text-sm">GetGəl Market</span>
                    </button>
                    {user ? (
                        <button onClick={() => { logout(); onClose() }} className="menu-item w-full text-left text-red-500">
                            <FiLogOut size={18} className="text-red-500" />
                            <span className="font-medium text-sm text-red-500">Çıxış</span>
                        </button>
                    ) : (
                        <button onClick={() => go('/login')} className="w-full mt-2 py-3 rounded-xl bg-[#1A4162] text-white font-bold text-sm">
                            Daxil ol / Qeydiyyat
                        </button>
                    )}
                </div>
            </div>
        </>
    )
}

export default Sidebar