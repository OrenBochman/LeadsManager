// Whole-script strict mode syntax
'use strict';

$(document).foundation();
var ds=new DS(); //data layer
var controller;  //the page's controller


function setPageModule(pageName)
{       
       switch (pageName) {
           case 'index':                
                console.log(ds);
                controller = new LeadTable('table1',ds.data);    
                                     
                //alert(pageName);
                //todo: test these
                //todo: move these to the leadtable controller  
                $('#checkbox1').change(function(){
                 
                    if( $('#checkbox1').is(':checked') ) {
                         $(".leadGood").show();
                    }else{
                        $(".leadGood").hide();
                    }                  
                     
                });
                $('#checkbox2').change(function(){

                    if( $('#checkbox2').is(':checked') ) {
                         $(".leadFail").show();
                    }else{
                        $(".leadFail").hide();
                    }  
                });
                $('#checkbox3').change(function(){

                    if( $('#checkbox3').is(':checked') ) {
                         $(".leadBad").show();
                    }else{
                        $(".leadBad").hide();
                    }  
                });
                
                break;
           default:
               alert(pageName);
               break;
       }
       
}


