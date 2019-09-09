import { ItemCountPipe } from './item-count.pipe';

describe('ItemCountPipe', () => {
  it('create an instance', () => {
    const pipe = new ItemCountPipe();
    expect(pipe).toBeTruthy();
  });
});
