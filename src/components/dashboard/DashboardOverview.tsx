
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  BarChart3, 
  FileText, 
  AlertTriangle, 
  Users,
  ArrowUp,
  ArrowDown,
  Car
} from "lucide-react";
import { DashboardMetrics } from "@/types";

interface DashboardOverviewProps {
  metrics: DashboardMetrics;
}

const DashboardOverview = ({ metrics }: DashboardOverviewProps) => {
  const cards = [
    {
      title: "Ordens de Serviço",
      value: metrics.totalOrders,
      description: `${metrics.ordersInProgress} em andamento`,
      icon: FileText,
      color: "text-blue-500",
      bgColor: "bg-blue-100"
    },
    {
      title: "Faturamento Mensal",
      value: `R$ ${metrics.monthlyRevenue.toLocaleString('pt-BR')}`,
      description: metrics.monthlyRevenue > metrics.monthlyExpenses 
        ? "Lucro positivo" 
        : "Lucro negativo",
      icon: ArrowUp,
      color: "text-green-500",
      bgColor: "bg-green-100"
    },
    {
      title: "Despesas Mensais",
      value: `R$ ${metrics.monthlyExpenses.toLocaleString('pt-BR')}`,
      description: "Total do mês atual",
      icon: ArrowDown,
      color: "text-red-500",
      bgColor: "bg-red-100"
    },
    {
      title: "Clientes",
      value: metrics.clientsCount,
      description: "Total cadastrados",
      icon: Users,
      color: "text-purple-500",
      bgColor: "bg-purple-100"
    },
    {
      title: "Veículos",
      value: "47",
      description: "Cadastrados no sistema",
      icon: Car,
      color: "text-amber-500",
      bgColor: "bg-amber-100"
    },
    {
      title: "Alerta de Estoque",
      value: metrics.lowStockItems,
      description: "Itens abaixo do mínimo",
      icon: AlertTriangle,
      color: "text-yellow-500",
      bgColor: "bg-yellow-100"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {cards.map((card, index) => (
        <Card key={index}>
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            <div className={`${card.bgColor} ${card.color} p-2 rounded-full`}>
              <card.icon size={16} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
            <p className="text-xs text-muted-foreground">{card.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardOverview;
