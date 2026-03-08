export default function Loading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header skeleton */}
      <div className="space-y-3">
        <div className="h-3 w-24 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }} />
        <div className="h-8 w-72 rounded-lg" style={{ background: "rgba(255,255,255,0.06)" }} />
        <div className="h-4 w-96 max-w-full rounded-md" style={{ background: "rgba(255,255,255,0.04)" }} />
      </div>

      {/* Cards skeleton */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-2xl overflow-hidden"
            style={{
              background: "rgba(17,22,34,0.7)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="h-44" style={{ background: "rgba(255,255,255,0.03)" }} />
            <div className="p-5 space-y-3">
              <div className="h-4 w-3/4 rounded-md" style={{ background: "rgba(255,255,255,0.06)" }} />
              <div className="h-3 w-full rounded-md" style={{ background: "rgba(255,255,255,0.04)" }} />
              <div className="h-3 w-5/6 rounded-md" style={{ background: "rgba(255,255,255,0.04)" }} />
              <div className="flex gap-2 pt-1">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="h-5 w-14 rounded-md" style={{ background: "rgba(255,255,255,0.04)" }} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
