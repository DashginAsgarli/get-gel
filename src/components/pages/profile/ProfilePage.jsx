import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useApp } from '../../../context/AppContext'
import { promos } from '../../../data/mockData'
import { FiCreditCard, FiTag, FiStar, FiShield, FiHelpCircle, FiInfo, FiCheck, FiUser, FiLogOut, FiPlus, FiX, FiTrash2, FiPhone, FiMail } from 'react-icons/fi'
import { FaMoneyBillWave } from 'react-icons/fa'

const TABS = [
    { id: 'payment', label: 'Ödəniş', icon: FiCreditCard },
    { id: 'promos', label: 'Promosiyalar', icon: FiTag },
    { id: 'subs', label: 'Abunəliklər', icon: FiStar },
    { id: 'security', label: 'Təhlükəsizlik', icon: FiShield },
    { id: 'support', label: 'Dəstək', icon: FiHelpCircle },
    { id: 'about', label: 'Haqqında', icon: FiInfo },
]

function ProfilePage() {
    const { user, logout, darkMode, showToast } = useApp()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const dm = darkMode

    const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'payment')
    const [promoInput, setPromoInput] = useState('')
    const [appliedPromos, setAppliedPromos] = useState([])
    const [selectedPlan, setSelectedPlan] = useState('GetGəl Basic')
    const [is2FAActive, setIs2FAActive] = useState(false)

    const [showCardModal, setShowCardModal] = useState(false)
    const [showPassModal, setShowPassModal] = useState(false)
    const [newCardData, setNewCardData] = useState({ number: '', cvv: '', expiry: '', label: '' })
    const [passData, setPassData] = useState({ old: '', new: '' })

    const [paymentMethods, setPaymentMethods] = useState([
        { id: 1, Icon: FaMoneyBillWave, label: 'Nağd ödəniş', sub: 'Standart', active: true, color: '#10b981', deletable: false },
        { id: 2, Icon: FiCreditCard, label: 'Kapital Bank', sub: '**** 4242', active: false, color: '#1A4162', deletable: true },
    ])

    if (!user) {
        return (
            <div className={`min-h-screen pt-20 flex flex-col items-center justify-center px-6 text-center ${dm ? 'bg-slate-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
                <FiUser size={60} className="text-gray-300 mb-4" />
                <h2 className="text-xl font-bold mb-2">Giriş tələb olunur</h2>
                <button onClick={() => navigate('/login')} className="px-8 py-3 rounded-xl text-white font-bold bg-[#1A4162]">Daxil ol</button>
            </div>
        )
    }

    const handlePaymentSelect = (id) => {
        setPaymentMethods(prev => prev.map(m => ({ ...m, active: m.id === id })))
        showToast('Ödəniş üsulu seçildi', 'success')
    }

    const handleAddCardSubmit = (e) => {
        e.preventDefault()
        if (newCardData.number.length < 16) { showToast('Kart nömrəsi tam deyil', 'error'); return }

        const card = {
            id: Date.now(),
            Icon: FiCreditCard,
            label: newCardData.label || 'Yeni Kart',
            sub: `**** ${newCardData.number.slice(-4)}`,
            active: false,
            color: '#4f46e5',
            deletable: true
        }
        setPaymentMethods([...paymentMethods, card])
        setShowCardModal(false)
        setNewCardData({ number: '', cvv: '', expiry: '', label: '' })
        showToast('Kart əlavə olundu', 'success')
    }

    const removeCard = (id, e) => {
        e.stopPropagation()
        setPaymentMethods(prev => prev.filter(m => m.id !== id))
        showToast('Kart silindi', 'info')
    }

    const handlePassChangeSubmit = (e) => {
        e.preventDefault()
        showToast('Şifrə uğurla dəyişdirildi', 'success')
        setShowPassModal(false)
        setPassData({ old: '', new: '' })
    }

    function applyPromo() {
        const found = promos.find(p => p.code === promoInput.toUpperCase())
        if (!found) { showToast('Yanlış promo kod', 'error'); return }

        if (appliedPromos.includes(found.code)) {
            showToast('Bu kod artıq tətbiq edilib', 'info');
            return;
        }

        setAppliedPromos([...appliedPromos, found.code])
        showToast(`${found.desc} tətbiq edildi!`, 'success')
        setPromoInput('')
    }

    return (
        <div className={`min-h-screen pt-16 ${dm ? 'bg-slate-900' : 'bg-gray-50'}`}>
            <div className="mx-4 mt-4 mb-4 p-5 rounded-2xl gradient-brand text-white shadow-lg">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold border-2 border-white/30">
                        {user.name[0].toUpperCase()}
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">{user.name}</h2>
                        <p className="text-white/70 text-sm">{user.phone}</p>
                    </div>
                </div>
            </div>

            <div className="flex overflow-x-auto px-4 gap-2 pb-3 no-scrollbar">
                {TABS.map(tab => (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                        className={`cat-pill shrink-0 flex items-center gap-1.5 text-xs ${activeTab === tab.id ? 'active' : ''}`}>
                        <tab.icon size={13} /> {tab.label}
                    </button>
                ))}
            </div>

            <div className="px-4 pb-24">
                {activeTab === 'payment' && (
                    <div className="space-y-3 fade-in">
                        <h3 className={`text-base font-bold ${dm ? 'text-white' : 'text-gray-800'}`}>Ödəniş Üsulları</h3>
                        {paymentMethods.map((item) => (
                            <div key={item.id} onClick={() => handlePaymentSelect(item.id)}
                                className={`p-4 rounded-2xl flex items-center gap-4 cursor-pointer transition-all ${dm ? 'bg-slate-800' : 'bg-white'} ${item.active ? 'ring-2 ring-blue-500' : 'shadow-sm'}`}>
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: item.color + '20' }}>
                                    <item.Icon size={20} style={{ color: item.color }} />
                                </div>
                                <div className="flex-1">
                                    <p className={`font-semibold text-sm ${dm ? 'text-white' : 'text-gray-800'}`}>{item.label}</p>
                                    <p className="text-xs text-gray-400">{item.sub}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    {item.deletable && (
                                        <button onClick={(e) => removeCard(item.id, e)} className="p-2">
                                            <FiTrash2 className="text-red-400" size={18} />
                                        </button>
                                    )}
                                    {item.active && <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center"><FiCheck className="text-white" size={12} /></div>}
                                </div>
                            </div>
                        ))}
                        <button onClick={() => setShowCardModal(true)} className="w-full py-4 rounded-xl border-2 border-dashed border-[#1A4162] text-[#1A4162] text-sm font-semibold flex items-center justify-center gap-2">
                            <FiPlus /> Yeni kart əlavə et
                        </button>
                    </div>
                )}

                {activeTab === 'promos' && (
                    <div className="fade-in">
                        <h3 className={`text-base font-bold mb-4 ${dm ? 'text-white' : 'text-gray-800'}`}>Promosyon kodunu daxil edin</h3>
                        <div className="flex gap-2 mb-6">
                            <input className="input-field flex-1" type="text" placeholder="GETGEL20" value={promoInput} onChange={e => setPromoInput(e.target.value.toUpperCase())} />
                            <button onClick={applyPromo} className="px-5 py-3 rounded-xl text-white font-bold text-sm" style={{ background: '#1A4162' }}>
                                Tətbiq et
                            </button>
                        </div>
                        <h3 className={`text-sm font-bold mb-3 ${dm ? 'text-gray-400' : 'text-gray-500'}`}>Mövcud promosyonlar</h3>
                        <div className="space-y-3">
                            {promos.map(p => (
                                <div key={p.code} className={`p-4 rounded-2xl flex items-center gap-3 ${dm ? 'bg-slate-800' : 'bg-white'} shadow-sm`}>
                                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                                        <FiTag className="text-blue-600" size={18} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-bold text-sm" style={{ color: '#1A4162' }}>{p.code}</p>
                                        <p className={`text-xs ${dm ? 'text-gray-400' : 'text-gray-500'}`}>{p.desc}</p>
                                        <p className="text-xs text-gray-400">Bitmə tarixi: {p.expires}</p>
                                    </div>
                                    {appliedPromos.includes(p.code)
                                        ? <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center"><FiCheck className="text-green-500" size={14} /></div>
                                        : <button onClick={() => { setPromoInput(p.code); showToast('Kod seçildi', 'info') }} className="text-xs font-bold px-3 py-1.5 rounded-lg" style={{ background: '#1A4162' + '20', color: '#1A4162' }}>
                                            İstifadə et
                                        </button>
                                    }
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'subs' && (
                    <div className="fade-in space-y-4">
                        <h3 className={`text-base font-bold ${dm ? 'text-white' : 'text-gray-800'}`}>Abunəlik Planları</h3>
                        {[
                            { name: 'GetGəl Basic', price: '9.99/ay', features: ['5 pulsuz çatdırılma', '%10 endirim'], color: '#1A4162' },
                            { name: 'GetGəl Pro', price: '19.99/ay', features: ['Limitsiz çatdırılma', '%20 endirim', 'Prioritet dəstək'], color: '#f97316' },
                            { name: 'GetGəl Business', price: '49.99/ay', features: ['Hər şey Pro-da var', 'Qaimə hesabı', 'Komanda hesabı'], color: '#8b5cf6' },
                        ].map((plan, i) => (
                            <div key={i} className={`p-5 rounded-2xl ${dm ? 'bg-slate-800' : 'bg-white'} shadow-sm border-2 transition-all`} style={{ borderColor: selectedPlan === plan.name ? plan.color : 'transparent' }}>
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <h4 className={`font-bold text-base ${dm ? 'text-white' : 'text-gray-800'}`}>{plan.name}</h4>
                                        <p className="font-bold text-xl mt-0.5" style={{ color: plan.color }}>₼{plan.price}</p>
                                    </div>
                                    {selectedPlan === plan.name && <span className="text-xs font-bold px-2 py-1 rounded-full text-white" style={{ background: plan.color }}>Aktiv</span>}
                                </div>
                                <ul className="space-y-1.5 mb-4">
                                    {plan.features.map((f, j) => (
                                        <li key={j} className="flex items-center gap-2 text-sm text-gray-500">
                                            <FiCheck className="shrink-0" style={{ color: plan.color }} size={14} />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                <button onClick={() => { setSelectedPlan(plan.name); showToast(`${plan.name} aktiv edildi`, 'success') }} className="w-full py-3 rounded-xl text-sm font-bold text-white transition-opacity active:opacity-90" style={{ background: plan.color }}>
                                    {selectedPlan === plan.name ? 'Mövcud plan' : 'Seç'}
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'security' && (
                    <div className="fade-in space-y-3">
                        <h3 className={`text-base font-bold ${dm ? 'text-white' : 'text-gray-800'}`}>Təhlükəsizlik</h3>
                        {[
                            { id: 'phone', label: 'Telefon nömrəsi', value: user.phone, icon: FiPhone },
                            { id: 'email', label: 'E-poçt', value: user.email || 'Əlavə edilməyib', icon: FiMail },
                            { id: 'password', label: 'Şifrəni dəyiş', value: '••••••••', icon: FiShield },
                        ].map((item) => (
                            <div key={item.id} className={`p-4 rounded-2xl flex items-center gap-4 ${dm ? 'bg-slate-800' : 'bg-white'} shadow-sm`}>
                                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                                    <item.icon style={{ color: '#1A4162' }} size={18} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs text-gray-400">{item.label}</p>
                                    <p className={`font-semibold text-sm ${dm ? 'text-white' : 'text-gray-800'}`}>{item.value}</p>
                                </div>
                                <button
                                    onClick={() => {
                                        if (item.id === 'password') {
                                            setShowPassModal(true); // Şifrə üçün modalı açırıq
                                        } else {
                                            showToast('Bu məlumat tezliklə dəyişdirilə biləcək', 'info');
                                        }
                                    }}
                                    className="text-xs font-semibold" style={{ color: '#1A4162' }}>
                                    Dəyiş
                                </button>
                            </div>
                        ))}
                        <div className={`p-4 rounded-2xl flex items-center gap-4 ${dm ? 'bg-slate-800' : 'bg-white'} shadow-sm`}>
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${is2FAActive ? 'bg-green-100' : 'bg-green-50'}`}>
                                <FiShield className={is2FAActive ? 'text-green-600' : 'text-green-500'} size={18} />
                            </div>
                            <div className="flex-1">
                                <p className="text-xs text-gray-400">İki mərhələli doğrulama</p>
                                <p className={`font-semibold text-sm ${dm ? 'text-white' : 'text-gray-800'}`}>
                                    {is2FAActive ? 'Aktivdir' : 'Aktiv deyil'}
                                </p>
                            </div>
                            <button onClick={() => { setIs2FAActive(!is2FAActive); showToast(is2FAActive ? '2FA söndürüldü' : '2FA aktiv edildi', 'success') }}
                                className={`text-xs font-bold px-3 py-1.5 rounded-lg text-white transition-colors ${is2FAActive ? 'bg-red-500' : 'bg-green-500'}`}>
                                {is2FAActive ? 'Söndür' : 'Aktiv et'}
                            </button>
                        </div>
                    </div>
                )}

                {activeTab === 'support' && (
                    <div className="fade-in space-y-3">
                        <h3 className={`text-base font-bold ${dm ? 'text-white' : 'text-gray-800'}`}>Destek</h3>
                        {['Sifariş problemi', 'Ödeme problemi', 'Hesab problemi', 'Sürücü şikayəti', 'Digər'].map((item, i) => (
                            <button key={i} onClick={() => showToast('Dəstək komandası ilə əlaqə saxlanılır...', 'info')}
                                className={`w-full p-4 rounded-2xl flex items-center justify-between text-left ${dm ? 'bg-slate-800' : 'bg-white'} shadow-sm active:bg-gray-100`}>
                                <span className={`font-medium text-sm ${dm ? 'text-white' : 'text-gray-800'}`}>{item}</span>
                                <span className="text-gray-400">→</span>
                            </button>
                        ))}
                    </div>
                )}

                {activeTab === 'about' && (
                    <div className="fade-in space-y-3">
                        <div className="text-center py-6">
                            <div className="text-4xl font-extrabold mb-1" style={{ color: '#1A4162' }}>
                                Get<span className="text-sky-500">Gəl</span>
                            </div>
                            <p className="text-gray-400 text-sm">Versiya 2.1.0</p>
                        </div>
                        {['İstifadəçi razılaşması', 'Məxfilik siyasəti', 'Kukilər siyasəti', 'Lisenziyalar'].map((item, i) => (
                            <button key={i} onClick={() => showToast('Tezliklə...', 'info')} className={`w-full p-4 rounded-2xl flex items-center justify-between ${dm ? 'bg-slate-800' : 'bg-white'} shadow-sm`}>
                                <span className={`font-medium text-sm ${dm ? 'text-white' : 'text-gray-800'}`}>{item}</span>
                                <span className="text-gray-400">→</span>
                            </button>
                        ))}
                    </div>
                )}

                <button onClick={() => { logout(); navigate('/') }} className="w-full mt-10 py-3.5 rounded-xl border-2 border-red-100 text-red-500 font-bold flex items-center justify-center gap-2">
                    <FiLogOut /> Çıxış
                </button>
            </div>

            {showCardModal && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center">
                    <div className={`w-full max-w-md p-6 rounded-t-3xl sm:rounded-3xl ${dm ? 'bg-slate-800 text-white' : 'bg-white'}`}>
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-lg">Yeni Kart</h3>
                            <button onClick={() => setShowCardModal(false)}><FiX size={24} /></button>
                        </div>
                        <form onSubmit={handleAddCardSubmit} className="space-y-4">
                            <input className="w-full p-4 rounded-xl border bg-transparent" placeholder="Kartın adı" required value={newCardData.label} onChange={e => setNewCardData({ ...newCardData, label: e.target.value })} />
                            <input className="w-full p-4 rounded-xl border bg-transparent" placeholder="Kart nömrəsi" maxLength={16} required value={newCardData.number} onChange={e => setNewCardData({ ...newCardData, number: e.target.value })} />
                            <button type="submit" className="w-full py-4 rounded-xl bg-[#1A4162] text-white font-bold">Yadda saxla</button>
                        </form>
                    </div>
                </div>
            )}

            {showPassModal && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center">
                    <div className={`w-full max-w-md p-6 rounded-t-3xl sm:rounded-3xl ${dm ? 'bg-slate-800 text-white' : 'bg-white'}`}>
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-lg">Şifrəni dəyiş</h3>
                            <button onClick={() => setShowPassModal(false)}><FiX size={24} /></button>
                        </div>
                        <form onSubmit={handlePassChangeSubmit} className="space-y-4">
                            <input type="password" placeholder="Cari şifrə" className="w-full p-4 rounded-xl border bg-transparent" required value={passData.old} onChange={e => setPassData({ ...passData, old: e.target.value })} />
                            <input type="password" placeholder="Yeni şifrə" className="w-full p-4 rounded-xl border bg-transparent" required value={passData.new} onChange={e => setPassData({ ...passData, new: e.target.value })} />
                            <button type="submit" className="w-full py-4 rounded-xl bg-[#1A4162] text-white font-bold">Təsdiqlə</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProfilePage