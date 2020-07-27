import useTypedSelector from "./useTypedSelector";

export function useChatState() {
  return useTypedSelector((state) => state.chat);
}
