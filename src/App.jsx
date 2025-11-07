import Sidebar from "./components/Sidebar";
import KPIs from "./components/KPIs";
import OrdersBoard from "./components/OrdersBoard";
import Trends from "./components/Trends";
import { Bell } from "lucide-react";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 text-gray-900">
      <div className="mx-auto flex max-w-[1400px]">
        <Sidebar />
        <main className="flex-1 p-5 md:p-8">
          <Header />
          <KPIs />
          <OrdersBoard />
          <Trends />
        </main>
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Lunch Service Dashboard</h2>
        <p className="text-sm text-gray-600">Monitor orders, capacity, and wait times in real time</p>
      </div>
      <div className="flex items-center gap-2">
        <button className="rounded-xl border bg-white/80 px-3 py-2 text-sm backdrop-blur hover:bg-white">
          Export Report
        </button>
        <button className="relative rounded-xl border bg-white/80 p-2 backdrop-blur hover:bg-white">
          <Bell className="h-5 w-5" />
          <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-rose-500 text-[10px] text-white grid place-items-center">3</span>
        </button>
      </div>
    </header>
  );
}
