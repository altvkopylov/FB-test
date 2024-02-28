// ДОБАВИТЬ БАЗУ ДАННЫХ

const request = indexedDB.open('fb_db', 1);

// ДОБАВИТЬ ТАБЛИЦЫ В БАЗУ ДАННЫХ

request.onupgradeneeded = function(event) {
  const db = event.target.result;
  db.createObjectStore('stakes', { keyPath: 'id', autoIncrement: true });
  db.createObjectStore('forks_stakes', { keyPath: 'id', autoIncrement: true });
  db.createObjectStore('forks_outcomes', { keyPath: 'id', autoIncrement: true });
  db.createObjectStore('suspicious_stakes', { keyPath: 'id', autoIncrement: true });
};

// ДОБАВИТЬ ДАННЫЕ В ТАБЛИЦУ 'stakes'

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

// ДОБАВИТЬ ДАННЫЕ В ТАБЛИЦУ

// function addToDB(dataArray, db, table, additionalValue = null) {
//   const request = indexedDB.open(db, 1);

//   request.onsuccess = function(event) {
//     const db = event.target.result;
//     const transaction = db.transaction([table], 'readwrite');
//     const objectStore = transaction.objectStore(table);

//     dataArray.forEach(function (data) {
//       if (additionalValue !== null) {
//         data = { ...data, additionalValue };
//       }
//       objectStore.add(data);
//     });

//     transaction.oncomplete = function(event) {
//       console.log('Все записи добавлены успешно');
//     };

//     transaction.onerror = function(event) {
//       console.log('Ошибка при добавлении записей:', event.target.errorCode);
//     };
//   };
// }

function addToDB(dataArray, db, table, additionalArray) {
  const request = indexedDB.open(db, 1);

  request.onsuccess = function(event) {
    const db = event.target.result;
    const transaction = db.transaction([table], 'readwrite');
    const objectStore = transaction.objectStore(table);

    dataArray.forEach(function (data, index) {
      // Проверяем, есть ли значение в additionalArray для текущего индекса
      const additionalValue = additionalArray ? additionalArray[index] : null;
      if (additionalValue !== null && additionalValue !== undefined) {
        data = { ...data, additionalValue };
      }
      objectStore.add(data);
    });

    transaction.oncomplete = function(event) {
      console.log('Все записи добавлены успешно');
    };

    transaction.onerror = function(event) {
      console.log('Ошибка при добавлении записей:', event.target.errorCode);
    };
  };
}

// ОЧИСТИТЬ ТАБЛИЦУ

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

// УДАЛИТЬ БАЗУ ДАННЫХ

function deleteDB() {
  const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

    if (!indexedDB) {
        console.log("Ваш браузер не поддерживает IndexedDB.");
    }

    const request = indexedDB.deleteDatabase('fb_db');

    request.onerror = function(event) {
        console.log("Ошибка при удалении базы данных:", event.target.errorCode);
    };

    request.onsuccess = function(event) {
        console.log("База данных успешно удалена.");
    };
}

// ПОЛУЧИТЬ ИНФОРМАЦИЮ С БАЗЫ ДАННЫХ

function getAllData(db, table) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(db, 1);

    request.onsuccess = function(event) {
      const db = event.target.result;
      const transaction = db.transaction([table], 'readonly');
      const objectStore = transaction.objectStore(table);

      const requestGetAll = objectStore.getAll();
      requestGetAll.onsuccess = function() {
        resolve(requestGetAll.result);
      };

      requestGetAll.onerror = function(event) {
        console.log('Ошибка при чтении данных:', event.target.errorCode);
        reject(new Error('Ошибка при чтении данных'));
      };
    };
  });
}

// ПОЛУЧИТЬ ИНФОРМАЦИЮ О ПОЛЬЗОВАТЕЛЕ

function getUserInfo(db, table, id) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(db, 1);

    request.onsuccess = function(event) {
      const db = event.target.result;
      const transaction = db.transaction([table], 'readonly');
      const objectStore = transaction.objectStore(table);

      const requestGetAll = objectStore.getAll();
        
      requestGetAll.onsuccess = function() {
        let filtered = requestGetAll.result.filter(item => item[2] == id);
        resolve(filtered);
      };

      requestGetAll.onerror = function(event) {
        console.log('Ошибка при чтении данных:', event.target.errorCode);
        reject(new Error('Ошибка при чтении данных'));
      };
    };
  });
}

// ПОЛУЧИТЬ СПИСОК ВИЛОК



function getSuspiciousUsers() {
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
        let gs_user = requestGetAll.result.filter(item => forkGSLive.includes(item[31])); // +
        // addToDB(gs_user, 'fb_db', 'forks_stakes');
        //
        let gs_user_outcome = gs_user.map(item => item[9]); // +
        //console.log(gs_user_outcome)

        let result = requestGetAll.result.filter(item => gs_user_outcome.includes(item[9]) && !forkGSLive.includes(item[31])); // +
        let result_2 = requestGetAll.result.filter(item => gs_user_outcome.includes(item[9])); // +

        let result_3 = requestGetAll.result.filter(item => gs_user.map(item => item[9]).includes(item[9])); //+

        //console.log(result)
        //console.log(result_2)

        toSorted(result, 2, 3)
        const final_user_list = compareArrays(result, gs_user)
        
        console.log(result)
        console.log(gs_user)
        console.log(final_user_list);
        resolve(final_user_list)
      };

      requestGetAll.onerror = function(event) {
        console.log('Ошибка при чтении данных:', event.target.errorCode);
        reject(new Error('Ошибка при чтении данных'));
      };
    };
  });
}



// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ

// 1. СОРТИРОВКА ПО ДВУМ СТОЛБЦАМ

function toSorted(arr, index_1, index_2) {
  arr.sort((a, b) => {
    return (b[index_1] < a[index_1]) - (a[index_1] < b[index_1]) || (b[index_2] < a[index_2]) - (a[index_2] < b[index_2]);
  });
}

// 2. СРАВНЕНИЕ ДВУХ ТАБЛИЦ ПО ПЕРЕСЕЧЕНИЮ АУТКАМА И ВРЕМЕНИ

function compareArrays(clear_users, gs_users) {
  const final_user_list = [];
  const intersection_gs_user = [];
  const unique_final_user_list = new Set(); // Создаем объект Set для хранения уникальных дат
  
  for (const clear_user of clear_users) {
    for (const gs_user of gs_users) {
      const date1 = new Date(clear_user[6]);
      const date2 = new Date(gs_user[6]);
      const timeDifference = Math.abs(date1 - date2) / 1000;
      
      if (clear_user[9] === gs_user[9] && ((clear_user[16] === "Live" && timeDifference <= 20) || (clear_user[16] === "PreBet" && timeDifference <= 90))) {
        // Добавляем проверку на уникальность даты
        if ((clear_user[4] === 'UAH' && clear_user[18] >= 200) || (clear_user[4] !== 'UAH')) {
          if (!unique_final_user_list.has(clear_user[3])) {
            final_user_list.push(clear_user);
            intersection_gs_user.push(gs_user);
            unique_final_user_list.add(clear_user[3]); // Добавляем дату в объект Set
          }
        }
      }
    }
  }
  //intersection_gs_user
  return {
    'clearUser': final_user_list,
    'gsUser': intersection_gs_user
  };
}