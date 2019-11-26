/** Первое что пришло в голову это реализовывать данную задачу путем максимального использвания батарей по убыванию их емкости
 * таким образом сначала к самому большему маневру добавляем максимаьную по емкости батарею в основной двигатель 
 * и так с каждым маневром также в порядке убывания требуемого прироста. Когда основные двигатели в маневрах уже заполнены,
 * заполняем второстепенные двигатели оставшимися батареями таким же образом (по убыванию)
*/


/** Получаем данные о маневрах с data.json */

const data = getData()

function getData () {
    let request = new XMLHttpRequest ();
    
    request.open('GET', 'data.json', false);
    
    request.onload = function() {
        dataFromJSON = JSON.parse(this.response);
    }
    request.send()
    return dataFromJSON
}

console.log(data);


/** Сортируем масивы с батареми и маневрами в порядке убывания
 *  Для того что бы потом можно было восстановить порядок маневров, преобразовываем елементы масива в обьекты добавляя в них
 * помимо нуждаемого прироста еще и их изначальный индекс.
*/


let corections = [],
    cells = data.cells.map(function(item){return item}).sort(function(a, b){
        if (a > b) return -1;
        if (a < b.value) return 1;
        if (a == b) return 0;
    });

data.corections.map(function(el, i){
    corections[i] = {value: el, index: i, main_engine: 0, secndary_engine: 0, balance: el}
})

function compare (a, b) {
    if (a.value > b.value) return -1;
    if (a.value < b.value) return 1;
    if (a.value == b.value) return 0;
}

corections.sort(compare);


/** Заполняем основные двигатели */


corections.forEach(function(el) {
    cells.every(function(item, i){
        if(item > el.value) {
            return true
        }
        if(item <= el.value) {
            el.main_engine = item;
            el.balance = el.value - item;
            cells.splice(i, 1);
            return false
        }
    })
})


/** Заполняем второстепенные двигатели */

corections.forEach(function(el){
    cells.every(function(item, i){
        if (item * 0.5 > el.balance) {
            return true
        } 
        if (item * 0.5 <= el.balance) {
            el.secndary_engine = item;
            el.balance -= item * 0.5;
            cells.splice(i, 1);
            return false;
        }
    })
})


/** получаем конечный результат */
corections.sort(function(a, b){
    if (a.index > b.index) return 1;
    if (a.index < b.index) return -1;
    if (a.index == b.index) return 0;
})


let result = {main_thruster: [], secndary_thruster: [], delta_velocity: 0}

corections.forEach(function(el, i){
    result.main_thruster[i] = el.main_engine;
    result.secndary_thruster[i] = el.secndary_engine;
    result.delta_velocity += el.main_engine + el.secndary_engine * 0.5
})

result = JSON.stringify(result).split('"').join(' ')

console.log(result)






