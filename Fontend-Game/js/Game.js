

let selectItem = false;
let gameSizeTAble;
let adyacente;
let colorTarget;
let MarkTargets = [];
let idIntervarl;
//full 
fullOutNick=()=>{
   avatarNick.value = name;
   if (imgAvatar !== null) document.getElementById('avatarImg').src = imgAvatar;
   
}


//table size
tableSize=()=>{
    document.getElementById('gridContainer').style.gridTemplateColumns =`repeat(${gameSize},1fr)`;
    document.getElementById('gridContainer').style.gridTemplateRows=`repeat(${gameSize},1fr)`;
    
    
    //items
    let items = "";
    let color = ['blue','yellow'];
    
    //color items []
    let ramd;
    
    for (let index = 0; index< (parseInt(gameSize * gameSize)); index++){
        if (index%2 === 0) ramd = Math.floor(Math.random() * 2);
        items += `<div class="itemContainer"><div id="${index}" class="item ${color[ramd]}"></div></div>`;
    }
    document.getElementById('gridContainer').innerHTML = items;
}

//pre-game - add event mousedown
inGame =()=>{
    
    const items = document.getElementsByClassName('item');
    for (item of items){
        item.addEventListener('mousedown',markItem);
        item.addEventListener('mouseover',continueMark);
        item.addEventListener('mouseup',upMouse);
    }
    document.addEventListener('mouseup',upMouse);
    idIntervarl = setInterval(setTime,1000);
    
}

setTime=()=>{
    const timeRes = parseInt(document.getElementById('time').value)-1;
    document.getElementById('time').value = timeRes; 
    if (timeRes ===0){
        clearInterval(idIntervarl);
        document.getElementById('EndGame').style.zIndex = 2;
        document.getElementById('gridContainer').style.zIndex = 1;
        document.getElementById('newGame').addEventListener('click',()=> location.reload());
    }
}


//start markItem with event 

 markItem =(event)=>{
   selectItem = true;
   drawColor(event);
}
 continueMark =(event)=>{
    
    if (selectItem){
        let item = event.target;
        let itemId = parseInt(item.id);
        if (adyacente.includes(itemId) && item.classList.contains(colorTarget)){
            drawColor(event);
        }
       
    }
}

//drawColor
drawColor=(event)=>{
   
    let item = event.target;
    let container = event.target.parentElement;
    
    if (item.classList.contains('yellow')){
        console.log("yellow");
        colorTarget = 'yellow';
        container.classList.add('yellow');
    }
    else{
        console.log("blue");
        container.classList.add('blue');
        colorTarget = "blue";
    }
    console.log("color en target" + colorTarget);
    calculateAdyacente(parseInt(item.id));
    
    if (MarkTargets.indexOf(item.id) === -1) MarkTargets.push(item.id);
    
}

//unDrawColor

unDrawColor=()=>{
    
}

//MouseUp
 upMouse=()=>{
    
     adyacente = [];
     let color = ['blue','yellow'];
     selectItem = false;
     points();
     
     for (let i = 0; i < MarkTargets.length; i++) {
         
         const item = document.getElementById(MarkTargets[i]);
         item.parentElement.classList.remove(colorTarget);
         
         if (MarkTargets.length > 2){
             if (item.classList.contains('yellow')) item.classList.remove('yellow');
             if (item.classList.contains('blue')) item.classList.remove('blue');
            
             item.classList.add(color[Math.floor(Math.random() * 2)]);
         }
     }
     MarkTargets = [];
}

//adyacente

calculateAdyacente =(id)=>{
    
    gameSizeTAble = parseInt(gameSize);
    adyacente = [];
    //adyacente //top
    if ((id-gameSizeTAble)>=0) adyacente.push(id - gameSizeTAble);
    //adyacente //down
    if ((id+gameSizeTAble)< (gameSizeTAble * gameSizeTAble)) adyacente.push(id + gameSizeTAble);
    //adyacente //left 
    if ((id%gameSizeTAble) > 0) adyacente.push(id - 1);
    //adyacente //rigth 
    if ((id+1)%(gameSizeTAble) > 0) adyacente.push(id +1);
}


//points
points=()=>{
    
    if (MarkTargets.length >2){
        const points = document.getElementById('points');
        points.value = parseInt(points.value) + MarkTargets.length;
    }
}

//call functions 

getDataUser();
fullOutNick();
tableSize();
inGame();

if (!checkDataSession()){
    
    sessionStorage.setItem("error",'Complete the places');
    location = "index.html";
}


