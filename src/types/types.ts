export interface Produto {
  id: number;
  image: string;
  name: string;
  description: string;
  price: number;
  tags: Array<{
    label: string;
    type: 'protection' | 'face';
  }>;
}
