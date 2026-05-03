import React, { useState } from 'react'
import { useApp } from '../../../context/AppContext'
import { marketCategories, marketProducts } from '../../../data/mockData'
import { FiSearch, FiShoppingCart, FiPlus, FiMinus, FiX } from 'react-icons/fi'
import { FaLeaf } from 'react-icons/fa'

function MarketPage() {
    const { addToCart, removeFromCart, cart, cartCount, cartTotal, clearCart, showToast, darkMode } = useApp()
    const [search, setSearch] = useState('')
    const [selectedCat, setSelectedCat] = useState(null)
    const [showCart, setShowCart] = useState(false)
    const dm = darkMode

    function getQty(id) { return cart.find(i => i.id === id)?.qty || 0 }

    const filtered = marketProducts.filter(p => {
        const matchCat = !selectedCat || p.category === selectedCat
        const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
        return matchCat && matchSearch
    })

    function handleOrder() {
        showToast('Sifariş qəbul edildi! 30-45 dəqiqəyə çatdırılacaq', 'success')
        clearCart()
        setShowCart(false)
    }

    return (
        <div className={`min-h-screen pt-16 ${dm ? 'bg-slate-900' : 'bg-gray-50'}`}>
            <div className="mx-4 mt-4 mb-4 p-5 rounded-2xl text-white gradient-market">
                <div className="flex items-center gap-3">
                    <FaLeaf className="text-3xl shrink-0" />
                    <div>
                        <h2 className="font-bold text-lg">GetGəl Pazarı</h2>
                        <p className="text-white/80 text-sm">30-45 dəqiqəyə qapınıza çatdırırıq</p>
                    </div>
                </div>
            </div>

            <div className="px-4 mb-3">
                <div className="relative flex items-center">
                    <FiSearch className="absolute left-4 text-gray-400 z-10" size={18} />
                    <input className={`input-field w-full pl-12! py-3! rounded-xl border-none outline-none ${dm ? 'bg-slate-800 text-white' : 'bg-white text-gray-800'}`} type="text" placeholder="Məhsul axtar..." value={search} onChange={e => setSearch(e.target.value)} />
                </div>
            </div>

            <div className="flex gap-3 px-4 overflow-x-auto pb-3 mb-2 no-scrollbar">
                <button onClick={() => setSelectedCat(null)}
                    className={`cat-pill shrink-0 flex items-center gap-1.5 ${!selectedCat ? 'active' : ''}`}>
                    Hamısı
                </button>
                {marketCategories.map(cat => (
                    <button key={cat.id} onClick={() => setSelectedCat(selectedCat === cat.id ? null : cat.id)} className={`cat-pill shrink-0 flex items-center gap-1.5 ${selectedCat === cat.id ? 'active' : ''}`}>
                        <span>{cat.icon}</span> {cat.name}
                    </button>
                ))}
            </div>

            <div className="px-4 grid grid-cols-2 gap-3 pb-32">
                {filtered.map(product => {
                    const qty = getQty(product.id)
                    return (
                        <div key={product.id} className={`food-card p-3 rounded-2xl shadow-sm ${dm ? 'bg-slate-800' : 'bg-white'} ${!product.stock ? 'opacity-60' : ''}`}>
                            <div className="relative mb-2">
                                <img src={product.image} alt={product.name} className="w-full h-28 object-cover rounded-xl" />
                                {!product.stock && (
                                    <div className="absolute inset-0 rounded-xl bg-black/40 flex items-center justify-center">
                                        <span className="text-white text-xs font-bold">Mövcud deyil</span>
                                    </div>
                                )}
                            </div>
                            <p className={`font-semibold text-sm leading-tight h-10 overflow-hidden ${dm ? 'text-white' : 'text-gray-800'}`}>{product.name}</p>
                            <div className="flex items-center justify-between mt-2">
                                <span className="font-bold text-base" style={{ color: '#1A4162' }}>₼{product.price.toFixed(2)}</span>
                                {product.stock && (
                                    qty === 0 ? (
                                        <button onClick={() => addToCart({ ...product })} className="w-8 h-8 rounded-full flex items-center justify-center text-white transition-transform active:scale-90" style={{ background: '#1A4162' }}>
                                            <FiPlus size={16} />
                                        </button>
                                    ) : (
                                        <div className="flex items-center gap-1.5">
                                            <button onClick={() => removeFromCart(product.id)} className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                                                <FiMinus size={12} />
                                            </button>
                                            <span className={`font-bold text-sm ${dm ? 'text-white' : 'text-gray-800'}`}>{qty}</span>
                                            <button onClick={() => addToCart({ ...product })} className="w-7 h-7 rounded-full flex items-center justify-center text-white" style={{ background: '#1A4162' }}>
                                                <FiPlus size={12} />
                                            </button>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>

            {cartCount > 0 && (
                <button onClick={() => setShowCart(true)} className="cart-btn shadow-lg">
                    <FiShoppingCart size={22} />
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-[10px] font-bold flex items-center justify-center">
                        {cartCount}
                    </span>
                </button>
            )}

            {showCart && (
                <div className="fixed inset-0 z-3000 flex items-end">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowCart(false)} />
                    <div className={`relative w-full rounded-t-3xl p-6 max-h-[85vh] overflow-y-auto fade-in shadow-2xl ${dm ? 'bg-slate-900 text-white' : 'bg-white text-gray-800'}`}>
                        <div className="flex justify-between items-center mb-5">
                            <h3 className="text-xl font-bold">Səbətim ({cartCount} məhsul)</h3>
                            <button onClick={() => setShowCart(false)} className="p-2 bg-gray-100 dark:bg-slate-800 rounded-full text-gray-400">
                                <FiX size={20} />
                            </button>
                        </div>

                        <div className="space-y-3 mb-5">
                            {cart.map(item => (
                                <div key={item.id} className={`flex items-center gap-3 p-3 rounded-xl ${dm ? 'bg-slate-800' : 'bg-gray-50'}`}>
                                    <img src={item.image} alt={item.name} className="w-14 h-14 rounded-lg object-cover" />
                                    <div className="flex-1">
                                        <p className="font-semibold text-sm">{item.name}</p>
                                        <p className="text-xs font-bold" style={{ color: '#1A4162' }}>₼{(item.price * item.qty).toFixed(2)}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => removeFromCart(item.id)} className="w-8 h-8 rounded-full bg-gray-200 dark:bg-slate-700 flex items-center justify-center">
                                            <FiMinus size={14} />
                                        </button>
                                        <span className="font-bold text-sm w-4 text-center">{item.qty}</span>
                                        <button onClick={() => addToCart(item)} className="w-8 h-8 rounded-full flex items-center justify-center text-white" style={{ background: '#1A4162' }}>
                                            <FiPlus size={14} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className={`space-y-2 py-4 border-t mb-4 ${dm ? 'border-slate-700' : 'border-gray-100'}`}>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Məhsullar</span>
                                <span className="font-medium">₼{cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Çatdırılma</span>
                                <span className="text-green-500 font-bold">Pulsuz</span>
                            </div>
                            <div className={`flex justify-between font-extrabold text-lg pt-2 border-t ${dm ? 'border-slate-700' : 'border-gray-100'}`}>
                                <span>Cəmi</span>
                                <span style={{ color: '#1A4162' }}>₼{cartTotal.toFixed(2)}</span>
                            </div>
                        </div>

                        <button onClick={handleOrder} className="w-full py-4 rounded-2xl text-white font-bold text-lg shadow-md active:scale-[0.98] transition-transform" style={{ background: '#1A4162' }}>
                            Sifariş ver — ₼{cartTotal.toFixed(2)}
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
export default MarketPage