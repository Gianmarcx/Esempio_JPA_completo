import { useState } from "react";
import axios from "axios";

const styles = {
  wrap: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Sora', sans-serif",
    padding: "2rem 0",
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
    maxWidth: 420,
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
  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "0.75rem",
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
    padding: "11px 12px 11px 38px",
    color: "#fff",
    fontFamily: "'Sora', sans-serif",
    fontSize: 14,
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s, background 0.2s",
  },
  inputWithToggle: {
    paddingRight: 40,
  },
  inputFocus: {
    borderColor: "rgba(185,43,39,0.7)",
    background: "rgba(255,255,255,0.1)",
  },
  inputError: {
    borderColor: "rgba(226,75,74,0.6)",
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
  fieldError: {
    fontSize: 11,
    color: "#f09595",
    marginTop: 4,
  },
  divider: {
    height: 1,
    background: "rgba(255,255,255,0.08)",
    margin: "1.25rem 0",
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
  successMsg: {
    background: "rgba(29,158,117,0.15)",
    border: "1px solid rgba(29,158,117,0.35)",
    borderRadius: 8,
    padding: "9px 12px",
    fontSize: 13,
    color: "#5dcaa5",
    marginTop: "1rem",
    textAlign: "center",
  },
  btnRegister: {
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
  passwordStrengthBar: {
    height: 3,
    borderRadius: 4,
    marginTop: 6,
    transition: "width 0.3s, background 0.3s",
  },
  strengthLabel: {
    fontSize: 11,
    marginTop: 3,
  },
};

function getPasswordStrength(pw) {
  if (!pw) return { score: 0, label: "", color: "transparent" };
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const map = [
    { label: "", color: "transparent" },
    { label: "Debole", color: "#e24b4a" },
    { label: "Discreta", color: "#ef9f27" },
    { label: "Buona", color: "#1d9e75" },
    { label: "Ottima", color: "#e57373" },
  ];
  return { score, ...map[score] };
}

function Field({ label, icon, children, error }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label style={styles.label}>{label}</label>
      {children}
      {error && <p style={styles.fieldError}>{error}</p>}
    </div>
  );
}

function Register() {
  const [form, setForm] = useState({
    nome: "",
    cognome: "",
    email: "",
    password: "",
    confermaPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConferma, setShowConferma] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const errs = {};
    if (!form.nome.trim()) errs.nome = "Campo obbligatorio";
    if (!form.cognome.trim()) errs.cognome = "Campo obbligatorio";
    if (!form.email.trim()) errs.email = "Campo obbligatorio";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Email non valida";
    if (!form.password) errs.password = "Campo obbligatorio";
    else if (form.password.length < 8)
      errs.password = "Minimo 8 caratteri";
    if (!form.confermaPassword) errs.confermaPassword = "Campo obbligatorio";
    else if (form.password !== form.confermaPassword)
      errs.confermaPassword = "Le password non coincidono";
    return errs;
  };

  const handleRegister = async () => {
    setError("");
    setSuccess("");
    const errs = validate();
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    try {
      await axios.post("http://localhost:8081/api/register", {
        nome: form.nome,
        cognome: form.cognome,
        email: form.email,
        password: form.password,
      });
      setSuccess("Registrazione completata! Ora puoi accedere.");
    } catch (err) {
      setError(
        err?.response?.data?.message || "Errore durante la registrazione. Riprova."
      );
    } finally {
      setLoading(false);
    }
  };

  const strength = getPasswordStrength(form.password);

  const inputStyle = (key) => ({
    ...styles.input,
    ...(key === "password" || key === "confermaPassword"
      ? styles.inputWithToggle
      : {}),
    ...(focusedField === key ? styles.inputFocus : {}),
    ...(fieldErrors[key] ? styles.inputError : {}),
  });

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

          {/* Header */}
          <div style={styles.logoRing}>✨</div>
          <h2 style={styles.title}>Crea un account</h2>
          <p style={styles.sub}>Unisciti a noi, è gratis</p>

          {/* Nome e Cognome */}
          <div style={styles.row}>
            <Field label="Nome" error={fieldErrors.nome}>
              <div style={styles.inputWrap}>
                <span style={styles.inputIcon}>👤</span>
                <input
                  type="text"
                  placeholder="Mario"
                  value={form.nome}
                  onChange={set("nome")}
                  onFocus={() => setFocusedField("nome")}
                  onBlur={() => setFocusedField(null)}
                  style={inputStyle("nome")}
                />
              </div>
            </Field>

            <Field label="Cognome" error={fieldErrors.cognome}>
              <div style={styles.inputWrap}>
                <span style={styles.inputIcon}>👤</span>
                <input
                  type="text"
                  placeholder="Rossi"
                  value={form.cognome}
                  onChange={set("cognome")}
                  onFocus={() => setFocusedField("cognome")}
                  onBlur={() => setFocusedField(null)}
                  style={inputStyle("cognome")}
                />
              </div>
            </Field>
          </div>

          {/* Email */}
          <Field label="Email" error={fieldErrors.email}>
            <div style={styles.inputWrap}>
              <span style={styles.inputIcon}>✉️</span>
              <input
                type="email"
                placeholder="nome@esempio.it"
                value={form.email}
                onChange={set("email")}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                style={inputStyle("email")}
              />
            </div>
          </Field>

          <div style={styles.divider} />

          {/* Password */}
          <Field label="Password" error={fieldErrors.password}>
            <div style={styles.inputWrap}>
              <span style={styles.inputIcon}>🔒</span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Min. 8 caratteri"
                value={form.password}
                onChange={set("password")}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
                style={inputStyle("password")}
              />
              <button
                style={styles.togglePw}
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Nascondi password" : "Mostra password"}
              >
                {showPassword ? "🙈" : "👁"}
              </button>
            </div>
            {/* Barra forza password */}
            {form.password && (
              <>
                <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 4, height: 3, marginTop: 6 }}>
                  <div
                    style={{
                      ...styles.passwordStrengthBar,
                      width: `${(strength.score / 4) * 100}%`,
                      background: strength.color,
                    }}
                  />
                </div>
                <p style={{ ...styles.strengthLabel, color: strength.color }}>
                  {strength.label}
                </p>
              </>
            )}
          </Field>

          {/* Conferma Password */}
          <Field label="Conferma password" error={fieldErrors.confermaPassword}>
            <div style={styles.inputWrap}>
              <span style={styles.inputIcon}>🔒</span>
              <input
                type={showConferma ? "text" : "password"}
                placeholder="Ripeti la password"
                value={form.confermaPassword}
                onChange={set("confermaPassword")}
                onFocus={() => setFocusedField("confermaPassword")}
                onBlur={() => setFocusedField(null)}
                style={inputStyle("confermaPassword")}
              />
              <button
                style={styles.togglePw}
                onClick={() => setShowConferma((v) => !v)}
                aria-label={showConferma ? "Nascondi password" : "Mostra password"}
              >
                {showConferma ? "🙈" : "👁"}
              </button>
            </div>
          </Field>

          {/* Messaggi */}
          {error && <div style={styles.errorMsg}>⚠ {error}</div>}
          {success && <div style={styles.successMsg}>✓ {success}</div>}

          {/* Submit */}
          <button
            style={{
              ...styles.btnRegister,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
            onClick={handleRegister}
            disabled={loading}
          >
            {loading ? "Registrazione in corso…" : "Crea account"}
          </button>

          {/* Login link */}
          <p style={{ textAlign: "center", fontSize: 13, color: "rgba(255,255,255,0.4)", margin: "1.25rem 0 0" }}>
            Hai già un account?{" "}
            <a href="/login" style={{ color: "#e57373", textDecoration: "none", fontWeight: 600 }}>
              Accedi
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;