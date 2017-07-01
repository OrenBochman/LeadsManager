// Whole-script strict mode syntax
'use strict';

class DS {

    constructor(amount=120){
        console.log(`DS ctor start`); 
        this.amount=amount;        
        faker.seed(123);        
        this.BAInit();

        this.data=this._getLeadData();
        console.log(`DS ctor end`); 
    }


    BAInit(){

        backand.init({
            appName: 'jqueryapp',            
            anonymousToken: '553d5722-dfa1-401f-8cde-1425476751d1', 
            runSocket: false
        });        
    }

    LeadGet(startDate,endDate){
        console.log(`DS.LeadGet`)
        let params =  {
        //    sort: backand.helpers.sort.create('creationDate', backand.helpers.sort.orders.desc),
        //    exclude: backand.helpers.exclude.options.all,
            pageSize: 10,
            pageNumber: 1,
        //    filter: backand.helpers.filter.create('completionDate', backand.helpers.filter.operators.date.empty, '')
        };
        backand.object.getList('leads',params)
            .then((response) => {
                console.log(response.data);  
                this.data=response.data;
                controller.render(response.data);
            })
            .catch(function(error){
                console.log(error);     
            });
        //this.data
        //$('#B&_out').text=this.data;
        
    }

    LeadAdd(){
        
        let params = { 
        //    pageSize: 10,
        //   pageNumber: 1
        };
        
        let datum = this.data[faker.random.number()%120];
         
        //let params = {};
        console.log(datum);
        backand.object.action.post('leads','registerLead',datum,params)
//        {"text":text,"creationDate":new Date()})
            .then((response) => {
                console.log(response); 
            })
            .catch(function(error){
                console.log(error);     
            });
    }

    _getLeadData( startDate = new Date(2015, 1, 1), endDate = new Date() ) {
        var amount=this.amount;
        var stub_data=[];
        var campaign = ["Ynet article","Calcalist article","Globes article","Taboola article"]
        for(var i=0;i<amount;i++){

            //var syncop=Math.floor(Math.random() * (4 - 0)) + 0;
            var syncop=faker.random.number() % 4;// Math.floor(Math.random() * (4 - 0)) + 0;
            var fname=faker.name.firstName();//randomName.split(" ")[0];
            var lname=faker.name.lastName();//randomName.split(" ")[1];
            //var randomName  =  ; // Caitlyn Kerluke
            var randomEmail = faker.internet.email(`${fname} ${lname}`); // Rusty@arne.info
            var randomPhone= faker.phone.phoneNumber();            
            var randomDate= Math.floor(Math.random() * (1497324083 - 1465832406)) + 1465832406;
            var ad_ID = faker.random.number() % 2 >0 ? "Onepager Prime" : "Onepager Shark";
            var campaign_ID = campaign[faker.random.number() % 4];
            //var campaign_ID = "Ynet_article";          
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
        this.data=stub_data;
        return stub_data;
    }
} 
