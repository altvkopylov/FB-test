getOutcomeWithFork()
    .then(userInfo => {
        const forkTable = document.querySelector('.fork-table');
        const forkMarkup = userInfo.map(([user_id, gamestyle, outcome, date], index) =>
            `<tr>
        <td>${index + 1}</td>
        <td><a href="./user.html?user_id=${user_id}">${user_id}</a></td>
        <td>${gamestyle}</td>
        <td>${outcome}</td>
        <td>${date}</td>
    </tr>`).join('');
        
        forkTable.insertAdjacentHTML("beforeend", forkMarkup);

        //console.log(userInfo); // Используем полученные данные
    })
    .catch(error => {
        console.error(error);
    }); 

    //3399365295