
// Whole-script strict mode syntax
'use strict';

class LeadTable {

    constructor(tableId,data) {
        console.log('LeadTable'); 
        this.self = this;             
        self.rowsData=data;
        self._startDate = new Date(2016, 1, 1);
        self._endDate = new Date(); 
        $("#csvButton").on( "click", this.genCSV);
        this.setUpDP(self._startDate,self._endDate);
        this.setupFilters()
    }


    setupFilters(){

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

    }
      
    get startDate() {
        return this._startDate;
    }
  
    set startDate(newStartDate) {
        this._startDate = newStartDate;   
    }

    get endDate() {
        return this._endtDate;
    }
  
    set endDate(newEndtDate) {
        this._endtDate = newEndtDate;   
    }

    selectStyle(syncop,is_iintoo){
        if (syncop > 2)      return 'leadBad';
        if (!is_iintoo)      return 'leadFail';
        else                 return 'leadGood';
    }

    renderRows() {
        console.log('LeadTable.renderRows()'); 
        var table1 = $('#table1')
        //clean the data if there is old data        
        $('#table1 tbody tr').remove();
        var colData;
        var myStyle;
        console.log(self.rowsData.length);
        self.rowsData.forEach(function (rowData){
            let myDate = new Date(rowData['date']*1000);
            if( myDate >  self._startDate && myDate <  self._endDate ){        
               
                var row = $('<tr/>').attr({class: this.selectStyle(rowData['syncop'],rowData['is_iintoo'])})
                .append($('<td/>').text(rowData['firstName'  ]))
                .append($('<td/>').text(rowData['lastName'   ]))
                .append($('<td/>').text(rowData['email'      ]))
                .append($('<td/>').text(rowData['phone'      ]))
                .append($('<td/>').text(rowData['newsletter' ]))
                .append($('<td/>').text(rowData['ad_ID'      ]))
                .append($('<td/>').text(rowData['campaign_ID']))
                .append($('<td/>').text(rowData['device'     ]))
                .append($('<td/>').text(rowData['language'   ]))
            //    .append($('<td>').append($('<a/>').attr('href',rowData['sent_from']).text( rowData['sent_from'].substring(15, 41) + "...")))
                .append($('<td/>').text(rowData['sent_from']))
                .append($('<td/>').text(rowData['is_iintoo'  ]))
                .append($('<td/>').text(rowData['syncop'     ]))
                .append($('<td/>').text(myDate.toDateString()));
                table1.append(row);
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
    
    genCSV(){
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
        document.body.appendChild(link); // Required for FF
        link.click(); // This will download the data file named "my_data.csv".

    }

    /** data picker logic
     * 
     */
     setUpDP(_startDate,_endDate) {


        $('#startDate').fdatepicker({
         // initialDate: '01-01-2016',
         //   initialDate: _startDate.toDateString(),
            initialDate: _startDate,
         //   initialDate: controller.startDate.toDateString(),
            format: 'dd-mm-yyyy',
            disableDblClickSelection: true,
            leftArrow:'<<',
            rightArrow:'>>',
            closeIcon:'X',
            closeButton: true
        });

        $('#endDate').fdatepicker({
            initialDate: _endDate, //'30-12-2016',
            format: 'dd-mm-yyyy',
            disableDblClickSelection: true,
            leftArrow:'<<',
            rightArrow:'>>',
            closeIcon:'X',
            closeButton: true
        });

        $('#startDate').fdatepicker().on('changeDate', function (ev) {    
            console.log(ev.date);             
            controller.startDateChanged(ev.date);              
        });

        $('#endDate').fdatepicker().on('changeDate', function (ev) {               
            console.log(ev.date);            
            controller.endDateChanged(ev.date);              
        });
    }

    startDateChanged(date){
        console.log("LeadTable.startDateChanged()");
        self._startDate=date;
        console.log("new start date: "+controller.startDate);
        controller.renderRows();
    }

    endDateChanged(date){
        console.log("LeadTable.endDateChanged()");
        self._endDate=date;
        console.log("new end date: "+controller.endDate);
        controller.renderRows();
    }
}