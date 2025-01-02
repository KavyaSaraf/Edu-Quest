import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI("AIzaSyDvQ-GcNPtRj4SVvmb-fnlPe7EUGhA1Xhc");

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const model = genAI.getGenerativeModel({ model: "Gemini 1.5 Flash" });
    
    const chat = model.startChat({
      history: [],
      generationConfig: {
        maxOutputTokens: 1000,
      },
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();
    
    return NextResponse.json({ response: text });
  } catch (error) {
    console.error(`Error in chat API (${req.method} ${req.url}):`, error);
    return NextResponse.json(
      { error: 'Failed to process chat request' },
      { status: 500 }
    );
  }const { message } = await req.json();
  if (!message || typeof message !== 'string' || message.trim() === '') {
    return NextResponse.json(
      { error: 'Invalid request: message is required' },
      { status: 400 }
    );
  }
}
