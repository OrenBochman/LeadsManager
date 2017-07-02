
// Whole-script strict mode syntax
'use strict';

class LeadTable {
    constructor() {
        console.log('LeadTable');                  
        //self.rowsData=data;
        this._startDate = new Date(2016, 1, 1);
        this._endDate = new Date(2016, 12, 31);        
        this._setUpUI(self._startDate,self._endDate);
    }

    selectStyle(syncop,is_iintoo){
        if (syncop > 2)      return 'leadBad';
        if (!is_iintoo)      return 'leadFail';
        else                 return 'leadGood';
    }

    render(leadsData) {
        console.log('LeadTable.render()'); 
        var table1 = $('#table1')
        //clean the data if there is old data        
        $('#table1 tbody tr').remove();
        var colData;
        var myStyle;
        console.log(leadsData.length);
        leadsData.forEach(function (lead){
            let myDate = new Date(lead['date']*1000);
            if( myDate > this._startDate && myDate <  this._endDate)
            {               
                var row = $('<tr/>').attr({class: this.selectStyle(lead['syncop'],lead['is_iintoo'])})
                .append($('<td/>').text(lead['firstName'  ]))
                .append($('<td/>').text(lead['lastName'   ]))
                .append($('<td/>').text(lead['email'      ]))
                .append($('<td/>').text(lead['phone'      ]))
                .append($('<td/>').text(lead['newsletter' ]))
                .append($('<td/>').text(lead['ad_ID'      ]))
                .append($('<td/>').text(lead['campaign_ID']))
                .append($('<td/>').text(lead['device'     ]))
                .append($('<td/>').text(lead['language'   ]))
            //    .append($('<td>').append($('<a/>').attr('href',rowData['sent_from']).text( rowData['sent_from'].substring(15, 41) + "...")))
            //    .append($('<td/>').text(lead['sent_from']))
                .append($('<td/>').text(lead['is_iintoo'  ]))
                .append($('<td/>').text(lead['syncop'     ]))
                .append($('<td/>').text(myDate.toDateString()));
                table1.append(row);
            }
            else{
            //    console.log(`rejected - lead date out of date range : ${myDate}`);
            }
        }.bind(this));
    }

    static unx2data(unix_timestamp) {

        var a = new Date(unix_timestamp * 1000);
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
        return time;
    }

    _setUpUI(_startDate,_endDate) {

        $('#checkbox1').on('change',{toggler:".leadGood"},this.filterLeads);
        $('#checkbox2').on('change',{toggler:".leadFail"},this.filterLeads);
        $('#checkbox3').on('change',{toggler:".leadBad" },this.filterLeads);

        $('#startDate').fdatepicker({
            initialDate: this._startDate,
            format: 'dd-mm-yyyy',
            disableDblClickSelection: false,
            leftArrow:'<<',
            rightArrow:'>>',
            closeIcon:'X',
            closeButton: true
        });

        $('#endDate').fdatepicker({
            initialDate: this._endDate, 
            format: 'dd-mm-yyyy',
            disableDblClickSelection: true,
            leftArrow:'<<',
            rightArrow:'>>',
            closeIcon:'X',
            closeButton: true
        });

        $('#startDate').fdatepicker().on('changeDate', this.startDateChanged );
        $('#endDate').fdatepicker().on('changeDate', this.endDateChanged);
        $('#refreshButton').on('click', this.refreshData);
        $('#addButton').on('click', this.AddLead);
        $("#csvButton").on( 'click', this.genCSV);
        
    }

    filterLeads(e){
        $(e.data.toggler).toggle();
    }

    startDateChanged(e){
        console.info(`LeadTable:startDateChanged: _startDate = ${e.date}`);
        this._startDate=e.date;    
    }

    endDateChanged(e){
        console.info(`LeadTable:endDateChanged: _endDate = ${e.date}`);
        this._endDate=e.date;
    }

    refreshData(e){
        console.info(`LeadTable:refreshData`);
      //  ds._getLeadData(this._startDate,this._endDate);
        ds.LeadGet(this._startDate,this._endDate);
        //controller.render();
    }

    AddLead(e){
        console.info(`LeadTable:refreshData`);
      //  ds._getLeadData(this._startDate,this._endDate);
        ds.LeadAdd(this._startDate,this._endDate);
        //controller.render();
    }

    genCSV(e){
        console.log("LeadTable.genCSV()");
        var data = [["name1", "city1", "some other info"], ["name2", "city2", "more info"]];
        var csvContent = "data:text/csv;charset=utf-8,";
        data.forEach(function(infoArray, index){
            var dataString = infoArray.join(",");
            csvContent += index < data.length ? dataString+ "\n" : dataString;
        }); 
    
        //var encodedUri = encodeURI(csvContent);
        //window.open(encodedUri);
        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "my_data.csv");
        document.body.appendChild(link); // Required for FF - but create an extra download per click
        link.click(); // This will download the data file named "my_data.csv".
    }
}