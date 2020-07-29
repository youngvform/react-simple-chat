import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { actions } from "../store/action";
import { useDispatch } from "react-redux";
import { useChatState } from "../hooks/useChatState";
import ErrorMessage from "../styles/ErrorMessage";
import Header from "./Header";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;
const Contents = styled.div`
  height: 100%;
  width: 100%;
  flex: 1;
`;

const SendLayer = styled.form`
  display: flex;
`;

const Input = styled.input`
  height: 2rem;
  padding: 0.25rem;
  font-size: 1.5rem;
  border: none;
  border-top: 5px solid gold;
  width: 100%;
  flex: 1;
`;

const SendButton = styled.button`
  background: none;
  width: 15%;
  border: none;
  border-top: 5px solid gold;
  border-left: 5px solid gold;
  font-size: 1.5rem;
  cursor: pointer;
`;

function Room() {
  const [text, setText] = useState("");
  const { messages, messagingError } = useChatState();
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getMessagesRequest(id));
  }, [id]);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setText(e.target.value);
    },
    [text]
  );

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (text.trim()) {
        // send
        dispatch(actions.sendMessageRequest({ chatId: id, messageText: text }));
        setText("");
      }
    },
    [id, text]
  );

  return (
    <Container>
      <Header />
      <Contents>
        {messagingError && <ErrorMessage>{messagingError}</ErrorMessage>}
        <div>{messages.map((message) => message.message)}</div>
      </Contents>
      <SendLayer onSubmit={onSubmit}>
        <Input onChange={onChange} value={text} />
        <SendButton type="submit">Send!</SendButton>
      </SendLayer>
    </Container>
  );
}

export default Room;
