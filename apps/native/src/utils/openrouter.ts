// utils/openrouter.ts

export async function getAIInvestmentAdvice(): Promise<string> {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_OPENROUTER_API_KEY}`, // 或者你也可以直接粘贴 key 进行测试
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:8083", // 本地开发时建议加上这个
        "X-Title": "PortfolioPal", // 自定义标题，方便你管理请求
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3-8b-instruct",
        messages: [
          {
            role: "user",
            content: "Give me one piece of investment advice.",
          },
        ],
      }),
    });

    const result = await response.json();

    const advice = result?.choices?.[0]?.message?.content;

    return advice ?? "No advice received.";
  } catch (error) {
    console.error("OpenRouter fetch failed:", error);
    return "Sorry, AI advice failed.";
  }
}
