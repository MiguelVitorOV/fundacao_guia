import { AlertTriangle, X } from "lucide-react"

export const DeleteModal = ({ isOpen, onClose, onConfirm, itemName = "este item" }) => {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex bg-black/60 backdrop-blur-sm items-center justify-center p-4">
            <div className="flex flex-col bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="p-6 text-center flex flex-col items-center">
                    <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
                        <AlertTriangle size={32} strokeWidth={2} />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Excluir Registro</h2>
                    <p className="text-gray-500 text-sm">
                        Tem certeza que deseja apagar <strong>{itemName}</strong>? Esta ação não poderá ser desfeita.
                    </p>
                </div>
                <div className="flex gap-3 p-4 bg-gray-50 border-t border-gray-100 justify-end">
                    <button 
                        onClick={onClose}
                        className="px-5 py-2.5 rounded-lg font-semibold text-gray-700 hover:bg-gray-200 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button 
                        onClick={onConfirm}
                        className="px-5 py-2.5 rounded-lg font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors shadow-sm"
                    >
                        Confirmar Exclusão
                    </button>
                </div>
            </div>
        </div>
    )
}