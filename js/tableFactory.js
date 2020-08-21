export default function createTable(){
    const header = ['one', 'two', 'three'];
    const rows = [header,
        [1, 2, 3],
        [4, 5, 6]];
    tableFactory(rows);
    coloredTable();
    addColumn();
};

export function tableFactory(_rows) {
    const rows = Array.from(_rows);
    const header = rows.shift(); // Первая строка заголовок
    const data = rows; // все остальные - данные

    const table = d3.select('body') // Создание таблицы
        .append('table')
        .attr('class', 'table');


    const tableHeader = table.append('thead') //Добавляем заголовок
        .append('tr');

    const tableBody = table.append('tbody'); // Добавляем тело таблицы

    // Обходим в цикле
    // Каждый элемент 'header' - строка
    header.forEach(value => {
        tableHeader.append('th')
            .text(value);
    });

    // каждый элемент data - массив
    data.forEach(row => {
        const tableRow = tableBody.append('tr');

        // каждый элемент row - строка
        row.forEach(value => {
            tableRow.append('td')
                .text(value);
        });
    });


    return{
        table,
        header,
        data
    };
}

export function coloredTable(){
    d3.selectAll('thead').selectAll('th').style('font-wieght', 'bold');
    d3.selectAll('tbody tr')
        // .selectAll('td') // если добавить то вместо строк будут раскрашены столбцы вместо строк
        .style('color', (d, i) => {return i%2 ? 'green': 'red';});
    d3.selectAll('tbody tr')
        .style('text-align', 'center');
}

export function addColumn(){
    const newCol = d3.selectAll('tr').append('td');
    newCol.text((d, i) => ['Four', 4, 6][i]);
}