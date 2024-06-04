import { CpfCnpjMaskPipe } from '../cpf-cnpj-mask.pipe';

describe('CpfCnpjMaskPipe', () => {
  it('create an instance', () => {
    const pipe = new CpfCnpjMaskPipe();
    expect(pipe).toBeTruthy();
  });
});
