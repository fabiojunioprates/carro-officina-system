
import { 
  Sidebar as ShadcnSidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import { 
  BarChart3, 
  Users, 
  Car, 
  FileText, 
  Package, 
  Wallet,
  Settings,
  LogOut,
  BookText,
  Cog
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const menuItems = [
    { title: "Dashboard", path: "/dashboard", icon: BarChart3 },
    { title: "Clientes", path: "/clients", icon: Users },
    { title: "Veículos", path: "/vehicles", icon: Car },
    { title: "Ordens de Serviço", path: "/service-orders", icon: FileText },
    { title: "Estoque", path: "/inventory", icon: Package },
    { title: "Financeiro", path: "/financial", icon: Wallet },
    { title: "Manual e Instruções", path: "/help", icon: BookText }
  ];

  return (
    <ShadcnSidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="relative w-8 h-8">
              <Car className="w-6 h-6 text-primary absolute" />
              <Cog className="w-4 h-4 text-primary absolute bottom-0 right-0 animate-spin-slow" />
            </div>
            <div className="flex flex-col items-start">
              <span className="font-bold text-xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                CarroTech
              </span>
              <span className="text-xs text-muted-foreground">Auto Management</span>
            </div>
          </div>
        </div>
        <SidebarTrigger className="ml-auto md:hidden" />
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.path}>
              <SidebarMenuButton asChild className={isActive(item.path) ? "text-primary" : ""}>
                <Link to={item.path} className="flex items-center gap-3">
                  <item.icon size={20} />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="#" className="flex items-center gap-3">
                <Settings size={20} />
                <span>Configurações</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="#" className="flex items-center gap-3">
                <LogOut size={20} />
                <span>Sair</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </ShadcnSidebar>
  );
};

export default Sidebar;
