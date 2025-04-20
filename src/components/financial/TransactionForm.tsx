
import { useToast } from "@/hooks/use-toast";
import { mockTransactions } from "@/data/mockData";
import { TransactionType, PaymentMethod } from "@/types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  description: z.string().min(1, "Descrição é obrigatória"),
  type: z.nativeEnum(TransactionType),
  amount: z.number().min(0.01, "Valor deve ser maior que 0"),
  category: z.string().min(1, "Categoria é obrigatória"),
  paymentMethod: z.nativeEnum(PaymentMethod),
  date: z.string().min(1, "Data é obrigatória"),
});

type FormData = z.infer<typeof formSchema>;

interface TransactionFormProps {
  onSuccess: () => void;
}

export function TransactionForm({ onSuccess }: TransactionFormProps) {
  const { toast } = useToast();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      type: TransactionType.INCOME,
      amount: 0,
      category: "",
      paymentMethod: PaymentMethod.CASH,
      date: new Date().toISOString().split("T")[0],
    },
  });

  const onSubmit = (data: FormData) => {
    const newTransaction = {
      id: `TRANS-${mockTransactions.length + 1}`,
      description: data.description,
      type: data.type,
      amount: data.amount,
      category: data.category,
      paymentMethod: data.paymentMethod,
      date: new Date(data.date),
      status: "COMPLETED" as const,
      createdAt: new Date(),
    };
    
    mockTransactions.push(newTransaction);
    
    toast({
      title: "Transação registrada com sucesso",
      description: `${data.type === TransactionType.INCOME ? "Receita" : "Despesa"} de R$ ${data.amount.toFixed(2)} registrada.`,
    });
    
    onSuccess();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={TransactionType.INCOME}>Receita</SelectItem>
                  <SelectItem value={TransactionType.EXPENSE}>Despesa</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Valor</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoria</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="paymentMethod"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Forma de Pagamento</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a forma de pagamento" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(PaymentMethod).map((method) => (
                    <SelectItem key={method} value={method}>
                      {method}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end space-x-4 pt-4">
          <Button type="submit">Registrar Transação</Button>
        </div>
      </form>
    </Form>
  );
}
