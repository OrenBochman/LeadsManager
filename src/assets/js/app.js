// Whole-script strict mode syntax
'use strict';

//globals
var pageName,ds,controller, maxRows,pageSize,currentPager,isLoggedIn,loginToken;

Foundation.Abide.defaults.patterns['baPass'] = /.{6,}/ ;  
$(document).foundation();

console.log("*** app starting")
const setPageModule = (pageName) => {     
    console.log(`*** setPageModule( page : ${pageName})`);   
    ds=new DS(); //data layer

    var isLogedIn = sessionStorage.getItem('isLogedIn');        

    switch (pageName) {
        case 'index':    
            if(!isLogedIn) window.location="./Login.html"; 
             controller = new LeadTable();
             ds.LeadGet(controller._startDate, controller._endDate, controller._pageSize, controller._currentPage);
            break;
        case 'Login':
            controller = new Login();
            break;
        default:
            break;
    }  
}