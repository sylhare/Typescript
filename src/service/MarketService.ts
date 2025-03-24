interface Item {
  name: string;
}

const fetch = (_url: string, _options: Record<string, any>): Promise<string> => Promise.reject('rejects by default');

export class MarketService {
  readonly url: string;

  constructor() {
    this.url = 'localhost';
  }

  info(): string {
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
