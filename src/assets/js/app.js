// Whole-script strict mode syntax
'use strict';

//globals
var pageName,ds,controller, maxRows,pageSize,currentPager,isLoggedIn,loginToken;

$(document).foundation();
console.log("app starting")

const setPageModule = (pageName) => {       
    
    console.log(`setPageModule: page : ${pageName}`);   
    ds=new DS(); //data layer

    //handle login
    //end login

    switch (pageName) {
        case 'index':                
            controller = new LeadTable();
            controller.loginToggleUI();
            break;
        default:
            break;
    }  
}