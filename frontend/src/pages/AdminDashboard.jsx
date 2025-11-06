import React, { useState, useEffect } from "react";
import axios from "axios";

// ---- BUTTON STYLES (Top-level, defined ONCE) ----
const btnBlue = {
  padding: "10px 14px",
  background: "#2563eb",
  border: "none",
  borderRadius: "8px",
  color: "white",
  cursor: "pointer",
  fontWeight: 500
};

const btnGreen = {
  padding: "10px 14px",
  background: "#16a34a",
  border: "none",
  borderRadius: "8px",
  color: "white",
  cursor: "pointer",
  fontWeight: 500
};

const btnRed = {
  padding: "10px 14px",
  background: "#dc2626",
  border: "none",
  borderRadius: "8px",
  color: "white",
  cursor: "pointer",
  fontWeight: 500
};

export default function AdminDashboard() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [menuBlurb, setMenuBlurb] = useState("");
  const [allergens, setAllergens] = useState("");
  const [pairings, setPairings] = useState("");
  const [instagramCaption, setInstagramCaption] = useState("");
  const [whatsappPromo, setWhatsappPromo] = useState("");
  const [menuList, setMenuList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [analytics, setAnalytics] = useState(null);

  const inputStyle = {
    width: '100%',
    padding: '10px',
    border: '1px solid #cbd5e1',
    borderRadius: '8px',
    fontSize: '14px'
  };

  const labelStyle = {
    display: 'block',
    fontWeight: 600,
    marginBottom: '6px',
    fontSize: '14px'
  };

  useEffect(() => { fetchMenuList(); }, []);

  async function fetchMenuList() {
    const res = await axios.get("/api/menu");
    setMenuList(res.data || []);
  }

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [file]);

  async function loadAnalytics() {
    const res = await axios.get("/api/analytics");
    setAnalytics(res.data);
  }

  async function generate() {
    if (!name || !price || !ingredients) return alert("Fill all fields first.");
    setLoading(true);
    try {
      const form = new FormData();
      if (file) form.append("photo", file);
      form.append("name", name);
      form.append("price", price);
      form.append("ingredients", ingredients);

      const res = await axios.post("/api/admin/generate", form);
      const ai = res.data.ai || {};
      setMenuBlurb(ai.menuBlurb || "");
      setAllergens(ai.allergens || "");
      setPairings(ai.pairings || "");
      setInstagramCaption(ai.instagramCaption || "");
      setWhatsappPromo(ai.whatsappPromo || "");
    } finally { setLoading(false); }
  }

  async function save() {
    const ingredientsArray = ingredients
      .split(',')
      .map(i => i.trim())
      .filter(i => i);

    await axios.post("/api/menu", {
      name,
      price: Number(price),
      ingredients: ingredientsArray,
      description: menuBlurb,
      allergens,
      pairings,
      instagramCaption,
      whatsappPromo,
      photoUrl: previewUrl,
    });

    fetchMenuList();
    alert("✅ Saved!");
  }

  async function removeItem(id) {
    await axios.delete(`/api/menu/${id}`);
    fetchMenuList();
  }

  return (
    <div style={{ fontFamily: "Inter, sans-serif", padding: "30px" }}>

      {/* HEADER */}
      <div style={{
        textAlign: "center",
        padding: "20px 0 40px",
        background: "linear-gradient(135deg, #3b82f6, #60a5fa)",
        borderRadius: "14px",
        color: "white",
        marginBottom: "40px"
      }}>
        <h1 style={{ margin: 0, fontSize: "28px" }}>🍽️ FoodieAI — Menu Dashboard</h1>
        <p style={{ marginTop: "6px", opacity: 0.9 }}>Manage your restaurant menu with AI assistance</p>
      </div>

      {/* ANALYTICS BUTTON */}
      <button onClick={loadAnalytics} style={{ ...btnBlue, marginBottom: 20 }}>
        📊 View Analytics
      </button>

      {/* FORM */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "20px",
        padding: "24px",
        border: "1px solid #dbeafe",
        borderRadius: "12px",
        background: "#f8fbff",
        boxShadow: "0 3px 12px rgba(0,0,0,0.05)",
        marginBottom: "40px"
      }}>

        {/* LEFT */}
        <div>
          <label style={labelStyle}>Dish Name</label>
          <input style={inputStyle} value={name} onChange={e => setName(e.target.value)} />

          <label style={{ ...labelStyle, marginTop: 16 }}>Price (₹)</label>
          <input style={inputStyle} type="number" value={price} onChange={e => setPrice(e.target.value)} />

          <label style={{ ...labelStyle, marginTop: 16 }}>Ingredients (comma-separated)</label>
          <textarea style={{ ...inputStyle, minHeight: 70 }} value={ingredients} onChange={e => setIngredients(e.target.value)} />

          <label style={{ ...labelStyle, marginTop: 16 }}>Dish Photo</label>
          <input type="file" onChange={e => setFile(e.target.files[0])} />
          {previewUrl && <img src={previewUrl} style={{ marginTop: 10, width: "100%", borderRadius: 8 }} />}

          <button onClick={generate} style={{ ...btnBlue, marginTop: 15 }} disabled={loading}>
            {loading ? "Generating..." : "⚡ Generate AI Description"}
          </button>
        </div>

        {/* RIGHT */}
        <div>
          <label style={labelStyle}>Menu Description</label>
          <textarea style={{ ...inputStyle, minHeight: 100 }} value={menuBlurb} onChange={e => setMenuBlurb(e.target.value)} />

          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            <input style={inputStyle} placeholder="Allergens" value={allergens} onChange={e => setAllergens(e.target.value)} />
            <input style={inputStyle} placeholder="Pairings" value={pairings} onChange={e => setPairings(e.target.value)} />
          </div>

          <input style={{ ...inputStyle, marginTop: 16 }} placeholder="Instagram Caption" value={instagramCaption} onChange={e => setInstagramCaption(e.target.value)} />
          <input style={{ ...inputStyle, marginTop: 16 }} placeholder="WhatsApp Promo" value={whatsappPromo} onChange={e => setWhatsappPromo(e.target.value)} />

          <button onClick={save} style={{ ...btnGreen, marginTop: 15 }}>✅ Save to Menu</button>
        </div>
      </div>

      {/* ANALYTICS & PERFORMANCE */}
      <h2 style={{ marginBottom: 14 }}>📊 Dish Performance</h2>

      <div style={{ display: "grid", gap: "14px" }}>
        {menuList
          .sort((a, b) => (b.likes - b.dislikes) - (a.likes - a.dislikes))
          .map(item => (
            <div key={item._id} style={{
              padding: "16px",
              borderRadius: "12px",
              background: "white",
              border: "1px solid #e5eaf5",
              boxShadow: "0 2px 6px rgba(0,0,20,0.05)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <div>
                <b>{item.name}</b> — ₹{item.price}
                <div style={{ color: "#666", marginTop: 4 }}>{item.description}</div>
                <div style={{ marginTop: 4 }}>👍 {item.likes} | 👎 {item.dislikes}</div>
              </div>
              <button onClick={() => removeItem(item._id)} style={btnRed}>Delete</button>
            </div>
          ))}

        {analytics && (
          <div style={{ marginTop: 20, padding: 18, borderRadius: 12, background: "white", border: "1px solid #e5eaf5" }}>
            <h3>📌 Insights</h3>

            <h4>🏆 Most Loved</h4>
            {analytics.mostLoved.map(i => (
              <div key={i._id}>{i.name} — Score {i.likes - i.dislikes}</div>
            ))}

            <h4 style={{ marginTop: 20 }}>⚠️ Needs Improvement</h4>
            {analytics.mostDisliked.map(i => (
              <div key={i._id}>{i.name} — Score {i.likes - i.dislikes}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


