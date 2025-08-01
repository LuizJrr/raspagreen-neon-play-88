import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { QrCode, X } from "lucide-react";

interface DepositModalProps {
  open: boolean;
  onClose: () => void;
  onDeposit: (amount: number) => void;
}

const quickAmounts = [
  { value: 10, label: "R$ 10,00", isHot: false },
  { value: 30, label: "R$ 30,00", isHot: true },
  { value: 50, label: "R$ 50,00", isHot: false },
  { value: 100, label: "R$ 100,00", isHot: false },
];

export function DepositModal({ open, onClose, onDeposit }: DepositModalProps) {
  const [amount, setAmount] = useState("");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  const handleAmountSelect = (value: number) => {
    setAmount(value.toFixed(2));
    setSelectedAmount(value);
  };

  const handleAmountChange = (value: string) => {
    // Remove caracteres não numéricos exceto vírgula e ponto
    const cleanValue = value.replace(/[^\d.,]/g, '');
    setAmount(cleanValue);
    setSelectedAmount(null);
  };

  const handleGenerateQR = () => {
    const numericAmount = parseFloat(amount.replace(',', '.'));
    if (numericAmount >= 10) {
      onDeposit(numericAmount);
      onClose();
    }
  };

  const getAmountValue = () => {
    return parseFloat(amount.replace(',', '.')) || 0;
  };

  const isValidAmount = getAmountValue() >= 10;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-background border-border p-0 max-w-sm mx-auto">
        <DialogTitle className="sr-only">Depositar</DialogTitle>
        <DialogDescription className="sr-only">
          Faça um depósito via PIX. Valor mínimo de R$ 10,00.
        </DialogDescription>
        {/* Header */}
        <div className="relative">
          {/* Banner promocional */}
          <div className="bg-gradient-to-r from-primary/80 to-primary p-4 text-center">
            <div className="text-xs font-semibold text-primary-foreground mb-1 tracking-wider">
              CAIXA DE BONUS LIBERADA
            </div>
            <div className="space-y-1">
              <div className="text-lg font-bold text-primary-foreground">
                COMPRE NO PIX &
              </div>
              <div className="text-xl font-black text-primary-foreground">
                RECEBA NO PIX
              </div>
              <div className="text-xs text-primary-foreground/90">
                ACHE 3 IGUAIS E GANHE NA HORA!
              </div>
            </div>
            
            {/* Logo PIX */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-primary-foreground rounded-sm flex items-center justify-center">
                  <span className="text-primary font-bold text-xs">PIX</span>
                </div>
              </div>
            </div>
          </div>

          {/* Botão fechar */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute top-2 left-2 text-primary-foreground hover:bg-white/20 z-10"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Conteúdo do formulário */}
        <div className="p-6 space-y-6">
          {/* Título com ícone */}
          <div className="flex items-center space-x-2">
            <QrCode className="w-5 h-5 text-foreground" />
            <h2 className="text-xl font-bold text-foreground">Depositar</h2>
          </div>

          {/* Campo de valor */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Valor:</label>
            <Input
              value={amount}
              onChange={(e) => handleAmountChange(e.target.value)}
              placeholder="R$ 0,00"
              className="input-dark text-lg font-semibold"
            />
            <p className="text-xs text-destructive">
              O valor mínimo é R$ 10,00
            </p>
          </div>

          {/* Botões de valores rápidos */}
          <div className="grid grid-cols-2 gap-3">
            {quickAmounts.map((option) => (
              <Button
                key={option.value}
                variant="outline"
                onClick={() => handleAmountSelect(option.value)}
                className={`relative border-primary/30 text-primary hover:bg-primary/10 ${
                  selectedAmount === option.value ? 'border-primary bg-primary/10' : ''
                }`}
              >
                {option.label}
                {option.isHot && (
                  <Badge className="absolute -top-2 -right-2 bg-yellow-500 text-black font-bold text-xs px-2 py-0">
                    🔥 QUENTE
                  </Badge>
                )}
              </Button>
            ))}
          </div>

          {/* Botão gerar QR Code */}
          <Button
            onClick={handleGenerateQR}
            disabled={!isValidAmount}
            className="w-full btn-neon py-3 text-base font-semibold"
          >
            <QrCode className="w-5 h-5 mr-2" />
            Gerar QR Code
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}