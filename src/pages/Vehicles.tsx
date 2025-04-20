
import { useState } from "react";
import { 
  mockVehicles,
  mockClients,
  mockServiceOrders
} from "@/data/mockData";
import { Vehicle, Client } from "@/types";
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
import VehicleForm from "@/components/vehicles/VehicleForm";
import { useToast } from "@/hooks/use-toast";
import { Pen, Trash2, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const Vehicles = () => {
  const { toast } = useToast();
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | undefined>(undefined);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredVehicles = vehicles.filter((vehicle) => 
    vehicle.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    getClientName(vehicle.clientId).toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleAddVehicle = () => {
    setSelectedVehicle(undefined);
    setIsFormOpen(true);
  };
  
  const handleEditVehicle = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setIsFormOpen(true);
  };
  
  const handleDeleteVehicle = (vehicle: Vehicle) => {
    // Check if vehicle has service orders
    const vehicleOrders = mockServiceOrders.filter(o => o.vehicleId === vehicle.id);
    
    if (vehicleOrders.length > 0) {
      toast({
        title: "Não é possível excluir",
        description: "Este veículo possui ordens de serviço associadas.",
        variant: "destructive"
      });
      return;
    }
    
    setVehicles(vehicles.filter(v => v.id !== vehicle.id));
    toast({
      title: "Veículo excluído",
      description: "O veículo foi excluído com sucesso."
    });
  };
  
  const handleSaveVehicle = (vehicleData: Omit<Vehicle, "id" | "createdAt">) => {
    if (selectedVehicle) {
      // Edit existing vehicle
      setVehicles(
        vehicles.map(v => 
          v.id === selectedVehicle.id 
            ? { ...v, ...vehicleData } 
            : v
        )
      );
    } else {
      // Add new vehicle
      const newVehicle: Vehicle = {
        id: crypto.randomUUID(),
        ...vehicleData,
        createdAt: new Date()
      };
      setVehicles([...vehicles, newVehicle]);
    }
    
    setIsFormOpen(false);
  };
  
  const getClientName = (clientId: string) => {
    const client = mockClients.find(c => c.id === clientId);
    return client ? client.name : "Cliente não encontrado";
  };
  
  const getServiceOrderCount = (vehicleId: string) => {
    return mockServiceOrders.filter(o => o.vehicleId === vehicleId).length;
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Veículos</h1>
        <Button onClick={handleAddVehicle}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Veículo
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Gerenciar Veículos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative mb-4">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar veículos..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Placa</TableHead>
                <TableHead>Veículo</TableHead>
                <TableHead>Proprietário</TableHead>
                <TableHead>Km</TableHead>
                <TableHead>Ordens</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVehicles.length > 0 ? (
                filteredVehicles.map((vehicle) => (
                  <TableRow key={vehicle.id}>
                    <TableCell className="font-medium">{vehicle.plate}</TableCell>
                    <TableCell>
                      {vehicle.brand} {vehicle.model} ({vehicle.year})
                      <br />
                      <span className="text-sm text-muted-foreground">
                        {vehicle.color}
                      </span>
                    </TableCell>
                    <TableCell>{getClientName(vehicle.clientId)}</TableCell>
                    <TableCell>{vehicle.mileage.toLocaleString()} km</TableCell>
                    <TableCell>{getServiceOrderCount(vehicle.id)}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleEditVehicle(vehicle)}
                      >
                        <Pen className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDeleteVehicle(vehicle)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    Nenhum veículo encontrado
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {selectedVehicle ? "Editar Veículo" : "Novo Veículo"}
            </DialogTitle>
          </DialogHeader>
          <VehicleForm 
            vehicle={selectedVehicle}
            clients={mockClients}
            onSave={handleSaveVehicle}
            onCancel={() => setIsFormOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Vehicles;
