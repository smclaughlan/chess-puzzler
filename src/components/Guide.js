/* eslint-disable require-jsdoc */
import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@material-ui/core";
import GuideText from "./GuideText";

export default function Guide() {
  return (
    <div className="guide">
      <Accordion>
        <AccordionSummary>
          <Typography>Guide</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <GuideText />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
