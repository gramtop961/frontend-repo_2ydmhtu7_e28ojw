import { Clock, ShoppingBag, ThumbsUp, TimerReset } from "lucide-react";

const KPI = ({ icon: Icon, label, value, trend, trendLabel }) => (
  <div className="rounded-2xl border bg-white/70 p-5 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/60">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-100 text-emerald-700">
          <Icon className="h-5 w-5" />
        </div>
        <span className="text-sm text-gray-600">{label}</span>
      </div>
      <span className={`text-xs ${trend >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
        {trend >= 0 ? "+" : ""}
        {trend}% {trendLabel}
      </span>
    </div>
    <p className="mt-3 text-2xl font-semibold tracking-tight">{value}</p>
  </div>
);

export default function KPIs() {
  return (
    <section className="grid grid-cols-2 gap-4 md:grid-cols-4">
      <KPI icon={ShoppingBag} label="Orders today" value="132" trend={8} trendLabel="vs avg" />
      <KPI icon={Clock} label="Avg wait" value="6m 20s" trend={-12} trendLabel="today" />
      <KPI icon={ThumbsUp} label="Satisfaction" value="4.8/5" trend={5} trendLabel="week" />
      <KPI icon={TimerReset} label="Order/min" value="3.1" trend={9} trendLabel="peak" />
    </section>
  );
}
