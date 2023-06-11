import { ChatGPTMessage } from "./openAIStream";

const jwt = require('jsonwebtoken')

export default async function chatglm(messages: ChatGPTMessage[]) {

  const payload: any = {
    model: 'chatglm_6b',
    prompt: messages,
    temperature: 0.7,
    top_p: 1,
    max_tokens: 800,
  };

  const apikey = process.env.GLM_API_KEY!;
  const [key, secret] = apikey.split('.')

  const token = jwt.sign({ 
    "api_key": key,
    "exp": new Date().getTime() + 3000,
    "timestamp": new Date().getTime(),
   }, secret, { algorithm: 'HS256', header: { sign_type: "SIGN"  }});
   
  const response = await fetch("https://open.bigmodel.cn/api/paas/v3/model-api/chatglm_6b/invoke", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token ?? ""}`,
    },
    method: "POST",
    body: JSON.stringify(payload),
  });
  return await response.json();
}