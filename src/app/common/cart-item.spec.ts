import { CartItem } from './cart-item';

describe('CartItem', () => {
  it('should create an instance', () => {
    const product = {
      id: '1',
      name: 'Test Product',
      imageUrl: 'test.jpg',
      unitPrice: 10.0,
    } as any; // Use 'as any' if Product type is not imported
    expect(new CartItem(product)).toBeTruthy();
  });
});
