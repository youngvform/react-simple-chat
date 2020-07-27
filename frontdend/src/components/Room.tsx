import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { actions } from "../store/action";
import { useDispatch } from "react-redux";
import { useChatState } from "../hooks/useChatState";
import ErrorMessage from "../styles/ErrorMessage";

function Room() {
  const { id } = useParams();
  const { messages, getMessagesError } = useChatState();
  const dispatch = useDispatch();

  console.log({ messages });
  useEffect(() => {
    dispatch(actions.getMessagesRequest(id));
  }, [id]);
  return (
    <div>
      {getMessagesError && <ErrorMessage>{getMessagesError}</ErrorMessage>}
    </div>
  );
}

export default Room;
