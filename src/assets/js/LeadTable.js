
// Whole-script strict mode syntax

class LeadTable {

    constructor() {
        console.log('LeadTable');
        this.self = this;
        this._startDate = new Date(2016, 0, 1);
        this._endDate = new Date(2016, 11, 31);
        //paging support
        this._pageSize = 10;
        this._currentPage = 1;
        this._totalLeads = 1;
        this._lastPage = 1;
        this._isLoggedIn = false;
        this._setUpUI();
    }

    selectStyle(syncop, is_iintoo) {
        if (syncop > 2) return 'leadBad';
        if (!is_iintoo) return 'leadFail';
        else return 'leadGood';
    }

    render(leadsData) {
        console.log(`LeadTable.render()`);
        var table1 = $('#table1')
        //clean the data if there is old data        
        $('#table1 tbody tr').remove();
        var colData;
        var myStyle;
        console.log(leadsData.length);
        leadsData.forEach(function (lead) {
            let myDate = new Date(lead['date'] * 1000);
            if (myDate > this._startDate && myDate < this._endDate) {
                var row = $('<tr/>').attr({ class: this.selectStyle(lead['syncop'], lead['is_iintoo']) })
                    .append($('<td/>').text(lead['firstName']))
                    .append($('<td/>').text(lead['lastName']))
                    .append($('<td/>').text(lead['email']))
                    .append($('<td/>').text(lead['phone']))
                    .append($('<td/>').text(lead['newsletter']))
                    .append($('<td/>').text(lead['ad_ID']))
                    .append($('<td/>').text(lead['campaign_ID']))
                    .append($('<td/>').text(lead['device']))
                    .append($('<td/>').text(lead['language']))
                    //  .append($('<td>').append($('<a/>').attr('href',rowData['sent_from']).text( rowData['sent_from'].substring(15, 41) + "...")))
                    //  .append($('<td/>').text(lead['sent_from']))
                    .append($('<td/>').text(lead['is_iintoo']))
                    .append($('<td/>').text(lead['syncop']))
                    .append($('<td/>').text(myDate.toDateString()));
                table1.append(row);
            }
            else {
                //    console.log(`rejected - lead date out of date range : ${myDate}`);
            }
        }.bind(this));

        this.genPagination(this._currentPage, this._lastPage);
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

    _setUpUI() {
        console.log(`LeadTable._setUpUI(${this._startDate},${this._endDate})`);

        let _startDate = this._startDate;
        let _endDate = this._endDate;

        $('#checkbox1').on('change', { toggler: ".leadGood" }, this.filterLeads);
        $('#checkbox2').on('change', { toggler: ".leadFail" }, this.filterLeads);
        $('#checkbox3').on('change', { toggler: ".leadBad" }, this.filterLeads);

        $('#startDate').fdatepicker({
            initialDate: _startDate,
            format: 'dd-mm-yyyy',
            disableDblClickSelection: false,
            leftArrow: '<<',
            rightArrow: '>>',
            closeIcon: 'X',
            closeButton: true
        });

        $('#endDate').fdatepicker({
            initialDate: _endDate,
            format: 'dd-mm-yyyy',
            disableDblClickSelection: true,
            leftArrow: '<<',
            rightArrow: '>>',
            closeIcon: 'X',
            closeButton: true
        });

        $('#startDate').fdatepicker().on('changeDate', $.proxy(this.startDateChanged, this));
        $('#endDate').fdatepicker().on('changeDate', $.proxy(this.endDateChanged, this));
        $('#addButton').click(this.addLead);
        $("#csvButton").click(this.genCSV);
        $('#refreshButton').click($.proxy(this.refreshData, this));
        $("#signInButton").on("click", this.loginHandler);

    }

    filterLeads(e) {
        $(e.data.toggler).toggle();
    }

    startDateChanged(e) {
        console.info(`LeadTable:startDateChanged: _startDate = ${e.date}`);
        this._startDate = e.date;
    }

    endDateChanged(e) {
        console.info(`LeadTable:endDateChanged: _endDate = ${e.date}`);
        this._endDate = e.date;
    }

    refreshData(e) {
        console.info(`LeadTable:refreshData`);
        ds.LeadGet(this._startDate, this._endDate, this._pageSize, this._currentPage);
    }

    addLead(e) {
        console.info(`LeadTable:AddLead`);
        //  ds._getLeadData(this._startDate,this._endDate);
        ds.LeadAdd(this._startDate, this._endDate);
    }
    //start CSV generation
    /**
     * handle for the CSV generation button click event
     * 
     * @param {*} e the event
     */
    genCSV(e) {
        console.log("LeadTable.genCSV()");
        //var data = [["name1", "city1", "some other info"], ["name2", "city2", "more info"]];
        let csvheader = ``;
        $("#table1 thead th").each(function (index, element) {
            let delimeter = index == 0 ? '' : ',';
            let text = $(this).text();
            csvheader = csvheader + `${delimeter}'${text}'`;
        });
        console.log(`csvheader: ${csvheader}`);
        csvheader += ";";

        let csvbody = ``;
        $("#table1 tbody tr").each(function (rowIndex, rowElement) {

            $(this).find('td').each(function (colIdx, colElement) {

                let colDelimeter = colIdx == 0 ? '' : '\t';
                let text = $(this).text();
                csvbody += `${colDelimeter}'${text}'`;
            });
            csvbody += ";";
        });
        console.log(`csvbody: ${csvbody}`);

        let csvContent = csvheader + csvbody;
        // Content is the csv generated string above

        LeadTable.download(csvContent, 'dowload.csv', 'text/csv;encoding:utf-8');
    }

    static download(content, fileName, mimeType) {
        console.log(`download`);
        var a = document.createElement('a');
        mimeType = mimeType || 'application/octet-stream';

        if (navigator.msSaveBlob) { // IE10
            navigator.msSaveBlob(new Blob([content], {
                type: mimeType
            }), fileName);
        } else if (URL && 'download' in a) { //html5 A[download]
            a.href = URL.createObjectURL(new Blob([content], {
                type: mimeType
            }));
            a.setAttribute('download', fileName);
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } else {
            location.href = 'data:application/octet-stream,' + encodeURIComponent(content); // only this mime type is supported
        }
    }
    //end csv generaion

    //login start

    /**
     * The enrty point when user signs in.
     *  
     */
    signIn() {
        controller.loginToggleUI();
        controller.refreshData();
    }

    loginHandler(e) {
        console.log("loginHandler()");
        //e.stopPropagation();
        e.preventDefault();
        let username = $("#sign-in-form-username").val();
        let password = $("#sign-in-form-password").val();
        ds.BASignIn(username, password);

    }

    loginToggleUI() {

        if (controller._isLoggedIn) {
            $("#login").hide();
            $("#content").show();
        } else {
            $("#login").show();
            $("#content").hide();
        }
    }
    //login end

    //pagination start


    /**
     * Generate a pagination elements dynamicaly.
     * 
     * The previous page button is active unless current page is page 1
     * The last page button is active unless current page it is last page
     * also an inactive previous pages or next page has a square tip while
     * an active one has a pointy tip
     * 
     * The current page is always visible but disabled
     * 
     * The three pages before and after are the currentpage are the visible range
     * and they are visible and active if they exist.
     * 
     * To indicate more pages we can also show elipsis if there are pages 
     * above and bellow the visible range.
     * 
     * if there is just one page we don't show the navigation
     * 
     * @param {number} currPage - the current page
     * @param {number} lastPage - the last page
     */
    genPagination(currPage, lastPage) {
        if (typeof (currPage) == "string") {
            currPage = parseInt(currPage);
        }
        if (typeof (lastPage) == "string") {
            lastPage = parseInt(lastPage);
        }

        console.log(`LeadTable.genPagination(${currPage},${lastPage})`);
        if (this._lastPage === 1) return;
        $("#pagination ul").remove();
        let isStart = currPage == 0;
        let isEnd = currPage == lastPage;
        let ul = $(`<ul class="pagination-pointed pagination text-center" role="navigation" aria-label="Pagination">`)
            .append(`<li>`)
            .append(`<a class="pagination-pointed-button ${isStart ? 'disabled' : ''}" href="#" data-pagination-target="prev" aria-label="Previous page">Previous</a>`)
            .append(` <span class="show-for-sr">page</span>`)
            .append(`</li>`);
        let rangeStart = Math.max(currPage - 4, 0);
        let rangeEnd = Math.min(currPage + 3, lastPage);
        for (let i = 0; i <= lastPage; i++) {
            ul.append('<li>');
            if (i == currPage) {
                //if the current page
                ul.append(`<li class="current"><span class="show-for-sr">You're on page</span> ${i}</li>`);
                continue;
            } else if (i > rangeStart && i <= rangeEnd) {
                //if in range
                ul.append(`<li><a class="pagination-pointed-button" href="#" data-pagination-target="${i}" aria-label="Page ${i}">${i}</a></li>`);
            }
        }//for
        ul.append(`<li><a class="pagination-pointed-button ${isEnd ? 'disabled' : ''}"  href="#" data-pagination-target="next" aria-label="Next page">Next <span class="show-for-sr">page</span>
                    </a></li></ul>`);
        $("#pagination").append(ul);
        $(".pagination-pointed-button").click($.proxy(this.pagerHandler, this));
    }

    /**
     * handler for nexr perviious and numbered pages events
     * 
     * @param {*} e pagination event 
     */
    pagerHandler(e) {
        console.log(`pagerHandler`);
        //console.log(`clicked on: ${e.target.getAttribute("data-pagination-target")}`);
        let target = e.target.getAttribute("data-pagination-target");
        if (target === "next") this._currentPage === this._lastPage ? this._currentPage :   this._currentPage++;
        else if (target === "prev") this._currentPage === 0 ? this._currentPage :  this._currentPage--;
        else this._currentPage = parseInt(target);

        ds.LeadGet(this._startDate, this._endDate, this._pageSize, this._currentPage);
    }

    //pagination end
}