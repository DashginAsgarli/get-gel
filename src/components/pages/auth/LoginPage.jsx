import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useApp } from '../../../context/AppContext'
import { FiPhone, FiLock, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi'

function LoginPage() {
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [showPass, setShowPass] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const { login, showToast } = useApp()
    const navigate = useNavigate()

    function handleLogin(e) {
        e.preventDefault()
        setError('')

        if (!phone || !password) {
            setError('Zəhmət olmasa bütün sahələri doldurun')
            return
        }
        if (password.length < 4) {
            setError('Şifrə ən azı 4 simvol olmalıdır')
            return
        }

        setLoading(true)
        setTimeout(() => {
            login({ name: 'Dashqin', phone, email: `user@getgel.az` })
            showToast('Xoş gəldiniz!', 'success')
            navigate('/')
        }, 1000)
    }

    return (
        <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(160deg, #1A4162 0%, #0f172a 100%)' }}>
            <div className="flex-1 flex flex-col items-center justify-center px-6 pt-16 pb-8">
                <div className="mb-8 text-center">
                    <div className="text-5xl font-extrabold text-white mb-2 tracking-tight">
                        Get<span className="text-sky-400">Gəl</span>
                    </div>
                    <p className="text-white/60 text-sm">Bakının ən sürətli xidməti</p>
                </div>

                <div className="w-full max-w-sm bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">Daxil ol</h2>
                    <p className="text-gray-500 text-sm mb-8">Hesabınıza daxil olun</p>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label className="text-xs font-bold text-gray-400 uppercase ml-1 mb-2 block">Telefon nömrəsi</label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-sky-500 transition-colors">
                                    <FiPhone size={18} />
                                </div>
                                <input className="w-full bg-gray-50 dark:bg-slate-700/50 border border-gray-200 dark:border-slate-600 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all dark:text-white" type="tel" placeholder="+994 50 000 00 00" value={phone} onChange={e => setPhone(e.target.value)} />
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-bold text-gray-400 uppercase ml-1 mb-2 block">Şifrə</label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-sky-500 transition-colors">
                                    <FiLock size={18} />
                                </div>
                                <input className="w-full bg-gray-50 dark:bg-slate-700/50 border border-gray-200 dark:border-slate-600 rounded-2xl py-4 pl-12 pr-12 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all dark:text-white" type={showPass ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
                                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                                    {showPass ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                                </button>
                            </div>
                        </div>

                        <button type="submit" disabled={loading} className="w-full py-4 rounded-2xl text-white font-bold text-base flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-lg shadow-sky-900/20" style={{ background: loading ? '#94a3b8' : 'linear-gradient(to right, #1A4162, #2563eb)', cursor: loading ? 'not-allowed' : 'pointer' }}>
                            {loading ? (
                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <><span>Daxil ol</span><FiArrowRight size={20} /></>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-gray-500 text-sm">
                            Hesabınız yoxdur?{' '}
                            <Link to="/register" className="font-bold text-sky-600 dark:text-sky-400 hover:underline">
                                Qeydiyyatdan keçin
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage