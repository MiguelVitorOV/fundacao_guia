import { CrudComponent } from "../../components/CrudComponent"
import { CreateModalEventos } from "../../components/Modais/CreateModalEventos"

export function EventosManagePage() {
    return (
        <>
            <h1>CRUD de Eventos</h1>
            <CrudComponent 
            url="/eventos" 
            deleteUrl="/adminAcao/eventos" 
            item="eventos" 
            principal="titulo"
            CreateModal={CreateModalEventos}
            />
        </>
    )
}