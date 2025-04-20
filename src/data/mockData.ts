
import { 
  Client, 
  Vehicle, 
  ServiceOrder, 
  ServiceOrderStatus, 
  InventoryItem,
  Transaction,
  TransactionType,
  PaymentMethod
} from '@/types';

// Mock Clients
export const mockClients: Client[] = [
  {
    id: "1",
    name: "João Silva",
    email: "joao.silva@email.com",
    phone: "(11) 98765-4321",
    document: "123.456.789-00",
    address: "Rua das Flores, 123",
    createdAt: new Date("2023-01-15")
  },
  {
    id: "2",
    name: "Maria Oliveira",
    email: "maria.oliveira@email.com",
    phone: "(11) 91234-5678",
    document: "987.654.321-00",
    address: "Av. Paulista, 1000",
    createdAt: new Date("2023-02-20")
  },
  {
    id: "3",
    name: "Pedro Santos",
    email: "pedro.santos@email.com",
    phone: "(11) 99876-5432",
    document: "456.789.123-00",
    address: "Rua Augusta, 500",
    createdAt: new Date("2023-03-10")
  }
];

// Mock Vehicles
export const mockVehicles: Vehicle[] = [
  {
    id: "1",
    plate: "ABC-1234",
    model: "Onix",
    brand: "Chevrolet",
    year: 2020,
    color: "Prata",
    chassis: "9BGKS48BOOG123456",
    mileage: 45000,
    clientId: "1",
    createdAt: new Date("2023-01-15")
  },
  {
    id: "2",
    plate: "DEF-5678",
    model: "HB20",
    brand: "Hyundai",
    year: 2019,
    color: "Branco",
    chassis: "9BGKT48AOOG654321",
    mileage: 60000,
    clientId: "2",
    createdAt: new Date("2023-02-20")
  },
  {
    id: "3",
    plate: "GHI-9012",
    model: "Gol",
    brand: "Volkswagen",
    year: 2018,
    color: "Preto",
    chassis: "9BFKS48COOG987654",
    mileage: 75000,
    clientId: "3",
    createdAt: new Date("2023-03-10")
  }
];

// Mock Service Orders
export const mockServiceOrders: ServiceOrder[] = [
  {
    id: "1",
    number: "OS00001",
    clientId: "1",
    vehicleId: "1",
    status: ServiceOrderStatus.COMPLETED,
    entryDate: new Date("2023-06-01"),
    exitDate: new Date("2023-06-03"),
    items: [
      {
        id: "1",
        description: "Troca de óleo",
        quantity: 1,
        unitPrice: 150,
        type: "SERVICE"
      },
      {
        id: "2",
        description: "Filtro de óleo",
        quantity: 1,
        unitPrice: 50,
        type: "PART"
      }
    ],
    observations: "Cliente relatou barulho ao frear",
    totalAmount: 200,
    createdAt: new Date("2023-06-01")
  },
  {
    id: "2",
    number: "OS00002",
    clientId: "2",
    vehicleId: "2",
    status: ServiceOrderStatus.IN_PROGRESS,
    entryDate: new Date("2023-06-10"),
    items: [
      {
        id: "3",
        description: "Revisão completa",
        quantity: 1,
        unitPrice: 500,
        type: "SERVICE"
      },
      {
        id: "4",
        description: "Pastilha de freio",
        quantity: 4,
        unitPrice: 75,
        type: "PART"
      }
    ],
    observations: "Veículo para revisão de 60.000 km",
    totalAmount: 800,
    createdAt: new Date("2023-06-10")
  },
  {
    id: "3",
    number: "OS00003",
    clientId: "3",
    vehicleId: "3",
    status: ServiceOrderStatus.WAITING_PARTS,
    entryDate: new Date("2023-06-15"),
    items: [
      {
        id: "5",
        description: "Troca de correia dentada",
        quantity: 1,
        unitPrice: 350,
        type: "SERVICE"
      },
      {
        id: "6",
        description: "Kit correia dentada",
        quantity: 1,
        unitPrice: 250,
        type: "PART"
      }
    ],
    observations: "Aguardando peça importada",
    totalAmount: 600,
    createdAt: new Date("2023-06-15")
  }
];

// Mock Inventory Items
export const mockInventoryItems: InventoryItem[] = [
  {
    id: "1",
    code: "FO-001",
    name: "Filtro de Óleo",
    description: "Filtro de óleo para carros populares",
    category: "Filtros",
    costPrice: 30,
    salePrice: 50,
    stock: 25,
    minStock: 10,
    supplierId: "1",
    lastPurchase: new Date("2023-05-20"),
    createdAt: new Date("2023-01-10")
  },
  {
    id: "2",
    code: "PF-001",
    name: "Pastilha de Freio",
    description: "Jogo de pastilhas de freio dianteiras",
    category: "Freios",
    costPrice: 45,
    salePrice: 75,
    stock: 8,
    minStock: 10,
    supplierId: "2",
    lastPurchase: new Date("2023-04-15"),
    createdAt: new Date("2023-01-15")
  },
  {
    id: "3",
    code: "OL-001",
    name: "Óleo de Motor 5W30",
    description: "Óleo sintético para motor 5W30",
    category: "Lubrificantes",
    costPrice: 90,
    salePrice: 150,
    stock: 20,
    minStock: 15,
    supplierId: "1",
    lastPurchase: new Date("2023-05-25"),
    createdAt: new Date("2023-02-01")
  }
];

// Mock Transactions
export const mockTransactions: Transaction[] = [
  {
    id: "1",
    description: "Pagamento OS00001",
    type: TransactionType.INCOME,
    amount: 200,
    date: new Date("2023-06-03"),
    category: "Serviços",
    paymentMethod: PaymentMethod.CREDIT_CARD,
    status: "COMPLETED",
    relatedOrderId: "1",
    createdAt: new Date("2023-06-03")
  },
  {
    id: "2",
    description: "Compra de peças",
    type: TransactionType.EXPENSE,
    amount: 1500,
    date: new Date("2023-06-05"),
    category: "Estoque",
    paymentMethod: PaymentMethod.BANK_TRANSFER,
    status: "COMPLETED",
    createdAt: new Date("2023-06-05")
  },
  {
    id: "3",
    description: "Adiantamento OS00002",
    type: TransactionType.INCOME,
    amount: 400,
    date: new Date("2023-06-10"),
    category: "Serviços",
    paymentMethod: PaymentMethod.PIX,
    status: "COMPLETED",
    relatedOrderId: "2",
    createdAt: new Date("2023-06-10")
  },
  {
    id: "4",
    description: "Conta de luz",
    type: TransactionType.EXPENSE,
    amount: 350,
    date: new Date("2023-06-15"),
    category: "Despesas Operacionais",
    paymentMethod: PaymentMethod.BANK_SLIP,
    status: "PENDING",
    createdAt: new Date("2023-06-15")
  }
];

// Dashboard metrics
export const getDashboardMetrics = () => {
  return {
    totalOrders: mockServiceOrders.length,
    ordersInProgress: mockServiceOrders.filter(o => o.status === ServiceOrderStatus.IN_PROGRESS).length,
    pendingOrders: mockServiceOrders.filter(o => o.status === ServiceOrderStatus.PENDING).length,
    completedOrders: mockServiceOrders.filter(o => o.status === ServiceOrderStatus.COMPLETED).length,
    monthlyRevenue: mockTransactions
      .filter(t => t.type === TransactionType.INCOME && t.date.getMonth() === new Date().getMonth())
      .reduce((acc, curr) => acc + curr.amount, 0),
    monthlyExpenses: mockTransactions
      .filter(t => t.type === TransactionType.EXPENSE && t.date.getMonth() === new Date().getMonth())
      .reduce((acc, curr) => acc + curr.amount, 0),
    lowStockItems: mockInventoryItems.filter(i => i.stock <= i.minStock).length,
    clientsCount: mockClients.length
  };
};
