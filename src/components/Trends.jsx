import { Flame } from "lucide-react";

export default function Trends() {
  return (
    <section className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <div className="mb-3 flex items-center gap-2 text-sm text-gray-600">
          <Flame className="h-4 w-4 text-emerald-600" />
          Orders over time
        </div>
        <LineChart
          labels={["10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM"]}
          values={[20, 34, 62, 70, 30, 12]}
          color="#059669"
        />
      </Card>
      <Card>
        <div className="mb-3 text-sm text-gray-600">Average wait by hour</div>
        <BarChart
          labels={["10", "11", "12", "1", "2", "3"]}
          values={[5, 6, 9, 7, 4, 3]}
          color="#6366f1"
        />
      </Card>
    </section>
  );
}

function Card({ children, className = "" }) {
  return (
    <div className={`rounded-2xl border bg-white/70 p-4 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/60 ${className}`}>
      {children}
    </div>
  );
}

function LineChart({ labels, values, color = "#059669" }) {
  const max = Math.max(...values) || 1;
  const points = values.map((v, i) => {
    const x = (i / (values.length - 1)) * 100;
    const y = 100 - (v / max) * 100;
    return `${x},${y}`;
  });

  const gradientId = "lineGradient";

  return (
    <div className="h-56 w-full">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
        <defs>
          <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.25" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <polyline
          fill={`url(#${gradientId})`}
          stroke="none"
          points={`0,100 ${points.join(" ")} 100,100`}
        />
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          points={points.join(" ")}
        />
        {points.map((p, i) => (
          <circle key={i} cx={p.split(",")[0]} cy={p.split(",")[1]} r="1.2" fill={color} />
        ))}
        {labels.map((l, i) => (
          <text key={l} x={(i / (labels.length - 1)) * 100} y="99" fontSize="3" textAnchor="middle" fill="#6b7280">
            {l}
          </text>
        ))}
      </svg>
    </div>
  );
}

function BarChart({ labels, values, color = "#6366f1" }) {
  const max = Math.max(...values) || 1;
  return (
    <div className="h-56 w-full">
      <div className="flex h-full items-end gap-2">
        {values.map((v, i) => {
          const h = (v / max) * 90 + 10; // ensure visible minimum
          return (
            <div key={i} className="flex-1">
              <div
                className="rounded-t-md"
                style={{ height: `${h}%`, backgroundColor: color, opacity: 0.8 }}
                title={`${labels[i]}: ${v}`}
              />
              <div className="mt-1 text-center text-[10px] text-gray-500">{labels[i]}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
