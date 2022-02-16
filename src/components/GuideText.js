import React from "react";
import ReactMarkdown from "react-markdown";

export default function GuideText() {
  const markdown = `### Move notation
  * Positions are specified by column letter first, row number second.
  * 'c5' would indicate column c, row 5.
  * When indicating a move, the starting position is first, followed by the destination.
  * 'c5 c6' indicates a movement from position c5 to c6.
  * If an opposing piece is in the destination position, that indicates a piece will be captured.`;

  return <ReactMarkdown children={markdown} />;
}
