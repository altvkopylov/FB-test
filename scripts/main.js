const request = indexedDB.open('fb_db', 1);

request.onsuccess = function() {
  console.log('База данных открыта успешно');
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

function getFork() {
  const forkGSPrebet = ['Расписчик/Кнопочник1', 'Расписчик/Кнопочник2', 'Расписчик/Кнопочник5'];
  const forkGSLive = ['Внешние1', 'Внешние2', 'Внешние5'];
  const request = indexedDB.open('fb_db', 1);

  request.onsuccess = function(event) {
    const db = event.target.result;
    const transaction = db.transaction(['stakes'], 'readonly');
    const objectStore = transaction.objectStore('stakes');

    const requestGetAll = objectStore.getAll();
      
    requestGetAll.onsuccess = function(event) {
      let filtered = requestGetAll.result.filter(item => item[2] == 205542);
      //let filtered = requestGetAll.result.filter(item => forkGSLive.includes(item[31])).map(item => item[9]);
      //console.log(Array.from(new Set(filtered)))
      console.log(filtered)
    };

    requestGetAll.onerror = function(event) {
      console.log('Ошибка при чтении данных:', event.target.errorCode);
    };
  };
}

function getUserInfo(id) {
  const request = indexedDB.open('fb_db', 1);

  request.onsuccess = function(event) {
    const db = event.target.result;
    const transaction = db.transaction(['stakes'], 'readonly');
    const objectStore = transaction.objectStore('stakes');

    const requestGetAll = objectStore.getAll();
      
    requestGetAll.onsuccess = function() {
      let filtered = requestGetAll.result.filter(item => item[2] == id);
      console.log(filtered)
    };

    requestGetAll.onerror = function(event) {
      console.log('Ошибка при чтении данных:', event.target.errorCode);
    };
  };
}