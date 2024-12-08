"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Send, Bot } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { ChatMessage, QuickTopic } from '@/types/chat';
import ReactMarkdown from 'react-markdown';

export default function AITutorPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || loading) return;

    const userMessage: ChatMessage = {
      content: inputMessage,
      sender: 'user',
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputMessage }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      const aiMessage: ChatMessage = {
        content: data.response,
        sender: 'ai',
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: ChatMessage = {
        content: "Sorry, I couldn't process your request. Please try again.",
        sender: 'ai',
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">AI Tutor</h1>
        <Button variant="outline" onClick={() => setMessages([])}>Clear Chat</Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Chat with AI Tutor</CardTitle>
            <CardDescription>Get instant help with your questions</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[500px] pr-4 mb-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className="flex items-start gap-3 max-w-[80%]">
                      {message.sender === 'ai' && (
                        <Avatar>
                          <AvatarImage src="/ai-avatar.png" alt="AI" />
                          <AvatarFallback>AI</AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={`rounded-lg p-4 ${
                          message.sender === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        <ReactMarkdown 
                          className="text-sm prose dark:prose-invert max-w-none"
                          components={{
                            pre: ({node, ...props}) => (
                              <div className="overflow-auto my-2 bg-secondary p-2 rounded-md">
                                <pre {...props} />
                              </div>
                            ),
                            code: ({node, ...props}) => (
                              <code className="bg-secondary px-1 rounded-sm" {...props} />
                            ),
                          }}
                        >
                          {message.content}
                        </ReactMarkdown>
                      </div>
                      {message.sender === 'user' && (
                        <Avatar>
                          <AvatarImage src="/user-avatar.png" alt="User" />
                          <AvatarFallback>ME</AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="flex gap-2">
              <Input
                placeholder="Type your question here..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                disabled={loading}
              />
              <Button onClick={handleSendMessage} disabled={loading}>
                {loading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-black bg-white" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Topics</CardTitle>
            <CardDescription>Common topics for instant help</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {quickTopics.map((topic, index) => (
                <Card 
                  key={index} 
                  className="cursor-pointer hover:bg-accent transition-colors"
                  onClick={() => setInputMessage(topic.title)}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <Bot className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">{topic.title}</p>
                        <p className="text-sm text-muted-foreground mt-1">{topic.description}</p>
                        <Badge variant="secondary" className="mt-2">{topic.category}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

const quickTopics: QuickTopic[] = [
  {
    title: "Machine Learning Basics",
    description: "Get help with fundamental ML concepts",
    category: "Beginner",
  },
  {
    title: "Neural Networks",
    description: "Understanding deep learning architecture",
    category: "Intermediate",
  },
  {
    title: "Python Programming",
    description: "Help with coding exercises",
    category: "Programming",
  },
];