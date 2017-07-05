// Whole-script strict mode syntax
'use strict';

//globals
var pageName,ds,controller, maxRows,pageSize,currentPager,isLoggedIn,loginToken;

$(document).foundation();
console.log("app starting")


//login start -- move this block to  
function loginHandler(e){
    console.log("loginHandler()");
    //e.stopPropagation();
    e.preventDefault();
    isLoggedIn = !isLoggedIn; //todo - onlyflip is ds.loggin(user,pass) return token etc
    if(isLoggedIn){
        loginToggleUI();
        setPageModuleNext();
    }
}

function loginToggleUI(){
   
    if(isLoggedIn){
       $("#login").hide();
       $("#content").show();
    }else{
       $("#login").show();
       $("#content").hide();
    }
}
//login end

const setPageModule = (_pageName) => {       
    
    console.log(`setPageModule: page : ${_pageName}`);
    pageName=_pageName;
    ds=new DS(); //data layer


    //handle login
    isLoggedIn=false;
    loginToggleUI();
    $("#signInButton").on("click",loginHandler); 
    //end login
}

const setPageModuleNext = () => {       

    switch (pageName) {
        case 'index':                
            controller = new LeadTable();
            controller.refreshData();                   
            break;
        default:
            break;
    }  
}




