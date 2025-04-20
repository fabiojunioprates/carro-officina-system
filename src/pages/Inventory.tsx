import { useState } from "react";
import { mockInventoryItems } from "@/data/mockData";
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
import { Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { InventoryItemForm } from "@/components/inventory/InventoryItemForm";

const Inventory = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const filteredItems = mockInventoryItems.filter((item) => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleAddItem = () => {
    toast({
      title: "Funcionalidade em desenvolvimento",
      description: "O cadastro de itens de estoque será implementado em breve.",
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Estoque</h1>
        <Button onClick={handleAddItem}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Item
        </Button>
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Novo Item</DialogTitle>
          </DialogHeader>
          <InventoryItemForm onSuccess={() => setIsDialogOpen(false)} />
        </DialogContent>
      </Dialog>
      
      <Card>
        <CardHeader>
          <CardTitle>Gerenciar Estoque</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative mb-4">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar itens..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Preço Venda</TableHead>
                <TableHead>Estoque</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.code}</TableCell>
                  <TableCell>
                    {item.name}
                    {item.description && (
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    )}
                  </TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>R$ {item.salePrice.toFixed(2)}</TableCell>
                  <TableCell>{item.stock} un</TableCell>
                  <TableCell>
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.stock > item.minStock
                        ? "bg-green-100 text-green-800"
                        : item.stock === 0
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {item.stock > item.minStock
                        ? "Adequado"
                        : item.stock === 0
                        ? "Sem estoque"
                        : "Estoque baixo"}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Inventory;
