import { farm } from '../../src/models/Farm';

describe('Farm', () => {
  const entries = Object.entries(farm);

  it('can be viewed as entries', () => {
    expect(entries).toMatchSnapshot();
    expect(entries.length).toEqual(4);
    expect(entries[0].length).toEqual(2);
  });

  it('takes entries back to an object', () => {
    expect(Object.fromEntries(entries)).toEqual(farm);
  });

  it('groups by type', () => {
    const groupedFarm = entries.reduce((result: any, [key, value]) => ({
      ...result,
      [value.type]: [...(result[value.type] || []), ({ ...value, name: key })]
    }), {});
    expect(groupedFarm).toMatchSnapshot();
    expect(groupedFarm.animal.length).toEqual(2);
    expect(groupedFarm.human[0]).toMatchObject({
      ...farm.farmer,
      name: 'farmer',
    });
  });
});
