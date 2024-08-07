import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { VoteSummaryListItem } from "../../../components/VoteSummaryListItem/VoteSummaryListItem";
import "./_VotesSummary.scss";
import { Button } from "@mui/material";
import { ICandidate } from "../../../interfaces";
import {
  useAddVoteByCandidateIdMutation,
  useUpdateCredentialUsedMutation,
} from "../../../app/votify.api";
import { useAlert } from "../../../hooks/useAlert";

export const VotesSummary = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const handleEditVotes = () => {
    navigate("/process-list", { state: state });
  };
  const [addVoteByCandidateId] = useAddVoteByCandidateIdMutation();
  const [updateCredentialUsed] = useUpdateCredentialUsedMutation();
  // const [updateCandidate]
  const endDate = new Date(state.process.end_date);
  const { SnackbarComponent, showSnackbar } = useAlert();
  const handleConfirmVotes = async () => {
    const now = new Date();
    if (now >= endDate) {
      showSnackbar("El proceso ya ha cerrado.", "error");
      setTimeout(() => {
        window.location.href = "/hub";
        // navigate("/hub", { replace: true });
      }, 1000);
      return;
    }
    (state?.candidates as ICandidate[]).forEach(async (candidate) => {
      await addVoteByCandidateId(candidate?._id || "");
    });
    await updateCredentialUsed(state?.credential_id);
    navigate("/hub", { replace: true });
  };
  console.log(endDate);
  console.log(state);
  if (state === null) return <Navigate to={"/hub"} replace={true} />;

  // const votes = [
  //   {
  //     title: "Lista 1",
  //     candidate_name: "John Doe",
  //     organization_name: "Organización 1",
  //     photo_url:
  //       "https://i.pinimg.com/originals/c7/a9/40/c7a9408babdc2852a48191ab83a5944b.jpg",
  //     logo_url:
  //       "https://png.pngtree.com/png-clipart/20221214/ourlarge/pngtree-shovel-clipart-png-image_6522991.png",
  //   },
  //   {
  //     title: "Lista 1",
  //     candidate_name: "John Doe",
  //     organization_name: "Organización 1",
  //     photo_url:
  //       "https://i.pinimg.com/originals/c7/a9/40/c7a9408babdc2852a48191ab83a5944b.jpg",
  //     logo_url:
  //       "https://png.pngtree.com/png-clipart/20221214/ourlarge/pngtree-shovel-clipart-png-image_6522991.png",
  //   },
  //   {
  //     title: "Lista 1",
  //     candidate_name: "null",
  //     organization_name: "",
  //     photo_url: "",
  //     logo_url: "",
  //   },
  //   {
  //     title: "Lista 1",
  //     candidate_name: "John Doe",
  //     organization_name: "Organización 1",
  //     photo_url:
  //       "https://i.pinimg.com/originals/c7/a9/40/c7a9408babdc2852a48191ab83a5944b.jpg",
  //     logo_url:
  //       "https://png.pngtree.com/png-clipart/20221214/ourlarge/pngtree-shovel-clipart-png-image_6522991.png",
  //   },
  //   {
  //     title: "Lista 1",
  //     candidate_name: "John Doe",
  //     organization_name: "Organización 1",
  //     photo_url:
  //       "https://i.pinimg.com/originals/c7/a9/40/c7a9408babdc2852a48191ab83a5944b.jpg",
  //     logo_url:
  //       "https://png.pngtree.com/png-clipart/20221214/ourlarge/pngtree-shovel-clipart-png-image_6522991.png",
  //   },
  //   {
  //     title: "Lista 1",
  //     candidate_name: "John Doe",
  //     organization_name: "Organización 1",
  //     photo_url:
  //       "https://i.pinimg.com/originals/c7/a9/40/c7a9408babdc2852a48191ab83a5944b.jpg",
  //     logo_url:
  //       "https://png.pngtree.com/png-clipart/20221214/ourlarge/pngtree-shovel-clipart-png-image_6522991.png",
  //   },
  //   {
  //     title: "Lista 1",
  //     candidate_name: "John Doe",
  //     organization_name: "Organización 1",
  //     photo_url:
  //       "https://i.pinimg.com/originals/c7/a9/40/c7a9408babdc2852a48191ab83a5944b.jpg",
  //     logo_url:
  //       "https://png.pngtree.com/png-clipart/20221214/ourlarge/pngtree-shovel-clipart-png-image_6522991.png",
  //   },
  // ];
  return (
    <div className="containerVotesSummary">
      <SnackbarComponent />
      <div className="containerVotesSummary__title">Resumen de votos</div>
      <div className="containerVotesSummary__votes">
        {(state.candidates as ICandidate[])?.map((vote, index) => (
          <VoteSummaryListItem
            key={vote._id}
            {...{ ...vote, title: state.lists[index].title }}
          />
        ))}
      </div>
      <div className="containerVotesSummary__buttons">
        <Button
          variant="outlined"
          className="containerVotesSummary__buttons-edit"
          onClick={handleEditVotes}
        >
          Editar mis votos
        </Button>
        <Button
          variant="outlined"
          className="containerVotesSummary__buttons-confirm"
          onClick={handleConfirmVotes}
        >
          Confirmar mis votos
        </Button>
      </div>
    </div>
  );
};
