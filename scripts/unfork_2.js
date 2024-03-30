let stakesInfo = {};

getAllData('fb_db', 'stakes')
    .then(userInfo => {
        userInfo.forEach(item => {
            const userId = item[2];
            if (!stakesInfo[userId]) {
                stakesInfo[userId] = [];
            }
            stakesInfo[userId].push(item);
        });
    })
    .catch(error => {
        console.error(error);
    });

getAllData('fb_db', 'suspicious_stakes')
    .then(userInfo => {

        let groupedArray = userInfo.reduce((acc, obj) => {
        const index = obj[2];
        const existingGroup = acc.find(group => group.key === index);
        if (existingGroup) {
            existingGroup.array.push(obj);
            existingGroup.count++;
        } else {
            acc.push({ key: index, array: [obj], count: 1 });
        }
        return acc;
        }, []);

        groupedArray.sort((a, b) => b.count - a.count);

        const filteredGroupedArray = groupedArray.filter(group => group.count >= 2);

        console.log((''+filteredGroupedArray[0].array[0][21]).replace(/\./g, ','))

        // filteredGroupedArray.forEach(user => {
        //     user.array.forEach(stake => {
        //         console.log(stake)
        //     })
        // })

        const forkTable = document.querySelector('.main-table');

        const forkMarkup = filteredGroupedArray.map((user, index) => {
            if (user.array && user.array.length > 0) {
                return user.array.map(stake => {

                    const partner_id = stake[0];
                    const user_id = stake[2];
                    const fc_live = stake[29];
                    const fc_prebet = stake[30];
                    const gc_live = stake[31];
                    const gc_prebet = stake[32];
                    const stakes_count = stakesInfo[user_id] ? stakesInfo[user_id].length : 0; // Используем информацию о ставках для пользователя
                    const gs_stakes_count = user.count;
                    const ratio = Math.round(((gs_stakes_count / stakes_count) * 100));
                    const service = stake[16];
                    const sport = stake[17];
                    const event_id = stake[14];
                    const event = `${stake[11]} / ${stake[12]} / ${stake[13]}`;
                    const date = dateFormating(stake[6]);
                    const card_id = stake[3];
                    const outcome = stake[9];
                    const result = stake[15];
                    // const sum_in = stake[18];
                    // const coef = stake[22];
                    // const profit = stake[19];
                    const sum_in = replaceDotWithComma(stake[18]);
                    const coef = replaceDotWithComma(stake[22]);
                    const profit = replaceDotWithComma(stake[19]);
                    const currency = stake[4];
                    const gs_intersection = `${stake.additionalValue[31]} / ${stake.additionalValue[32]}`;

                    return `<tr class="user-info">
                        <td>${partner_id}</td>
                        <td>${user_id}</td>
                        <td>${fc_live}</td>
                        <td>${fc_prebet}</td>
                        <td>${gc_live}</td>
                        <td>${gc_prebet}</td>
                        <td>${stakes_count}</td>
                        <td>${gs_stakes_count}</td>
                        <td>${ratio}%</td>
                        <td>${service}</td>
                        <td>${sport}</td>
                        <td>${event_id}</td>
                        <td>${event}</td>
                        <td>${date}</td>
                        <td>${card_id}</td>
                        <td>${outcome}</td>
                        <td>${result}</td>
                        <td>${sum_in}</td>
                        <td>${coef}</td>
                        <td>${profit}</td>
                        <td>${currency}</td>
                        <td>${gs_intersection}</td>
                    </tr>`;
                }).join('');
            }
            return ''; // Возвращаем пустую строку, если user.array пуст или отсутствует
        }).join('');
        
        forkTable.insertAdjacentHTML("beforeend", forkMarkup);

    }).catch(error => {
        console.error(error);
    });

function dateFormating(date) {
    const originalDate = new Date(date);
    return `${originalDate.getDate().toString().padStart(2, '0')}.${(originalDate.getMonth() + 1).toString().padStart(2, '0')}.${originalDate.getFullYear()} ${originalDate.getHours().toString().padStart(2, '0')}:${originalDate.getMinutes().toString().padStart(2, '0')}:${originalDate.getSeconds().toString().padStart(2, '0')}`;    
}

function getBackgroundColor(financeCategory) {
    switch (financeCategory) {
        case "VIP Silver1":
            return 'silver';
        case "VIP Platinum1":
            return 'platinum';
        case "VIP Bronze1":
            return 'bronze';
        case "VIP Gold1":
            return 'gold';
        case "Positive1":
            return 'positive';
        default:
            return '';
    }
}

function sortGroupedArray(array) {
    const sortedArray = array.slice();
    const sortedByUserId = sortedArray.slice().sort((a, b) => (b.key * 1) - (a.key * 1));
    const sortedByForkCount = sortedArray.slice().sort((a, b) => b.count - a.count);
    return {
        user_id: sortedByUserId,
        fork_count: sortedByForkCount
    };
}

function replaceDotWithComma(number) {
    return (''+number).replace(/\./g, ',');
}