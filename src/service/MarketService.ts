interface Item {
  name: string;
}

const fetch = (url: string, options: any): Promise<string> => Promise.reject('rejects by default');

export class MarketService {
  readonly url: string;

  constructor() {
    this.url = process.env.url ?? 'localhost';
  }

  info() {
    return 'MarketService allows its customer to buy and sell items';
  }

  async buy(item: Item): Promise<string> {
    return await fetch(this.url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      body: JSON.stringify(item)
    });
  }
}
