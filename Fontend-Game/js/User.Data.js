
let name;
let email;
let gameSize;
let geolocationText;
let imgAvatar;
function SetDataUser(name,selectGameSize,itemImage){
    sessionStorage.setItem('name',name.value)
    sessionStorage.setItem('gameSize',selectGameSize.value);
    sessionStorage.setItem('geolocation',geolocationText);
    sessionStorage.setItem('itemImage',itemImage.src);
}

function  getDataUser(){
    name = sessionStorage.getItem('name');
    imgAvatar = sessionStorage.getItem('itemImage');
    gameSize = sessionStorage.getItem('gameSize');
    console.log(name);
}
function checkDataSession(){
    return name !== null;
}

//geolocation

function positionCurrent(){
    if (!navigator.geolocation){
        geolocationText = 'no es compatible con Geolocation ';
    }
    else{
        navigator.geolocation.getCurrentPosition(
            //positon 
            (position)=>{
                geolocationText = "latitude: " + position.coords.latitude + " longitude: " + position.coords.longitude;
            },
            //err
            ()=>{geolocationText = "La localization no se ha podido realizar "}
        );
    }
}

//local storage
function historicalUser(name){
    let historicalStorage = localStorage.getItem('dataUser');
    let data;
    if (historicalStorage == null) {
        data = [];
    } else {
        data = JSON.parse(historicalStorage);
    }
    const recordUser={
        nick: name.value,
        date:Date.now()
    }
    data.push(recordUser);
    localStorage.setItem('dataUser',JSON.stringify(data));
}
