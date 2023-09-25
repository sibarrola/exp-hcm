import { useState, useEffect } from 'react';

import { Grid, Typography } from '@mui/material';
import ExpedientesDataGrid from '../componentes/ExpedientesDataGrid';
import PasesCarga from '../componentes/PasesCarga';
import ExpedienteCard from '../componentes/ExpedienteCard';
import Peticiones from '../../helpers/Peticiones';
import { Global } from '../../helpers/Global'
import { colortema } from '../../theme';
import useAuth from "../../hooks/useAuth.jsx";
import useFetchAxios from "../../hooks/useFetchAxios.jsx";
const VistaPases = () => {

    const [expedienteSeleccionado, setExpedienteSeleccionado] = useState({
        _id: "",
        legajo: "",
        folios: "",
        estadoExp: "Estudio",
        motivo: "",
        nuevoMotivo: "",
        comentario: " ",
        fechaIngreso: "",
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

    const handleExpedienteSelect = (expediente) => {
        setExpedienteSeleccionado(expediente);
        console.log("expediente seleccionado", expedienteSeleccionado)
    }
    /* NUEVO------------------------------------------------------ */

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

        });
         
        console.log("estod del expediente modificado",expedienteNuevo.estadoExp)

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

    const onGuardar = async (expedienteNuevo) => {
        let token = auth.token;
        let method = "PUT";
        let expediente_guardar = expedienteNuevo;
       
        setPaseAEditar(nuevo_pase);
        setModo("Cargar");
        let url2 = `${url}/expedientes/${expediente_guardar._id}`;
        // llamo a la funcion executeRequest del useFetchAxios()------------ 
        await executeRequest(url2, method, expediente_guardar, token);



    }

    const handleLimpio = () => {

        setSeleccionado(true); /* esto es para que muestre de nuevo los exped para elegir , la GRID*/

    }

    /* -------------------BORRA EL PASE------------------------------------ */
    const handlePaseDelete = async (paseId) => {
        console.log("pase delete", paseId);
        const vectorPases = expedienteSeleccionado.pases;
        const expedienteNuevo = expedienteSeleccionado;
        const updatedPases = vectorPases.filter((pase) => pase._id !== paseId);
    
        expedienteNuevo.pases = updatedPases;
        
        updatedPases.map((pasei, index) => {    
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

        });

        await onGuardar(expedienteNuevo);

    };
    return (

        <Grid container direction="row" sx={{ display: 'flex', justifyContent: 'between' }} spacing={2}   >

            {/*    <div> {JSON.stringify(expedienteSeleccionado)}</div>  */}
            <Grid item xs={12}>

                <Typography marginLeft="5%" sx={colortema.typography.texto1}>SELECCION DE EXPEDIENTES Y CARGA DE PASES</Typography>
            </Grid>
            {seleccionado && (

                <Grid item md={12} lg={12} sx={{ mr: "20px" }}  >
                    <ExpedientesDataGrid onSelectExpediente={handleExpedienteSelect} isEditing={isEditing} setIsEditing={setIsEditing} seleccionado={seleccionado} setSeleccionado={setSeleccionado}
                 /* pases={pases} setPases={setPases} */ />
                </Grid>

            )}

            {expedienteSeleccionado && !seleccionado && (
                /*       <> <Grid item xs={12} md={4} >
                          <PasesCarga expediente={expedienteSeleccionado} handleExpedienteSelect={handleExpedienteSelect} setSeleccionado={setSeleccionado} paseAEditar={paseAEditar}  onPaseAdd={handlePaseAdd} editingPase={editingPase} setEditingPase={setEditingPase} handlePaseEdit={handlePaseEdit} onPaseDelete={handlePaseDelete} estadoCarga={estadoCarga} setEstadoCarga={setEstadoCarga} /> */
                <> <Grid item xs={12} md={4} >
                    <PasesCarga expediente={expedienteSeleccionado} handleExpedienteSelect={handleExpedienteSelect} paseAEditar={paseAEditar} modo={modo} setModo={setModo} handlePaseEdit={handlePaseEdit} handleLimpio={handleLimpio} />

                </Grid>


                    <Grid item xs={12} md={8} sx={{ alignContent: 'left' }} >
                        <ExpedienteCard
                            expediente={expedienteSeleccionado} onPaseEdit={onPaseEdit} onPaseDelete={handlePaseDelete} />

                    </Grid>
                </>
            )}

        </Grid>

    );
}


export default VistaPases;