
// Whole-script strict mode syntax
'use strict';

class LeadForm {

    constructor() {
        console.log('LeadForm ctor starting'); 
        this.self = this;             
    //    $("#SubmitButton").on( "click", ds.submit); 
        $("#readButton"  ).on( "click", ds.getLeads); 
        console.log('LeadForm ctor end'); 
    }
}