// Whole-script strict mode syntax
'use strict';

$(document).foundation();
 console.log("app startting")

var ds=new DS(); //data layer

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
