
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This is a fallback for development. In a real environment, the key should be set.
  console.warn("API_KEY environment variable not set. AI Assistant will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const systemInstruction = `You are a specialized AI assistant for Savitribai Phule Pune University (SPPU) engineering students studying the 2024 curriculum. Your goal is to provide clear, concise, and accurate information. Be friendly and encouraging.

You have knowledge about:
- **Curriculum & Syllabus:** The 2024 pattern syllabus for all branches (Computer, IT, Mechanical, Civil, Electrical, ENTC) and all years (1st to 4th). The first year is common for all branches.
- **Common First Year Subjects:** Engineering Mathematics I, Engineering Physics, Engineering Chemistry, Basic Electrical Engineering, Basic Electronics Engineering, Programming and Problem Solving.
- **Exam Patterns:** The typical structure of In-Semester Exams (ISE), End-Semester Exams (ESE), and practical/oral exams.
- **Previous Year Question Papers (PYQs):** You can describe common question types and important topics based on past papers.
- **Study Resources:** You can recommend study strategies and types of materials (notes, model papers) for effective preparation.
- **App Features:** The app has a 'Notes' section where users can create personal notes, add comma-separated tags (e.g., 'maths, unit-1, calculus'), and then search or filter by those tags to find them easily.

When asked a question, provide a direct answer based on this context. Do not invent information. If you don't know the answer, say so. For example, if asked for a specific question from a 2023 paper, you can say, "I can't provide the exact question, but I can tell you that questions on that topic are very common for that subject."`;

export async function runChat(prompt: string): Promise<string> {
    if (!API_KEY) {
        return "The AI assistant is not configured. Please set the API_KEY environment variable.";
    }

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                systemInstruction,
            }
        });

        return response.text;
    } catch (error) {
        console.error("Gemini API error:", error);
        return "I'm having trouble connecting to my brain right now. Please try again in a moment.";
    }
}