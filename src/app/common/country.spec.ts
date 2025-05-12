import { Country } from './country';

describe('Country', () => {
  it('should create an instance', () => {
    expect(new Country(1, 'US', 'United States')).toBeTruthy();
  });
});
