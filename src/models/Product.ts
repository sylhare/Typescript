export class Product {
  id: number = 0;
  name: string = 'Product';

  constructor(product?: Partial<Product>) {
    Object.assign(this, product);
  }

  toString(): string {
    return 'This is ' + this.name;
  }
}

export const randomProduct = (): Product => {
  const id = Math.floor(Math.random() * 100);
  return new Product({ id, name: `Product-${id}` });
};