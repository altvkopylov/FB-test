const clearDBbutton = document.querySelector('.clearDB');
clearDBbutton.addEventListener('click', () => {
  clearData();
})

const getAll = document.querySelector('.getAll');
getAll.addEventListener('click', () => {
  console.log('getAll')
  readData();
})

const dataStakes = document.querySelector('#data-stakes');
dataStakes.addEventListener('change', (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const content = e.target.result;

        const lines = content.split('\n')
      let data = [];
        for (let i = 3; i < lines.length; i++) {
          let correctLine = lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
          data.push(correctLine);
      }
      addDataBatch(data);
    }
    reader.readAsText(file);
})