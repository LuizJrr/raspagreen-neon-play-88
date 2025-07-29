import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { User, LogOut, CreditCard, History, Shield } from "lucide-react";

interface User {
  name: string;
  email: string;
  balance: number;
  joinDate: string;
}

interface HeaderProps {
  user: User | null;
  onLogin: () => void;
  onRegister: () => void;
  onLogout: () => void;
  onDeposit?: () => void;
  onWithdraw?: () => void;
  onNavigate: (page: string) => void;
}

export function Header({ user, onLogin, onRegister, onLogout, onDeposit, onWithdraw, onNavigate }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm sm:text-lg">R</span>
            </div>
            <span className="text-lg sm:text-xl font-bold text-neon">RaspaGreen</span>
          </div>

          {/* Saldo e Actions - só exibe se usuário estiver logado */}
          {user ? (
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="text-center hidden sm:block">
                <p className="text-xs sm:text-sm text-muted-foreground">Saldo</p>
                <p className="text-sm sm:text-lg font-bold text-neon">
                  R$ {Number(user.balance).toFixed(2).replace('.', ',')}
                </p>
              </div>

              {/* Mobile: Apenas saldo */}
              <div className="text-center sm:hidden">
                <p className="text-xs font-bold text-neon">
                  R$ {Number(user.balance).toFixed(2).replace('.', ',')}
                </p>
              </div>

              <div className="flex space-x-1 sm:space-x-2">
                <Button onClick={onDeposit} className="btn-neon text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-2">
                  <span className="hidden sm:inline">Depositar</span>
                  <span className="sm:hidden">+</span>
                </Button>
                <Button 
                  onClick={onWithdraw} 
                  variant="outline" 
                  className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-2"
                >
                  <span className="hidden sm:inline">Sacar</span>
                  <span className="sm:hidden">-</span>
                </Button>
              </div>

              {/* Avatar com Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer border-2 border-primary/30 hover:border-primary transition-colors w-8 h-8 sm:w-10 sm:h-10">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-primary/10 text-primary text-xs sm:text-sm">
                      {user.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-card border-border z-50">
                  <DropdownMenuItem onClick={() => onNavigate('profile')} className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Conta
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onNavigate('history')} className="cursor-pointer">
                    <History className="mr-2 h-4 w-4" />
                    Histórico de Jogos
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onNavigate('transactions')} className="cursor-pointer">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Transações
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onNavigate('security')} className="cursor-pointer">
                    <Shield className="mr-2 h-4 w-4" />
                    Segurança
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onLogout} className="cursor-pointer text-destructive focus:text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            /* Botões de Login/Cadastro - exibe quando usuário não está logado */
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                onClick={onLogin}
                className="border-primary/30 text-foreground hover:bg-primary/10 text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-2"
              >
                Entrar
              </Button>
              <Button 
                onClick={onRegister}
                className="btn-neon text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-2"
              >
                Cadastrar
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}