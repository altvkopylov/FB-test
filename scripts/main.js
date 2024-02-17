const request = indexedDB.open('fb_db', 1);

request.onsuccess = function() {
  //console.log('База данных открыта успешно');
};

request.onupgradeneeded = function(event) {
    const db = event.target.result;
    const objectStore = db.createObjectStore('stakes', { keyPath: 'id', autoIncrement:true });
    console.log('База данных обновлена');
};

function addDataBatch(dataArray) {
  const request = indexedDB.open('fb_db', 1);

  request.onsuccess = function(event) {
    const db = event.target.result;
    const transaction = db.transaction(['stakes'], 'readwrite');
    const objectStore = transaction.objectStore('stakes');

    dataArray.forEach(function ([partner_id, type_bet, user_id, card_id, currency, cashdesk, dt, coef, is_risk, outcome, tournament_id, tournament_name, category_name, event_name, event_id, result, service, sport, card_sum_in, card_profit, sum_in, profit, coupon_odds, num_of_events, dt_done, is_cashout, market, dparam1, dparam2, fc_live, fc_prebet, gc_live, gc_prebet]) {
      card_profit = parseFloat(card_profit.replace(',', '.').replaceAll('\"', ''));
      card_sum_in = parseFloat(card_sum_in.replace(',', '.').replaceAll('\"', ''));
      coef = parseFloat(coef.replace(',', '.').replaceAll('\"', ''));
      coupon_odds = parseFloat(coupon_odds.replace(',', '.').replaceAll('\"', ''));
      profit = parseFloat(profit.replace(',', '.').replaceAll('\"', ''));
      sum_in = parseFloat(sum_in.replace(',', '.').replaceAll('\"', ''));
      dparam1 = parseFloat(dparam1.replace(',', '.').replaceAll('\"', ''));
      dparam2 = parseFloat(dparam2.replace(',', '.').replaceAll('\"', ''));
      outcome = parseInt(outcome.replace(/\s/g, ''));

      let parts = dt.split(' ');
      let dateParts = parts[0].split('.');
      let timeParts = parts[1].split(':');

      let jsDateString = dateParts[1] + '/' + dateParts[0] + '/' + dateParts[2] + ' ' + timeParts[0] + ':' + timeParts[1] + ':' + timeParts[2];

      let date = new Date(jsDateString);

      dt = date;

      objectStore.add([partner_id, type_bet, user_id, card_id, currency, cashdesk, dt, coef, is_risk, outcome, tournament_id, tournament_name, category_name, event_name, event_id, result, service, sport, card_sum_in, card_profit, sum_in, profit, coupon_odds, num_of_events, dt_done, is_cashout, market, dparam1, dparam2, fc_live, fc_prebet, gc_live, gc_prebet]);
    });

    transaction.oncomplete = function(event) {
      console.log('Все записи добавлены успешно');
    };

    transaction.onerror = function(event) {
      console.log('Ошибка при добавлении записей:', event.target.errorCode);
    };
  };
}

function clearData() {
    const request = indexedDB.open('fb_db', 1);

    request.onsuccess = function (event) {
        const db = event.target.result;
        const transaction = db.transaction(['stakes'], 'readwrite');
        const objectStore = transaction.objectStore('stakes');
        const clearRequest = objectStore.clear();

        clearRequest.onsuccess = function(event) {
            console.log("База данных очищена успешно");
        };

        clearRequest.onerror = function(event) {
            console.error("Ошибка при очистке базы данных:", event.target.error);
        };
    }
}

function readData() {
  const request = indexedDB.open('fb_db', 1);

  request.onsuccess = function(event) {
    const db = event.target.result;
    const transaction = db.transaction(['stakes'], 'readonly');
    const objectStore = transaction.objectStore('stakes');

    // Получение всех записей из хранилища объектов
    const requestGetAll = objectStore.getAll();

    requestGetAll.onsuccess = function(event) {
      console.log('Все записи:', event.target.result);
    };

    requestGetAll.onerror = function(event) {
      console.log('Ошибка при чтении данных:', event.target.errorCode);
    };
  };
}

// function getFork() {
//   const forkGSPrebet = ['Расписчик/Кнопочник1', 'Расписчик/Кнопочник2', 'Расписчик/Кнопочник5'];
//   const forkGSLive = ['Внешние1', 'Внешние2', 'Внешние5'];
//   const request = indexedDB.open('fb_db', 1);

//   request.onsuccess = function(event) {
//     const db = event.target.result;
//     const transaction = db.transaction(['stakes'], 'readonly');
//     const objectStore = transaction.objectStore('stakes');

//     const requestGetAll = objectStore.getAll();
      
//     requestGetAll.onsuccess = function(event) {
//       //let filtered = requestGetAll.result.filter(item => item[2] == 205542);
//       let filtered = requestGetAll.result.filter(item => forkGSLive.includes(item[31])).map(item => item[9]);
//       console.log(Array.from(new Set(filtered)))
//       //console.log(filtered)
//     };

//     requestGetAll.onerror = function(event) {
//       console.log('Ошибка при чтении данных:', event.target.errorCode);
//     };
//   };
// }

// function getUserInfo(id) {
//   const request = indexedDB.open('fb_db', 1);

//   request.onsuccess = function(event) {
//     const db = event.target.result;
//     const transaction = db.transaction(['stakes'], 'readonly');
//     const objectStore = transaction.objectStore('stakes');

//     const requestGetAll = objectStore.getAll();
      
//     requestGetAll.onsuccess = function() {
//       let filtered = requestGetAll.result.filter(item => item[2] == id);
//       //console.log(filtered)
//       return filtered;
//     };

//     requestGetAll.onerror = function(event) {
//       console.log('Ошибка при чтении данных:', event.target.errorCode);
//     };
//   };
// }

function getUserInfo(id) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('fb_db', 1);

    request.onsuccess = function(event) {
      const db = event.target.result;
      const transaction = db.transaction(['stakes'], 'readonly');
      const objectStore = transaction.objectStore('stakes');

      const requestGetAll = objectStore.getAll();
        
      requestGetAll.onsuccess = function() {
        let filtered = requestGetAll.result.filter(item => item[2] == id);
        // Разрешаем обещание с результатом
        resolve(filtered);
      };

      requestGetAll.onerror = function(event) {
        console.log('Ошибка при чтении данных:', event.target.errorCode);
        // Отклоняем обещание с ошибкой, если что-то пошло не так
        reject(new Error('Ошибка при чтении данных'));
      };
    };
  });
}

function getOutcomeWithFork() {
  const forkGSPrebet = ['Расписчик/Кнопочник1', 'Расписчик/Кнопочник2', 'Расписчик/Кнопочник5'];
  const forkGSLive = ['Внешние1', 'Внешние2', 'Внешние5'];

  return new Promise((resolve, reject) => {
    const request = indexedDB.open('fb_db', 1);

    request.onsuccess = function(event) {
      const db = event.target.result;
      const transaction = db.transaction(['stakes'], 'readonly');
      const objectStore = transaction.objectStore('stakes');

      const requestGetAll = objectStore.getAll();
        
      requestGetAll.onsuccess = function () {
        let gs_user = requestGetAll.result.filter(item => forkGSLive.includes(item[31]));
        let gs_user_outcome = gs_user.map(item => item[9]);
        //let filtered_test = requestGetAll.result.filter(item => forkGSLive.includes(item[31]));
        //console.log(filtered_test)

        let result = requestGetAll.result.filter(item => gs_user_outcome.includes(item[9]) && !forkGSLive.includes(item[31])).map(item => [item[2], item[32], item[9], item[6], item[3]]);
        //let result = requestGetAll.result.filter(item => gs_user_outcome.includes(item[9])).map(item => [item[2], item[32], item[9], item[6]]);
        toSorted(result, 2, 3)

        console.log(gs_user)
        console.log(result)

        const final_user_list = compareArrays(result, gs_user)

//       console.log(Array.from(new Set(filtered)))
        // Разрешаем обещание с результатом
        //resolve(filtered);
        resolve(final_user_list);
      };

      requestGetAll.onerror = function(event) {
        console.log('Ошибка при чтении данных:', event.target.errorCode);
        // Отклоняем обещание с ошибкой, если что-то пошло не так
        reject(new Error('Ошибка при чтении данных'));
      };
    };
  });
}

function toSorted(arr, index_1, index_2) {
  arr.sort((a, b) => {
    return (b[index_1] < a[index_1]) - (a[index_1] < b[index_1]) || (b[index_2] < a[index_2]) - (a[index_2] < b[index_2]);
  });
}

// function compareArrays(clear_users, gs_users) {
//   const final_user_list = [];
//   for (const clear_user of clear_users) {
//     for (const gs_user of gs_users) {
//       const date1 = new Date(clear_user[3]);
//       const date2 = new Date(gs_user[6]);
//       const timeDifference = Math.abs(date1 - date2) / 1000;
//       if (clear_user[2] === gs_user[9] && timeDifference <= 20) {
//         final_user_list.push(clear_user);
//       }
//     }
//   }
//   return final_user_list;
// }

function compareArrays(clear_users, gs_users) {
  const final_user_list = [];
  const uniqueDates = new Set(); // Создаем объект Set для хранения уникальных дат
  
  for (const clear_user of clear_users) {
    for (const gs_user of gs_users) {
      const date1 = new Date(clear_user[3]);
      const date2 = new Date(gs_user[6]);
      const timeDifference = Math.abs(date1 - date2) / 1000;
      
      if (clear_user[2] === gs_user[9] && timeDifference <= 20) {
        // Добавляем проверку на уникальность даты
        if (!uniqueDates.has(clear_user[4])) {
          final_user_list.push(clear_user);
          uniqueDates.add(clear_user[4]); // Добавляем дату в объект Set
        }
      }
    }
  }
  return final_user_list;
}