import { OrderItem } from './order-item';

describe('OrderItem', () => {
  it('should create an instance', () => {
    expect(new OrderItem('test-image.jpg', 10.99, 2, 'prod-123')).toBeTruthy();
  });
});
