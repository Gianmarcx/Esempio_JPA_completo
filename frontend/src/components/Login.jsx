import { useState } from "react";
import axios from "axios";

const styles = {
  wrap: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Sora', sans-serif",
  },
  orb1: {
    position: "absolute",
    width: 280,
    height: 280,
    borderRadius: "50%",
    background: "#1565C0",
    filter: "blur(60px)",
    opacity: 0.4,
    top: -80,
    left: -60,
    pointerEvents: "none",
  },
  orb2: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: "50%",
    background: "#b92b27",
    filter: "blur(55px)",
    opacity: 0.35,
    bottom: -60,
    right: -50,
    pointerEvents: "none",
  },
  card: {
    position: "relative",
    overflow: "hidden",
    zIndex: 1,
    width: "100%",
    maxWidth: 400,
    background: "linear-gradient(to right, #1565C0, #b92b27)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 20,
    padding: "2.5rem 2rem",
    boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
    animation: "slideUp 0.6s cubic-bezier(0.16,1,0.3,1) both",
  },
  logoRing: {
    width: 54,
    height: 54,
    borderRadius: "50%",
    background: "linear-gradient(to right, #1565C0, #b92b27)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 1.25rem",
    boxShadow: "0 0 0 8px rgba(21,101,192,0.2)",
    fontSize: 24,
    color: "#fff",
  },
  title: {
    textAlign: "center",
    color: "#fff",
    fontSize: 20,
    fontWeight: 700,
    margin: "0 0 4px",
    letterSpacing: "-0.3px",
  },
  sub: {
    textAlign: "center",
    fontSize: 13,
    color: "rgba(255,255,255,0.45)",
    margin: "0 0 2rem",
  },
  label: {
    display: "block",
    fontSize: 12,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.7px",
    color: "rgba(255,255,255,0.5)",
    marginBottom: 6,
  },
  inputWrap: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  inputIcon: {
    position: "absolute",
    left: 12,
    fontSize: 17,
    color: "rgba(255,255,255,0.35)",
    pointerEvents: "none",
  },
  input: {
    width: "100%",
    background: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 10,
    padding: "11px 40px 11px 38px",
    color: "#fff",
    fontFamily: "'Sora', sans-serif",
    fontSize: 14,
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s, background 0.2s",
  },
  inputFocus: {
    borderColor: "rgba(185,43,39,0.7)",
    background: "rgba(255,255,255,0.1)",
  },
  togglePw: {
    position: "absolute",
    right: 12,
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "rgba(255,255,255,0.35)",
    padding: 0,
    fontSize: 17,
    display: "flex",
    alignItems: "center",
    transition: "color 0.2s",
  },
  forgot: {
    textAlign: "right",
    marginTop: 6,
  },
  forgotLink: {
    fontSize: 12,
    color: "rgba(255,255,255,0.8)",
    textDecoration: "none",
  },
  errorMsg: {
    background: "rgba(226,75,74,0.15)",
    border: "1px solid rgba(226,75,74,0.35)",
    borderRadius: 8,
    padding: "9px 12px",
    fontSize: 13,
    color: "#f09595",
    marginTop: "1rem",
    textAlign: "center",
  },
  btnLogin: {
    width: "100%",
    marginTop: "1.5rem",
    padding: "13px",
    border: "none",
    borderRadius: 10,
    background: "linear-gradient(to right, #1565C0, #b92b27)",
    color: "#fff",
    fontFamily: "'Sora', sans-serif",
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: "0.3px",
    cursor: "pointer",
    transition: "opacity 0.2s, transform 0.15s",
  },
};

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Compila tutti i campi.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8081/api/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      window.location.href = "/";
    } catch (err) {
      setError("Credenziali errate. Riprova.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700&display=swap');
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        input::placeholder { color: rgba(255,255,255,0.25); }
      `}</style>

      <div style={styles.wrap}>
        <div style={styles.orb1} />
        <div style={styles.orb2} />

        <div style={styles.card}>
          {/* Logo */}
          <div style={styles.logoRing}>🔐</div>

          <h2 style={styles.title}>Bentornato</h2>
          <p style={styles.sub}>Accedi al tuo account</p>

          {/* Email */}
          <div style={{ marginBottom: "1rem" }}>
            <label style={styles.label}>Email</label>
            <div style={styles.inputWrap}>
              <span style={styles.inputIcon}>✉️</span>
              <input
                type="email"
                placeholder="nome@esempio.it"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                style={{
                  ...styles.input,
                  ...(focusedField === "email" ? styles.inputFocus : {}),
                }}
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: "0.5rem" }}>
            <label style={styles.label}>Password</label>
            <div style={styles.inputWrap}>
              <span style={styles.inputIcon}>🔒</span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
                style={{
                  ...styles.input,
                  ...(focusedField === "password" ? styles.inputFocus : {}),
                }}
              />
              <button
                style={styles.togglePw}
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Nascondi password" : "Mostra password"}
              >
                {showPassword ? "🙈" : "👁"}
              </button>
            </div>
          </div>

          {/* Forgot password */}
          <div style={styles.forgot}>
            <a href="/forgot-password" style={styles.forgotLink}>
              Password dimenticata?
            </a>
          </div>

          {/* Error message */}
          {error && <div style={styles.errorMsg}>⚠ {error}</div>}

          {/* Submit */}
          <button
            style={{
              ...styles.btnLogin,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Accesso in corso…" : "Accedi"}
          </button>

          {/* Register */}
          <p style={{ textAlign: "center", marginTop: "1.25rem", fontSize: 13, color: "rgba(255,255,255,0.4)", margin: "1.25rem 0 0" }}>
            Non sei registrato?{" "}
            <a href="/register" style={{ color: "#e57373", textDecoration: "none", fontWeight: 600 }}>
              Clicca qui
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;