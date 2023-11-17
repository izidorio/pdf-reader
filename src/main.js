import { PdfReader } from "pdfreader";

function readPages(path, reader = new PdfReader()) {
  return new Promise((resolve, reject) => {
    let pages = [];
    reader.parseFileItems(path, (err, item) => {
      if (err) reject(err);
      else if (!item) resolve(pages);
      else if (item.page) pages.push({});
      else if (item.text) {
        const row = pages[pages.length - 1][item.y] || [];
        row.push(item.text);
        pages[pages.length - 1][item.y] = row;
      }
    });
  });
}

async function parse({ path_file }) {
  const pages = await readPages(path_file);
  console.log(pages);

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

const result = await parse({ path_file: "./pdfs/example.pdf" });
console.log(result);
