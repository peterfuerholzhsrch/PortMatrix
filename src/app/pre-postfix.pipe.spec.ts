import { PrePostfixPipe } from './pre-postfix.pipe';

describe('PrePostfixPipe', () => {
  it('create an instance', () => {
    const pipe = new PrePostfixPipe();
    expect(pipe).toBeTruthy();
  });

  it('empty', () => {
    const pipe = new PrePostfixPipe();
    expect(pipe.transform(null, 'aaa', 'bbb')).toBe(null);
    expect(pipe.transform('', 'aaa', 'bbb')).toBe('');
  });

  it('with value', () => {
    const pipe = new PrePostfixPipe();
    expect(pipe.transform(123, 'a', 'b')).toBe('a123b');
    expect(pipe.transform('123', 'a', 'b')).toBe('a123b');
  });

  it('without prefix', () => {
    const pipe = new PrePostfixPipe();
    expect(pipe.transform(123, null, 'b')).toBe('123b');
    expect(pipe.transform('123', '', 'b')).toBe('123b');
  });

  it('no postfix', () => {
    const pipe = new PrePostfixPipe();
    expect(pipe.transform(123, 'a')).toBe('a123');
    expect(pipe.transform('123', 'a', '')).toBe('a123');
  });

});
