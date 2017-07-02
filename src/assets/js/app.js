// Whole-script strict mode syntax
'use strict';

$(document).foundation();
 console.log("app startting")

var ds=new DS(); //data layer
var controller;

const setPageModule = (pageName) =>
{       
    console.log(`setPageModule: page : ${pageName}`);
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
