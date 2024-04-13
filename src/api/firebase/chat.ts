import { db } from 'firebase/firebase';
import { doc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';

type SendMessageArgs = {
  userId: string;
  providerId: string;
  message: string;
  sentBy: 'user' | 'provider';
};

export const sendMessage = async ({ userId, providerId, message, sentBy }: SendMessageArgs) => {
  const messagesRef = doc(db, 'messages', `${userId}${providerId}`);
  try {
    const newMessage = {
      id: messagesRef.id,
      message,
      sentBy,
      timestamp: new Date().toISOString(),
      userId,
      providerId,
    };
    const saveMessage = await updateDoc(messagesRef, {
      messages: arrayUnion(newMessage),
    });
    return saveMessage;
  } catch (error) {
    console.error('Error sending message', error);
  }
};
type GetMessagesArgs = {
  userId: string;
  providerId: string;
};

type Message = {
  id: string;
  message: string;
  providerId: string;
  sentBy: 'user' | 'provider';
  timestamp: Date;
  userId: string;
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
