// Whole-script strict mode syntax
'use strict';

class DS {
    constructor(amount=120){
       faker.seed(123);
       this.self=this;
       console.log('DS initilised'); 
    }

_initBackAnd(){
   
    backand.init(
        {
            appName: 'jqueryapp',               
            anonymousToken: '553d5722-dfa1-401f-8cde-1425476751d1',
            runSocket: false
            }
        );    
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

    //get data for form
    getLeads(e ){
        console.log('getData');
       // console.log('backand.object');
        
        // Retrieve a list of records from the server
        backand.object.getList('leads').then((response) => {
            console.log(response.data);
           $("#BackAndResponse").append(ds.stringfy(response.data));
        })
        .catch(function(error){
            console.log(error);
            $("#BackAndError").append(error);
        });
    }
    
    stringfy (obj) {
        var t = typeof (obj);
        if (t != "object" || obj === null) {
            // simple data type
            if (t == "string") obj = '"'+obj+'"';
            return String(obj);
        }
        else {
            // recurse array or object
            var n, v, json = [], arr = (obj && obj.constructor == Array);
            for (n in obj) {
                v = obj[n]; t = typeof(v);
                if (t == "string") v = '"'+v+'"';
                else if (t == "object" && v !== null) v = JSON.stringify(v);
                json.push((arr ? "" : '"' + n + '":') + String(v));
            }
            return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
        }
    }

    //get data for table etc
    _getLeadData(){

        console.log('_getLeadData');
        
        // Retrieve a list of records from the server
        backand.object.getList('leads').then((response) => {
          console.log(response.data);
          this.leadsData=response.data;
          controller.renderRows();
          //console.log("_getLeadData");

        })
        .catch(function(error){
          console.log(error);
        });
    }

    _getLeadDataStub(amount) {

        var stub_data=[];
        var campaign = ["Ynet article","Calcalist article","Globes article","Taboola article"]
        for(var i=0;i<amount;i++){
            var syncop=faker.random.number() % 4;
            var randomName  = faker.name.findName(2); 
            var fname=randomName.split(" ")[0];
            var lname=randomName.split(" ")[1];
            var randomEmail = faker.internet.email(randomName);
            var randomPhone= faker.phone.phoneNumber();
            var randomDate= Math.floor(Math.random() * (1497324083 - 1465832406)) + 1465832406;
            var ad_ID = faker.random.number() % 2 >0 ? "Onepager Prime" : "Onepager Shark";
            var campaign_ID = campaign[faker.random.number() % 4];
                    
            var datum = {
                ad_ID       : ad_ID,
                campaign_ID : campaign_ID,
                date        : randomDate,
                device      : "desktop",
                email       : randomEmail,
                firstName   : fname,
                id          : 1000+i,
                is_iintoo   : syncop>0 ? false: true,
                language    : "en",
                lastName    : lname,
                newsletter  : faker.random.boolean(),
                password    : "ASAF1976",
                phone       : randomPhone,
                sent_from   : "http://invest.iintoo.com/onepager-prime/?utm_source=ynet&utm_medium=link&utm_campaign=ynetOnepagerPrime&campaignID=Ynet_article&adID=OnepagerPrime#form",
                syncop      : syncop
            };

            stub_data.push(datum);            
        }  
        return stub_data;
    }


} 
