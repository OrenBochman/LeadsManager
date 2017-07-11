// Whole-script strict mode syntax
'use strict';

class DS {
    constructor(amount=120){
        console.log(`*** DS ctor start`); 
        this.amount=amount;        
        faker.seed(123);        
        this.BAInit();

        //this.data=this._getLeadData();
        console.log(`*** DS ctor end`); 
    }

    /**
     * initilize backand sdk.
     * 
     */
    BAInit(){
        console.log(`*** DS BAInit()`); 
        backand.init({
            appName: 'jqueryapp',            
            anonymousToken: '553d5722-dfa1-401f-8cde-1425476751d1', 
            runSocket: false
        });        
    }
    
    
    BASignIn(username,password){

        backand.signin(username, password)
            .then(res => {
                console.log('signin succeeded with user:' + res.data.username);
                console.log(res);
                controller._isLoggedIn=true;
                controller.signInSuccess();
            })
            .catch(err => {
                console.log(err);
                controller._isLoggedIn=false;
                controller.signInFailed();
            });
    }

    // test with :
    //startDate=1439251200,
    // endDate=1481958865,
    // pageSize=20,
    // pageNumber=1
   
    LeadGet(startDate,endDate,pageSize,pageNumber){

    console.log(`ds.LeadGet(${startDate},${endDate},${pageSize},${pageNumber})`);        

        if (typeof startDate === 'object'){
            console.log(`converting startDate`);
            startDate=startDate.getTime()/1000;
        }
        if (typeof endDate === 'object'){
            console.log(`converting endDate`)/1000;
            endDate=endDate.getTime();
        }

        console.log(`ds.LeadGet(${startDate},${endDate},${pageSize},${pageNumber})`);        
        let params =  {
            startDate : startDate,   //1439251200
            endDate   : endDate      //1481958865
        };

        backand.query.post('getLeadCountByDates', params)
            .then((response) => {
                console.log(`BE.getLeadCountByDates()=${response.data[0].totalLeads}`);
                controller._totalLeads= response.data[0].totalLeads;
                controller._lastPage=Math.floor(controller._totalLeads/pageSize);
                console.log(`ds.LeadGet(_totalLeads,${controller._totalLeads})`);        
                console.log(`ds.LeadGet(_lastPage,${controller._lastPage})`);  
                this._LeadGetStep2(startDate,endDate,pageSize,pageNumber);
            })
            .catch(function(error){
                console.log(error);     
            });
    }
    // _LeadGetStep2(startDate=1439251200, endDate=1481958865, pageSize=20, pageNumber=1){

    _LeadGetStep2(startDate, endDate, pageSize, pageNumber){
        console.log(`DS._LeadGetStep2(${startDate},${endDate},${pageSize},${pageNumber})`);   

        let params =  {
        //    sort: backand.helpers.sort.create('date', backand.helpers.sort.orders.desc),
        //    exclude: backand.helpers.exclude.options.all,
            startDate : startDate,   //1439251200
            endDate   : endDate,     //1481958865
            pageSize  : pageSize,    //5
            pageNumber: pageNumber   //1
        };
        backand.query.post('getLeadsByDates', params)
            .then((response) => {
                console.log(`getLeadsByDates().response=`);
                console.log(response);

                //console.log(response.page);
                //console.log(response.data);  
                this.data=response.data;
                controller.render(response.data); //add curr_page, max_page and max_rows 
            })
            .catch(function(error){
                console.log(error);     
            });
    }


    // LeadGetOld(startDate=1439251200,endDate=1481958865,page=1,pagesize=5){
    //     console.log(`DS.LeadGet(${startDate},${endDate})`)
    //     let params =  {
    //         sort: backand.helpers.sort.create('date', backand.helpers.sort.orders.desc),
    //     //    exclude: backand.helpers.exclude.options.all,
    //         pageSize: 20,
    //         pageNumber: 1,
    //         filter: 
    //         [                
    //              {    
    //                 "fieldName": "date",   
    //                 "operator": "greaterThanOrEqualsTo",    
    //                 "value": startDate 
    //             },
    //             {    
    //                 "fieldName": "date",   
    //                 "operator": "lessThan",    
    //                 "value": endDate 
    //             }                
    //         ]
    //     //    filter: backand.helpers.filter.create('completionDate', backand.helpers.filter.operators.date.empty, '')
    //     };
    //     backand.object.getList('leads',params)
    //         .then((response) => {
    //             console.log(response.data);  
    //             this.data=response.data;
    //             controller.render(response.data);
    //         })
    //         .catch(function(error){
    //             console.log(error);     
    //         });
    //     //this.data
    //     //$('#B&_out').text=this.data;     
    // }

    LeadAdd(){
        
        let params = { 
        //    pageSize: 10,
        //   pageNumber: 1
        };
        
        let datum = this._leadGen();
         
        //let params = {};
        console.log(datum);
        backand.object.action.post('leads','registerLead',datum,params)
            .then((response) => {
                console.log(response); 
            })
            .catch(function(error){
                console.log(error);     
            });
    }

    _leadGen(startDate = new Date(2016, 0, 1), endDate =startDate = new Date(2016, 11, 1)){
            let syncop=faker.random.number() % 4;
            let fname=faker.name.firstName();
            let lname=faker.name.lastName();
            let campaign = ["Ynet article","Calcalist article","Globes article","Taboola article"]            

            var datum = {
                ad_ID       : faker.random.number() % 2 >0 ? "Onepager Prime" : "Onepager Shark",
                campaign_ID : campaign[faker.random.number() % 5],
                date        : faker.random.number({'min': startDate.getTime()/1000 , 'max': endDate.getTime()/1000}),
                device      : "desktop",
                email       : faker.internet.email(`${fname} ${lname}`),
                firstName   : fname,
                id          : faker.random.number() % 1000,
                is_iintoo   : syncop>0 ? false: true,
                language    : "en",
                lastName    : lname,
                newsletter  : faker.random.boolean(),
                password    : "ASAF1976",
                phone       : faker.phone.phoneNumber(),
                sent_from   : "http://invest.iintoo.com/onepager-prime/?utm_source=ynet&utm_medium=link&utm_campaign=ynetOnepagerPrime&campaignID=Ynet_article&adID=OnepagerPrime#form",
                syncop      : syncop
            };
        
        return datum;

    }

    _getLeadData(startDate = new Date(2016, 0, 1), endDate =startDate = new Date(2016, 11, 1),amount){

        var stub_data=[];        
        for(var i=0;i<amount;i++)
            stub_data.push(_leadGen(startDate,endDate));        
        return stub_data;

    }
} 
