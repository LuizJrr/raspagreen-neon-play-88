import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User, History, CreditCard, Shield, LogOut, ChevronRight } from "lucide-react";

interface ProfileProps {
  user: {
    name: string;
    email: string;
    joinDate: string;
  };
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

const menuItems = [
  {
    id: 'account',
    label: 'Conta',
    icon: User,
    description: 'Informações pessoais e configurações'
  },
  {
    id: 'history',
    label: 'Histórico de Jogos',
    icon: History,
    description: 'Acompanhe seus jogos e resultados'
  },
  {
    id: 'transactions',
    label: 'Transações',
    icon: CreditCard,
    description: 'Depósitos, saques e movimentações'
  },
  {
    id: 'security',
    label: 'Segurança',
    icon: Shield,
    description: 'Senha e configurações de segurança'
  }
];

export function Profile({ user, onNavigate, onLogout }: ProfileProps) {
  return (
    <div className="space-y-6 pb-24">
      {/* Header do perfil */}
      <Card className="card-dark border-primary/20">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <Avatar className="w-12 h-12 sm:w-16 sm:h-16 border-2 border-primary/30">
              <AvatarImage src="" />
              <AvatarFallback className="bg-primary/10 text-primary text-lg sm:text-xl font-bold">
                {user.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <h2 className="text-lg sm:text-xl font-bold text-foreground truncate">{user.name}</h2>
              <p className="text-sm sm:text-base text-muted-foreground truncate">{user.email}</p>
              <p className="text-xs sm:text-sm text-primary mt-1">
                Entrou em {user.joinDate}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Menu de opções */}
      <div className="space-y-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Card 
              key={item.id} 
              className="card-dark hover:border-primary/30 transition-all duration-200 cursor-pointer"
              onClick={() => onNavigate(item.id)}
            >
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm sm:text-base text-foreground">{item.label}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground line-clamp-1">{item.description}</p>
                  </div>
                  
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground flex-shrink-0" />
                </div>
              </CardContent>
            </Card>
          );
        })}

        {/* Botão Sair */}
        <Card className="card-dark border-destructive/20 hover:border-destructive/50 transition-all duration-200 cursor-pointer">
          <CardContent className="p-3 sm:p-4" onClick={onLogout}>
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-destructive/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <LogOut className="w-4 h-4 sm:w-5 sm:h-5 text-destructive" />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm sm:text-base text-destructive">Sair</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">Fazer logout da conta</p>
              </div>
              
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-destructive flex-shrink-0" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}