
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import { getDashboardMetrics, mockServiceOrders } from "@/data/mockData";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { ServiceOrderStatus } from "@/types";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const metrics = getDashboardMetrics();
  const navigate = useNavigate();
  
  // Get the latest orders
  const latestOrders = [...mockServiceOrders]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 5);
  
  // Get orders by status
  const getOrdersByStatus = (status: ServiceOrderStatus) => {
    return mockServiceOrders.filter(order => order.status === status).length;
  };
  
  const statusCounts = {
    pending: getOrdersByStatus(ServiceOrderStatus.PENDING),
    inProgress: getOrdersByStatus(ServiceOrderStatus.IN_PROGRESS),
    waitingParts: getOrdersByStatus(ServiceOrderStatus.WAITING_PARTS),
    completed: getOrdersByStatus(ServiceOrderStatus.COMPLETED),
    delivered: getOrdersByStatus(ServiceOrderStatus.DELIVERED),
  };
  
  const goToServiceOrders = () => {
    navigate("/service-orders");
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <Button onClick={goToServiceOrders}>Nova Ordem de Serviço</Button>
      </div>
      
      <DashboardOverview metrics={metrics} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Ordens de Serviço Recentes</CardTitle>
            <CardDescription>
              As 5 ordens de serviço mais recentes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nº</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {latestOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.number}</TableCell>
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
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Status das Ordens de Serviço</CardTitle>
            <CardDescription>
              Distribuição por status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Pendentes</span>
                  <span className="text-sm font-medium">{statusCounts.pending}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-gray-500 h-2.5 rounded-full" 
                    style={{ width: `${(statusCounts.pending / mockServiceOrders.length) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Em Andamento</span>
                  <span className="text-sm font-medium">{statusCounts.inProgress}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-500 h-2.5 rounded-full" 
                    style={{ width: `${(statusCounts.inProgress / mockServiceOrders.length) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Aguardando Peças</span>
                  <span className="text-sm font-medium">{statusCounts.waitingParts}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-yellow-500 h-2.5 rounded-full" 
                    style={{ width: `${(statusCounts.waitingParts / mockServiceOrders.length) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Concluídos</span>
                  <span className="text-sm font-medium">{statusCounts.completed}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-green-500 h-2.5 rounded-full" 
                    style={{ width: `${(statusCounts.completed / mockServiceOrders.length) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Entregues</span>
                  <span className="text-sm font-medium">{statusCounts.delivered}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-purple-500 h-2.5 rounded-full" 
                    style={{ width: `${(statusCounts.delivered / mockServiceOrders.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
