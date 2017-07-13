

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

		var startDate = new Date();
		var endDate = new Date();
		var t = startDate.getFullYear() + "-" + (startDate.getMonth()+1)+ "-" + startDate.getDate()
		var t2 = endDate.getFullYear() + "-" + (endDate.getMonth()+1)+ "-" + endDate.getDate()
		var pageNum = getParameterByName("pageNum") || 1;
		var date1 = getParameterByName("date1") || null;
		var date2 = getParameterByName("date2") || null;
		console.log(date1)

		$('#dp4').attr('data-date', t);
		$('#dp5').attr('data-date', t2);


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

	}

	submitForm()
	{
		var formData =JSON.parse(JSON.stringify($("#destForm").serializeArray()));

		console.log(formData)


		$("#destForm").submit();

	}

	initPagination(totalRows)
	{
		alert(totlaRows)
	}


	onUserLoad(list,totalRows,page)
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
			let prv = $('<li><a href="index.html?pageNum=' + (Number(page)-1)+'" aria-label="Previous page">Previous <span class="show-for-sr">page</span></a></li>')
			pagC.append(prv)
		}
		for(var i = 0;i<totalPages;i++){

			if((i+1)==page)
			{
				var lir = $('<li>' + Number(i+1) + '</li>')
				lir.addClass("current")
				pagC.append(lir)
			}else {
				if(i<5 || i>(totalPages-2)){
				  var lir2 = $('<li><a href="index.html?pageNum='+(i+1) +'" aria-label="Page"'+ (i+1)+'>'+ (i+1)+'</a></li>')
					pagC.append(lir2)
				}
			}

			if(totalPages>8 && i==5){
				let dots = $('<li class="ellipsis" aria-hidden="true"></li>')
				pagC.append(dots)
			}

		}
		if(page<totalPages)
		{
			let nxt = $('<li><a href="index.html?pageNum=' + (Number(page)+1)+'" aria-label="Next page">Next <span class="show-for-sr">page</span></a></li>')
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
		var $inputs = $('#dates :input');

    // not sure if you wanted this, but I thought I'd add it.
    // get an associative array of just the values.
		var d1 = $($inputs[0]).val()
		var d2 = $($inputs[1]).val()
    console.log(new Date(d1).getTime() / 1000)
		console.log(new Date(d2).getTime() / 1000)
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
