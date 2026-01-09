/** LLM对话 */
export class LLMClient {
  private readonly apiKey: string = "sk-PBkeb4fQaHcwqBq8Da65D40dD1Da485d9dA7A23335Cd3bD4";
  private readonly baseUrl: string = "https://api.openai.com/v1/chat/completions";

  async generate(payload: any, retries: number = 5): Promise<any> {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(this.baseUrl, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`
          },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorBody = await response.json();
            throw new Error(`HTTP Error: ${response.status} - ${JSON.stringify(errorBody)}`);
        }
        
        return await response.json();
      } catch (error) {
        if (i === retries - 1) throw error;
        // 重试间隔: 1s, 2s, 4s, 8s, 16s
        const delay = Math.pow(2, i) * 1000;
        await new Promise(res => setTimeout(res, delay));
      }
    }
  }

  async ask(prompt: string, systemPrompt?: string, isJson: boolean = false): Promise<string> {
    const payload: any = {
      model: "gpt-3.5-turbo",
      messages: [
        ...(systemPrompt ? [{ role: "system", content: systemPrompt }] : []),
        { role: "user", content: prompt }
      ],
      temperature: 0.2
    };

    if (isJson) {
      payload.response_format = { type: "json_object" };
    }

    const result = await this.generate(payload);
    return result.choices?.[0]?.message?.content || "";
  }
}
