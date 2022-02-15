/* eslint-disable require-jsdoc */
import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@material-ui/core";

export default function Guide() {
  return (
    <div>
      <Accordion>
        <AccordionSummary>
          <Typography>Guide</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Guide Text. More text.</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
