import React from 'react'
import { useApp } from '../../context/AppContext'
import { FiCheckCircle, FiXCircle, FiInfo } from 'react-icons/fi'

export default function ToastContainer() {
    const { toasts } = useApp()

    const icons = {
        success: <FiCheckCircle className="text-white" />,
        error: <FiXCircle className="text-white" />,
        info: <FiInfo className="text-white" />,
    }
    const colors = {
        success: 'bg-emerald-500',
        error: 'bg-red-500',
        info: 'bg-blue-500',
    }

    return (
        <div className="fixed top-20 right-4 z-9999 space-y-2">
            {toasts.map(t => (
                <div key={t.id} className={`toast flex items-center gap-2 ${colors[t.type] || 'bg-gray-800'}`}>
                    {icons[t.type]}
                    <span>{t.msg}</span>
                </div>
            ))}
        </div>
    )
}