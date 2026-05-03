import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useApp } from '../../../context/AppContext'
import { FiUser, FiPhone, FiLock, FiEye, FiEyeOff, FiArrowRight, FiMail } from 'react-icons/fi'

function RegisterPage() {
    const [form, setForm] = useState({ name: '', phone: '', email: '', password: '', confirm: '' })
    const [showPass, setShowPass] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const { login, showToast } = useApp()
    const navigate = useNavigate()

    function update(field, val) { setForm(prev => ({ ...prev, [field]: val })) }

    function handleRegister(e) {
        e.preventDefault()
        setError('')

        if (!form.name || !form.phone || !form.password) {
            setError('Zəhmət olmasa bütün sahələri doldurun')
            return
        }
        if (form.password.length < 6) {
            setError('Şifrə ən azı 6 simvol olmalıdır')
            return
        }
        if (form.password !== form.confirm) {
            setError('Şifrələr uyğun gəlmir')
            return
        }

        setLoading(true)
        setTimeout(() => {
            login({ name: form.name, phone: form.phone, email: form.email })
            showToast('Qeydiyyat uğurlu oldu!', 'success')
            navigate('/')
        }, 1000)
    }

    const inputClass = "w-full bg-gray-50 dark:bg-slate-700/50 border border-gray-200 dark:border-slate-600 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all dark:text-white text-sm"

    return (
        <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(160deg, #1A4162 0%, #0f172a 100%)' }}>
            <div className="flex-1 flex flex-col items-center justify-center px-6 pt-12 pb-8">
                <div className="mb-6 text-center">
                    <div className="text-4xl font-extrabold text-white mb-1 tracking-tight">
                        Get<span className="text-sky-400">Gəl</span>
                    </div>
                    <p className="text-white/60 text-sm">Yeni hesab yaradın</p>
                </div>

                <div className="w-full max-w-sm bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-6 transition-all">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-1">Qeydiyyat</h2>
                    <p className="text-gray-500 text-sm mb-6">Məlumatlarınızı daxil edin</p>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-xs font-medium animate-pulse">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleRegister} className="space-y-4">
                        <div>
                            <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 mb-1 block">Ad Soyad</label>
                            <div className="relative group">
                                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-sky-500 transition-colors" size={18} />
                                <input className={inputClass} type="text" placeholder="Dashqin" value={form.name} onChange={e => update('name', e.target.value)} />
                            </div>
                        </div>

                        <div>
                            <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 mb-1 block">Telefon</label>
                            <div className="relative group">
                                <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-sky-500 transition-colors" size={18} />
                                <input className={inputClass} type="tel" placeholder="+994" value={form.phone} onChange={e => update('phone', e.target.value)} />
                            </div>
                        </div>

                        <div>
                            <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 mb-1 block">E-poçt (ixtiyari)</label>
                            <div className="relative group">
                                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-sky-500 transition-colors" size={18} />
                                <input className={inputClass} type="email" placeholder="nümunə@mail.com" value={form.email} onChange={e => update('email', e.target.value)} />
                            </div>
                        </div>

                        <div>
                            <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 mb-1 block">Şifrə</label>
                            <div className="relative group">
                                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-sky-500 transition-colors" size={18} />
                                <input className={`${inputClass} pr-12`} type={showPass ? 'text' : 'password'} placeholder="••••••" value={form.password} onChange={e => update('password', e.target.value)} />
                                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-sky-500 transition-colors">
                                    {showPass ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 mb-1 block">Şifrəni təsdiqlə</label>
                            <div className="relative group">
                                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-sky-500 transition-colors" size={18} />
                                <input className={inputClass} type="password" placeholder="••••••" value={form.confirm} onChange={e => update('confirm', e.target.value)} />
                            </div>
                        </div>

                        <button type="submit" disabled={loading} className="w-full py-4 rounded-2xl text-white font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] mt-4 shadow-lg" style={{ background: loading ? '#94a3b8' : 'linear-gradient(to right, #1A4162, #2563eb)', boxShadow: loading ? 'none' : '0 10px 15px -3px rgba(26, 65, 98, 0.3)' }}>
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                            ) : (
                                <><span>Qeydiyyatı tamamla</span><FiArrowRight size={18} /></>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-500 text-xs">
                            Artıq hesabınız var?{' '}
                            <Link to="/login" className="font-bold text-sky-600 dark:text-sky-400 hover:underline transition-all">Daxil olun</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default RegisterPage