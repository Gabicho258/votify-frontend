import { Button } from "@mui/material";
import "./_ProcessHelp.scss";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useGetProcessByIdQuery } from "../../../app/votify.api";
import { useEffect } from "react";
import { useSpinner } from "../../../hooks/useSpinner";

export const ProcessHelp = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { data: currentProcess, isLoading } = useGetProcessByIdQuery(
    state?.process_id
  );
  const { Spinner, loading, setLoading } = useSpinner(true);
  useEffect(() => {
    if (!isLoading) {
      setLoading(false); // Terminar la carga cuando la petición haya finalizado
    }
  }, [isLoading, setLoading]);
  if (state === null) return <Navigate to={"/hub"} replace={true} />;
  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="processHelpContainer">
      <div className="processHelpContainer__content">
        <h2 className="processHelpContainer__content-title">Consideraciones</h2>
        <p className="processHelpContainer__content-indication">
          <ul>
            <li>
              Antes de confirmar sus votos y pasar a la siguiente lista
              asegúrese que sea el correcto.
            </li>
            <li>
              Si el proceso electoral termina mientras usted está realizando el
              voto, no se guardará su voto. Tome precauciones.
            </li>
            <li>
              Una vez haya realizado sus votos se mostrará un resumen para que
              verifique que sean los correctos, caso contrario puede volver a
              editar sus votos presionando en "Editar mis votos".
            </li>
            <li>
              Para finalizar debe presionar en "Confirmar mis votos" para enviar
              y confirmar sus votos.
            </li>
          </ul>
        </p>
        <div>
          <Button
            className="processHelpContainer__content-button"
            variant={"contained"}
            onClick={() =>
              navigate("/process-list", {
                state: {
                  process: currentProcess,
                  credential_id: state.credential_id,
                },
              })
            }
          >
            Comenzar
          </Button>
        </div>
      </div>
    </div>
  );
};
