# pdf-reader

Faz a leitura de um arquivo PDF e retorna o texto contido nele vetorizado.

```js
async function parse({ path_file }) {
  const pages = await readPages(path_file);
  console.log(pages);
  /** saída 
  [{
    '6.585': [ 'Declaração Universal dos Direitos Humanos' ],
    '8.186': [
      '*tradução oficial, UNITED',
      ' NATIONS HIGH COMMISSIONER FOR HUMAN RIGHTS'
    ],
    ...
*/

  // filtre os elementos que deseja obter do pdf passando o número da linha e o índice da coluna
  const fields = {
    titulo: { row: "6.585", index: 0 },
    linha_1_0: { row: "8.186", index: 0 },
    linha_1_1: { row: "8.186", index: 1 },
  };

  let values = [];
  for (const page of pages) {
    try {
      const data = {};
      Object.keys(fields).forEach((key) => {
        const field = fields[key];
        const val = page[field.row][field.index];
        data[key] = val;
      });

      values.push(data);
    } catch (error) {
      console.log(error);
    }
  }

  return values;
}

const result = await parse({ path_file: "./pdfs/example_1.pdf" });
console.log(result);
/** saída
 [
  {
    titulo: 'Declaração Universal dos Direitos Humanos',
    linha_1_0: '*tradução oficial, UNITED',
    linha_1_1: ' NATIONS HIGH COMMISSIONER FOR HUMAN RIGHTS'
  }
]
 */
```

Clone o projeto e instale as dependências

```bash
git clone
npm install
npm run dev
```
