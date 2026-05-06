export default function Home() {
  return (
    <main
      style={{
        height:
          "calc(100vh - var(--navbar-height) - var(--status-bar-height))",
        marginTop: "var(--navbar-height)",
        background: "var(--color-bg)",
      }}
    />
  );
}
