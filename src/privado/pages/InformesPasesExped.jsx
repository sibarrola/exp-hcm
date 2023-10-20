
 
import LayoutPrivado  from "../layout/LayoutPrivado"
import { useState } from 'react';
import ExpedientesDataGrid from "../../publico/components/ExpedientesDataGridPublico";
const ListadoEstacion = () => {
    
  const [isEditing, setIsEditing] = useState(false); 
    

 return (
   <LayoutPrivado>
      {/* <ElijoEstacion/>  */}
      <InformePases/>
     
   </LayoutPrivado>
 )
}

export default ListadoEstacion


