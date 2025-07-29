import { Home, Grid3X3, Plus, Users, User } from "lucide-react";

interface BottomNavProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onDeposit: () => void;
}

const navItems = [
  { id: 'home', label: 'Início', icon: Home },
  { id: 'games', label: 'Raspadinhas', icon: Grid3X3 },
  { id: 'deposit', label: 'Depositar', icon: Plus, isSpecial: true },
  { id: 'referral', label: 'Indique', icon: Users },
  { id: 'profile', label: 'Perfil', icon: User },
];

export function BottomNav({ currentPage, onNavigate, onDeposit }: BottomNavProps) {
  const handleNavClick = (item: typeof navItems[0]) => {
    if (item.id === 'deposit') {
      onDeposit();
    } else {
      onNavigate(item.id);
    }
  };

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentPage === item.id;
        
        return (
          <button
            key={item.id}
            onClick={() => handleNavClick(item)}
            className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-200 ${
              item.isSpecial
                ? 'bg-primary text-primary-foreground shadow-[0_0_15px_hsl(120_100%_50%_/_0.4)] scale-110'
                : isActive
                ? 'nav-icon-active'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon className={`h-5 w-5 ${item.isSpecial ? 'h-6 w-6' : ''}`} />
            <span className={`text-xs font-medium ${item.isSpecial ? 'text-xs' : ''}`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}