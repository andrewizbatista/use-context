import { add } from '../src';

describe('add', () => {
  it('should return 2 if add(1, 1)', () => {
    const result = add(1, 1);

    expect(result).toBe(2);
  });
});
