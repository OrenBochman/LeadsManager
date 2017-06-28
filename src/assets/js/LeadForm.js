
// Whole-script strict mode syntax
'use strict';

class LeadForm {

    constructor() {
        console.log('LeadTable'); 
        this.self = this;             
        $("#SubmitButton").on( "click", this.submit); 



    }


submit(){
//  https://api.backand.com/1/objects/action/leads/?name=registerLead&parameters={2,test2@test.com,oren,bochman,pass,true,1,Atomi-Default,0544320067,true, 2,english,26062017, M,/leadTest

    var dataService = {
        //other code here

        get: function(){

                var object = 'leads';
                var action = 'registerLead';
                var params =  {};
                return backand.object.action.get(object, action, params)
        }
    }

}



getData(){

    var dataService = {
        //other code here
        getList: function(){
                var params =  {
                sort: backand.helpers.sort.create('creationDate', backand.helpers.sort.orders.desc),
                exclude: backand.helpers.exclude.options.all,
                pageSize: 10,
                pageNumber: 1,
                filter: backand.helpers.filter.create('completionDate', backand.helpers.filter.operators.date.empty, '')
                };
                return backand.object.getList('todos',params);
        },
        // Other code here
        };
}

}