import { segments, MemorySegment } from './types';

export const clearSource = (source: string) => {
  const cleanSource = [];
  const cleanedSource = source.replaceAll('\r', '');
  const lines = cleanedSource.split('\n');
  for (let line of lines) {
    line.trim();
    const [code, _] = line.split('//');
    if (code) cleanSource.push(code.trim());
  }
  return cleanSource;
};

export const checkSegment = (seg: string) => {
  if (segments.includes(seg as any)) {
    return seg as MemorySegment;
  }
  return null;
};
