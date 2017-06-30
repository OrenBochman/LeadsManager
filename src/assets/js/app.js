// Whole-script strict mode syntax
'use strict';

$(document).foundation();
var ds=new DS(); //data layer
var controller;  //the page's controller

const setPageModule = (pageName) =>
{       
    console.log(`setPageModule: page : ${pageName}`);
       switch (pageName) {
           case 'index':                
                controller = new LeadTable();    
                controller.render(ds.data);                    
                break;
           default:
               break;
       }  
}
