import { ChefHat, UtensilsCrossed, Leaf, Settings, Bell, Users } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex h-screen w-72 shrink-0 flex-col border-r border-gray-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="flex items-center gap-3 px-6 py-6 border-b">
        <div className="h-11 w-11 rounded-xl bg-emerald-600 text-white grid place-items-center shadow-sm">
          <ChefHat className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Ram's Kitchen</h1>
          <p className="text-xs text-gray-500">Organic • Tasty • Fast</p>
        </div>
      </div>

      <nav className="px-3 py-4 space-y-1">
        <NavItem icon={UtensilsCrossed} label="Dashboard" active />
        <NavItem icon={Users} label="Employees" />
        <NavItem icon={Bell} label="Alerts" />
        <NavItem icon={Leaf} label="Ingredients" />
        <NavItem icon={Settings} label="Settings" />
      </nav>

      <div className="mt-auto p-4">
        <div className="rounded-xl border p-4 bg-gradient-to-br from-emerald-50 to-emerald-100/60">
          <p className="text-sm font-medium">Lunch Rush Window</p>
          <p className="mt-1 text-xs text-gray-600">12:00 PM – 2:00 PM</p>
          <div className="mt-3 h-2 rounded-full bg-emerald-200 overflow-hidden">
            <div className="h-full w-[65%] bg-emerald-600" />
          </div>
          <p className="mt-2 text-xs text-gray-600">65% capacity now</p>
        </div>
      </div>
    </aside>
  );
}

function NavItem({ icon: Icon, label, active = false }) {
  return (
    <button
      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-gray-100 ${
        active ? "bg-gray-100 font-medium" : "text-gray-700"
      }`}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </button>
  );
}
