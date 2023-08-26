 
import FormularioMotivos from "../componentes/listas_combos/FormularioMotivos"
import InstitucionesForm from "../componentes/listas_combos/InstitucionesForm";
import OrganismosForm from "../componentes/listas_combos/OrganismosForm";
import DemForm from "../componentes/listas_combos/DemForm";
import LayoutPrivado  from "../layout/LayoutPrivado"
import EstacionesForm from "../componentes/listas_combos/EstacionesForm";
 
 
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
      case '5':
                formulario = <EstacionesForm />;
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