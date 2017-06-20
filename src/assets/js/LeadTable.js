
// Whole-script strict mode syntax
'use strict';

class LeadTable {

    constructor(tableId,data) {
        console.log('LeadTable'); 
        this.self = this;             
        self.rowsData=data;
     //   this.table;//=$('#'+tableId);
     //   this.table = $('#' + tableId);
        self.startDate = new Date(2015, 1, 1);
        self.endDate = new Date();
        this.dp();
        this.renderRows();
    }

    renderRows() {
        console.log('LeadTable.renderRows()'); 
        var table1 = $('#table1')
        //clean the data;
        
        $('#table1 tbody tr').remove();
        var colData;
        var myStyle;
        console.log(self.rowsData.length);
        self.rowsData.forEach(function (rowData){

            let myDate = new Date(rowData['date']*1000);
            // console.log("start :"+self.startDate);                        
            // console.log("end   :"+self.endDate);
            // console.log("row   :"+rowDate);
            if( myDate <=  self.endDate && myDate >=  self.startDate)
            {
                if (rowData['syncop'] >= 3)      myStyle = 'leadBad';
                else if (!rowData['is_iintoo'])  myStyle = 'leadFail';
                else                             myStyle = 'leadGood';

                var row = $('<tr class="' + myStyle + '" ></tr>');
                row.append("<td>" + rowData['firstName'] + "</td>");
                row.append("<td>" + rowData['lastName'] + "</td>");
                row.append("<td>" + rowData['email'] + "</td>");
                row.append("<td>" + rowData['phone'] + "</td>");
                row.append("<td>" + rowData['newsletter'] + "</td>");
                row.append("<td>" + rowData['ad_ID'] + "</td>");
                row.append("<td>" + rowData['campaign_ID'] + "</td>");
                row.append("<td>" + rowData['device'] + "</td>");
                row.append("<td>" + rowData['language'] + "</td>");
                row.append("<td style='word-wrap:break-word;'>" + rowData['sent_from'] + "</td>");
                row.append("<td>" + rowData['is_iintoo'] + "</td>");
                row.append("<td>" + rowData['syncop'] + "</td>");
                row.append("<td>" + myDate.toDateString() + "</td>");
                table1.append(row);
            }
        });
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

    /** data picker logic
     * 
     */
     dp() {

        $(function () {
            // implementation of custom elements instead of inputs


            $('#dp4').fdatepicker()
                .on('changeDate', function (ev) {
                    if (ev.date.valueOf() > endDate.valueOf()) {
                        $('#alert').show().find('strong').text('The start date can not be greater then the end date');
                    } else {
                        $('#alert').hide();
                        controller.startDate = new Date(ev.date);
                        console.log("new start date: "+controller.startDate);
                        $('#startDate').text($('#dp4').data('date'));
                        controller.renderRows();   
                    }
                    $('#dp4').fdatepicker('hide');
                    
                });
            $('#dp5').fdatepicker()
                .on('changeDate', function (ev) {
                    if (ev.date.valueOf() < startDate.valueOf()) {
                        $('#alert').show().find('strong').text('The end date can not be less then the start date');
                    } else {
                        $('#alert').hide();
                        controller.endDate = new Date(ev.date);
                        console.log("new end date: "+controller.endDate);
                        $('#endDate').text($('#dp5').data('date'));
                        controller.renderRows();
                    }
                    $('#dp5').fdatepicker('hide');                 
                });
        });
    }
}

