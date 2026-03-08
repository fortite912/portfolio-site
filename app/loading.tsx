export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-8 h-8 rounded-full border-2 animate-spin"
          style={{
            borderColor: "rgba(255,255,255,0.1)",
            borderTopColor: "var(--color-accent)",
          }}
        />
        <p className="text-sm" style={{ color: "var(--color-muted)", fontFamily: "var(--font-mono)" }}>
          Chargement...
        </p>
      </div>
    </div>
  );
}
