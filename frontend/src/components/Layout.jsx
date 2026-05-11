import { Link, Outlet, useLocation } from "react-router";

const navLinks = [
  { to: "/", label: "Home", icon: "🏠" },
  { to: "/esempi", label: "Esempi", icon: "📋" },
  { to: "/login", label: "Login", icon: "🔐" },
];

function Layout() {
  const location = useLocation();

  return (
    <div style={{ display: "flex", fontFamily: "'Sora', sans-serif" }}>

      {/* SIDEBAR */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: 260,
          background: "linear-gradient(to bottom, #1565C0, #b92b27)",
          borderRight: "1px solid rgba(255,255,255,0.08)",
          display: "flex",
          flexDirection: "column",
          padding: "2rem 1.25rem",
          boxSizing: "border-box",
          overflow: "hidden",
          zIndex: 100,
        }}
      >
        {/* Orb decorativo */}
        <div style={{
          position: "absolute",
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: "#1565C0",
          filter: "blur(70px)",
          opacity: 0.3,
          top: -60,
          left: -60,
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute",
          width: 140,
          height: 140,
          borderRadius: "50%",
          background: "#b92b27",
          filter: "blur(55px)",
          opacity: 0.2,
          bottom: -40,
          right: -40,
          pointerEvents: "none",
        }} />

        {/* Logo / titolo app */}
        <div style={{ marginBottom: "2.5rem", position: "relative", zIndex: 1 }}>
          <div style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: "linear-gradient(to right, #1565C0, #b92b27)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            marginBottom: "0.75rem",
            boxShadow: "0 0 0 6px rgba(21,101,192,0.2)",
          }}>
            ⚡
          </div>
          <p style={{ color: "#fff", fontWeight: 700, fontSize: 16, margin: 0, letterSpacing: "-0.3px" }}>
            demo-fe
          </p>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, margin: "2px 0 0" }}>
            Pannello di controllo
          </p>
        </div>

        {/* Navigazione */}
        <nav style={{ display: "flex", flexDirection: "column", gap: 6, position: "relative", zIndex: 1 }}>
          <p style={{
            fontSize: 11,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.8px",
            color: "rgba(255,255,255,0.3)",
            margin: "0 0 8px 8px",
          }}>
            Menu
          </p>

          {navLinks.map(({ to, label, icon }) => {
            const isActive = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 12px",
                  borderRadius: 10,
                  textDecoration: "none",
                  fontSize: 14,
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? "#fff" : "rgba(255,255,255,0.6)",
                  background: isActive
                    ? "rgba(21,101,192,0.25)"
                    : "transparent",
                  border: isActive
                    ? "1px solid rgba(21,101,192,0.5)"
                    : "1px solid transparent",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                    e.currentTarget.style.color = "#fff";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                  }
                }}
              >
                <span style={{ fontSize: 16 }}>{icon}</span>
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Footer sidebar */}
        <div style={{
          marginTop: "auto",
          position: "relative",
          zIndex: 1,
          paddingTop: "1rem",
          borderTop: "1px solid rgba(255,255,255,0.08)",
        }}>
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", margin: 0 }}>
            © 2026 demo-fe
          </p>
        </div>
      </div>

      {/* CONTENUTO PRINCIPALE */}
      <div style={{
        marginLeft: 260,
        width: "calc(100% - 260px)",
        minHeight: "100vh",
        padding: 24,
        boxSizing: "border-box",
      }}>
        <Outlet />
      </div>

    </div>
  );
}

export default Layout;