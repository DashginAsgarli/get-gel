import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../../context/AppContext'
import { tripHistory } from '../../../data/mockData'
import { FiMapPin, FiCalendar, FiRepeat } from 'react-icons/fi'
import { FaCar, FaRocket, FaLeaf, FaUsers } from 'react-icons/fa'

const typeIcons = {
    GetGəl: FaCar, Priority: FaRocket, Eco: FaLeaf, XL: FaUsers
}
const typeColors = {
    GetGəl: '#1A4162', Priority: '#f97316', Eco: '#10b981', XL: '#8b5cf6'
}

function TripsPage() {
    const { user, darkMode } = useApp()
    const navigate = useNavigate()
    const dm = darkMode

    if (!user) {
        return (
            <div className={`min-h-screen pt-20 flex flex-col items-center justify-center px-6 text-center ${dm ? 'bg-slate-900' : 'bg-gray-50'}`}>
                <div className="text-5xl mb-4">🚗</div>
                <h2 className={`text-xl font-bold mb-2 ${dm ? 'text-white' : 'text-gray-800'}`}>Giriş tələb olunur</h2>
                <p className="text-gray-500 text-sm mb-6">Gedişlərini görmək üçün daxil olun</p>
                <button onClick={() => navigate('/login')} className="px-8 py-3 rounded-xl text-white font-bold" style={{ background: '#1A4162' }}>
                    Daxil ol
                </button>
            </div>
        )
    }

    const total = tripHistory.reduce((sum, t) => sum + parseFloat(t.price), 0)

    return (
        <div className={`min-h-screen pt-16 ${dm ? 'bg-slate-900' : 'bg-gray-50'}`}>
            <div className="mx-4 mt-4 mb-4 p-5 rounded-2xl text-white gradient-brand">
                <p className="text-white/70 text-sm mb-1">Ümumi xərc</p>
                <h2 className="text-3xl font-extrabold">₼{total.toFixed(2)}</h2>
                <p className="text-white/70 text-sm mt-1">{tripHistory.length} gediş</p>
            </div>

            <div className="px-4 space-y-3 pb-24">
                <p className={`text-sm font-bold mb-2 ${dm ? 'text-gray-400' : 'text-gray-500'}`}>Tarix üzrə</p>
                {tripHistory.map(trip => {
                    const Icon = typeIcons[trip.type] || FaCar
                    const color = typeColors[trip.type] || '#1A4162'
                    return (
                        <div key={trip.id} className={`p-4 rounded-2xl ${dm ? 'bg-slate-800' : 'bg-white'} shadow-sm`}>
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: color + '20' }}>
                                    <Icon style={{ color }} size={18} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className={`font-bold text-sm ${dm ? 'text-white' : 'text-gray-800'}`}>{trip.dest}</p>
                                            <p className="text-xs text-gray-400 mt-0.5">{trip.pickup}</p>
                                        </div>
                                        <span className="font-bold text-base" style={{ color }}>₼{trip.price}</span>
                                    </div>
                                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                                        <span className="flex items-center gap-1"><FiCalendar size={11} /> {trip.date}</span>
                                        <span>·</span>
                                        <span>{trip.type}</span>
                                    </div>
                                </div>
                            </div>
                            <button className="w-full mt-3 py-2 rounded-xl text-sm font-semibold border flex items-center justify-center gap-2 transition"
                                style={{ borderColor: color, color }}
                                onClick={() => { }}>
                                <FiRepeat size={14} /> Təkrarla
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default TripsPage