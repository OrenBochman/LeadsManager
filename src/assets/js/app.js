
let page_module = null;
let pageRowSize = 10;

let user = sessionStorage.getItem('user');

var getParameterByName =  function (name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}



function pageInit(pageName)
{
	console.log(pageName);

  if(!user && pageName!="login")
  {
    document.location = "login.html"
  }

	switch(pageName)
	{
		case "index":
		 page_module = new HomePage()
		break;

    case "login":
		 page_module = new LoginPage()
		break;


	}


}

function getValueByName(arr,name)
{
  var res=""
  for(var i in arr)
  {

    if(arr[i].name == name)
    {
      res = arr[i].value
    }
  }
    console.log(name + " => " +  res)
  return res;
}

function convertToDate(unix_timestamp)
{
  // Create a new JavaScript Date object based on the timestamp
// multiplied by 1000 so that the argument is in milliseconds, not seconds.
var date = new Date(unix_timestamp*1000);
// Hours part from the timestamp
var hours = date.getHours();
// Minutes part from the timestamp
var minutes = "0" + date.getMinutes();
// Seconds part from the timestamp
var seconds = "0" + date.getSeconds();

// Will display time in 10:30:23 format
var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
return  date.getDate() +"/"+ (date.getMonth()+1) +"/"+ date.getFullYear() + "  " +formattedTime;
}

dataService.init();
$(document).foundation();
