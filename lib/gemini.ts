import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || 'AIzaSyDFH7x274InAdFpjJXfxk9b0d82XdGlngo');

export class GeminiService {
  private model;

  constructor() {
    this.model = genAI.getGenerativeModel({ model: "gemini-pro" });
  }

  async generateResponse(message: string): Promise<string> {
    try {
      const result = await this.model.generateContent(message);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw error;
    }
  }
}