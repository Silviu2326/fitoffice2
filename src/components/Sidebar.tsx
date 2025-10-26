import { LayoutDashboard, LogOut, Dumbbell } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Sidebar() {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col h-screen">
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-2 rounded-lg">
            <Dumbbell className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold">ERP Fitness</h1>
            <p className="text-xs text-slate-400">Entrenadores</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-emerald-600 text-white transition-all"
            >
              <LayoutDashboard className="w-5 h-5" />
              <span className="font-medium">Dashboard</span>
            </a>
          </li>
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 px-4 py-3 rounded-lg w-full text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
}
