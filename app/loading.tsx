export default function Loading() {
  const shimmerStyle = {
    background: "linear-gradient(90deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 100%)",
    backgroundSize: "200% 100%",
    animation: "shimmer 1.5s ease-in-out infinite",
  };

  return (
    <div className="space-y-8">
      {/* Header skeleton */}
      <div className="space-y-3">
        <div className="h-3 w-24 rounded-full" style={shimmerStyle} />
        <div className="h-8 w-72 rounded-lg" style={shimmerStyle} />
        <div className="h-4 w-96 max-w-full rounded-md" style={{ ...shimmerStyle, animationDelay: "0.1s" }} />
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
            <div className="h-48" style={{ ...shimmerStyle, animationDelay: `${i * 0.15}s` }} />
            <div className="p-5 space-y-3">
              <div className="h-5 w-3/4 rounded-md" style={{ ...shimmerStyle, animationDelay: `${i * 0.15 + 0.05}s` }} />
              <div className="h-3 w-full rounded-md" style={{ ...shimmerStyle, animationDelay: `${i * 0.15 + 0.1}s` }} />
              <div className="h-3 w-5/6 rounded-md" style={{ ...shimmerStyle, animationDelay: `${i * 0.15 + 0.15}s` }} />
              <div className="flex gap-2 pt-1">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="h-5 w-16 rounded-md" style={{ ...shimmerStyle, animationDelay: `${i * 0.15 + j * 0.05}s` }} />
                ))}
              </div>
              <div className="h-[1px] w-full mt-2" style={{ background: "rgba(255,255,255,0.04)" }} />
              <div className="h-4 w-24 rounded-md" style={{ ...shimmerStyle, animationDelay: `${i * 0.15 + 0.2}s` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
