import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  onLogin: (userData: any) => void;
  mode?: 'login' | 'register';
}

export function LoginModal({ open, onClose, onLogin, mode = 'login' }: LoginModalProps) {
  const [isLogin, setIsLogin] = useState(mode === 'login');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simular login/cadastro
    const userData = {
      name: isLogin ? 'Usuário Teste' : formData.name || 'Novo Usuário',
      email: formData.email,
      balance: 0,
      joinDate: new Date().toLocaleDateString('pt-BR')
    };
    
    onLogin(userData);
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Sincronizar com o modo quando o modal abrir
  useEffect(() => {
    if (open) {
      setIsLogin(mode === 'login');
    }
  }, [open, mode]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card border-primary/20 shadow-2xl">
        {/* Header customizado */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="text-center flex-1">
            <h2 className="text-xl font-bold text-neon">
              ✨ {isLogin ? 'Entrar' : 'Crie sua conta'} ✨
            </h2>
            {!isLogin && (
              <p className="text-sm text-muted-foreground mt-1">
                Comece a concorrer a prêmios hoje!
              </p>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 hover:bg-primary/10"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 p-6 pt-4">
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground font-medium">
                Nome Completo
              </Label>
              <Input
                id="name"
                placeholder="Digite seu nome completo"
                className="input-dark"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required={!isLogin}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground font-medium">
              E-mail
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="exemplo@email.com"
              className="input-dark"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required
            />
          </div>

          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-foreground font-medium">
                Telefone
              </Label>
              <Input
                id="phone"
                placeholder="(00) 00000-0000"
                className="input-dark"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                required={!isLogin}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="password" className="text-foreground font-medium">
              {isLogin ? 'Senha' : 'Escolha uma senha'}
            </Label>
            <Input
              id="password"
              type="password"
              placeholder={isLogin ? 'Digite sua senha' : 'Digite uma senha forte...'}
              className="input-dark"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="btn-neon w-full mt-6">
            {isLogin ? 'ENTRAR' : 'CRIAR'}
          </Button>

          <div className="text-center pt-4 border-t border-border mt-6">
            <span className="text-muted-foreground text-sm">OU</span>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary hover:text-primary/80 text-sm font-medium transition-colors"
            >
              {isLogin ? 'Não tem conta? Criar conta' : 'Já tem uma conta? Entrar'}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}