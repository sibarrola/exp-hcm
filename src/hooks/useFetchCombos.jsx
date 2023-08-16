import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchCombos = (url) => {
  const [motivos, setMotivos] = useState([]);
  const [institucionesp, setInstitucionesp] = useState([]);
  const [organismos, setOrganismos] = useState([]);
  const [dems, setDems] = useState([]);

  // Funciones para obtener los datos-----------------------------------
  const fetchMotivos = async () => {
    const resMotivos = await axios.get(`${url}/motivos`);
    setMotivos(resMotivos.data.motivos);
  };

  const fetchInstituciones = async () => {
    const resInstituciones = await axios.get(`${url}/instituciones`);
    setInstitucionesp(resInstituciones.data.instituciones);
  };

  const fetchOrganismo = async () => {
    const resOrganismo = await axios.get(`${url}/organizaciones`);
    setOrganismos(resOrganismo.data.organizaciones);
  };

  const fetchDem = async () => {
    const resDems = await axios.get(`${url}/dems`);
    setDems(resDems.data.dems);
  };
   const estados_exp=["Estudio","Aprobado","Notificado Ejecut.","Finalizado","Archivado"];  /* lo hago en un vector directamente pues no van a cambiar.... */

  // Funciones para agregar nuevos elementos-----------------------------------
  const addMotivo = async (motivo) => {
    await axios.post(`${url}/motivos`, { motivo });
    fetchMotivos(); // Refrescar la lista
  };

  const addInstitucion = async (institucion) => {
    await axios.post(`${url}/instituciones`, { institucion });
    fetchInstituciones(); // Refrescar la lista
  };

  const addOrganismo = async (organismo) => {
    await axios.post(`${url}/organizaciones`, { organizacion: organismo });
    fetchOrganismo(); // Refrescar la lista
  };

  const addDem = async (dem) => {
    await axios.post(`${url}/dems`, { dem });
    fetchDem(); // Refrescar la lista
  };


  // Efecto para obtener los datos cuando el componente se monta
  useEffect(() => {
    fetchMotivos();
    fetchInstituciones();
    fetchOrganismo();
    fetchDem();
  }, [url]);

  return {
    motivos,
    institucionesp,
    organismos,
    dems,
    estados_exp,
    addMotivo,
    addInstitucion,
    addOrganismo,
    addDem,
  };
};

export default useFetchCombos;
