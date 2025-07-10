// netlify/functions/jarvis.js

const fetch = require("node-fetch");

exports.handler = async function(event, context) {
  // CORS headers - THIS IS THE KEY FIX
  const headers = {
    'Access-Control-Allow-Origin': '*', // Allow all origins
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    // Add safety check for empty body
    if (!event.body) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Request body is required" })
      };
    }

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
      headers, // Include CORS headers in response
      body: JSON.stringify(data)
    };
  } catch (err) {
    console.error("Function error:", err);
    return {
      statusCode: 500,
      headers, // Include CORS headers in error response too
      body: JSON.stringify({ error: "Internal Server Error" })
    };
  }
};