import Accordion from "@mui/material/Accordion";
import "./_AccordionElectionList.scss";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { IList } from "../../interfaces";
import { useGetCandidatesByListIdQuery } from "../../app/votify.api";

interface AccordionElectionListProps {
  list: IList;
}

export const AccordionElectionList = ({ list }: AccordionElectionListProps) => {
  const { title } = list;
  const { data: candidates } = useGetCandidatesByListIdQuery(list._id);
  return (
    <Accordion className="containerAccordionElectionList">
      <AccordionSummary
        expandIcon={
          <ExpandMoreIcon className="containerAccordionElectionList__summary-icon" />
        }
        className="containerAccordionElectionList__summary"
      >
        {title}
      </AccordionSummary>
      <AccordionDetails className="containerAccordionElectionList__details">
        {candidates?.map((candidate) => {
          const { candidate_name, photo_url, organization_name, logo_url } =
            candidate;
          return (
            <div
              key={candidate._id}
              className="containerAccordionElectionList__details-candidate"
            >
              <div className="containerAccordionElectionList__details-candidate-content">
                <div className="containerAccordionElectionList__details-candidate-content-info">
                  <div className="containerAccordionElectionList__details-candidate-content-info-name">
                    {candidate_name}
                  </div>
                  <div className="containerAccordionElectionList__details-candidate-content-info-organization">
                    {organization_name}
                  </div>
                </div>
                <div className="containerAccordionElectionList__details-candidate-content-photos">
                  <img
                    className="containerAccordionElectionList__details-candidate-content-photos-candidate"
                    src={photo_url}
                  />
                  <img
                    className="containerAccordionElectionList__details-candidate-content-photos-organization"
                    src={logo_url}
                  />
                </div>
              </div>
              <hr className="containerAccordionElectionList__details-candidate-divider" />
            </div>
          );
        })}
      </AccordionDetails>
    </Accordion>
  );
};
