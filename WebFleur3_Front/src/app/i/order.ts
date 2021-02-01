export interface Order {
  orderId: number;
  userId: number;
  orderPrice: number;
  orderDate: Date;
  state: boolean;
}
