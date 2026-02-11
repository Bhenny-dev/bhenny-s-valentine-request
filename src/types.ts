
export interface Message {
  id: number;
  sender: string;
  content: string;
  isBhenny: boolean;
}

export enum AppState {
  CLOSED = 'CLOSED',
  MESSAGE_1 = 'MESSAGE_1',
  MESSAGE_2 = 'MESSAGE_2',
  FINAL_MESSAGE = 'FINAL_MESSAGE',
  ACCEPTED = 'ACCEPTED'
}
