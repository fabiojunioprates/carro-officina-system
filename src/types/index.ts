
// Client types
export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  document: string; // CPF/CNPJ
  address?: string;
  createdAt: Date;
}

// Vehicle types
export interface Vehicle {
  id: string;
  plate: string;
  model: string;
  brand: string;
  year: number;
  color: string;
  chassis?: string;
  mileage: number;
  clientId: string;
  createdAt: Date;
}

// Service Order types
export enum ServiceOrderStatus {
  PENDING = "Pendente",
  IN_PROGRESS = "Em Andamento",
  WAITING_PARTS = "Aguardando Peças",
  COMPLETED = "Concluído",
  DELIVERED = "Entregue",
  CANCELED = "Cancelado"
}

export interface ServiceOrderItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  type: "SERVICE" | "PART";
}

export interface ServiceOrder {
  id: string;
  number: string;
  clientId: string;
  vehicleId: string;
  status: ServiceOrderStatus;
  entryDate: Date;
  exitDate?: Date;
  items: ServiceOrderItem[];
  observations?: string;
  totalAmount: number;
  createdAt: Date;
}

// Inventory types
export interface InventoryItem {
  id: string;
  code: string;
  name: string;
  description?: string;
  category: string;
  costPrice: number;
  salePrice: number;
  stock: number;
  minStock: number;
  supplierId?: string;
  lastPurchase?: Date;
  createdAt: Date;
}

// Financial types
export enum TransactionType {
  INCOME = "Receita",
  EXPENSE = "Despesa"
}

export enum PaymentMethod {
  CASH = "Dinheiro",
  CREDIT_CARD = "Cartão de Crédito",
  DEBIT_CARD = "Cartão de Débito",
  PIX = "Pix",
  BANK_TRANSFER = "Transferência Bancária",
  BANK_SLIP = "Boleto"
}

export interface Transaction {
  id: string;
  description: string;
  type: TransactionType;
  amount: number;
  date: Date;
  category: string;
  paymentMethod: PaymentMethod;
  status: "PENDING" | "COMPLETED" | "CANCELED";
  relatedOrderId?: string;
  createdAt: Date;
}

// Dashboard types
export interface DashboardMetrics {
  totalOrders: number;
  ordersInProgress: number;
  pendingOrders: number;
  completedOrders: number;
  monthlyRevenue: number;
  monthlyExpenses: number;
  lowStockItems: number;
  clientsCount: number;
}
