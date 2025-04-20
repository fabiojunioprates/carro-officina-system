
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Header = () => {
  const { toast } = useToast();
  
  const handleNotificationClick = () => {
    toast({
      title: "Notificações",
      description: "Você tem 3 notificações não lidas",
    });
  };
  
  return (
    <header className="border-b bg-white p-4 flex items-center justify-between">
      <div>
        <h1 className="text-xl font-semibold">{getCurrentDateFormatted()}</h1>
        <p className="text-sm text-muted-foreground">Bem-vindo de volta</p>
      </div>
      
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={handleNotificationClick}>
          <Bell size={20} />
        </Button>
        
        <Button variant="outline" size="icon">
          <Calendar size={20} />
        </Button>
        
        <Avatar>
          <AvatarImage src="" />
          <AvatarFallback>AC</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

function getCurrentDateFormatted() {
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return new Date().toLocaleDateString('pt-BR', options);
}

export default Header;
