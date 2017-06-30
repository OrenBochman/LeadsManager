// Whole-script strict mode syntax
'use strict';

class DS {

    constructor(amount=120){
        this.amount=amount;
        console.log('DS'); 
        faker.seed(123);
        this.self=this;
        this.data=this._getLeadData();
    }

    _getLeadData( startDate = new Date(2015, 1, 1), endDate = new Date() ) {
        var amount=this.amount;
        var stub_data=[];
        var campaign = ["Ynet article","Calcalist article","Globes article","Taboola article"]
        for(var i=0;i<amount;i++){

            //var syncop=Math.floor(Math.random() * (4 - 0)) + 0;
            var syncop=faker.random.number() % 4;// Math.floor(Math.random() * (4 - 0)) + 0;

            var randomName  = faker.name.findName(2); // Caitlyn Kerluke
            var fname=randomName.split(" ")[0];
            var lname=randomName.split(" ")[1];
            var randomEmail = faker.internet.email(randomName); // Rusty@arne.info
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
        return stub_data;
    }
} 
