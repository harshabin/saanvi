
import { GoogleGenAI } from "@google/genai";
import { Product } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("Gemini API key not found. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const getStyleAdvice = async (occasion: string, products: Product[]): Promise<string> => {
  if (!API_KEY) {
    return Promise.resolve("The AI Style Advisor is currently unavailable. Please ensure the API key is configured.");
  }

  const productList = products.map(p => `- ${p.name}: ${p.description} (Price: $${p.price})`).join('\n');

  const prompt = `
    You are an expert fashion stylist for a clothing brand named 'Sanvi Creation'.
    A customer is looking for an outfit for the following occasion: "${occasion}".

    Based on the following available products, please recommend a complete outfit (e.g., top, bottom, outerwear).
    Describe why the chosen items work well together for the occasion.
    Be enthusiastic, helpful, and make sure to mention the product names exactly as they appear in the list.
    If no suitable products are available, politely inform the customer.

    Available Products:
    ${productList}

    Your recommendation:
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching style advice from Gemini:", error);
    return "I'm sorry, I encountered an issue while generating advice. Please try again later.";
  }
};
