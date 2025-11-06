import React, { useState } from "react";
import axios from "axios";

export default function CustomerChat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);

  async function sendFeedback(dishName, liked) {
    try {
      await axios.post("/api/feedback", { name: dishName, liked });
    } catch (err) {
      console.error("Feedback failed", err);
    }
  }

  async function send() {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setTyping(true);

    try {
      const res = await axios.post("/api/chat/query", { message: input });
      const dishes = res.data.answer?.slice(0, 3) || [];

      // Store REPLY + suggestions, not just text
      setMessages((prev) => [...prev, { sender: "ai", suggestions: dishes }]);

    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Oops 😕 Couldn't fetch suggestions. Try again." },
      ]);
    }

    setTyping(false);
    setInput("");
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>🍽️ FoodieAI — Your Menu Buddy</h2>

      <div style={styles.chatBox}>
        
        {messages.map((msg, i) => (
          <div key={i}>

            {/* USER TEXT */}
            {msg.sender === "user" && (
              <div style={{ ...styles.messageBubble, ...styles.userBubble }}>
                {msg.text}
              </div>
            )}

            {/* AI TEXT REPLY */}
            {msg.sender === "ai" && msg.text && (
              <div style={{ ...styles.messageBubble, ...styles.aiBubble }}>
                {msg.text}
              </div>
            )}

            {/* ✅ AI DISH SUGGESTION CARDS + FEEDBACK */}
            {msg.sender === "ai" && msg.suggestions && (
              <div style={{ marginTop: 10 }}>
                <div style={{ color: "#555", marginBottom: 6 }}>
                  Alright, here's what I’d recommend 👇
                </div>

                {msg.suggestions.map((dish, idx) => (
                  <div key={idx} style={styles.dishCard}>
                    <div style={{ fontWeight: 600, fontSize: 16 }}>
                      {dish.name} — ₹{dish.price}
                    </div>
                    <div style={{ fontSize: 14, marginTop: 6, color: "#555" }}>
                      {dish.description}
                    </div>

                    {/* Feedback Buttons */}
                    <div style={{ marginTop: 10, display: "flex", gap: 10 }}>
                      <button
                        onClick={() => sendFeedback(dish.name, true)}
                        style={styles.likeBtn}
                      >
                        👍 Like
                      </button>
                      <button
                        onClick={() => sendFeedback(dish.name, false)}
                        style={styles.dislikeBtn}
                      >
                        👎 Not good
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        ))}

        {typing && (
          <div style={{ ...styles.aiBubble, opacity: 0.7 }}>
            FoodieAI is typing...
          </div>
        )}
      </div>

      <div style={styles.inputWrapper}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Say something like: "bhai suggest something spicy under ₹120"'
          style={styles.input}
        />
        <button onClick={send} style={styles.sendBtn}>Send</button>
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: "700px", margin: "auto", padding: "12px", fontFamily: "Inter, sans-serif" },
  header: { textAlign: "center", marginBottom: 16 },
  chatBox: { border: "1px solid #ddd", borderRadius: 14, padding: 16, minHeight: "60vh", background: "#f7f9fc", overflowY: "auto" },

  messageBubble: { padding: "12px 14px", borderRadius: 12, marginBottom: 12, whiteSpace: "pre-line", maxWidth: "75%", lineHeight: 1.45 },
  userBubble: { background: "#d8e3ff", marginLeft: "auto" },
  aiBubble: { background: "#fff", marginRight: "auto" },

  dishCard: { background: "#fff", border: "1px solid #eee", padding: 14, borderRadius: 10, marginBottom: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" },
  
  likeBtn: { padding: "6px 12px", background: "#e8f8ed", color: "#008a3d", border: "1px solid #c9f0d5", borderRadius: 6, cursor: "pointer" },
  dislikeBtn: { padding: "6px 12px", background: "#ffe9e9", color: "#c60000", border: "1px solid #f7cccc", borderRadius: 6, cursor: "pointer" },

  inputWrapper: { display: "flex", gap: 8, marginTop: 14 },
  input: { flex: 1, padding: 14, borderRadius: 10, border: "1px solid #bbb", fontSize: 15 },
  sendBtn: { padding: "14px 18px", borderRadius: 10, background: "#111", color: "white", cursor: "pointer" },
};






