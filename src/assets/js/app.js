// Whole-script strict mode syntax
'use strict';

$(document).foundation();
 console.log("app startting")

var ds=new DS(); //data layer
ds._initBackAnd();
var controller;  //the page's controller

function setPageModule(pageName)
{       
     console.log("page loaded")

          
       switch (pageName) {
           case 'LeadForm':
                console.log(pageName+" - controller loaded")

                controller = new LeadForm(); 
                //alert(pageName);   
                break;
           case 'index':                
                console.log(pageName+" - controller loaded")
                controller = new LeadTable('table1',ds.data);    
                controller.renderRows();                                
                break;
           default:
                console.log(pageName+" - controller loaded")
                break;
       }       
}