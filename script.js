// AI Chat
async function askAI() {
  const prompt = document.getElementById('chatInput').value;
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer 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"
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }]
    })
  });
  const data = await response.json();
  document.getElementById('chatOutput').textContent = data.choices[0].message.content;
}
