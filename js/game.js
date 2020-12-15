const list = document.querySelector(".square-list"); 

let level = Number(sessionStorage.getItem("level") || 1); 

let begSecond = 15; 
let m = 50;
let timerId = null;
let timer = document.querySelector('header .timer');
let curSecond =  sessionStorage.getItem("curSecond") || begSecond; 
//let goodCell;
let y = null;
timer.innerHTML = 'Время: ' + curSecond + ' сек.';

let width = getComputedStyle(document.querySelector(".playing-field")).getPropertyValue('--width-playing-field');
width = width.substr(0, width.length-2) - 20; 

function getRandom(max) {
    return Math.floor(Math.random() * (max + 1));
}

function timeTick() {
    curSecond--;
    sessionStorage.setItem('curSecond', curSecond.toString());
    timer.innerHTML = 'Время: ' + curSecond + ' сек.';
    if (curSecond === 0) {
        doLose(); 
    }
}

function doLose()
{
    clearInterval(timerId);
    alert("Игра окончена\nВы достигли " + level + " уровня.");
    sessionStorage.clear();
    level = 1;
    curSecond = begSecond;
    timer.innerHTML = 'Время: ' + curSecond + ' сек.';
    timerId = null;
    startGame();
}

function changeColor(color)
{
    color.r = getRandom(255);
    color.g = getRandom(255);
    color.b = getRandom(255);
}

function addSquares()
{
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    } 

    let w = width / (level + 1) - 6; 

    let color = {r:0, g:0, b:0};
    changeColor(color);

    const n = (level + 1) ** 2;

    goodCell = getRandom(n - 1);

    const styles = `flex: 0 0 auto; width: ${w}px; height: ${w}px;`; 

    for (let i = 0; i < n; i++) {
        let squareElem = document.createElement('li');
        let levelElem = document.querySelector('header .level');
        let styl = squareElem.className = "square";
        levelElem.innerHTML = 'Уровень ' + level;

        if (i === goodCell) {
            squareElem.style = `background-color: rgb( ${color.r + m / level}, ${color.g + m / level}, ${color.b + m / level}); ` + styles + ` ` + styl;
            y=i;
        }
        else {
            squareElem.style = `background-color: rgb(${color.r}, ${color.g}, ${color.b});` + styles + ` ` + styl;
        }
        
        

        squareElem.onclick=onclicksq;        
        list.append(squareElem);
    }
}

function onclicksq()
{
    console.log(y,timerId,goodCell);
    if (timerId == null){
        timerId = setInterval(timeTick, 1000); }

            if (y === goodCell) {
                level++;
                sessionStorage.setItem('level', level.toString());
                addSquares();                
            }
            
            else {
                doLose();
            }
}
            

function startGame() {
    clearInterval(timerId);
    sessionStorage.setItem('level', level.toString());
    addSquares();
}

startGame();