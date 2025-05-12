import { State } from './state';

describe('State', () => {
  it('should create an instance', () => {
    expect(new State(1, 'Test State')).toBeTruthy();
  });
});
