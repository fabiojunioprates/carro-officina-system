
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
  LogOut 
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
    { title: "Financeiro", path: "/financial", icon: Wallet }
  ];

  return (
    <ShadcnSidebar>
      <SidebarHeader className="p-4 flex items-center">
        <div className="flex items-center gap-2">
          <span className="font-bold text-xl">CarroTech</span>
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
