import { Product, randomProduct } from '../../src/models/Product';

describe('Product reduction', () => {
    type IdsPerProductName = { name: string, ids: number[] };
    const array = ['a', 'b', 'c', 'd', `${randomProduct().id}`];
    const products = [new Product({ id: 1 }), new Product({ id: 2 }), new Product({ name: 'Name' })];
    const result: IdsPerProductName[] = [{ name: 'Product', ids: [1, 2] }, { name: 'Name', ids: [0] }];

    it('stringify the products for fun', () => {
      products.map(it => it.toString()).map(it => expect(it).toMatch(/This is/));
    });

    it('reduces per vowels', () => {
      expect(array.reduce((result: string[], letter: string) => {
        if (letter.match(/[aeiouy]/))
          result.push(letter);
        return result;
      }, [])).toStrictEqual(['a']);
    });

    it('reduces per vowels - two', () => {
      expect(array.reduce((result: string[], letter: string) => [
        ...result,
        ...(letter.match(/[aeiouy]/) ? [letter] : [])
      ], [])).toStrictEqual(['a']);
    });

    it('reduces transforms object: ids per name', () => {
      expect(products.reduce((result: IdsPerProductName[], product: Product) => ([...(new Set([
        ...result,
        (() => {
          const n: IdsPerProductName = result.find(object => object.name === product.name) || { name: product.name, ids: [] };
          n.ids.push(product.id);
          return n;
        })()
      ]))]), [])).toEqual(result);
    });

    it('reduces transforms object: ids per name - 2', () => {
      expect(products.reduce((result: IdsPerProductName[], product: Product) => [
        ...result.filter(p => p.name !== product.name),
        { name: product.name, ids: [...(result.find(o => o.name === product.name)?.ids || []), product.id] }
      ], [])).toEqual(result);
    });
});
