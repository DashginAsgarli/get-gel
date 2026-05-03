import React, { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext(null)

export function AppProvider({ children }) {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('getgel_user')
        return saved ? JSON.parse(saved) : null
    })
    const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true')
    const [cart, setCart] = useState([])
    const [toasts, setToasts] = useState([])

    useEffect(() => {
        if (darkMode) document.documentElement.classList.add('dark')
        else document.documentElement.classList.remove('dark')
        localStorage.setItem('darkMode', darkMode)
    }, [darkMode])

    function login(userData) {
        setUser(userData)
        localStorage.setItem('getgel_user', JSON.stringify(userData))
    }

    function logout() {
        setUser(null)
        localStorage.removeItem('getgel_user')
    }

    function showToast(msg, type = 'success') {
        const id = Date.now()
        setToasts(prev => [...prev, { id, msg, type }])
        setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000)
    }

    function addToCart(item) {
        setCart(prev => {
            const existing = prev.find(i => i.id === item.id)
            if (existing) return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i)
            return [...prev, { ...item, qty: 1 }]
        })
        showToast(`${item.name} səbətə əlavə edildi`, 'success')
    }

    function removeFromCart(id) {
        setCart(prev => {
            const existing = prev.find(i => i.id === id)
            if (existing?.qty > 1) return prev.map(i => i.id === id ? { ...i, qty: i.qty - 1 } : i)
            return prev.filter(i => i.id !== id)
        })
    }

    function clearCart() { setCart([]) }

    const cartTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0)
    const cartCount = cart.reduce((sum, i) => sum + i.qty, 0)

    return (
        <AppContext.Provider value={{
            user, login, logout,
            darkMode, setDarkMode,
            cart, addToCart, removeFromCart, clearCart,
            cartTotal, cartCount,
            toasts, showToast
        }}>
            {children}
        </AppContext.Provider>
    )
}

export function useApp() {
    return useContext(AppContext)
}