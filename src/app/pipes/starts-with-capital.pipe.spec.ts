import { StartsWithCapitalPipe } from './starts-with-capital.pipe';

describe('StartsWithCapitalPipe', () => {
  it('create an instance', () => {
    const pipe = new StartsWithCapitalPipe();
    expect(pipe).toBeTruthy();
  });
});
