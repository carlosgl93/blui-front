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

export type SendMessageArgs = {
  userId: string;
  providerId: string;
  message: string;
  sentBy: 'user' | 'provider';
  username?: string;
  providerName?: string;
};

export const sendFirstMessage = async ({
  userId,
  providerId,
  message,
  sentBy,
  username,
  providerName,
}: SendMessageArgs) => {
  const messagesRef = doc(db, 'messages', `${userId}${providerId}`);
  try {
    const newMessage = {
      id: uuidv4(),
      message,
      sentBy,
      timestamp: new Date().toISOString(),
      userId,
      providerId,
      username,
      providerName,
    };
    const saveMessage = await setDoc(messagesRef, {
      messages: [newMessage],
    });
    return saveMessage;
  } catch (error) {
    console.error('Error sending message', error);
  }
};

export const sendMessage = async ({
  userId,
  providerId,
  message,
  sentBy,
  username,
  providerName,
}: SendMessageArgs) => {
  const messagesRef = doc(db, 'messages', `${userId}${providerId}`);
  const newMessage = {
    id: uuidv4(),
    message,
    sentBy,
    timestamp: new Date().toISOString(),
    userId,
    providerId,
    username,
    providerName,
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

type GetMessagesArgs = {
  userId: string;
  providerId: string;
};

export type Message = {
  id: string;
  message: string;
  providerId: string;
  sentBy: 'user' | 'provider';
  timestamp: Date;
  userId: string;
  isSending?: boolean;
  username?: string;
  providerName: string;
};

export const getMessages = async ({ userId, providerId }: GetMessagesArgs): Promise<Message[]> => {
  const messagesRef = doc(db, 'messages', `${userId}${providerId}`);
  const docSnap = await getDoc(messagesRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    const result = data?.messages || [];
    return result as Message[];
  } else {
    console.log('No such document!');
    return [];
  }
};

type GetProviderInboxMessages = {
  providerId: string;
};

export const getProviderInboxMessages = async ({
  providerId,
}: GetProviderInboxMessages): Promise<Message[]> => {
  console.log({ providerId });
  const messagesQuery = query(collection(db, 'messages'), where('providerId', '==', providerId));
  const querySnapshot = await getDocs(messagesQuery);

  console.log('running');
  const messages: Message[] = [];
  querySnapshot.forEach((doc) => {
    console.log(doc);
    const data = doc.data();
    const result = data?.messages || [];
    messages.push(...result);
  });
  console.log('messages', messages);
  return messages;
};
