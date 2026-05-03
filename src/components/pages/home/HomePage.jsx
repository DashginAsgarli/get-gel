import React, { useState, useEffect, useRef } from 'react'
import 'leaflet/dist/leaflet.css';
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../../context/AppContext'
import { rideTypes, tripHistory } from '../../../data/mockData'
import { FiMapPin, FiX, FiPlus, FiChevronRight, FiDollarSign, FiCheck, FiPhone } from 'react-icons/fi'
import { FaCar, FaRocket, FaUsers, FaLeaf, FaUtensils, FaShoppingBasket, FaMotorcycle, FaCalendarAlt, FaUserTie, FaPaperPlane, FaCreditCard, FaMoneyBillWave } from 'react-icons/fa'

let L = null

const SERVICE_CARDS = [
    { icon: FaCar, label: 'Avtomobil Səfəri', sub: 'Səfərə başla', action: 'search', promo: true, bg: '#dbeafe' },
    { icon: FaUtensils, label: 'GetGəl Restoran', sub: 'Sürətli çatdırılma', action: 'food', promo: true, bg: '#ffe4e6' },
]

const VIEWS = { home: 'home', search: 'search', rides: 'rides', driverPrefs: 'driverPrefs', booking: 'booking', driverFound: 'driverFound' }

function HomePage() {
    const { showToast, darkMode } = useApp()
    const navigate = useNavigate()
    const mapRef = useRef(null)
    const mapInstance = useRef(null)

    const [view, setView] = useState(VIEWS.home)
    const [sheetOpen, setSheetOpen] = useState(false)
    const [pickup, setPickup] = useState('')
    const [dest, setDest] = useState('')
    const [extraStops, setExtraStops] = useState([])
    const [selectedRide, setSelectedRide] = useState(null)
    const [rideOptions, setRideOptions] = useState([])
    const [driverOpt, setDriverOpt] = useState('multi')
    const [payMethod, setPayMethod] = useState('cash')
    const [promoCode, setPromoCode] = useState('')
    const [driverFound, setDriverFound] = useState(null)

    useEffect(() => {
        import('leaflet').then(mod => {
            L = mod.default
            if (mapRef.current && !mapInstance.current) {
                mapInstance.current = L.map(mapRef.current, { zoomControl: false }).setView([40.4093, 49.8671], 14)
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '© OpenStreetMap'
                }).addTo(mapInstance.current)
                L.marker([40.4093, 49.8671]).addTo(mapInstance.current).bindPopup('Mənim yerim').openPopup()
            }
        })
        return () => {
            if (mapInstance.current) { mapInstance.current.remove(); mapInstance.current = null }
        }
    }, [])

    function handleServiceClick(action) {
        if (action === 'search') { setView(VIEWS.search); setSheetOpen(true) }
        else if (action === 'food') navigate('/food')
    }

    function handleShowRides() {
        if (!pickup || !dest) { showToast('Ünvanları daxil edin!', 'error'); return }
        const km = (Math.random() * 10 + 2).toFixed(1)
        const options = Object.entries(rideTypes).map(([name, info]) => ({
            name, ...info,
            price: (info.base + info.perKm * km).toFixed(2),
            km
        }))
        setRideOptions(options)
        setView(VIEWS.rides)
    }

    function handleBookRide() {
        if (!selectedRide) return
        setView(VIEWS.driverPrefs)
    }

    function handleConfirm() {
        setView(VIEWS.booking)
        showToast('Sürücü axtarılır...', 'info')
        setTimeout(() => {
            setDriverFound({
                name: 'Elvin Məmmədov', rating: '4.9',
                car: 'Toyota Prius (Gümüşü)', plate: '77-AB-101', phone: '+994501234567'
            })
            setView(VIEWS.driverFound)
            showToast('Sürücü tapıldı!', 'success')
        }, 4000)
    }

    function addStop() {
        setExtraStops(prev => [...prev, ''])
    }

    function applyPromo() {
        if (promoCode.trim()) showToast(`Promo kod tətbiq edildi: ${promoCode}`, 'success')
        else showToast('Promo kodu daxil edin', 'error')
    }

    const dm = darkMode
    const sheetBg = dm ? 'bg-slate-900 text-white' : 'bg-white text-gray-800'

    return (
        <div className="h-screen w-full relative overflow-hidden pt-16">
            <div ref={mapRef} id="map" className="absolute inset-0 top-16" />

            <div className={`sheet-panel ${sheetBg} ${sheetOpen ? 'open' : ''}`}>
                <div className="handle-bar" onClick={() => setSheetOpen(!sheetOpen)} />

                {view === VIEWS.home && (
                    <div className="px-5 pb-6 fade-in">
                        <div className="flex items-center justify-between p-4 rounded-2xl border mb-5" style={{ background: '#eff6ff', borderColor: '#bfdbfe' }}>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white" style={{ background: '#3b82f6' }}>
                                    <FiDollarSign />
                                </div>
                                <div>
                                    <p className="font-bold text-sm text-gray-800">5 sürüşdə %20 endirim</p>
                                    <p className="text-xs text-blue-600">Detalları göstər</p>
                                </div>
                            </div>
                            <FiX className="text-gray-400" />
                        </div>

                        <h2 className={`text-2xl font-bold mb-4 ${dm ? 'text-white' : 'text-gray-800'}`}>Səfərləriniz burdan başlıyır.</h2>

                        <div className="service-grid">
                            {SERVICE_CARDS.map((card, i) => (
                                <div key={i} onClick={() => handleServiceClick(card.action)} className="service-card" style={{ background: dm ? '#1e293b' : card.bg }}>
                                    {card.promo && <span className="promo-badge">PROMO</span>}
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-2 text-2xl" style={{ background: card.bg }}>
                                        <card.icon style={{ color: '#1A4162' }} />
                                    </div>
                                    <h4 className={`text-xs font-bold leading-tight ${dm ? 'text-white' : 'text-gray-800'}`}>{card.label}</h4>
                                    <p className="text-[10px] text-gray-500 mt-0.5">{card.sub}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-2">
                            <p className="text-xs font-bold text-gray-500 mb-3">Son səfərlər</p>
                            <div className="space-y-2 max-h-48 overflow-y-auto">
                                {tripHistory.map(trip => (
                                    <div key={trip.id} onClick={() => { setPickup(trip.pickup); setDest(trip.dest); setView(VIEWS.search); setSheetOpen(true) }}
                                        className={`flex justify-between items-center p-3 rounded-xl cursor-pointer transition ${dm ? 'bg-slate-800 hover:bg-slate-700' : 'bg-gray-50 hover:bg-gray-100'}`}>
                                        <div>
                                            <p className={`font-semibold text-sm ${dm ? 'text-white' : 'text-gray-800'}`}>{trip.dest}</p>
                                            <p className="text-xs text-gray-400">{trip.pickup}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-sm" style={{ color: '#1A4162' }}>₼{trip.price}</p>
                                            <p className="text-[10px] text-gray-400">{trip.date}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {view === VIEWS.search && (
                    <div className="px-5 pb-6 fade-in">
                        <button onClick={() => setView(VIEWS.home)} className="text-sm text-gray-500 mb-4">← Geri</button>

                        <div className="flex gap-3 mb-3 items-center">
                            <div className="w-1.5 h-10 bg-green-500 rounded-full" />
                            <input className="input-field" type="text" placeholder="Haradasınız?" value={pickup} onChange={e => setPickup(e.target.value)} />
                        </div>

                        <div className="flex gap-3 mb-3 items-center">
                            <div className="w-1.5 h-10 bg-red-500 rounded-full" />
                            <input className="input-field flex-1" type="text" placeholder="Haraya?" value={dest} onChange={e => setDest(e.target.value)} />
                            <button onClick={addStop} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition">
                                <FiPlus />
                            </button>
                        </div>

                        {extraStops.map((stop, i) => (
                            <div key={i} className="flex gap-3 mb-3 items-center fade-in">
                                <div className="w-1.5 h-10 bg-yellow-400 rounded-full" />
                                <input className="input-field flex-1" type="text" placeholder="Əlavə dayanacaq" value={stop}
                                    onChange={e => setExtraStops(prev => prev.map((s, j) => j === i ? e.target.value : s))} />
                                <button onClick={() => setExtraStops(prev => prev.filter((_, j) => j !== i))}
                                    className="w-10 h-10 rounded-full flex items-center justify-center text-red-400 hover:bg-red-50 transition">
                                    <FiX />
                                </button>
                            </div>
                        ))}

                        <div className="flex gap-2 mb-4">
                            <input className="input-field flex-1" type="text" placeholder="Promo kod" value={promoCode} onChange={e => setPromoCode(e.target.value)} />
                            <button onClick={applyPromo} className="px-4 py-2 rounded-xl font-semibold text-sm whitespace-nowrap" style={{ background: '#1A4162', color: 'white' }}>
                                Tətbiq et
                            </button>
                        </div>

                        <div onClick={() => setPayMethod(p => p === 'cash' ? 'card' : 'cash')}
                            className={`flex items-center justify-between p-3 rounded-xl border mb-4 cursor-pointer transition ${dm ? 'bg-slate-800 border-slate-700' : 'bg-gray-50 border-gray-100'}`}>
                            <div className="flex items-center gap-2">
                                {payMethod === 'cash' ? <FaMoneyBillWave className="text-green-500" /> : <FaCreditCard style={{ color: '#1A4162' }} />}
                                <span className="font-medium text-sm">{payMethod === 'cash' ? 'Nağd ödəniş' : 'Kart ödəniş'}</span>
                            </div>
                            <FiChevronRight className="text-gray-400 text-xs" />
                        </div>

                        <button onClick={handleShowRides} className="w-full py-4 rounded-xl text-white font-bold transition" style={{ background: '#1A4162' }}>
                            Davam et
                        </button>
                    </div>
                )}

                {view === VIEWS.rides && (
                    <div className="px-5 pb-6 fade-in">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className={`font-bold text-xl ${dm ? 'text-white' : 'text-gray-800'}`}>Sürüş seçin</h2>
                            <button onClick={() => setView(VIEWS.search)} className="text-sm text-gray-500">Geri</button>
                        </div>
                        <div className="space-y-3 mb-4">
                            {rideOptions.map(r => (
                                <div key={r.name} onClick={() => setSelectedRide(r)}
                                    className={`ride-option p-4 border-2 rounded-xl flex justify-between items-center ${dm ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'} ${selectedRide?.name === r.name ? 'selected' : ''}`}>
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${dm ? 'bg-slate-700' : 'bg-gray-100'}`}>
                                            {r.name === 'GetGəl' && <FaCar style={{ color: '#1A4162' }} />}
                                            {r.name === 'Priority' && <FaRocket className="text-orange-500" />}
                                            {r.name === 'XL' && <FaUsers className="text-purple-500" />}
                                            {r.name === 'Eco' && <FaLeaf className="text-green-500" />}
                                        </div>
                                        <div>
                                            <p className={`font-bold text-sm ${dm ? 'text-white' : 'text-gray-800'}`}>{r.name}</p>
                                            <p className="text-xs text-gray-400">{r.km} km • {r.eta} dəq</p>
                                        </div>
                                    </div>
                                    <div className={`font-bold text-lg ${dm ? 'text-white' : 'text-gray-800'}`}>₼{r.price}</div>
                                </div>
                            ))}
                        </div>
                        <button onClick={handleBookRide} disabled={!selectedRide}
                            className="w-full py-4 rounded-xl font-bold text-sm transition"
                            style={{ background: selectedRide ? '#1A4162' : '#e2e8f0', color: selectedRide ? 'white' : '#94a3b8' }}>
                            {selectedRide ? `${selectedRide.name} Sifariş Et` : 'Sürüş seçin'}
                        </button>
                    </div>
                )}

                {view === VIEWS.driverPrefs && (
                    <div className="px-5 pb-6 fade-in">
                        <h2 className={`font-bold text-xl mb-5 ${dm ? 'text-white' : 'text-gray-800'}`}>Sürücü Seçimləri</h2>
                        <div className="space-y-3 mb-6">
                            {[
                                { val: 'multi', title: 'Sifarişləri qəbul etsin', sub: 'Yolüstü başqa işlər götürə bilər' },
                                { val: 'single', title: 'Sadece mənimlə ilgilensin', sub: 'Sürücü başqa sifariş qəbul etməz' }
                            ].map(opt => (
                                <div key={opt.val} onClick={() => setDriverOpt(opt.val)}
                                    className={`p-4 border-2 rounded-xl cursor-pointer transition ${driverOpt === opt.val ? 'border-[#1A4162] bg-blue-50' : (dm ? 'border-slate-700 bg-slate-800' : 'border-gray-200 bg-white')}`}>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className={`font-bold text-sm ${dm ? 'text-white' : 'text-gray-800'}`}>{opt.title}</p>
                                            <p className="text-xs text-gray-400 mt-0.5">{opt.sub}</p>
                                        </div>
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${driverOpt === opt.val ? 'border-[#1A4162] bg-[#1A4162]' : 'border-gray-300'}`}>
                                            {driverOpt === opt.val && <FiCheck className="text-white" size={12} />}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button onClick={handleConfirm} className="w-full py-4 rounded-xl text-white font-bold" style={{ background: '#1A4162' }}>
                            Sifarişi Təsdiqlə
                        </button>
                    </div>
                )}

                {view === VIEWS.booking && (
                    <div className="px-5 pb-6 text-center py-10 fade-in">
                        <div className="relative flex justify-center mb-6">
                            <div className="pulse-ring w-16 h-16" />
                            <div className="w-16 h-16 rounded-full flex items-center justify-center relative z-10" style={{ background: '#1A4162' }}>
                                <FaCar className="text-white text-2xl" />
                            </div>
                        </div>
                        <h2 className={`font-bold text-xl ${dm ? 'text-white' : 'text-gray-800'}`}>Sürücü axtarılır...</h2>
                        <p className="text-gray-500 mt-1">Təxminən 2 dəqiqəyə tapılacaq</p>
                        <button onClick={() => { setView(VIEWS.home); setSheetOpen(false) }} className="mt-6 text-red-500 font-semibold text-sm">Ləğv et</button>
                    </div>
                )}

                {view === VIEWS.driverFound && driverFound && (
                    <div className="px-5 pb-6 fade-in">
                        <div className={`p-5 rounded-2xl border-t-4 mb-4 ${dm ? 'bg-slate-800' : 'bg-white shadow-lg'}`} style={{ borderColor: '#1A4162' }}>
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-2xl text-gray-500">
                                        <FaUserTie />
                                    </div>
                                    <div>
                                        <p className={`font-bold text-lg ${dm ? 'text-white' : 'text-gray-800'}`}>{driverFound.name}</p>
                                        <p className="text-sm font-semibold text-yellow-500">⭐ {driverFound.rating}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className={`font-bold ${dm ? 'text-white' : 'text-gray-800'}`}>{driverFound.plate}</p>
                                    <p className="text-xs text-gray-400">{driverFound.car}</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <a href={`tel:${driverFound.phone}`} className="flex-1 py-3 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2" style={{ background: '#1A4162' }}>
                                    <FiPhone /> Zəng et
                                </a>
                                <button onClick={() => showToast('Mesaj bölməsi tezliklə...', 'info')}
                                    className="w-14 py-3 rounded-xl bg-gray-100 text-gray-600 flex items-center justify-center">
                                    💬
                                </button>
                            </div>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-xl text-xs text-blue-700 flex items-center gap-2">
                            ℹ️ Sürücü marşrut üzrə sizə yaxınlaşır
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
export default HomePage