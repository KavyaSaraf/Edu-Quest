export interface ChatMessage {
  content: string;
  sender: 'user' | 'ai';
  isLoading?: boolean;
}

export interface QuickTopic {
    title: string;
    description: string;
    category: string;
}

export interface AITutorResponse {
    response: string;
}