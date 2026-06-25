import { useEffect } from "react"
import { CheckCircle2, AlertCircle } from "lucide-react"

export function PopUp({ sucesso, erro, onClose }) {

    useEffect(() => {
        const timer = setTimeout(() => {
            onClose()
        }, 3000)
        return () => clearTimeout(timer)
    }, [onClose])
    
    return (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
            {sucesso && (
                <div className="bg-white border-l-4 border-green-500 text-gray-800 px-5 py-4 rounded-lg shadow-xl flex items-center gap-3">
                    <CheckCircle2 className="text-green-500" size={24} />
                    <p className="font-semibold text-sm">{sucesso}</p>
                </div>
            )}
            {erro && (
                <div className="bg-white border-l-4 border-red-500 text-gray-800 px-5 py-4 rounded-lg shadow-xl flex items-center gap-3">
                    <AlertCircle className="text-red-500" size={24} />
                    <p className="font-semibold text-sm">{erro}</p>
                </div>
            )}
        </div>
    )
}