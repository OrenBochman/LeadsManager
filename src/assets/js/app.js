// Whole-script strict mode syntax
'use strict';

//globals
var ds,controller, maxRows,pageSize,currentPager,isLoggedIn,loginToken;


$(document).foundation();
console.log("app starting")
ds=new DS(); //data layer


//login start -- move this block to  
function loginHandler(e){
    console.log("loginHandler()");
    //e.stopPropagation();
    e.preventDefault();
    isLoggedIn = !isLoggedIn; //todo - onlyflip is ds.loggin(user,pass) return token etc
    loginToggleUI();
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

const setPageModule = (pageName) => {       
    console.log(`setPageModule: page : ${pageName}`);
    //handle login
    isLoggedIn=false;
    loginToggleUI();
    $("#signInButton").on("click",loginHandler); 
    //end login

    switch (pageName) {
        case 'index':                
            controller = new LeadTable();
            ds.LeadGet(LeadTable._startDate,LeadTable._endDate); 
                
            //controller.render(ds.data);                    
            break;
        default:
            break;
    }  
}




