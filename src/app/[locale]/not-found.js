export default function LocaleNotFound() {
  return (
    <div style={{ textAlign: "center", padding: "60px" }}>
      <h1>404</h1>
      <p>This page does not exist for this language.</p>

      <a
        href="/"
        style={{
          padding: "10px 20px",
          background: "#0070f3",
          color: "#fff",
          borderRadius: "6px",
          display: "inline-block",
          marginTop: "20px",
          textDecoration: "none",
        }}
      >
        Go Home →
      </a>
    </div>
  );
}
