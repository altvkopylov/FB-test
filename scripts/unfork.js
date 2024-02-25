getAllData('fb_db', 'suspicious_stakes')
    .then(userInfo => {
        //console.log(userInfo)

        const groupedArray = userInfo.reduce((acc, obj) => {
        const index3 = obj[2];
        const existingGroup = acc.find(group => group.key === index3);
        if (existingGroup) {
            existingGroup.array.push(obj);
            existingGroup.count++;
        } else {
            acc.push({ key: index3, array: [obj], count: 1 });
        }
        return acc;
        }, []);

        groupedArray.sort((a, b) => b.count - a.count); 
        const filteredGroupedArray = groupedArray.filter(group => group.count >= 1);

        //console.log(filteredGroupedArray)

        const forkTable = document.querySelector('.main-table');
        const forkMarkup = filteredGroupedArray.map((item, index) => {
            //console.log(item.array)
            const partnerId = item.array[0][0];
            const userId = item.array[0][2];
            const FCLive = item.array[0][29];
            const FCPrebet = item.array[0][30];
            const GSLive = item.array[0][31];
            const GSPrebet = item.array[0][32];
            const stakesCount = item.count;

            return `
                <tr class="user-info">
                    <td class="toggle-cell">+</td>
                    <td>${index + 1}</td>
                    <td>${partnerId}</td>
                    <td>${userId}</td>
                    <td>${FCLive}</td>
                    <td>${FCPrebet}</td>
                    <td>${GSLive}</td>
                    <td>${GSPrebet}</td>
                    <td></td>
                    <td>${stakesCount}</td>
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

        // document.addEventListener('DOMContentLoaded', function () {
        //     const toggleCells = forkTable.querySelectorAll('.toggle-cell');

        //     toggleCells.forEach(item => item.addEventListener('click', (event) => {
        //         console.log('!')
        //         const toggleCell = event.target;
        //         const subTable = event.target.parentElement.nextElementSibling;
        //         if (subTable.classList.contains('hide')) {
        //             subTable.classList.remove('hide');
        //             toggleCell.textContent = '-';
        //         } else {
        //             subTable.classList.add('hide');
        //             toggleCell.textContent = '+';
        //         }
        //     }))
        // });

        // const forkTable = document.querySelector('.fork-table');
        // const forkMarkup = userInfo.map((item, index) => {
        //     const partner_id = item[0];
        //     const type_bet = item[1];
        //     const user_id = item[2];
        //     const card_id = item[3];
        //     const currency = item[4];
        //     const cashdesk = item[5];
        //     const dt = item[6];
        //     const coef = item[7];
        //     const is_risk = item[8];
        //     const outcome = item[9];
        //     const tournament_id = item[10];
        //     const tournament_name = item[11];
        //     const category_name = item[12];
        //     const event_name = item[13];
        //     const event_id = item[14];
        //     const result = item[15];
        //     const service = item[16];
        //     const sport = item[17];
        //     const card_sum_in = item[18];
        //     const card_profit = item[19];
        //     let sum_in = item[20];
        //     const profit = item[21];
        //     const coupon_odds = item[22];
        //     const num_of_events = item[23];
        //     const dt_done = item[24];
        //     const is_cashout = item[25];
        //     const market = item[26];
        //     const dparam1 = item[27];
        //     const dparam2 = item[28];
        //     const fc_live = item[29];
        //     const fc_prebet = item[30];
        //     const gc_live = item[31];
        //     const gc_prebet = item[32];

        //     const additionalValue = item.additionalValue;

        //     // ЛОГИКА

        //     const formattedDate = dateFormating(dt);

        //     sum_in = ('' + sum_in).replace('.', ',');
            
        //     let bg_color = "";

        //     switch (fc_live) {
        //         case "VIP Silver1":
        //             bg_color = 'silver';
        //             break;
        //         case "VIP Platinum1":
        //             bg_color = 'platinum';
        //             break;
        //         case "VIP Bronze1":
        //             bg_color = 'bronze';
        //             break;
        //         case "VIP Gold1":
        //             bg_color = 'gold';
        //             break;
        //         case "Positive1":
        //             bg_color = 'positive';
        //             break;
        //         default:
        //             bg_color = '';
        //             break;
        //     }
            
        //     return `<tr class="${bg_color}">
        //     <td>${index + 1}</td>
        //     <td>${formattedDate}</td>
        //     <td>${dateFormating(additionalValue[6])}</td>
        //     <td>${partner_id}</td>
        //     <td><a href="./user.html?user_id=${user_id}">${user_id}</a></td>
        //     <td>${gc_live}</td>
        //     <td>${gc_prebet}</td>
        //     <td>${fc_live}</td>
        //     <td>${fc_prebet}</td>
        //     <td>${service}</td>
        //     <td>${outcome}</td>
        //     <td>${sum_in}</td>
        //     <td>${currency}</td>
        //     <td>${additionalValue[31]}</td>
        // </tr>`}).join('');
        
        // forkTable.insertAdjacentHTML("beforeend", forkMarkup);
    })
        .catch(error => {
        console.error(error);
    }); 

function dateFormating(date) {
    const originalDate = new Date(date);
    return `${originalDate.getDate().toString().padStart(2, '0')}.${(originalDate.getMonth() + 1).toString().padStart(2, '0')}.${originalDate.getFullYear()} ${originalDate.getHours().toString().padStart(2, '0')}:${originalDate.getMinutes().toString().padStart(2, '0')}:${originalDate.getSeconds().toString().padStart(2, '0')}`;    
}

//console.log(forkTable.querySelector('.toggle-cell'))