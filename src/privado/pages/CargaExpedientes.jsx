
   import ExpedientesCarga from "../componentes/ExpedientesCarga";  
 
import LayoutPrivado  from "../layout/LayoutPrivado"
 
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
 return (
   <LayoutPrivado>
    
     <ExpedientesCarga titulo="Carga de expedientes" expediente={expediente} estadoCarga="Carga"/>
     
   </LayoutPrivado>
 )
}

export default CargaExpedientes


