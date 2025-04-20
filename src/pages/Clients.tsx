
import { useState } from "react";
import { 
  mockClients,
  mockVehicles
} from "@/data/mockData";
import { Client } from "@/types";
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
import ClientForm from "@/components/clients/ClientForm";
import { useToast } from "@/hooks/use-toast";
import { Pen, Trash2, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const Clients = () => {
  const { toast } = useToast();
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [selectedClient, setSelectedClient] = useState<Client | undefined>(undefined);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredClients = clients.filter((client) => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.document.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleAddClient = () => {
    setSelectedClient(undefined);
    setIsFormOpen(true);
  };
  
  const handleEditClient = (client: Client) => {
    setSelectedClient(client);
    setIsFormOpen(true);
  };
  
  const handleDeleteClient = (client: Client) => {
    // Check if client has vehicles
    const clientVehicles = mockVehicles.filter(v => v.clientId === client.id);
    
    if (clientVehicles.length > 0) {
      toast({
        title: "Não é possível excluir",
        description: "Este cliente possui veículos cadastrados.",
        variant: "destructive"
      });
      return;
    }
    
    setClients(clients.filter(c => c.id !== client.id));
    toast({
      title: "Cliente excluído",
      description: "O cliente foi excluído com sucesso."
    });
  };
  
  const handleSaveClient = (clientData: Omit<Client, "id" | "createdAt">) => {
    if (selectedClient) {
      // Edit existing client
      setClients(
        clients.map(c => 
          c.id === selectedClient.id 
            ? { ...c, ...clientData } 
            : c
        )
      );
    } else {
      // Add new client
      const newClient: Client = {
        id: crypto.randomUUID(),
        ...clientData,
        createdAt: new Date()
      };
      setClients([...clients, newClient]);
    }
    
    setIsFormOpen(false);
  };
  
  const getVehicleCount = (clientId: string) => {
    return mockVehicles.filter(v => v.clientId === clientId).length;
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>
        <Button onClick={handleAddClient}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Cliente
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Gerenciar Clientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative mb-4">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar clientes..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Documento</TableHead>
                <TableHead>Contato</TableHead>
                <TableHead>Veículos</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.length > 0 ? (
                filteredClients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell className="font-medium">{client.name}</TableCell>
                    <TableCell>{client.document}</TableCell>
                    <TableCell>
                      {client.email}<br />
                      {client.phone}
                    </TableCell>
                    <TableCell>{getVehicleCount(client.id)}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleEditClient(client)}
                      >
                        <Pen className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDeleteClient(client)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    Nenhum cliente encontrado
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {selectedClient ? "Editar Cliente" : "Novo Cliente"}
            </DialogTitle>
          </DialogHeader>
          <ClientForm 
            client={selectedClient}
            onSave={handleSaveClient}
            onCancel={() => setIsFormOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Clients;
