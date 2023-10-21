
 
import LayoutPrivado  from "../layout/LayoutPrivado"
import { useState } from 'react';
import VistaInformeEstacion from "../views/VistaInformeEstacion";
const InformesEstacionExp = () => {
    
  const [isEditing, setIsEditing] = useState(false); 
    

 return (
   <LayoutPrivado>
      {/* <ElijoEstacion/>  */}
      <VistaInformeEstacion/>
     
   </LayoutPrivado>
 )
}

export default InformesEstacionExp


