import { useEffect } from "react"

export function PopUp(props) {

     useEffect(() => {
        const timer = setTimeout(() => {
            props.onClose()
        }, 3000)
        return () => clearTimeout(timer)
    }, [props.onClose])
    return (
        <div className="fixed bottom-4 right-4 z-50 transition-all duration-300 transform">
            {props.sucesso && (
                <div className="bg-green-600 text-white px-6 py-4 rounded-lg shadow-xl flex items-center gap-3">
                    <span className="font-bold text-xl">✓</span>
                    <p className="font-medium">{props.sucesso}</p>
                </div>
            )}
            {props.erro && (
                <div className="bg-red-600 text-white px-6 py-4 rounded-lg shadow-xl flex items-center gap-3">
                    <span className="font-bold text-xl">⚠</span>
                    <p className="font-medium">{props.erro}</p>
                </div>
            )}
        </div>
    )
}