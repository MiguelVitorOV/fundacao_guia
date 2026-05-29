export const DeleteModal = ({ isOpen, onClose, onConfirm, itemName = "este item" }) => {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex bg-black/50 items-center justify-center">
            <div className="flex flex-col justify-between p-5 bg-white items-center gap-5">
                <h1>{`Tem certeza que deseja apagar ${itemName} ?`}</h1>
                <div className="flex gap-5">
                    <button onClick={onConfirm}>Confirmar</button>
                    <button onClick={onClose}>Cancelar</button>
                </div>
            </div>
        </div>
    )
}