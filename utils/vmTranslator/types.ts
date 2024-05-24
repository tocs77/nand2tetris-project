export const segments = ['argument', 'local', 'static', 'constant', 'this', 'that', 'pointer', 'temp'] as const;
export type MemorySegment = (typeof segments)[number];

export const commands = [
  'push',
  'pop',
  'add',
  'sub',
  'neg',
  'eq',
  'gt',
  'lt',
  'and',
  'or',
  'not',
  'goto',
  'if-goto',
  'label',
  'call',
  'function',
  'return',
] as const;

export type Command = (typeof commands)[number];
