
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
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
import { useToast } from "@/hooks/use-toast";
import { Vehicle, Client } from "@/types";

const formSchema = z.object({
  plate: z.string().min(7, "Placa inválida").max(8, "Placa inválida"),
  model: z.string().min(2, "Modelo inválido"),
  brand: z.string().min(2, "Marca inválida"),
  year: z.coerce.number().min(1900, "Ano inválido").max(new Date().getFullYear() + 1, "Ano inválido"),
  color: z.string().min(2, "Cor inválida"),
  chassis: z.string().optional(),
  mileage: z.coerce.number().min(0, "Quilometragem inválida"),
  clientId: z.string().min(1, "Cliente é obrigatório"),
});

interface VehicleFormProps {
  vehicle?: Vehicle;
  clients: Client[];
  onSave: (vehicle: Omit<Vehicle, "id" | "createdAt">) => void;
  onCancel: () => void;
}

const VehicleForm = ({ vehicle, clients, onSave, onCancel }: VehicleFormProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      plate: vehicle?.plate || "",
      model: vehicle?.model || "",
      brand: vehicle?.brand || "",
      year: vehicle?.year || currentYear,
      color: vehicle?.color || "",
      chassis: vehicle?.chassis || "",
      mileage: vehicle?.mileage || 0,
      clientId: vehicle?.clientId || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const vehicleData: Omit<Vehicle, "id" | "createdAt"> = {
        plate: values.plate,
        model: values.model,
        brand: values.brand,
        year: values.year,
        color: values.color,
        chassis: values.chassis || "",
        mileage: values.mileage,
        clientId: values.clientId
      };
      
      onSave(vehicleData);
      
      toast({
        title: "Veículo salvo",
        description: "As informações do veículo foram salvas com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao salvar o veículo.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="plate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Placa</FormLabel>
                <FormControl>
                  <Input placeholder="ABC1234" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="clientId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Proprietário</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o proprietário" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {clients.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Marca</FormLabel>
                <FormControl>
                  <Input placeholder="Volkswagen" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="model"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Modelo</FormLabel>
                <FormControl>
                  <Input placeholder="Gol" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ano</FormLabel>
                <Select 
                  onValueChange={(value) => field.onChange(parseInt(value))} 
                  defaultValue={field.value.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o ano" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cor</FormLabel>
                <FormControl>
                  <Input placeholder="Branco" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="chassis"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Chassis</FormLabel>
                <FormControl>
                  <Input placeholder="9BWZZZ377VT004251" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mileage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quilometragem</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="50000" 
                    {...field}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onCancel} type="button">
            Cancelar
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Salvando..." : vehicle ? "Atualizar" : "Cadastrar"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default VehicleForm;
