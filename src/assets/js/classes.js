

class TSPage
{
	constructor(){
		console.log("constructor TSPage")
		this.self = this
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class HomePage extends TSPage
{
	constructor(){
		super();
		var pageNum = getParameterByName("pageNum") || 1;
		var date1   = getParameterByName("date1") || new Date().getTime()/1000-(72*60*60*1000);
		var date2   = getParameterByName("date2") || new Date().getTime()/1000;

		var startDate,endDate;

		if(typeof date1 == "number"){
			startDate = new Date(date1*1000);
		}else if (typeof date1 == "string")
		{
			startDate =new Date( parseInt(date1)*1000);
		}else{
			console.log(date1);
			console.log(typeof date1);
		}
		if(typeof date2 == "number"){
			endDate = new Date(date2*1000);
		}
		else if (typeof date2 == "string")
		{
			endDate = new Date( parseInt(date2)*1000);
		}		
		else{
			console.log(date2);
			console.log(typeof date2);
		}

		var t = startDate.getFullYear() + "-" + (startDate.getMonth()+1)+ "-" + startDate.getDate();
		var t2 = endDate.getFullYear() + "-" + (endDate.getMonth()+1)+ "-" + endDate.getDate();

		$('#dp4').attr('data-date', t);
		$('#dp5').attr('data-date', t2);
		$('#dp4').val(t);
		$('#dp5').val(t2);

		$('#dp4').fdatepicker()
			.on('changeDate', function (ev) {
				console.log("change" + this)
			if (ev.date.valueOf() > endDate.valueOf()) {
				$('#alert').show().find('strong').text('The start date can not be greater then the end date');
				console.log("change alert")
			} else {
				$('#alert').hide();
				startDate = new Date(ev.date);
				$('#startDate').val($('#dp4').data('date'));
			}
			$('#dp4').fdatepicker('hide');
		});

		$('#dp5').fdatepicker()
			.on('changeDate', function (ev) {
			if (ev.date.valueOf() < startDate.valueOf()) {
				$('#alert').show().find('strong').text('The end date can not be less then the start date');
			} else {
				$('#alert').hide();
				endDate = new Date(ev.date);
				$('#endDate').val($('#dp5').data('date'));
			}
			$('#dp5').fdatepicker('hide');
		});

		dataService.getUsers(this.onUserLoad,pageNum,date1,date2);

		$("#csvButton").click($.proxy(this.genCSV,this));

	}



	initPagination(totalRows)
	{
		alert(totlaRows)
	}

	onUserLoad(list,totalRows,page,date1,date2)
	{
		var tbody = $('#tableBody')
		for (var i =0;i<list.length;i++)
		{
			var tr = $("<tr></tr>")
			if( !list[i].is_iintoo) {
					tr.addClass("denied_view")
					if( list[i].syncop==3) {
						tr.removeClass("denied_view")
						tr.addClass("quarentine_view")
					}
			}else {
				tr.addClass("approved_view")
			}

			tr.append("<td>" + list[i].firstName +" " + list[i].lastName+ "</td>")
			tr.append("<td>" + list[i].email + "</td>")
			tr.append("<td>" + list[i].phone + "</td>")
			tr.append("<td>" + list[i].campaign_ID + "</td>")
			tr.append("<td>" + list[i].ad_ID + "</td>")
			tr.append("<td>" + list[i].device + "</td>")
			tr.append("<td>" + list[i].is_iintoo + "</td>")
			tr.append("<td>" + list[i].syncop + "</td>")
			tr.append("<td>" + convertToDate(list[i].date) + "</td>")

			tbody.append(tr)
			if(!list[i].is_iintoo)
			{
				if(list[i].syncop<3){
					tr.addClass("unsync")
				}else {
 						tr.addClass("quartine")
				}

			}
		}
		var pagC = $("#paginationC")
		var totalPages = Math.ceil(totalRows/pageRowSize)
		if(page>1)
		{
			let prv = $(`<li><a href='index.html?pageNum=${(Number(page)-1)}&date1=${date1}&date2=${date2}' aria-label='Previous page'>Previous <span class='show-for-sr'>page</span></a></li>`)
			
			pagC.append(prv)
		}
		for(var i = 0;i<totalPages;i++){

			if((i+1)==page)
			{
				//var lir = $('<li>' + Number(i+1) + '</li>')
				var lir = $(`<li>${Number(i+1)}</li>`)
				lir.addClass("current")
				pagC.append(lir)
			}else {
				if(i<5 || i>(totalPages-2)){
				  var lir2 = $(`<li><a href='index.html?pageNum=${(i+1)}&date1=${date1}&date2=${date2}' aria-label='Page${(i+1)}'>${(i+1)}</a></li>`
				)
					pagC.append(lir2)
				}
			}
			//this is a bug as it does not consider the current page
			if(totalPages>8 && i==5){
				let dots = $('<li class="ellipsis" aria-hidden="true"></li>')
				pagC.append(dots)
			}

		}
		if(page<totalPages)
		{
			let nxt = $(`<li><a href='index.html?pageNum=${(Number(page)+1)}&date1=${date1}&date2=${date2}' 
								aria-label='Next page'>Next <span class='show-for-sr'>page</span></a></li>`);
			pagC.append(nxt)
		}
	}


	listFilter(event)
	{
		var element = $("#" + event.target.id)
		console.log(element)
		if(element.prop( "checked" ) )
		{
			$("." +  event.target.id + "_view").removeClass("vanish")
		}else {
			$("." +  event.target.id + "_view").addClass("vanish")
		}
	}

	submitDates()
	{
		console.log(" HomePage:submitDates()");
		var $inputs = $('#dates :input');

    // not sure if you wanted this, but I thought I'd add it.
    // get an associative array of just the values.
		var d1 = $($inputs[0]).val()
		var d2 = $($inputs[1]).val()
		page_module.date1=new Date(d1).getTime() / 1000;
		page_module.date2=new Date(d2).getTime() / 1000;
		
    	console.log(new Date(d1).getTime() / 1000)
		console.log(new Date(d2).getTime() / 1000)
		window.location.replace(`index.html?pageNum=${page_module.pageNum || 1 }&date1=${page_module.date1}&date2=${page_module.date2}`);

	}

	submitForm()
	{
		console.log(" HomePage:submitForm()");

//		var formData =JSON.parse(JSON.stringify($("#destForm").serializeArray()));

		console.log(formData)

//		$("#destForm").submit();



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
		let csv = ``;
		let rowDelimeter = '\n';
		let colDelimeter = `,`
        $("#table1 thead th").each(function (index, element) {				
            let text = $(this).text();
            csv += `${index == 0 ? '' : colDelimeter}'${text}'`;
        });        
        csv += rowDelimeter;        
        $("#table1 tbody tr").each(function (rowIndex, rowElement) {
            $(this).find('td').each(function (colIdx, colElement) {                
                let text = $(this).text();
                csv += `${colIdx == 0 ? '' : colDelimeter}'${text}'`;
            });
            csv += rowDelimeter;
        });
        this.download(csv, 'dowload.csv', 'text/csv;encoding:utf-8');
    }

    download(content, fileName, mimeType) {
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
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class LoginPage extends TSPage
{
	constructor(){
		super();
		console.log("login page")
	}
	submitLogin()
	{
		var formData =JSON.parse(JSON.stringify($("#loginForm").serializeArray()));
		console.log(formData)
		dataService.login({username:formData[0].value,password:formData[1].value})
	}
}
