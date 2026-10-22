// チャット系api
import apiClient from './client';
import type { ChatSessionResult, ChatMessageResult } from './types';

export const startChatSession = async (
  sessionId: string,
  paintingId: string,
  language: string = 'ja'
): Promise<ChatSessionResult> => {
  const response = await apiClient.post('/chat/start', {
    session_id: sessionId,
    painting_id: paintingId,
    language
  });
  return response.data;
};

export const sendChatMessage = async (
  sessionId: string,
  message: string
): Promise<ChatMessageResult> => {
  const response = await apiClient.post('/chat/message', {
    session_id: sessionId,
    message
  });
  return response.data;
};