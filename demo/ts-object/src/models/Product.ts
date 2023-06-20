export class Product {
  id: number = 0;
  name: string = 'Product';

  constructor(product?: Partial<Product>) {
    Object.assign(this, product);
  }

  toString() {
    return 'This is ' + this.name;
  }
}

export function randomProduct() {
  const id = Math.floor(Math.random() * 100);
  return new Product({ id, name: `Product-${id}` });
}
