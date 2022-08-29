import "css/Animation.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-regular-svg-icons";

const OpenSource = ({ ...props }) => {
  const { onBackClick } = props;

  return (
    <div className="moveRightToLeft min-h-screen">
      <div className="fixed top-0 z-10 w-full h-14 px-5 p-3 flex  items-center shadow bg-white">
        <button onClick={onBackClick}>
          <FontAwesomeIcon icon={faChevronLeft} size="lg" />
        </button>
      </div>
      <div className="pt-20 px-5">
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            Accordion 1
          </AccordionSummary>
          <AccordionDetails>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            Accordion 2
          </AccordionSummary>
          <AccordionDetails>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </AccordionDetails>
        </Accordion>
        <Accordion disabled>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            Disabled Accordion
          </AccordionSummary>
        </Accordion>
      </div>
    </div>
  );
};

export default OpenSource;
