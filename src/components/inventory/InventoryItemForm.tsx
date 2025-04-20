
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { mockInventoryItems } from "@/data/mockData";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  code: z.string().min(1, "Código é obrigatório"),
  name: z.string().min(1, "Nome é obrigatório"),
  description: z.string().optional(),
  category: z.string().min(1, "Categoria é obrigatória"),
  costPrice: z.number().min(0, "Preço de custo deve ser maior que 0"),
  salePrice: z.number().min(0, "Preço de venda deve ser maior que 0"),
  stock: z.number().min(0, "Estoque deve ser maior ou igual a 0"),
  minStock: z.number().min(0, "Estoque mínimo deve ser maior ou igual a 0"),
});

type FormData = z.infer<typeof formSchema>;

interface InventoryItemFormProps {
  onSuccess: () => void;
}

export function InventoryItemForm({ onSuccess }: InventoryItemFormProps) {
  const { toast } = useToast();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
      name: "",
      description: "",
      category: "",
      costPrice: 0,
      salePrice: 0,
      stock: 0,
      minStock: 0,
    },
  });

  const onSubmit = (data: FormData) => {
    const newItem = {
      id: `ITEM-${mockInventoryItems.length + 1}`,
      code: data.code,
      name: data.name,
      description: data.description || "",
      category: data.category,
      costPrice: data.costPrice,
      salePrice: data.salePrice,
      stock: data.stock,
      minStock: data.minStock,
      supplierId: undefined,
      lastPurchase: undefined,
      createdAt: new Date(),
    };
    
    mockInventoryItems.push(newItem);
    
    toast({
      title: "Item cadastrado com sucesso",
      description: `O item ${data.name} foi adicionado ao estoque.`,
    });
    
    onSuccess();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Código</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
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
        
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="costPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preço de Custo</FormLabel>
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
            name="salePrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preço de Venda</FormLabel>
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
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estoque Atual</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="minStock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estoque Mínimo</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="flex justify-end space-x-4 pt-4">
          <Button type="submit">Cadastrar Item</Button>
        </div>
      </form>
    </Form>
  );
}
