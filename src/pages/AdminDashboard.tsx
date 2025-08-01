import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  DollarSign,
  CreditCard,
  Clock,
  UserPlus,
  Calendar,
  Download,
  Filter,
  TrendingUp,
  Target,
  Link2
} from "lucide-react";

export function AdminDashboard() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Mock data - em produção viria do backend
  const metrics = {
    totalAccounts: 1247,
    totalDeposited: 89450.00,
    totalDeposits: 523,
    pendingDeposits: 87,
    totalAffiliates: 156,
    newAccountsYesterday: 23,
    newAccountsToday: 12
  };

  const affiliatesData = [
    {
      id: 1,
      name: "João Silva",
      email: "joao@email.com",
      code: "JOAO123",
      referrals: 15,
      totalDeposits: 2340.00
    },
    {
      id: 2,
      name: "Maria Santos",
      email: "maria@email.com", 
      code: "MARIA456",
      referrals: 8,
      totalDeposits: 1890.50
    },
    {
      id: 3,
      name: "Carlos Oliveira",
      email: "carlos@email.com",
      code: "CARLOS789",
      referrals: 23,
      totalDeposits: 4560.00
    }
  ];

  const exportCSV = () => {
    const csvContent = [
      ["Nome", "Email", "Código", "Cadastros", "Total Depósitos"],
      ...affiliatesData.map(affiliate => [
        affiliate.name,
        affiliate.email,
        affiliate.code,
        affiliate.referrals,
        affiliate.totalDeposits
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "afiliados.csv";
    a.click();
  };

  return (
    <div className="min-h-screen bg-background p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-2">
        <Target className="w-8 h-8 text-primary" />
        <h1 className="text-3xl font-bold text-foreground">Dashboard Administrativo</h1>
      </div>

      {/* Métricas Gerais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="card-dark border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total de Contas
            </CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {metrics.totalAccounts.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card className="card-dark border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Depositado
            </CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              R$ {metrics.totalDeposited.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </div>
          </CardContent>
        </Card>

        <Card className="card-dark border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Depósitos Realizados
            </CardTitle>
            <CreditCard className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {metrics.totalDeposits}
            </div>
          </CardContent>
        </Card>

        <Card className="card-dark border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Tentativas de Depósito
            </CardTitle>
            <Clock className="h-4 w-4 text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-400">
              {metrics.pendingDeposits}
            </div>
          </CardContent>
        </Card>

        <Card className="card-dark border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total de Afiliados
            </CardTitle>
            <Link2 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {metrics.totalAffiliates}
            </div>
          </CardContent>
        </Card>

        <Card className="card-dark border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Novos - Ontem
            </CardTitle>
            <Calendar className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-400">
              {metrics.newAccountsYesterday}
            </div>
          </CardContent>
        </Card>

        <Card className="card-dark border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Novos - Hoje
            </CardTitle>
            <UserPlus className="h-4 w-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-400">
              {metrics.newAccountsToday}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros e Ações */}
      <Card className="card-dark">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-primary" />
            <span>Filtros e Ações</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Data Início</label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-muted/20 border-border"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Data Fim</label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-muted/20 border-border"
              />
            </div>
            <Button
              variant="outline"
              className="border-primary/30 text-primary hover:bg-primary/10"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filtrar
            </Button>
            <Button
              onClick={exportCSV}
              className="btn-neon"
            >
              <Download className="w-4 h-4 mr-2" />
              Exportar CSV
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Seção de Afiliados */}
      <Card className="card-dark">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <span>Afiliados</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome / Email</TableHead>
                  <TableHead>Código</TableHead>
                  <TableHead>Cadastros</TableHead>
                  <TableHead>Total Depósitos</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {affiliatesData.map((affiliate) => (
                  <TableRow key={affiliate.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium text-foreground">{affiliate.name}</div>
                        <div className="text-sm text-muted-foreground">{affiliate.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-mono border-primary/30 text-primary">
                        {affiliate.code}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold text-primary">{affiliate.referrals}</span>
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold text-primary">
                        R$ {affiliate.totalDeposits.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={affiliate.totalDeposits > 0 ? "default" : "secondary"}
                        className={affiliate.totalDeposits > 0 ? "bg-primary/20 text-primary" : ""}
                      >
                        {affiliate.totalDeposits > 0 ? "Ativo" : "Inativo"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}