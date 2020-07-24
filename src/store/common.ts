interface TypedAction {
  type: string;
}

interface TypedPayloadAction<T> extends TypedAction {
  payload: T;
}
