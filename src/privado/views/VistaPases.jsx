import { useState } from 'react';

import { Grid, Typography } from '@mui/material';
import ExpedientesDataGrid from '../componentes/ExpedientesDataGrid';
import PasesCarga from '../componentes/PasesCarga';
import ExpedienteCard from '../componentes/ExpedienteCard';
import Peticiones from '../../helpers/Peticiones';
import {Global} from '../../helpers/Global'

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

    /* -------------------------------------- */

    const [pases, setPases] = useState([]);
    const [pase, setPase] = useState({
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
    });
    const [isEditing, setIsEditing] = useState(false);   // esto viene de otro uso
    const [seleccionado, setSeleccionado] = useState(true); // expediente seleccionado
    const [editingPase, setEditingPase] = useState(false);
    const handlePaseAdd = (nuevoPase) => {
        setPases((prevPases) => [...prevPases, nuevoPase]);
    };

    const handleExpedienteSelect = (expediente) => {
        setExpedienteSeleccionado(expediente);
        console.log("expediente seleccionado", expedienteSeleccionado)
        /*   setPases(expediente.pases); */
    };
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
        expedienteSeleccionado.pases = updatedPases;

    };

    const onPaseEdit = (pase) => {
        setEditingPase(true);
        pase.fecha_pase = pase.fecha_pase.substring(0, 10)
        setPase(pase);
        console.log("onPaseEdit pase", pase)
    }

    /* -------------------BORRA EL PASE------------------------------------ */
    const handlePaseDelete = async(paseId) => {
       const vectorPases=expedienteSeleccionado.pases;
          
        const updatedPases = vectorPases.filter((pase) => pase._id !== paseId);
   
         console.log("delete updatedPases",updatedPases);
            setExpedienteSeleccionado((prevExpediente) => ({
                ...prevExpediente,
                pases: updatedPases,
            }));
            let metodo="PUT"
            let response= await Peticiones (`${Global.url}/expedientes/${expedienteSeleccionado._id}`,  metodo, expedienteSeleccionado);

            let expedienteactualizado=response.datos.expediente;
            
             console.log("expediente luego de borrar",expedienteactualizado)
              setEditingPase(false)  /* salgo del modo edición */
 
    };
    return (

        <Grid container direction="row" sx={{ display: 'flex', justifyContent: 'between' }} spacing={2}  >
            {/*    <div> {JSON.stringify(expedienteSeleccionado)}</div>  */}
            <Grid item xs={12}>
                <Typography variant='h5' align='left' marginLeft='5%'>SELECCION DE EXPEDIENTES Y CARGA DE PASES</Typography>
            </Grid>
            {seleccionado && (
                <Grid item md={12} lg={12} sx={{ mr: "20px" }}  >
                    <ExpedientesDataGrid onSelectExpediente={handleExpedienteSelect} isEditing={isEditing} setIsEditing={setIsEditing} seleccionado={seleccionado} setSeleccionado={setSeleccionado}
                 /* pases={pases} setPases={setPases} */ />
                </Grid>
            )}

            {expedienteSeleccionado && !seleccionado && (
                <> <Grid item xs={12} md={4} >
                    <PasesCarga expediente={expedienteSeleccionado} handleExpedienteSelect={handleExpedienteSelect} setSeleccionado={setSeleccionado} pase={pase} onPaseAdd={handlePaseAdd} editingPase={editingPase} setEditingPase={setEditingPase} handlePaseEdit={handlePaseEdit} onPaseDelete={handlePaseDelete} />

                </Grid>


                    <Grid item xs={12} md={8} sx={{ alignContent: 'left' }} >
                        <ExpedienteCard
                            expediente={expedienteSeleccionado} pase={pase} onPaseEdit={onPaseEdit} onPaseDelete={handlePaseDelete} />

                    </Grid>
                </>
            )}

        </Grid>

    );
}


export default VistaPases;