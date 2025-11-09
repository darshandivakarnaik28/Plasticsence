import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import OpenAI from "openai";
import { z } from "zod";

const classifyImageSchema = z.object({
  image: z.string(),
});

export async function registerRoutes(app: Express): Promise<Server> {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  app.post("/api/classify", async (req, res) => {
    try {
      const { image } = classifyImageSchema.parse(req.body);

      const startTime = Date.now();

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `You are an expert in plastic waste classification. Analyze this image and identify any plastic objects visible.

Classify the plastic into one of these resin identification codes:
1. PET (Polyethylene Terephthalate) - water bottles, soda bottles
2. HDPE (High-Density Polyethylene) - milk jugs, detergent bottles
3. PVC (Polyvinyl Chloride) - pipes, credit cards
4. LDPE (Low-Density Polyethylene) - plastic bags, squeezable bottles
5. PP (Polypropylene) - yogurt containers, bottle caps
6. PS (Polystyrene) - disposable cups, foam packaging
7. Other - mixed plastics, CDs, baby bottles

Respond ONLY with a JSON object in this exact format:
{
  "resinCode": <number 1-7>,
  "confidence": <number 0-100>,
  "plasticDetected": <boolean>,
  "reasoning": "<brief explanation>"
}

If no plastic is visible, set plasticDetected to false and resinCode to null.`,
              },
              {
                type: "image_url",
                image_url: {
                  url: image,
                },
              },
            ],
          },
        ],
        max_tokens: 300,
      });

      const content = response.choices[0]?.message?.content;
      if (!content) {
        return res.status(500).json({ error: "No response from AI" });
      }

      let result;
      try {
        result = JSON.parse(content);
      } catch (e) {
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          result = JSON.parse(jsonMatch[0]);
        } else {
          return res.status(500).json({ error: "Invalid AI response format" });
        }
      }

      const processingTime = Date.now() - startTime;

      res.json({
        resinCode: result.plasticDetected ? result.resinCode : null,
        confidence: result.confidence || 0,
        plasticDetected: result.plasticDetected,
        reasoning: result.reasoning,
        processingTime,
      });
    } catch (error) {
      console.error("Classification error:", error);
      res.status(500).json({
        error: error instanceof Error ? error.message : "Classification failed",
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
