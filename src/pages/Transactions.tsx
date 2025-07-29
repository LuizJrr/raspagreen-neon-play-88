import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, TrendingUp, TrendingDown } from "lucide-react";

const transactionsData = {
  deposits: [
    {
      id: '1',
      value: 100.00,
      status: 'Aprovado',
      date: '26/07/2025',
      time: '14:30',
      transactionId: 'DEP123456',
      method: 'PIX'
    },
    {
      id: '2',
      value: 50.00,
      status: 'Aprovado',
      date: '25/07/2025',
      time: '16:45',
      transactionId: 'DEP123455',
      method: 'PIX'
    },
    {
      id: '3',
      value: 25.00,
      status: 'Processando',
      date: '24/07/2025',
      time: '10:20',
      transactionId: 'DEP123454',
      method: 'PIX'
    }
  ],
  withdrawals: [
    {
      id: '1',
      value: 75.00,
      status: 'Processando',
      date: '26/07/2025',
      time: '15:00',
      transactionId: 'SAQ123456',
      method: 'PIX'
    },
    {
      id: '2',
      value: 30.00,
      status: 'Aprovado',
      date: '23/07/2025',
      time: '09:15',
      transactionId: 'SAQ123455',
      method: 'PIX'
    }
  ]
};

export function Transactions() {
  const [currentTab, setCurrentTab] = useState('deposits');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const currentData = currentTab === 'deposits' ? transactionsData.deposits : transactionsData.withdrawals;
  const totalPages = Math.ceil(currentData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = currentData.slice(startIndex, endIndex);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Aprovado':
        return <Badge className="bg-primary/20 text-primary border-primary/30">Aprovado</Badge>;
      case 'Processando':
        return <Badge variant="outline" className="border-yellow-500/30 text-yellow-500">Processando</Badge>;
      case 'Rejeitado':
        return <Badge variant="outline" className="border-destructive/30 text-destructive">Rejeitado</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getValueDisplay = (value: number, type: string) => {
    const formatted = value.toFixed(2).replace('.', ',');
    return type === 'deposits' ? (
      <span className="text-primary font-semibold">+R$ {formatted}</span>
    ) : (
      <span className="text-destructive font-semibold">-R$ {formatted}</span>
    );
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-foreground">Transações</h1>
      </div>

      {/* Tabs */}
      <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-muted/20">
          <TabsTrigger 
            value="deposits" 
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Depósitos
          </TabsTrigger>
          <TabsTrigger 
            value="withdrawals"
            className="data-[state=active]:bg-destructive data-[state=active]:text-destructive-foreground"
          >
            <TrendingDown className="w-4 h-4 mr-2" />
            Saques
          </TabsTrigger>
        </TabsList>

        <TabsContent value="deposits" className="space-y-4">
          {/* Cards Mobile */}
          <div className="lg:hidden space-y-3">
            {currentItems.map((item) => (
              <Card key={item.id} className="card-dark">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        {getValueDisplay(item.value, 'deposits')}
                        <p className="text-sm text-muted-foreground">
                          {item.date} às {item.time}
                        </p>
                      </div>
                      {getStatusBadge(item.status)}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Método:</span>
                        <p className="font-semibold text-foreground">{item.method}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">ID:</span>
                        <p className="font-mono text-xs text-foreground">{item.transactionId}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tabela Desktop */}
          <Card className="hidden lg:block card-dark">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                Histórico de Depósitos
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Valor</th>
                      <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Status</th>
                      <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Data/Hora</th>
                      <th className="text-left p-4 text-sm font-semibold text-muted-foreground">ID Transação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((item) => (
                      <tr key={item.id} className="border-b border-border/30 hover:bg-muted/5">
                        <td className="p-4">
                          {getValueDisplay(item.value, 'deposits')}
                        </td>
                        <td className="p-4">{getStatusBadge(item.status)}</td>
                        <td className="p-4 text-muted-foreground">
                          {item.date} {item.time}
                        </td>
                        <td className="p-4 font-mono text-sm text-muted-foreground">{item.transactionId}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="withdrawals" className="space-y-4">
          {/* Cards Mobile */}
          <div className="lg:hidden space-y-3">
            {currentItems.map((item) => (
              <Card key={item.id} className="card-dark">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        {getValueDisplay(item.value, 'withdrawals')}
                        <p className="text-sm text-muted-foreground">
                          {item.date} às {item.time}
                        </p>
                      </div>
                      {getStatusBadge(item.status)}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Método:</span>
                        <p className="font-semibold text-foreground">{item.method}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">ID:</span>
                        <p className="font-mono text-xs text-foreground">{item.transactionId}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tabela Desktop */}
          <Card className="hidden lg:block card-dark">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center">
                <TrendingDown className="w-5 h-5 mr-2 text-destructive" />
                Histórico de Saques
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Valor</th>
                      <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Status</th>
                      <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Data/Hora</th>
                      <th className="text-left p-4 text-sm font-semibold text-muted-foreground">ID Transação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((item) => (
                      <tr key={item.id} className="border-b border-border/30 hover:bg-muted/5">
                        <td className="p-4">
                          {getValueDisplay(item.value, 'withdrawals')}
                        </td>
                        <td className="p-4">{getStatusBadge(item.status)}</td>
                        <td className="p-4 text-muted-foreground">
                          {item.date} {item.time}
                        </td>
                        <td className="p-4 font-mono text-sm text-muted-foreground">{item.transactionId}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Paginação */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Mostrando {startIndex + 1} a {Math.min(endIndex, currentData.length)} de {currentData.length} registros
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="border-border"
          >
            <ChevronLeft className="w-4 h-4" />
            Anterior
          </Button>
          
          <span className="text-sm text-foreground">
            {currentPage} de {totalPages}
          </span>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="border-border"
          >
            Próximo
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}