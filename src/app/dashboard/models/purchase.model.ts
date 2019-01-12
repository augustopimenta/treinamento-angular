interface Purchase {
  id?: string;
  date: string;
  description: string;
  paid: boolean;
  value: number;
  quantity: number;
  total: number;
}

export default Purchase;
