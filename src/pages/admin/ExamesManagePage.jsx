import { CrudComponent } from "../../components/CrudComponent";
import { CreateModalExames } from "../../components/Modais/CreateModalExames";

export function ExamesManagePage() {
    return (
        <>
            <h1>CRUD de Exames</h1>
            <CrudComponent 
            url="/exames" 
            deleteUrl="/adminAcao/exame" 
            item="exames" 
            principal="nome" 
            CreateModal={CreateModalExames} />
        </>
    )
}