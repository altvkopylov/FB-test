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
        //console.log(userInfo)

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

        const forkTable = document.querySelector('.main-table');
        const forkMarkup = filteredGroupedArray.map((item, index) => {
            const partnerId = item.array[0][0];
            const userId = item.array[0][2];
            const FCLive = item.array[0][29];
            const FCPrebet = item.array[0][30];
            const GSLive = item.array[0][31];
            const GSPrebet = item.array[0][32];
            const stakesCount = stakesInfo[userId] ? stakesInfo[userId].length : 0; // Используем информацию о ставках для пользователя
            const GSstakesCount = item.count;

            return `
                <tr class="user-info">
                    <td class="toggle-cell">+</td>
                    <td>${index + 1}</td>
                    <td>${partnerId}</td>
                    <td>${userId}</td>
                    <td class="${getBackgroundColor(FCLive)}">${FCLive}</td>
                    <td class="${getBackgroundColor(FCPrebet)}" >${FCPrebet}</td>
                    <td>${GSLive}</td>
                    <td>${GSPrebet}</td>
                    <td>${stakesCount}</td>
                    <td>${GSstakesCount}</td>
                    <td>${Math.round(((GSstakesCount / stakesCount) * 100))}%</td>
                </tr>
                <tr class="sub-table hide">
                    <td colspan="10">
                    <table>
                        <tr>
                            <th>Service</th>
                            <th>Sport</th>
                            <th>Event ID</th>
                            <th>Event</th>
                            <th>Date</th>
                            <th>Card ID</th>
                            <th>Outcome</th>
                            <th>Result</th>
                            <th>Sum in</th>
                            <th>Coef</th>
                            <th>Profit</th>
                            <th>Currency</th>
                            <th>С кем пересекается</th>
                        </tr>
                        <tr>
                            ${item.array.map(item => {
                                const service = item[16];
                                const sport = item[17];
                                const event_id = item[14];
                                const event_name = `${item[11]} / ${item[12]} / ${item[13]}`;
                                const date = item[6];
                                const card_id = item[3];
                                const outcome = item[9];
                                const result = item[15];
                                const sum_in = item[18];
                                const coef = item[22];
                                const profit = item[19];
                                const currency = item[4];

                                const gs_user = `${item.additionalValue[31]} / ${item.additionalValue[32]}`;

                                const formattedDate = dateFormating(date);

                                return `
                                <tr>
                                    <td>${service}</td>
                                    <td>${sport}</td>
                                    <td>${event_id}</td>
                                    <td>${event_name}</td>
                                    <td>${formattedDate}</td>
                                    <td>${card_id}</td>
                                    <td>${outcome}</td>
                                    <td>${result}</td>
                                    <td>${sum_in}</td>
                                    <td>${coef}</td>
                                    <td>${profit}</td>
                                    <td>${currency}</td>
                                    <td>${gs_user}</td>
                                </tr>
                                `;
                            }).join('')}
                        </tr>
                    </table>
                    </td>
                </tr>
            `
        }).join('')

        forkTable.insertAdjacentHTML("beforeend", forkMarkup);

        const toggleCells = forkTable.querySelectorAll('.toggle-cell');
        toggleCells.forEach(item => item.addEventListener('click', (event) => {
            const toggleCell = event.target;
            console.log(toggleCell)
            const subTable = event.target.parentElement.nextElementSibling;
            if (subTable.classList.contains('hide')) {
                subTable.classList.remove('hide');
                toggleCell.textContent = '-';
            } else {
                subTable.classList.add('hide');
                toggleCell.textContent = '+';
            }
        }))

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