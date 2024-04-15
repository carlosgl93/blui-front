import { Message } from '@/api/firebase/chat';
import { atom } from 'recoil';

export const chatState = atom<Message[]>({
  key: 'chatState',
  default: [],
});
