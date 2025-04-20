
import { useState } from "react";
import { 
  mockServiceOrders,
  mockClients,
  mockVehicles
} from "@/data/mockData";
import { ServiceOrder, ServiceOrderStatus } from "@/types";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import ServiceOrderForm from "@/components/serviceOrders/ServiceOrderForm";
import { useToast } from "@/hooks/use-toast";
import { Pen, FileText, Plus, Search, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ServiceOrders = () => {
  const { toast } = useToast();
  const [serviceOrders, setServiceOrders] = useState<ServiceOrder[]>(mockServiceOrders);
  const [selectedOrder, setSelectedOrder] = useState<ServiceOrder | undefined>(undefined);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  
  const filteredOrders = serviceOrders.filter((order) => {
    const matchesSearch = 
      order.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getClientName(order.clientId).toLowerCase().includes(searchTerm.toLowerCase()) ||
      getVehicleInfo(order.vehicleId).toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  const handleAddOrder = () => {
    setSelectedOrder(undefined);
    setIsFormOpen(true);
  };
  
  const handleEditOrder = (order: ServiceOrder) => {
    setSelectedOrder(order);
    setIsFormOpen(true);
  };
  
  const handleViewOrder = (order: ServiceOrder) => {
    // Implement view functionality
    toast({
      title: "Visualizar OS",
      description: `Visualizando OS ${order.number}`,
    });
  };
  
  const handlePrintOrder = (order: ServiceOrder) => {
    // Implement print functionality
    toast({
      title: "Imprimir OS",
      description: `Imprimindo OS ${order.number}`,
    });
  };
  
  const handleSaveOrder = (orderData: Partial<ServiceOrder>) => {
    if (selectedOrder) {
      // Edit existing order
      setServiceOrders(
        serviceOrders.map(o => 
          o.id === selectedOrder.id 
            ? { ...o, ...orderData } 
            : o
        )
      );
    } else {
      // Add new order
      const newOrderNumber = `OS${String(serviceOrders.length + 1).padStart(5, '0')}`;
      
      const newOrder: ServiceOrder = {
        id: crypto.randomUUID(),
        number: newOrderNumber,
        clientId: orderData.clientId || "",
        vehicleId: orderData.vehicleId || "",
        status: orderData.status || ServiceOrderStatus.PENDING,
        entryDate: new Date(),
        items: orderData.items || [],
        observations: orderData.observations,
        totalAmount: orderData.totalAmount || 0,
        createdAt: new Date()
      };
      
      setServiceOrders([...serviceOrders, newOrder]);
    }
    
    setIsFormOpen(false);
  };
  
  const getClientName = (clientId: string) => {
    const client = mockClients.find(c => c.id === clientId);
    return client ? client.name : "Cliente não encontrado";
  };
  
  const getVehicleInfo = (vehicleId: string) => {
    const vehicle = mockVehicles.find(v => v.id === vehicleId);
    return vehicle 
      ? `${vehicle.brand} ${vehicle.model} - ${vehicle.plate}` 
      : "Veículo não encontrado";
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Ordens de Serviço</h1>
        <Button onClick={handleAddOrder}>
          <Plus className="mr-2 h-4 w-4" />
          Nova OS
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Gerenciar Ordens de Serviço</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar ordens de serviço..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select 
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Status</SelectItem>
                {Object.values(ServiceOrderStatus).map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nº</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Veículo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.number}</TableCell>
                    <TableCell>{getClientName(order.clientId)}</TableCell>
                    <TableCell>{getVehicleInfo(order.vehicleId)}</TableCell>
                    <TableCell>
                      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        order.status === ServiceOrderStatus.COMPLETED || order.status === ServiceOrderStatus.DELIVERED
                          ? "bg-green-100 text-green-800"
                          : order.status === ServiceOrderStatus.IN_PROGRESS
                          ? "bg-blue-100 text-blue-800"
                          : order.status === ServiceOrderStatus.WAITING_PARTS
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}>
                        {order.status}
                      </div>
                    </TableCell>
                    <TableCell>
                      {order.entryDate.toLocaleDateString("pt-BR")}
                    </TableCell>
                    <TableCell>
                      R$ {order.totalAmount.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleViewOrder(order)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleEditOrder(order)}
                      >
                        <Pen className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handlePrintOrder(order)}
                      >
                        <FileText className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    Nenhuma ordem de serviço encontrada
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-5xl">
          <DialogHeader>
            <DialogTitle>
              {selectedOrder ? `Editar OS ${selectedOrder.number}` : "Nova Ordem de Serviço"}
            </DialogTitle>
          </DialogHeader>
          <ServiceOrderForm 
            serviceOrder={selectedOrder}
            clients={mockClients}
            vehicles={mockVehicles}
            onSave={handleSaveOrder}
            onCancel={() => setIsFormOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ServiceOrders;
