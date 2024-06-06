import { buildAST } from '../ast/buildAST';

export const vmGenerator = (xml: string) => {
  const ast = buildAST(xml);
};
