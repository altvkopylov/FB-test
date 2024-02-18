const forkGSLive = ['Внешние1', 'Внешние2', 'Внешние5'];
const forkGSPrebet = ['Расписчик/Кнопочник1', 'Расписчик/Кнопочник2', 'Расписчик/Кнопочник5'];

const clearDBbutton = document.querySelector('.clearDB');
clearDBbutton.addEventListener('click', () => {
  //clearData();
  deleteDB();
})

const getAll = document.querySelector('.getAll');
getAll.addEventListener('click', () => {
  //console.log('getAll')
  //readData();
  //console.log(getAllData())

  getAllData('fb_db', 'stakes')
    .then(userInfo => {
        console.log(userInfo); // Используем полученные данные
    })
    .catch(error => {
        console.error(error);
    });


})

const dataStakes = document.querySelector('#data-stakes');
dataStakes.addEventListener('change', (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      const content = e.target.result;
      const lines = content.split('\n');
      let data = [];
      for (let i = 3; i < lines.length; i++) {
        let correctLine = lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
        data.push(correctLine);
      }

      addDataBatch(data);

      getAllData('fb_db', 'stakes')
        .then(userInfo => {
          let gs_user = userInfo.filter(item => forkGSLive.includes(item[31]));
          addToDB(gs_user, 'fb_db', 'forks_stakes');

          let gs_outcomes = userInfo.filter(item => gs_user.map(item => item[9]).includes(item[9]));
          addToDB(gs_outcomes, 'fb_db', 'forks_outcomes');

          let not_gs_stakes = userInfo.filter(item => gs_user.map(item => item[9]).includes(item[9]) && !forkGSLive.includes(item[31]));
          //console.log(not_gs_stakes)
          not_gs_stakes = compareArrays(not_gs_stakes, gs_user)
          addToDB(not_gs_stakes, 'fb_db', 'suspicious_stakes');
        })
        .catch(error => {
            console.error(error);
        });

    }
    reader.readAsText(file);
})