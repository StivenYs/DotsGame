
let nickName;
let selectGameSize; 
let formLogin; 
let errForm;
let avatarImage;
let itemImage;
let avatarCont;


//game
let avatarNick;
//const email = document.getElementById('email');

//functions

function CheckForm(event){
    //check changes
   if (nickName.value.match(/(?<!\s)[0-9]/)){
        console.log("Don't have data") 
        event.preventDefault();
        nickName.focus();
       errForm.innerText = "Write the nick name , no numbers";
   }
   else if (selectGameSize.value === "0") {
       console.log('Don´t have Game size');
       selectGameSize.focus();
       event.preventDefault();
       errForm.innerText = "Select game size please";
   }
   SetDataUser(nickName,selectGameSize,itemImage);
   historicalUser(nickName);
   return true;
}
//target current item
function moveImage(event){
    itemImage = event.target;
}
function fullLoadDOOM(){
    
    //initialization
    nickName = document.getElementById('name');
    selectGameSize = document.getElementById('gameSize');
    formLogin = document.getElementById('formLogin');
    errForm = document.getElementById('err');
    avatarNick = document.getElementById('avatarNick');
    
    //error session
    if (sessionStorage.getItem('error')){
        errForm.innerText = sessionStorage.getItem('error');
        sessionStorage.removeItem('error');
    }
    
    //event
    formLogin.addEventListener('submit',CheckForm);
}

document.addEventListener('DOMContentLoaded', fullLoadDOOM);




//drag and drop

//getItemsClass
avatarImage = document.getElementsByClassName('imageItemAvatar')
for(let item of avatarImage ){
    item.addEventListener('dragstart',moveImage);
}

//container drag
avatarCont = document.getElementById('avatarImage');
avatarCont.addEventListener('dragover',(event)=>{
    event.preventDefault();
});
avatarCont.addEventListener('drop',()=>{
    avatarCont.src = itemImage.src;
});

//geolocation
positionCurrent();
