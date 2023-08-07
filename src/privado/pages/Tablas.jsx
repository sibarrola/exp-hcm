 
import FormularioMotivos from "../componentes/FormularioMotivos"
import InstitucionesForm from "../componentes/InstitucionesForm";
import OrganismosForm from "../componentes/OrganismosForm";
import DemForm from "../componentes/DemForm";
import LayoutPrivado  from "../layout/LayoutPrivado"
 
import { useParams } from 'react-router-dom';

const Tablas = () => {
  let { nro } = useParams();

  let formulario;
  switch (nro) {
    case '1':
        formulario = <FormularioMotivos />;
        break;
    case '2':
        formulario = <InstitucionesForm />;
        break;

        case '3':
        formulario = <OrganismosForm />;
        break;

        case '4':
            formulario = <DemForm />;
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