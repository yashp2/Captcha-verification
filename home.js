function handleclick(e){
    console.log(e);
    document.getElementById(e).classList.add("active-col");
    const a=document.getElementById(`c-${e}`);
    if(a.checked == true){
        document.getElementById(e).classList.remove("active-col");
        a.checked=false;
    }
    else{
        document.getElementById(e).classList.add("active-col");
        a.checked=true;
    }
}

let data=[{},
    {
        title:"Select all squares with Traffic Lights.",
        img:"./Img/img-1.jpg",
        correctsquares:[5,6,7,9,10,11],
        correctlen:6
    },
    {
        title:"Select all squares with Icecream.",
        img:"./Img/img-2.jpg",
        correctsquares:[2,3,6,7,10,11,14,15],
        correctlen:8
    },
    {
        title:"Select all squares with Trees.",
        img:"./Img/img-3.jpg",
        correctsquares:[4,5,7,8,9,10,11,12,16],
        correctlen:9
    },
    {
        title:"Select all squares with Cars.",
        img:"./Img/img-4.jpg",
        correctsquares:[9,10,11,13,14,15],
        correctlen:6
    },
    {
        title:"Select all squares with buildings.",
        img:"./Img/img-5.jpg",
        correctsquares:[2,3,6,7,10,11,14,15],
        correctlen:8
    }
]
let verified=0;
let userscore=0;
let noused=0;
let cno=0;
let attempts=0;
function refreshimg(){
    if(userscore===0){
        let a=Math.floor(1 + Math.random()*5 );
        cno=a;
        noused=a;
        console.log(document.getElementById("captcha-img"));
        document.getElementById("captcha-img").style.backgroundImage=`url(${data[cno].img})`;
        document.getElementById("ModalLabel").textContent=data[cno].title;
    }
    else{
        let a=Math.floor(1 + Math.random()*5 );
        while(a==noused){
            a=Math.floor(1 + Math.random()*5 );
        }
        cno=a;
        console.log(document.getElementById("captcha-img"));
        document.getElementById("captcha-img").style.backgroundImage=`url(${data[cno].img})`;
        document.getElementById("ModalLabel").textContent=data[cno].title;
    }

    for(let i=1;i<=16;i++){
        document.getElementById(`c-${i}`).checked=false;
        document.getElementById(`${i}`).classList.remove("active-col");
    }
}

function check(){
    let cs=0;
    let crr=[];
    let chk=1;
    console.log(`${cno}`);
    for(let i=1;i<=16;i++){
        if(document.getElementById(`c-${i}`).checked==true){
            cs++;
            crr.push(i);
        }
    }

    if(cs==data[cno].correctlen){
        for(let i=0;i<data[cno].correctlen; i++){
            if(data[cno].correctsquares[i]!=crr[i]){
                chk=0;
                break;
            }
        }
    }

    else{
        chk=0;
    }
    if(chk)userscore++;
    else userscore--;
    console.log(userscore);
    attempts++;
    if(attempts>=2){
        hideall();
    }
    else{
        refreshimg();
    }
}

function hideall(){
    let a=document.getElementById("captcha-img");
    a.classList.add("hide");
    document.getElementById("nextbutton").classList.add("hide");
    document.getElementById("verifybutton").classList.add("hide");
    document.getElementById("closebutton").classList.remove("hide");
    if(userscore==2){
        verified=1;
    }
    document.getElementById("v-stat-1").classList.remove("hide");
    document.getElementById("v-stat-2").classList.remove("hide");
    if(verified){
        document.getElementById("v-stat-1").classList.add("text-success");
        document.getElementById("v-stat-1").textContent="Successfully Verified !";
        document.getElementById("v-stat-2").classList.add("text-success");
        document.getElementById("v-stat-2").textContent="Successfully Verified !";
    }
    else{
        document.getElementById("v-stat-1").classList.add("text-danger");
        document.getElementById("v-stat-1").textContent="Verification failed !";
        document.getElementById("v-stat-2").classList.add("text-danger");
        document.getElementById("v-stat-2").textContent="Verification failed !";
    }
}