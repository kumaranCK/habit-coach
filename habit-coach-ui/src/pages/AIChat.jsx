import React, { useState } from "react";
import { askAI } from "../api";

export default function AIChat() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const { data } = await askAI(prompt);
      setResponse(data);
    } catch (error) {
      console.error("AI error:", error);
      setResponse("❌ Error: Could not connect to AI service. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">🤖 AI Habit Coach</h2>

      <textarea
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
        rows="4"
        placeholder="Ask me about building better habits..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button
        onClick={handleAsk}
        disabled={loading}
        className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
      >
        {loading ? "Thinking..." : "Ask AI"}
      </button>

      {response && (
        <div className="mt-6 p-4 bg-gray-100 border rounded-lg w-full whitespace-pre-line">
          <strong>AI Response:</strong>
          <p className="mt-2">{response}</p>
        </div>
      )}
    </div>
  );
}
