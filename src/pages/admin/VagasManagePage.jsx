import { CrudComponent } from "../../components/CrudComponent"
import { CreateModalVagas } from "../../components/Modais/CreateModalVagas"

export function VagasManagePage() {
    return (
        <>
            <h1>CRUD de Vagas</h1>
            <CrudComponent 
            url="/vagas" 
            deleteUrl="/adminAcao/vagas" 
            item="vagas" 
            principal="cargo" 
            CreateModal={CreateModalVagas} />

        </>
    )
}