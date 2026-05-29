import { useEffect } from "react"

export function PopUp(props) {

     useEffect(() => {
        const timer = setTimeout(() => {
            props.onClose()
        }, 3000)
        return () => clearTimeout(timer)
    }, [props.onClose])
    return (
        <div className="fixed bottom-4 right-4 z-50">
            {props.sucesso && (
                <div className="bg-green-500 text-white">
                    <p>{props.sucesso}</p>
                </div>
            )}
            {props.erro && (
                <div className="bg-red-500 text-white">
                    <p>{props.erro}</p>
                </div>
            )}
        </div>
    )
}