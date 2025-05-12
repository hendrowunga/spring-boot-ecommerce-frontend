import { Address } from './address';

describe('Address', () => {
  it('should create an instance', () => {
    expect(
      new Address(
        '123 Main St',
        'Test City',
        'Test State',
        'Test Country',
        '12345'
      )
    ).toBeTruthy();
  });
});
