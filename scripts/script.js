//Стандартные переменные и их свойства
const canvas = document.getElementById('my_canvas');
const ctx = canvas.getContext('2d');
canvas.width = innerWidth-20;
canvas.height = innerHeight-20;
//Шаг клетки
var grid=16;
//Пока оставим это тут
var count=0;
//Змейка и её поля
var snake= {
    //Координаты змейки
    x:160,
    y:160,
    //Скорость по горизонтали и вертикали
    //dy=0 потому, что изначально змейка двигается по горизонтали
    dx:grid,
    dy:0,
    //Ячейки хвоста
    cells:[],
    //Длина змейки
    maxCells:4,
};
//Яблоко и его поля
var apple={
    //Координаты яблока
    x:320,
    y:320,
}
//Функция рандома и появления яблока и змейки
function getRandomInt (min, max ){
    return Math.floor(Math.random() * (max - min)) + min;
}
//Основная функция- цикл отрисовки
function loop () {
    //Анимация
    requestAnimationFrame(loop);
    //Замедление
    if(++count<4){return;}
    //Чистим каунт сразу
    count=0;
    //Очищаем поле
    ctx.clearRect(0,0,canvas.width,canvas.height);
    //Двигаем змейку с нужной скоростью
    snake.x+=snake.dx;
    snake.y+=snake.dy;
    //Если достигла края, то продолжает движение с другой стороны по горизонтали
    if(snake.x<0){snake.x=canvas.width-grid;}
    else if(snake.x>=canvas.width){snake.x=0;}
    //Аналогично по вертикали
    if(snake.y<0){snake.y=canvas.height-grid;}
    else if(snake.y>canvas.height){snake.y=0;}
    //Продолжаем движение в выбранном направлении
    snake.cells.unshift({x:snake.x,y:snake.y});
    //Удаляем последний хвост
    if(snake.cells.length>snake.maxCells){snake.cells.pop();}
    //Рисуем яблоко
    ctx.fillStyle='red';
    ctx.fillRect(apple.x,apple.y,grid-1,grid-1);
    //Одно движение змейки- новый квадрат
    ctx.fillStyle='green';
    //Обработает каждый элемент змейки
    snake.cells.forEach(function(cell,index){
        //
        ctx.fillRect(cell.x,cell.y,grid-1,grid-1);
        //Если змейка съела яблоко
        if(cell.x===apple.x && cell.y===apple.y){
            //Увеличиваем длину змейки
            snake.maxCells++;
            //Рисуем новое яблоко
            apple.x=getRandomInt(0,canvas.width/grid)*grid;
            apple.y=getRandomInt(0,canvas.height/grid)*grid;
        }
        //Проверяем столкновение змеи с собой же
        //Переберём весь массив и проверим существуют ли клетки с одинаковыми координатами
        for(var i=index+1;i<snake.cells.length;i++){
            //Если такие существуют, то начинаем игру заново
            if(cell.x===snake.cells[i].x && cell.y===snake.cells[i].y){
                //Выведем GAME OVER
                alert("GAME OVER");
                //Задаём стартовые параметры
                //Змейки
                snake.x=160;
                snake.y=160;
                snake.cells=[];
                snake.maxCells=4;
                snake.dx=grid;
                snake.dy=0;
                //Яблока, в этот раз случайное место
                apple.x=getRandomInt(0,25)*grid;
                apple.y=getRandomInt(0,25)*grid;
            }
        }
    });
}
//Управление стрелками с клавиатуры, интерактивность с пользователем
document.addEventListener('keydown', function(e){
    /*Добавим проверку на движение в ту же сторону, к примеру кнопка влево
    Когда змейка уже двигается влево ничего не изменит, как и вправо*/
    //Left
    if(e.which===37 && snake.dx===0){
        snake.dx=-grid;
        snake.dy=0;
    }
    //Top
    else if(e.which===38 && snake.dy===0){
        snake.dy = -grid;
        snake.dx = 0;
    }
    //Right
    else if (e.which === 39 && snake.dx === 0) {
        snake.dx = grid;
        snake.dy = 0;
    }
    //Down
    else if (e.which === 40 && snake.dy === 0) {
        snake.dy = grid;
        snake.dx = 0;
    }
});
requestAnimationFrame(loop);
