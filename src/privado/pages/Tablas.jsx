 
import FormularioMotivos from "../componentes/FormularioMotivos"
import LayoutPrivado  from "../layout/LayoutPrivado"
import CargaExpedientes from "./CargaExpedientes";

import { useParams } from 'react-router-dom';

const Tablas = () => {
  let { nro } = useParams();

  let formulario;
  switch (nro) {
    case '1':
        formulario = <FormularioMotivos />;
        break;
    case '2':
        formulario = <CargaExpedientes />;
        break;
    default:
        formulario = <div>No se especificó un parámetro válido.</div>;
  }

  return (
     
        <LayoutPrivado>
        {formulario}  
       
    </LayoutPrivado>
  );
}
export default Tablas