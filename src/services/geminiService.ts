import { GoogleGenAI, Type } from "@google/genai";
import { IntelligenceBrief } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function synthesizeIntelligence(
  title: string,
  confidentiality: string,
  plannedContent: string,
  actualContent: string
): Promise<IntelligenceBrief> {
  const model = "gemini-3-flash-preview";
  
  const systemInstruction = `
    You are a high-level strategic intelligence analyst. 
    Your task is to analyze "Planned Content" (objectives, agenda) and "Actual Content" (meeting minutes, outcomes) 
    to produce a structured intelligence brief.

    Be clinical, precise, and professional. 
    Use the provided JSON schema to structure your response.
  `;

  const prompt = `
    Synthesize the following information:
    
    Brief Title: ${title}
    Confidentiality: ${confidentiality}
    
    Planned Content:
    ${plannedContent}
    
    Actual Content:
    ${actualContent}
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            referenceId: { type: Type.STRING },
            title: { type: Type.STRING },
            date: { type: Type.STRING },
            description: { type: Type.STRING },
            category: { type: Type.STRING },
            confidentiality: { type: Type.STRING },
            narrativeSynthesis: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "A narrative synthesis of the presentation's purpose vs. the actual outcome (at least 2 paragraphs)."
            },
            talkingPoints: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  content: { type: Type.STRING }
                },
                required: ["title", "content"]
              },
              description: "Significant topics discussed, ranked by prominence."
            },
            metadata: {
              type: Type.OBJECT,
              properties: {
                preparationDate: { type: Type.STRING },
                keyAttendees: { type: Type.ARRAY, items: { type: Type.STRING } },
                classification: { type: Type.STRING }
              },
              required: ["preparationDate", "keyAttendees", "classification"]
            },
            risks: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  label: { type: Type.STRING },
                  intensityLabel: { type: Type.STRING },
                  value: { type: Type.NUMBER },
                  color: { type: Type.STRING }
                },
                required: ["label", "intensityLabel", "value", "color"]
              },
              description: "Flag potential blockers, disagreements, or missed deadlines. Colors: bg-risk-red (High), bg-risk-amber (Moderate), bg-emerald-decision (Low)."
            },
            nextSteps: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  task: { type: Type.STRING },
                  completed: { type: Type.BOOLEAN }
                },
                required: ["id", "task", "completed"]
              },
              description: "Action items with owners if mentioned."
            },
            visualIdentityPrompt: { 
              type: Type.STRING,
              description: "A creative prompt for a cover image representing the meeting's core theme."
            }
          },
          required: [
            "id", "referenceId", "title", "date", "description", 
            "category", "confidentiality", "narrativeSynthesis", 
            "talkingPoints", "metadata", "risks", "nextSteps", 
            "visualIdentityPrompt"
          ]
        }
      }
    });

    const result = JSON.parse(response.text);
    return result as IntelligenceBrief;
  } catch (error) {
    console.error("AI Synthesis failed:", error);
    throw error;
  }
}
