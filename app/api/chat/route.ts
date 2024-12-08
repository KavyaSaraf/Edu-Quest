import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI("AIzaSyDwkluoxvdIOYaRqIRVUj0gjsjZtvKgI8c");

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
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
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Failed to process chat request' },
      { status: 500 }
    );
  }
}