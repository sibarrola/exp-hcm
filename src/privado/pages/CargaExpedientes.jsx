
   import ExpedientesNuevo from "../componentes/ExpedientesNuevo";  
 
import LayoutPrivado  from "../layout/LayoutPrivado"
import { useState } from 'react';
const expediente= {
    legajo: "",
    folios: "",
    estadoExp: "Estudio",
    motivo: "",
    nuevoMotivo: "",
    comentario: "",
    fechaIngreso:new Date().toISOString().substring(0, 10),
    categoria: "",
    institucion: "",
    organismo: "",
    nuevaInstitucion: "",
    dem: "",
    nuevoDem: "",
    nuevoOrganismo: "",
    solicitante: "",
    apellido: "",
    nombres: "",
    dni: "",
    celular: "",
    domicilio: "",
    estado: "true",
   
}

const CargaExpedientes = () => {
    
  const [isEditing, setIsEditing] = useState(false); 
    

 return (
   <LayoutPrivado>
    
     <ExpedientesNuevo titulo="Ingreso de expedientes" expediente={expediente} estadoCarga="Carga" isEditing={isEditing} setIsEditing={setIsEditing} />
     
   </LayoutPrivado>
 )
}

export default CargaExpedientes


