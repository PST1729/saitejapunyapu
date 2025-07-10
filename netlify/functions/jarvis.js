// netlify/functions/jarvis.js

const fetch = require("node-fetch");

exports.handler = async function(event, context) {
  try {
    const payload = JSON.parse(event.body);

    const response = await fetch("https://financeops-azure-openai-backup.openai.azure.com/openai/deployments/financeops-azure-openai-backup/chat/completions?api-version=2024-04-01-preview", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.OPENAI_API_KEY // Secret key here
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (err) {
    console.error("Function error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" })
    };
  }
};
