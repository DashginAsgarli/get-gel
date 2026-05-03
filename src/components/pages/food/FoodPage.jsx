import React, { useState } from 'react'
import { useApp } from '../../../context/AppContext'
import { restaurants } from '../../../data/mockData'
import { FiSearch, FiStar, FiClock, FiShoppingCart, FiX, FiPlus, FiMinus } from 'react-icons/fi'
import { FaFire, FaTruck } from 'react-icons/fa'

const CATEGORIES = ['Hamısı', 'Azərbaycan', 'Fast Food', 'İtalyan', 'Yapon']

function FoodPage() {
    const { addToCart, removeFromCart, cart, cartCount, cartTotal, darkMode } = useApp()
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('Hamısı')
    const [selectedRestaurant, setSelectedRestaurant] = useState(null)
    const [showCart, setShowCart] = useState(false)
    const dm = darkMode

    const filtered = restaurants.filter(r => {
        const matchCat = category === 'Hamısı' || r.category === category
        const matchSearch = r.name.toLowerCase().includes(search.toLowerCase())
        return matchCat && matchSearch
    })

    function getItemQty(id) {
        return cart.find(i => i.id === id)?.qty || 0
    }

    if (selectedRestaurant) {
        const menuGroups = [...new Set(selectedRestaurant.menu.map(i => i.category))]
        return (
            <div className={`min-h-screen pt-16 ${dm ? 'bg-slate-900' : 'bg-gray-50'}`}>
                <div className="relative h-48">
                    <img src={selectedRestaurant.image} alt={selectedRestaurant.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                        <h1 className="text-2xl font-bold">{selectedRestaurant.name}</h1>
                        <div className="flex items-center gap-3 mt-1 text-sm text-white/80">
                            <span className="flex items-center gap-1"><FiStar className="text-yellow-400" /> {selectedRestaurant.rating}</span>
                            <span>·</span>
                            <span className="flex items-center gap-1"><FiClock /> {selectedRestaurant.deliveryTime}</span>
                            <span>·</span>
                            <span className="flex items-center gap-1"><FaTruck /> ₼{selectedRestaurant.deliveryFee}</span>
                        </div>
                    </div>
                    <span className={`absolute top-4 left-4 px-2 py-1 rounded-full text-xs font-bold ${selectedRestaurant.isOpen ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                        {selectedRestaurant.isOpen ? 'Açıqdır' : 'Qapalıdır'}
                    </span>
                    <button onClick={() => setSelectedRestaurant(null)} className="absolute top-4 right-4 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white">
                        <FiX size={20} />
                    </button>
                </div>

                <div className="p-4">
                    {menuGroups.map(group => (
                        <div key={group} className="mb-6">
                            <h3 className={`text-base font-bold mb-3 ${dm ? 'text-white' : 'text-gray-800'}`}>{group}</h3>
                            <div className="space-y-3">
                                {selectedRestaurant.menu.filter(i => i.category === group).map(item => {
                                    const qty = getItemQty(item.id)
                                    const cartItem = { ...item, restaurantId: selectedRestaurant.id }
                                    return (
                                        <div key={item.id} className={`food-card flex gap-3 p-3 rounded-2xl shadow-sm ${dm ? 'bg-slate-800' : 'bg-white'}`}>
                                            <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover shrink-0" />
                                            <div className="flex-1">
                                                <p className={`font-bold text-sm ${dm ? 'text-white' : 'text-gray-800'}`}>{item.name}</p>
                                                <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{item.desc}</p>
                                                <div className="flex items-center justify-between mt-2">
                                                    <span className="font-bold text-base" style={{ color: '#1A4162' }}>₼{item.price.toFixed(2)}</span>
                                                    {qty === 0 ? (
                                                        <button onClick={() => addToCart(cartItem)} className="w-8 h-8 rounded-full flex items-center justify-center text-white" style={{ background: '#1A4162' }}>
                                                            <FiPlus size={16} />
                                                        </button>
                                                    ) : (
                                                        <div className="flex items-center gap-2">
                                                            <button onClick={() => removeFromCart(item.id)}
                                                                className={`w-8 h-8 rounded-full flex items-center justify-center ${dm ? 'bg-slate-700 text-white' : 'bg-gray-100 text-gray-800'}`}>
                                                                <FiMinus size={14} />
                                                            </button>
                                                            <span className={`font-bold text-sm w-4 text-center ${dm ? 'text-white' : 'text-gray-800'}`}>{qty}</span>
                                                            <button onClick={() => addToCart(cartItem)}
                                                                className="w-8 h-8 rounded-full flex items-center justify-center text-white"
                                                                style={{ background: '#1A4162' }}>
                                                                <FiPlus size={14} />
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {cartCount > 0 && (
                    <button onClick={() => setShowCart(true)} className="fixed bottom-6 right-6 w-14 h-14 bg-[#1A4162] rounded-full flex items-center justify-center text-white shadow-2xl z-50">
                        <FiShoppingCart size={24} />
                        <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full text-white text-xs font-bold flex items-center justify-center border-2 border-white">
                            {cartCount}
                        </span>
                    </button>
                )}

                {showCart && (
                    <div className="fixed inset-0 z-3000 flex items-end">
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowCart(false)} />
                        <div className={`relative w-full rounded-t-3xl p-6 max-h-[85vh] overflow-y-auto transform transition-transform ${dm ? 'bg-slate-900' : 'bg-white'}`}>
                            <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-6" />
                            <div className="flex justify-between items-center mb-6">
                                <h3 className={`text-xl font-bold ${dm ? 'text-white' : 'text-gray-800'}`}>Səbətim</h3>
                                <button onClick={() => setShowCart(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><FiX size={24} className="text-gray-400" /></button>
                            </div>
                            <div className="space-y-4 mb-6">
                                {cart.map(item => (
                                    <div key={item.id} className={`flex items-center justify-between p-4 rounded-2xl ${dm ? 'bg-slate-800' : 'bg-gray-50'}`}>
                                        <div>
                                            <p className={`font-semibold text-sm ${dm ? 'text-white' : 'text-gray-800'}`}>{item.name}</p>
                                            <p className="text-xs text-gray-400">₼{item.price.toFixed(2)}</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <button onClick={() => removeFromCart(item.id)} className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300">
                                                <FiMinus size={14} />
                                            </button>
                                            <span className={`font-bold text-sm ${dm ? 'text-white' : 'text-gray-800'}`}>{item.qty}</span>
                                            <button onClick={() => addToCart(item)} className="w-8 h-8 rounded-full flex items-center justify-center text-white" style={{ background: '#1A4162' }}>
                                                <FiPlus size={14} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className={`flex justify-between items-center py-4 border-t ${dm ? 'border-slate-700' : 'border-gray-100'} mb-6`}>
                                <span className={`text-lg font-bold ${dm ? 'text-white' : 'text-gray-800'}`}>Cəmi məbləğ</span>
                                <span className="font-bold text-2xl" style={{ color: '#1A4162' }}>₼{cartTotal.toFixed(2)}</span>
                            </div>
                            <button className="w-full py-4 rounded-2xl text-white font-bold text-lg shadow-lg" style={{ background: '#1A4162' }}>
                                Sifarişi tamamla
                            </button>
                        </div>
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className={`min-h-screen pt-16 ${dm ? 'bg-slate-900' : 'bg-gray-50'}`}>
            <div className="px-4 py-4">
                <div className="relative flex items-center">
                    <FiSearch className="absolute left-4 text-gray-400 z-10" size={18} />
                    <input className={`w-full py-3.5 pl-12 pr-4 rounded-2xl border-none outline-none focus:ring-2 focus:ring-[#1A4162] transition-all shadow-sm ${dm ? 'bg-slate-800 text-white placeholder:text-gray-500' : 'bg-white text-gray-800 placeholder:text-gray-400'}`} type="text" placeholder="Restoran və ya mətbəx axtar..." value={search} onChange={e => setSearch(e.target.value)} />
                </div>
            </div>

            <div className="flex gap-2 px-4 overflow-x-auto pb-4 scrollbar-hide">
                {CATEGORIES.map(cat => (
                    <button key={cat} onClick={() => setCategory(cat)} className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all shrink-0 border ${category === cat ? 'bg-[#1A4162] text-white border-[#1A4162] shadow-md' : dm ? 'bg-slate-800 text-gray-400 border-slate-700' : 'bg-white text-gray-500 border-gray-200'}`}>
                        {cat}
                    </button>
                ))}
            </div>

            <div className="mx-4 mb-6 p-5 rounded-2xl text-white flex items-center gap-4 bg-linear-to-r from-[#1A4162] to-[#2a6a9e]">
                <div className="bg-white/20 p-3 rounded-xl">
                    <FaFire className="text-2xl" />
                </div>
                <div>
                    <p className="font-bold text-base">Bugünün fürsəti!</p>
                    <p className="text-xs text-white/80">İlk sifarişdə 15% endirim — <span className="font-bold text-white">YENI15</span></p>
                </div>
            </div>

            <div className="px-4 space-y-4 pb-24">
                <div className="flex items-center justify-between">
                    <h2 className={`font-bold text-lg ${dm ? 'text-white' : 'text-gray-800'}`}>Restoranlar</h2>
                    <p className="text-xs font-medium text-gray-400">{filtered.length} nəticə</p>
                </div>

                {filtered.map(r => (
                    <div key={r.id} onClick={() => r.isOpen && setSelectedRestaurant(r)} className={`group rounded-2xl overflow-hidden transition-all active:scale-[0.98] cursor-pointer ${!r.isOpen ? 'opacity-60 grayscale' : 'hover:shadow-xl'} ${dm ? 'bg-slate-800' : 'bg-white shadow-sm'}`}>
                        <div className="relative h-44">
                            <img src={r.image} alt={r.name} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" />
                            <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
                            <span className={`absolute top-3 left-3 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${r.isOpen ? 'bg-green-500 text-white' : 'bg-gray-600 text-white'}`}>
                                {r.isOpen ? 'Açıqdır' : 'Qapalıdır'}
                            </span>
                        </div>
                        <div className="p-4">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className={`font-bold text-lg ${dm ? 'text-white' : 'text-gray-800'}`}>{r.name}</h3>
                                <div className="flex items-center gap-1 bg-yellow-400/10 px-2 py-1 rounded-lg">
                                    <FiStar className="text-yellow-500 fill-yellow-500" size={14} />
                                    <span className={`font-bold text-xs ${dm ? 'text-yellow-400' : 'text-yellow-700'}`}>{r.rating}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-gray-400 font-medium">
                                <span className="flex items-center gap-1"><FiClock size={14} /> {r.deliveryTime}</span>
                                <span className="w-1 h-1 rounded-full bg-gray-300" />
                                <span className="flex items-center gap-1"><FaTruck size={14} /> ₼{r.deliveryFee}</span>
                            </div>
                            <div className="flex gap-2 mt-3 flex-wrap">
                                {r.tags.map(tag => (
                                    <span key={tag} className={`text-[10px] font-bold px-2 py-1 rounded-md ${dm ? 'bg-slate-700 text-gray-300' : 'bg-gray-100 text-gray-500'}`}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {cartCount > 0 && (
                <button onClick={() => setShowCart(true)} className="fixed bottom-6 right-6 w-14 h-14 bg-[#1A4162] rounded-full flex items-center justify-center text-white shadow-2xl z-50">
                    <FiShoppingCart size={24} />
                    <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full text-white text-xs font-bold flex items-center justify-center border-2 border-white">
                        {cartCount}
                    </span>
                </button>
            )}
        </div>
    )
}

export default FoodPage