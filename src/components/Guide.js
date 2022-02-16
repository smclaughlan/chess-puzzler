/* eslint-disable require-jsdoc */
import React from "react";
import { Paper } from "@material-ui/core";
import GuideText from "./GuideText";

export default function Guide() {
  return (
    <Paper elevation={3} className="guide">
      <GuideText />
    </Paper>
  );
}
