
let rectArr = [{width: 10, height: 20}, {width: 30, height: 10}, {width: 5, height: 30}],
    container = {width: Infinity, height:''},
    placePoint = [{x: 0, y: 0}]

/** Присваиваем каждому прямоугольнику индекс для обратной сортировки массива при выдаче результата 
 * и сортируем елементы по высоте по убыванию*/

rectArr.forEach(function(el, i){
    el.index = i + 1;
})


function compare(a, b) {
    if (a.height > b.height) return -1;
    if (a.height == b.height) return 0;
    if (a.height < b.height) return 1;
}


rectArr.sort(compare)


/** Создание первого вмещающего треугольника */

container.height = rectArr[0].height;
console.log(container)

function findRightPlace(rectArr) {

    let result = []

    rectArr.forEach(function(el){

        placePoint.forEach(function(point){
            
            if (point.y + el.height > container.height) {
                continue;
            }
            if (point.x + el.width > container.width) {
                
            }

            for (let i = point.y; i <= point.y + el.height; i++) {
                
            }

        })
    })

}

// findRightPlace(rectArr)


// function findFirstContainer(arr) {

// }



