import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X, DollarSign } from "lucide-react";

interface WithdrawModalProps {
  open: boolean;
  onClose: () => void;
  onWithdraw: (amount: number, pixKey: string) => void;
  currentBalance: number;
}

const quickAmounts = [30, 50, 100, 200];

export function WithdrawModal({ open, onClose, onWithdraw, currentBalance }: WithdrawModalProps) {
  const [amount, setAmount] = useState('');
  const [pixKey, setPixKey] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const withdrawAmount = parseFloat(amount);
    
    if (withdrawAmount < 20) {
      alert('Valor mínimo para saque é R$ 20,00');
      return;
    }
    
    if (withdrawAmount > currentBalance) {
      alert('Saldo insuficiente');
      return;
    }
    
    onWithdraw(withdrawAmount, pixKey);
    onClose();
    setAmount('');
    setPixKey('');
  };

  const handleQuickAmount = (value: number) => {
    setAmount(value.toString());
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card border-primary/20">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-destructive/20 rounded-lg flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-destructive" />
            </div>
            <h2 className="text-xl font-bold text-foreground">Sacar</h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 p-6 pt-4">
          {/* Saldo atual */}
          <div className="bg-muted/20 p-4 rounded-lg text-center">
            <p className="text-sm text-muted-foreground">Saldo disponível</p>
            <p className="text-2xl font-bold text-primary">
              R$ {Number(currentBalance).toFixed(2).replace('.', ',')}
            </p>
          </div>

          {/* Valor do saque */}
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-foreground font-medium">
              Valor
            </Label>
            <Input
              id="amount"
              type="number"
              placeholder="R$ 20,00"
              step="0.01"
              min="20"
              max={currentBalance}
              className="input-dark text-lg"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            <p className="text-xs text-muted-foreground">
              Valor mínimo: R$ 20,00
            </p>
          </div>

          {/* Valores rápidos */}
          <div className="space-y-2">
            <Label className="text-foreground font-medium">Valores rápidos</Label>
            <div className="flex space-x-2">
              {quickAmounts.map((value) => (
                <Button
                  key={value}
                  type="button"
                  variant="outline"
                  size="sm"
                  className="flex-1 border-primary/30 text-primary hover:bg-primary/10"
                  onClick={() => handleQuickAmount(value)}
                  disabled={value > currentBalance}
                >
                  R$ {value}
                </Button>
              ))}
            </div>
          </div>

          {/* Chave PIX */}
          <div className="space-y-2">
            <Label htmlFor="pixKey" className="text-foreground font-medium">
              Chave PIX
            </Label>
            <Input
              id="pixKey"
              placeholder="Digite sua chave PIX..."
              className="input-dark"
              value={pixKey}
              onChange={(e) => setPixKey(e.target.value)}
              required
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground font-semibold py-3"
          >
            Solicitar Saque
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}