
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookText, Info } from "lucide-react";

const Help = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Manual e Instruções</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <BookText className="h-5 w-5" />
              <CardTitle>Manual do Usuário</CardTitle>
            </div>
            <CardDescription>
              Guia completo das funcionalidades do sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <section>
              <h3 className="font-semibold mb-2">Dashboard</h3>
              <p className="text-sm text-muted-foreground">
                Visualize indicadores importantes do seu negócio, incluindo faturamento, 
                ordens de serviço em andamento e estoque.
              </p>
            </section>
            
            <section>
              <h3 className="font-semibold mb-2">Clientes</h3>
              <p className="text-sm text-muted-foreground">
                Gerencie o cadastro de clientes, visualize histórico de serviços e 
                mantenha informações de contato atualizadas.
              </p>
            </section>
            
            <section>
              <h3 className="font-semibold mb-2">Veículos</h3>
              <p className="text-sm text-muted-foreground">
                Cadastre e acompanhe os veículos dos clientes, histórico de manutenções
                e informações técnicas.
              </p>
            </section>
            
            <section>
              <h3 className="font-semibold mb-2">Ordens de Serviço</h3>
              <p className="text-sm text-muted-foreground">
                Crie e gerencie ordens de serviço, acompanhe o status dos trabalhos
                e registre serviços realizados.
              </p>
            </section>
            
            <section>
              <h3 className="font-semibold mb-2">Estoque</h3>
              <p className="text-sm text-muted-foreground">
                Controle seu inventário de peças e produtos, gerencie fornecedores
                e acompanhe níveis de estoque.
              </p>
            </section>
            
            <section>
              <h3 className="font-semibold mb-2">Financeiro</h3>
              <p className="text-sm text-muted-foreground">
                Registre receitas e despesas, acompanhe o fluxo de caixa e gere
                relatórios financeiros.
              </p>
            </section>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Info className="h-5 w-5" />
              <CardTitle>Instruções de Uso</CardTitle>
            </div>
            <CardDescription>
              Dicas e recomendações para melhor utilização do sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <section>
              <h3 className="font-semibold mb-2">Primeiros Passos</h3>
              <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-2">
                <li>Comece cadastrando seus clientes e seus respectivos veículos</li>
                <li>Configure seu inventário inicial de peças e produtos</li>
                <li>Familiarize-se com o processo de criar ordens de serviço</li>
                <li>Configure as categorias financeiras conforme sua necessidade</li>
              </ul>
            </section>
            
            <section>
              <h3 className="font-semibold mb-2">Boas Práticas</h3>
              <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-2">
                <li>Mantenha as informações dos clientes sempre atualizadas</li>
                <li>Registre todas as transações financeiras no momento em que ocorrem</li>
                <li>Faça backup regular dos dados importantes</li>
                <li>Monitore regularmente os níveis de estoque</li>
                <li>Atualize o status das ordens de serviço em tempo real</li>
              </ul>
            </section>
            
            <section>
              <h3 className="font-semibold mb-2">Suporte</h3>
              <p className="text-sm text-muted-foreground">
                Em caso de dúvidas ou problemas, entre em contato com nossa equipe
                de suporte através do menu Ajuda ou pelo email suporte@carrotech.com
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Help;
