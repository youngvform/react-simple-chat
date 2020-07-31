export interface MessageType {
  id: number;
  message: string;
  sendDate: string;
  isMine?: boolean;
}

export interface ChatType {
  id: string;
  name: string;
}
