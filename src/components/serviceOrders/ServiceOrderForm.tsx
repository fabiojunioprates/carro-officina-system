
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  ServiceOrder, 
  ServiceOrderStatus, 
  Client, 
  Vehicle, 
  ServiceOrderItem 
} from "@/types";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Trash2 } from "lucide-react";

const formSchema = z.object({
  clientId: z.string().min(1, "Cliente é obrigatório"),
  vehicleId: z.string().min(1, "Veículo é obrigatório"),
  status: z.nativeEnum(ServiceOrderStatus),
  observations: z.string().optional(),
});

const itemSchema = z.object({
  description: z.string().min(3, "Descrição é obrigatória"),
  quantity: z.coerce.number().min(1, "Quantidade inválida"),
  unitPrice: z.coerce.number().min(0, "Preço inválido"),
  type: z.enum(["SERVICE", "PART"]),
});

interface ServiceOrderFormProps {
  serviceOrder?: ServiceOrder;
  clients: Client[];
  vehicles: Vehicle[];
  onSave: (order: Partial<ServiceOrder>) => void;
  onCancel: () => void;
}

const ServiceOrderForm = ({ 
  serviceOrder, 
  clients, 
  vehicles, 
  onSave, 
  onCancel 
}: ServiceOrderFormProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState<Partial<ServiceOrderItem>[]>(
    serviceOrder?.items || []
  );
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>(
    serviceOrder?.clientId 
      ? vehicles.filter(v => v.clientId === serviceOrder.clientId) 
      : []
  );
  
  const [itemForm, setItemForm] = useState({
    description: "",
    quantity: 1,
    unitPrice: 0,
    type: "SERVICE" as "SERVICE" | "PART",
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientId: serviceOrder?.clientId || "",
      vehicleId: serviceOrder?.vehicleId || "",
      status: serviceOrder?.status || ServiceOrderStatus.PENDING,
      observations: serviceOrder?.observations || "",
    },
  });

  const handleClientChange = (clientId: string) => {
    form.setValue("clientId", clientId);
    form.setValue("vehicleId", ""); // Reset vehicle when client changes
    setFilteredVehicles(vehicles.filter(v => v.clientId === clientId));
  };

  const addItem = () => {
    try {
      const newItem = itemSchema.parse(itemForm);
      setItems([...items, { ...newItem, id: crypto.randomUUID() }]);
      setItemForm({
        description: "",
        quantity: 1,
        unitPrice: 0,
        type: "SERVICE",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Erro ao adicionar item",
          description: error.errors[0].message,
          variant: "destructive",
        });
      }
    }
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const calculateTotal = () => {
    return items.reduce(
      (total, item) => total + (item.quantity || 0) * (item.unitPrice || 0),
      0
    );
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (items.length === 0) {
      toast({
        title: "Erro",
        description: "Adicione pelo menos um item à ordem de serviço",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const orderData = {
        ...values,
        items: items as ServiceOrderItem[],
        totalAmount: calculateTotal(),
      };
      
      onSave(orderData);
      
      toast({
        title: "Ordem de serviço salva",
        description: "A ordem de serviço foi salva com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao salvar a ordem de serviço.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="clientId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cliente</FormLabel>
                  <Select 
                    onValueChange={(value) => handleClientChange(value)} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o cliente" />
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

            <FormField
              control={form.control}
              name="vehicleId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Veículo</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                    disabled={!form.getValues("clientId")}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o veículo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {filteredVehicles.map((vehicle) => (
                        <SelectItem key={vehicle.id} value={vehicle.id}>
                          {vehicle.brand} {vehicle.model} - {vehicle.plate}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(ServiceOrderStatus).map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
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
            name="observations"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Observações</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Observações sobre o serviço"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="border p-4 rounded-md">
            <h3 className="font-medium mb-4">Adicionar Itens</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="md:col-span-2">
                <Input
                  placeholder="Descrição do item"
                  value={itemForm.description}
                  onChange={(e) => 
                    setItemForm({ ...itemForm, description: e.target.value })
                  }
                />
              </div>
              
              <div>
                <Input
                  type="number"
                  placeholder="Quantidade"
                  value={itemForm.quantity}
                  onChange={(e) => 
                    setItemForm({ ...itemForm, quantity: e.target.valueAsNumber })
                  }
                />
              </div>
              
              <div>
                <Input
                  type="number"
                  placeholder="Preço unitário"
                  value={itemForm.unitPrice}
                  onChange={(e) => 
                    setItemForm({ ...itemForm, unitPrice: e.target.valueAsNumber })
                  }
                />
              </div>
            </div>
            
            <div className="flex justify-between items-center mb-4">
              <Select 
                value={itemForm.type} 
                onValueChange={(value: "SERVICE" | "PART") => 
                  setItemForm({ ...itemForm, type: value })
                }
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SERVICE">Serviço</SelectItem>
                  <SelectItem value="PART">Peça</SelectItem>
                </SelectContent>
              </Select>
              
              <Button type="button" onClick={addItem}>
                Adicionar Item
              </Button>
            </div>
            
            {items.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Qtd</TableHead>
                    <TableHead>Preço Unit.</TableHead>
                    <TableHead>Subtotal</TableHead>
                    <TableHead className="w-10"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>
                        {item.type === "SERVICE" ? "Serviço" : "Peça"}
                      </TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>R$ {item.unitPrice?.toFixed(2)}</TableCell>
                      <TableCell>
                        R$ {((item.quantity || 0) * (item.unitPrice || 0)).toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">
                Nenhum item adicionado
              </p>
            )}
            
            {items.length > 0 && (
              <div className="flex justify-end mt-4">
                <div className="text-lg font-medium">
                  Total: R$ {calculateTotal().toFixed(2)}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onCancel} type="button">
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Salvando..." : serviceOrder ? "Atualizar" : "Cadastrar"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ServiceOrderForm;
