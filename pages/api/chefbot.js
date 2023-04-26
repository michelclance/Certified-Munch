// Import necessary libraries
require("dotenv").config();
import { Configuration, OpenAIApi } from "openai";

// Set up OpenAI API client
const configuration = new Configuration({
  organization: "org-CB1XiswlHsCqcw5cobfQsfSp",
  apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);

// Chatbot function
const chatBot = async (messages) => {
  try {
    const response = await openai.createCompletion({
      model: "gpt-3.5-turbo",
      prompt: `User: ${messages.join("\nUser: ")}\nAssistant:`,
      max_tokens: 100,
      temperature: 0.5,
    });

    if (response.status === 200) {
      const message = response.data.choices[0].text.trim();
      return message;
    } else {
      throw new Error(`Unexpected status code: ${response.status}`);
    }
  } catch (error) {
    console.error(`Error with OpenAI API request: ${error.message}`);
    throw error;
  }
};

// API handler
export default async function handler(req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      },
    });
    return;
  }

  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    res.status(400).json({
      error: {
        message: "Please provide an array of messages in the request body",
      },
    });
    return;
  }

  try {
    const assistantResponse = await chatBot(messages);
    res.status(200).json({ assistant: assistantResponse });
  } catch (error) {
    console.error(`Error with OpenAI API request: ${error.message}`);
    res.status(500).json({
      error: {
        message: error.message,
      },
    });
  }
}
