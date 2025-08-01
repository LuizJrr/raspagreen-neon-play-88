import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Mail, 
  Calendar, 
  Edit2, 
  Save, 
  X, 
  Smartphone,
  MapPin,
  CreditCard,
  Shield
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AccountProps {
  user: {
    name: string;
    email: string;
    balance: number;
    joinDate: string;
  };
  onNavigate: (page: string) => void;
}

export function Account({ user, onNavigate }: AccountProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user.name,
    email: user.email,
    phone: "11999999999", // Dados mock
    cpf: "123.456.789-00",
    birthDate: "1990-01-01",
    address: "São Paulo, SP"
  });
  const { toast } = useToast();

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Dados atualizados!",
      description: "Suas informações foram salvas com sucesso.",
    });
  };

  const handleCancel = () => {
    setEditData({
      name: user.name,
      email: user.email,
      phone: "11999999999",
      cpf: "123.456.789-00", 
      birthDate: "1990-01-01",
      address: "São Paulo, SP"
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Header com Avatar */}
      <Card className="card-dark border-primary/20">
        <CardContent className="p-6">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="w-20 h-20 border-4 border-primary/30">
              <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
                {user.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div className="text-center">
              <h1 className="text-2xl font-bold text-foreground">{user.name}</h1>
              <p className="text-muted-foreground">{user.email}</p>
              <Badge className="mt-2 bg-primary/20 text-primary">
                Membro desde {new Date(user.joinDate).toLocaleDateString("pt-BR")}
              </Badge>
            </div>

            <div className="flex space-x-4 w-full max-w-sm">
              <div className="flex-1 text-center p-3 bg-muted/20 rounded-lg">
                <div className="text-xl font-bold text-primary">
                  R$ {user.balance.toFixed(2).replace('.', ',')}
                </div>
                <div className="text-xs text-muted-foreground">Saldo Atual</div>
              </div>
              <div className="flex-1 text-center p-3 bg-muted/20 rounded-lg">
                <div className="text-xl font-bold text-primary">42</div>
                <div className="text-xs text-muted-foreground">Jogos</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dados Pessoais */}
      <Card className="card-dark">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <User className="w-5 h-5 text-primary" />
            <span>Dados Pessoais</span>
          </CardTitle>
          
          {!isEditing ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="border-primary/30 text-primary hover:bg-primary/10"
            >
              <Edit2 className="w-4 h-4 mr-2" />
              Editar
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCancel}
                className="border-destructive/30 text-destructive hover:bg-destructive/10"
              >
                <X className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                onClick={handleSave}
                className="btn-neon"
              >
                <Save className="w-4 h-4" />
              </Button>
            </div>
          )}
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Nome Completo</span>
              </label>
              {isEditing ? (
                <Input
                  value={editData.name}
                  onChange={(e) => setEditData({...editData, name: e.target.value})}
                  className="bg-muted/20 border-border"
                />
              ) : (
                <div className="p-3 bg-muted/20 rounded-lg border border-border">
                  <span className="text-foreground">{editData.name}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>E-mail</span>
              </label>
              {isEditing ? (
                <Input
                  value={editData.email}
                  onChange={(e) => setEditData({...editData, email: e.target.value})}
                  className="bg-muted/20 border-border"
                />
              ) : (
                <div className="p-3 bg-muted/20 rounded-lg border border-border">
                  <span className="text-foreground">{editData.email}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center space-x-2">
                <Smartphone className="w-4 h-4" />
                <span>Telefone</span>
              </label>
              {isEditing ? (
                <Input
                  value={editData.phone}
                  onChange={(e) => setEditData({...editData, phone: e.target.value})}
                  className="bg-muted/20 border-border"
                />
              ) : (
                <div className="p-3 bg-muted/20 rounded-lg border border-border">
                  <span className="text-foreground">{editData.phone}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center space-x-2">
                <CreditCard className="w-4 h-4" />
                <span>CPF</span>
              </label>
              <div className="p-3 bg-muted/20 rounded-lg border border-border">
                <span className="text-foreground">{editData.cpf}</span>
                <Badge variant="secondary" className="ml-2 text-xs">Verificado</Badge>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Data de Nascimento</span>
              </label>
              {isEditing ? (
                <Input
                  type="date"
                  value={editData.birthDate}
                  onChange={(e) => setEditData({...editData, birthDate: e.target.value})}
                  className="bg-muted/20 border-border"
                />
              ) : (
                <div className="p-3 bg-muted/20 rounded-lg border border-border">
                  <span className="text-foreground">
                    {new Date(editData.birthDate).toLocaleDateString("pt-BR")}
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Localização</span>
              </label>
              {isEditing ? (
                <Input
                  value={editData.address}
                  onChange={(e) => setEditData({...editData, address: e.target.value})}
                  className="bg-muted/20 border-border"
                />
              ) : (
                <div className="p-3 bg-muted/20 rounded-lg border border-border">
                  <span className="text-foreground">{editData.address}</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Configurações de Segurança */}
      <Card className="card-dark">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-primary" />
            <span>Configurações de Segurança</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-3">
          <Button
            variant="outline"
            className="w-full justify-between border-primary/30 text-primary hover:bg-primary/10"
            onClick={() => onNavigate('security')}
          >
            <span>Alterar Senha</span>
            <Edit2 className="w-4 h-4" />
          </Button>
          
          <Button
            variant="outline"
            className="w-full justify-between border-primary/30 text-primary hover:bg-primary/10"
          >
            <span>Autenticação de Dois Fatores</span>
            <Badge variant="secondary" className="text-xs">Desativado</Badge>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}