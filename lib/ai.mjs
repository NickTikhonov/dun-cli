import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], 
});

export async function gpt(system, prompt) {
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'system', content: system }, { role: 'user', content: prompt }],
    model: 'gpt-3.5-turbo'
  });

  return chatCompletion.choices[0].message.content
}
