import { db } from 'firebase/firebase';
import { v4 as uuidv4 } from 'uuid';
import {
  doc,
  arrayUnion,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';

type GetMessagesArgs = {
  userId: string;
  providerId: string;
};

export type Conversation = {
  id: string;
  providerId: string;
  userId: string;
  username?: string;
  providerName: string;
  messages: Message[];
};

export type Message = {
  id: string;
  message: string;
  sentBy: 'user' | 'provider';
  timestamp: Date;
  isSending?: boolean;
};

export type SendMessageArgs = {
  userId?: string;
  providerId?: string;
  message: string;
  sentBy: 'user' | 'provider';
  username?: string;
  providerName?: string;
  timestamp?: string;
};

export const sendFirstMessage = async ({
  userId,
  providerId,
  message,
  sentBy,
  providerName,
  username,
}: SendMessageArgs) => {
  const messagesRef = doc(db, 'messages', `${userId}${providerId}`);
  try {
    const docId = uuidv4();
    const newMessage = {
      id: uuidv4(),
      message,
      sentBy,
      timestamp: new Date().toISOString(),
    };
    const saveMessage = await setDoc(messagesRef, {
      id: docId,
      userId,
      username,
      providerId,
      providerName,
      messages: [newMessage],
    });
    return saveMessage;
  } catch (error) {
    console.error('Error sending message', error);
  }
};

export const sendMessage = async ({ userId, providerId, message, sentBy }: SendMessageArgs) => {
  const messagesRef = doc(db, 'messages', `${userId}${providerId}`);
  const newMessage = {
    id: uuidv4(),
    message,
    sentBy,
    timestamp: new Date().toISOString(),
  };
  try {
    await updateDoc(messagesRef, {
      messages: arrayUnion(newMessage),
    });

    return { success: true, message: newMessage };
  } catch (error) {
    console.error('Error sending message', error);
    throw error;
  }
};

export const getMessages = async ({
  userId,
  providerId,
}: GetMessagesArgs): Promise<Conversation> => {
  const messagesRef = doc(db, 'messages', `${userId}${providerId}`);
  const docSnap = await getDoc(messagesRef);

  const data = docSnap.data();
  const result = data;
  return result as Conversation;
};

type GetProviderInboxMessages = {
  providerId: string;
};

export const getProviderInboxMessages = async ({
  providerId,
}: GetProviderInboxMessages): Promise<Conversation[]> => {
  const messagesQuery = query(collection(db, 'messages'), where('providerId', '==', providerId));
  const querySnapshot = await getDocs(messagesQuery);

  const messages: Conversation[] = querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return { ...data } as Conversation;
  });

  return messages;
};

type GetUserInboxMessages = {
  userId: string;
};

export const getUserInboxMessages = async ({
  userId,
}: GetUserInboxMessages): Promise<Conversation[]> => {
  const messagesQuery = query(collection(db, 'messages'), where('userId', '==', userId));
  const querySnapshot = await getDocs(messagesQuery);

  const messages: Conversation[] = querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return { ...data } as Conversation;
  });

  return messages;
};
