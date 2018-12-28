interface Purchase {
  id?: number;
  date: string;
  description: string;
  paid: boolean;
  value: number;
  quantity: number;
  total: number;
}

export default Purchase;
