import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { actions } from "../store/action";
import { CustomLink } from "../styles/CustomLink";

const Container = styled.header`
  display: flex;
  background: yellow;
  padding: 0 1rem;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h2`
  flex: 1;
  cursor: pointer;
`;

const Button = styled.button`
  flex: 0;
  font-size: 1rem;
  cursor: pointer;
  height: 1.5rem;
  background: none;
  border: none;
`;

function Header() {
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  const onOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, []);
  const onCreate = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (name.trim()) {
        console.log({ name });
        dispatch(actions.createChat(name));
        setName("");
        setOpen(false);
      }
    },
    [dispatch, name]
  );

  return (
    <Container>
      <Title>
        <CustomLink to="/">React Chat</CustomLink>
      </Title>
      {!open && <Button onClick={onOpen}>Create</Button>}
      {open && (
        <form onSubmit={onCreate}>
          <input type="text" value={name} onChange={onChange} ref={inputRef} />
          <Button type="submit">Create!</Button>
        </form>
      )}
    </Container>
  );
}

export default Header;
