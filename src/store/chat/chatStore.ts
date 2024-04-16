import { Conversation, Message } from '@/api/firebase/chat';
import { atom } from 'recoil';

export const chatState = atom<Conversation>({
  key: 'chatState',
  default: {
    id: '',
    providerId: '',
    userId: '',
    providerName: '',
    messages: [],
  },
});

export const prestadorChat = atom<Message[]>({
  key: 'prestadorChatState',
  default: [],
});
