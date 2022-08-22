const fs = require('fs')
const readline = require('readline');
const path = require('path')

const NB_LINES_BULK = 100;
const keywordFiles = ['keywords1.txt', 'keywords2.txt', 'keywords3.txt', 'keywords4.txt'];

exports.searchKeywords = async (text) => {
  try {
    return new Promise((resolve, reject) => {
      let foundKeywords = [], fileChecked = 0;
      const currentDir = process.cwd();

      text = cleanPhrase(text);

      for (const f of keywordFiles) {
        const filePath = path.join(currentDir, 'data', 'words', f);
        // check file exists
        if (fs.existsSync(filePath)) {
          const rl = readline.createInterface({
            input: fs.createReadStream(filePath),
            output: process.stdout,
            terminal: false
          });

          rl.on('line', (line) => {
            //
            if (line.length > 0 && (
                  text.substring(0, line.length + 1) === (line + ' ')   // start with
                  || text.substring(text.length - line.length - 1) === (' ' + line)   // end with
                  // || text.includes(' ' + line)
                  // || text.includes(line + ' ')
                  || text.includes(' ' + line + ' ')
                  || text === line
            )) {
              foundKeywords.push(line);
            }
          });

          rl.on('close', () => {
            fileChecked++;
            if (fileChecked === keywordFiles.length) {
              resolve(foundKeywords);
            }
          });
        }
      }
    });
  } catch (e) {
    console.error(e);
  }
}

function cleanPhrase(input) {
  return input.trim().toLocaleLowerCase().replace(/  +/g, ' ');
}