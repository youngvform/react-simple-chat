import React from "react";
import { useParams } from "react-router-dom";

function Room() {
  const { id } = useParams();
  console.log({ id });
  return <div>ROOOM</div>;
}

export default Room;
