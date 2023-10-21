import { useEffect, useState } from 'react';

import { Grid, Typography } from '@mui/material';
 
import { Global } from '../../helpers/Global'
import { colortema } from '../../theme';
import useAuth from "../../hooks/useAuth.jsx";
import useFetchAxios from "../../hooks/useFetchAxios.jsx";
import { eliminarArchivoCloudinary } from '../../helpers/eliminarArchivoCloudinary';
import InformeCard from '../componentes/InformeCard';
import InformeEstacion from '../componentes/InformeEstacion';
 
const VistaInformeEstacion=  () => {

    const [expedienteSeleccionado, setExpedienteSeleccionado] = useState({
        _id: "",
        legajo: "",
        folios: "",
        estadoExp: "Estudio",
        motivo: "",
        nuevoMotivo: "",
        comentario: " ",
        fechaIngreso: new Date().toISOString().substring(0, 10),
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
        pases: [{}]

    });

    let [executeRequest, isSuccessful, setIsSuccessful, alert, setAlert, respuesta] = useFetchAxios();
    const url = Global.url;
    /* -------------------------------------- */
    const { auth } = useAuth();  // usuario logueado
    const [pases, setPases] = useState([]);
    const nuevo_pase = {
        fecha_pase: new Date().toISOString().substring(0, 10),
        estacion: "",
        sub_estacion: "",
        comision: "",
        organismo: "",
        dem: "",
        estado: "",
        usuario_pase: "",
        comentario: "",
        _id: ""
    }

    /*  const [estadoCarga, setEstadoCarga] = useState("NUEVO PASE"); */
    const [modo, setModo] = useState("Cargar")
    const [paseAEditar, setPaseAEditar] = useState(nuevo_pase);
    const [isEditing, setIsEditing] = useState(false);   // esto viene de otro  */ 
    const [seleccionado, setSeleccionado] = useState(true); // expediente 


    /* NUEVO------------------------------------------------------ */
    const handleExpedienteSelect = (expediente) => {
        setExpedienteSeleccionado(expediente);
        console.log("expediente seleccionado", expedienteSeleccionado)
    }

    const handlePaseEdit = (newData) => {
        let paseId = newData._id;
        let pasesExp = expedienteSeleccionado.pases;
        // Encuentra el pase en el estado y lo actualiza con newData

        const updatedPases = pasesExp.map((pase) => {
            if (pase._id === paseId) {
                return { ...pase, ...newData };
            }
            return pase;
        });
        // actualiza el campo con el nuevo vector
        let expedienteNuevo = expedienteSeleccionado;
        expedienteNuevo.pases = updatedPases;
 
            updatedPases.map((pasei, index) => {   
                if(pasei.estado_pase===true) {   //si fuera false está borrado
                    switch(pasei.estacion){
                        case "Sanción":
                            expedienteNuevo.estadoExp="Aprobado";
                            console.log(expedienteNuevo.estadoExp)
                            break;
                        case "Notificación al Ejecutivo":
                           expedienteNuevo.estadoExp="Notificado"
                             break;  
                        case "Archivo":
                           expedienteNuevo.estadoExp="Archivado"
                             break;  
                           
                      default:
                        expedienteNuevo.estadoExp="Estudio"
                    } 


                }
           

        });
         
    

        return expedienteNuevo;
        /*   handleExpedienteSelect(expediente_nuevo);
        console.log("handlePaseEdit  expediente",expedienteSeleccionado)   */
    };

    const onPaseEdit = (pase) => {
        /*  setEditingPase(true); */
        pase.fecha_pase = pase.fecha_pase.substring(0, 10)
        setPaseAEditar(pase);
        setModo("Editar")
    }

    const onGuardar = async (expedienteNuevo,sanc) => {
        console.log(sanc);
        let token = auth.token;
        let method = "PUT";
       /*  let expediente_guardar = expedienteNuevo; */
       console.log("expedient guardar en onGuardar",expedienteNuevo)
        setPaseAEditar(nuevo_pase);
        setModo("Cargar");
        let url2 = `${url}/expedientes/${expedienteNuevo._id}/${sanc}`;
        
        // llamo a la funcion executeRequest del useFetchAxios()------------ 
        await executeRequest(url2, method, expedienteNuevo, token);
          handleExpedienteSelect(expedienteNuevo);
    }

     const onLimpioSancion=async(publicId)=>{
     let borra=await eliminarArchivoCloudinary( publicId,url )  ;
     console.log(borra);
    }

      

    const handleLimpio = () => {

        setSeleccionado(true); /* esto es para que muestre de nuevo los exped para elegir , la GRID*/

    }
 
     
    /* -------------------BORRA EL PASE------------------------------------ */
    const handlePaseDelete = async (paseId) => {
       
        const vectorPases = expedienteSeleccionado.pases;
        const expedienteNuevo = expedienteSeleccionado;
        let publicId;
     /*    console.log("publicID",expedienteNuevo.sancion);
          if(!!expedienteNuevo.sancion) {
             
          } */
         const updatedPases = vectorPases.filter((pase) => pase._id !== paseId); 
         const paseBorro = vectorPases.filter((pase) => pase._id === paseId)[0]; 
         console.log("expediente nuevo 166,sancion",expedienteNuevo.sancion);
        let sanc=0;
         if(paseBorro.estacion=="Sanción"   ){
            sanc=1;
            publicId=expedienteNuevo.sancion?.public_id;
            
         }
       updatedPases.map((pase) => {
        console.log("recorreo vector pases")
       
            switch(pase.estacion){
                case "Sanción":
                    expedienteNuevo.estadoExp="Aprobado";
                    
                    break;
                case "Notificación al Ejecutivo":
                   expedienteNuevo.estadoExp="Notificado";
                  
                     break;  
                case "Archivo":
                   expedienteNuevo.estadoExp="Archivado";
                   
                     break;  
                   
              default:
                expedienteNuevo.estadoExp="Estudio";
                //expedienteNuevo.sancion={};
            } 
                
     /*      return {
            ...pase,
            estado_pase: false // Modificar el estado
          };
        }
        return pase; */
      });
      console.log("updatedPases",updatedPases);
     
        expedienteNuevo.pases = updatedPases;
        
       
          if(publicId){
            console.log("publicID",publicId);
            await onLimpioSancion(publicId);
            
         }
         console.log("EXPEDIENTE NUEVO",expedienteNuevo)
         await onGuardar(expedienteNuevo,sanc);
        

    };
    return (

        <Grid container  sx={{ display: 'flex', justifyContent: 'start' }}    >

            {/*    <div> {JSON.stringify(expedienteSeleccionado)}</div>  */}
             

                <Grid item xs={12} md={7}   >
                    <InformeEstacion 
                    handleExpedienteSelected={handleExpedienteSelect} isEditing={isEditing} setIsEditing={setIsEditing} seleccionado={seleccionado} setSeleccionado={setSeleccionado}
                 /* pases={pases} setPases={setPases} */ />
                </Grid>

           


                    <Grid item xs={12} md={5} sx={{ alignContent: 'between',mt:'6px' }} >
                       <InformeCard
                            expediente={expedienteSeleccionado} onPaseEdit={onPaseEdit} onPaseDelete={handlePaseDelete} />

                    </Grid>
                
           

        </Grid>

    );
}


export default VistaInformeEstacion;