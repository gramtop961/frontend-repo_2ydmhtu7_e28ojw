import { useMemo, useState } from "react";
import { Flame, ChefHat, CheckCircle2, Clock, Filter, Search } from "lucide-react";

const sampleOrders = Array.from({ length: 16 }).map((_, i) => ({
  id: 2400 + i,
  name: ["Aarav", "Priya", "Ravi", "Isha", "Vikram", "Neha", "Rahul", "Ananya"][i % 8],
  items: ["Veg Thali", "Chicken Curry", "Paneer Wrap", "Dal Rice", "Grilled Fish", "Veg Biryani"][i % 6],
  spiciness: ["Mild", "Medium", "Spicy"][i % 3],
  type: i % 2 === 0 ? "Veg" : "Non-Veg",
  status: ["Queued", "Cooking", "Ready"][i % 3],
  eta: `${5 + (i % 7)}m`,
}));

function Pill({ label, color }) {
  return (
    <span className={`px-2 py-0.5 text-xs rounded-full ${color} border`}>{label}</span>
  );
}

export default function OrdersBoard() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = useMemo(() => {
    return sampleOrders.filter((o) => {
      const matchesQuery = `${o.id} ${o.name} ${o.items}`.toLowerCase().includes(query.toLowerCase());
      const matchesFilter = filter === "All" || o.status === filter;
      return matchesQuery && matchesFilter;
    });
  }, [query, filter]);

  const groups = useMemo(() => {
    const cols = { Queued: [], Cooking: [], Ready: [] };
    filtered.forEach((o) => cols[o.status].push(o));
    return cols;
  }, [filtered]);

  return (
    <section className="mt-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Flame className="h-4 w-4 text-emerald-600" />
          Live orders stream
        </div>

        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-56 rounded-lg border bg-white/70 pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Search by name, item, id"
            />
          </div>
          <div className="relative">
            <Filter className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="appearance-none w-40 rounded-lg border bg-white/70 pl-9 pr-8 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {['All','Queued','Cooking','Ready'].map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        <Column title="Queued" count={groups.Queued.length}>
          {groups.Queued.map((o) => (
            <OrderCard key={o.id} order={o} />
          ))}
        </Column>
        <Column title="Cooking" count={groups.Cooking.length}>
          {groups.Cooking.map((o) => (
            <OrderCard key={o.id} order={o} cooking />
          ))}
        </Column>
        <Column title="Ready" count={groups.Ready.length}>
          {groups.Ready.map((o) => (
            <OrderCard key={o.id} order={o} ready />
          ))}
        </Column>
      </div>
    </section>
  );
}

function Column({ title, count, children }) {
  return (
    <div className="rounded-2xl border bg-white/60 p-4 backdrop-blur supports-[backdrop-filter]:bg-white/50">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">{title}</h3>
        <span className="text-xs text-gray-500">{count}</span>
      </div>
      <div className="mt-3 space-y-3 max-h-[460px] overflow-auto pr-1">
        {children}
      </div>
    </div>
  );
}

function OrderCard({ order, cooking, ready }) {
  return (
    <div className="rounded-xl border bg-white p-3 shadow-sm">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <span className="font-medium">#{order.id}</span>
          <span className="text-gray-500">{order.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <Pill label={order.type} color={order.type === 'Veg' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'} />
          {ready ? (
            <Pill label="Ready" color="bg-emerald-50 text-emerald-700 border-emerald-200" />
          ) : cooking ? (
            <Pill label="Cooking" color="bg-blue-50 text-blue-700 border-blue-200" />
          ) : (
            <Pill label="Queued" color="bg-gray-50 text-gray-700 border-gray-200" />
          )}
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <div className="text-sm text-gray-700">{order.items} • {order.spiciness}</div>
        <div className="flex items-center gap-1 text-xs text-gray-600">
          <Clock className="h-4 w-4" />
          ETA {order.eta}
        </div>
      </div>
      {cooking && (
        <div className="mt-2 flex items-center gap-2 text-xs text-gray-600">
          <ChefHat className="h-4 w-4 text-emerald-600" />
          On the stove
        </div>
      )}
      {ready && (
        <div className="mt-2 flex items-center gap-2 text-xs text-emerald-700">
          <CheckCircle2 className="h-4 w-4" />
          Pick up counter
        </div>
      )}
    </div>
  );
}
