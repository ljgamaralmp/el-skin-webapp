import searchReducer, { setSearch } from './searchSlice';
 
const estadoAnterior = { search: 'foo' };
 
describe('searchSlice', () => {
  it('deve retornar o estado inicial', () => {
    const novoEstado = searchReducer(undefined, { type: '' });
    expect(novoEstado).toEqual({search: ''});
  });
 
  it('deve definir o termo de pesquisa', () => {
    const novoEstado = searchReducer(undefined, setSearch('teste'));
    expect(novoEstado.search).toBe('teste');
  });
 
  it('deve alterar o termo de pesquisa', () => {
    const novoEstado = searchReducer(estadoAnterior, setSearch('teste'));
    expect(novoEstado.search).toBe('teste');
  });
});