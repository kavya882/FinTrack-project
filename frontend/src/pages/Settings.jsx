import React, { useState } from "react";

function Settings() {
  const [profile, setProfile] = useState({
    username: localStorage.getItem("username") || "User",
    currency: "INR",
  });

  return (
    <div className="page-container">
      <h2>Settings</h2>
      
      <div className="form-card" style={{ maxWidth: "600px" }}>
        <h3>Profile Preferences</h3>
        <p style={{ color: "#94a3b8", marginBottom: "20px" }}>
          Update your account preferences and settings here.
        </p>

        <form className="grid-form" style={{ gridTemplateColumns: "1fr" }}>
          <div className="input-group">
            <label style={{ color: "#f8fafc", fontSize: "14px", display: "block", marginBottom: "8px" }}>Username</label>
            <input
              type="text"
              value={profile.username}
              onChange={(e) => setProfile({...profile, username: e.target.value})}
              style={{ width: "100%", boxSizing: "border-box" }}
            />
          </div>

          <div className="input-group" style={{ marginTop: "16px" }}>
            <label style={{ color: "#f8fafc", fontSize: "14px", display: "block", marginBottom: "8px" }}>Default Currency</label>
            <select 
              value={profile.currency}
              onChange={(e) => setProfile({...profile, currency: e.target.value})}
              style={{ width: "100%", boxSizing: "border-box" }}
            >
              <option value="INR">₹ INR (Indian Rupee)</option>
              <option value="USD">$ USD (US Dollar)</option>
              <option value="EUR">€ EUR (Euro)</option>
            </select>
          </div>

          <button type="button" style={{ marginTop: "24px" }} onClick={() => alert("Settings saved locally")}>
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default Settings;
