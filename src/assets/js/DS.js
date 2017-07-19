var dataService = {
  init: function(){
    backand.init({
        appName: 'iintooxback',
        signUpToken: '35acd1ee-2554-462d-818f-e990127f4146',
        anonymousToken: '00e2b8df-f3fe-40bf-b9a1-7d19bdcab7b0',
        runSocket: false
    });
  },

  signup:function(dataObj)
  {
    backand.signup(dataObj.firstName, dataObj.lastName, dataObj.email, dataObj.password, dataObj.password, {newsletter:dataObj.newsletter,password:dataObj.password,phone:dataObj.phone,ad_ID:dataObj.ad_ID,campaign_ID:dataObj.campaign_ID})
  .then(res => {
    console.log(res.data);
  })
  .catch(err => {
    console.log(err);
  });

},

login:function(dataObj)
{
  backand.signin(dataObj.username, dataObj.password)
  .then(res => {
  console.log(res.data);
  sessionStorage.setItem('user',res.data.access_token);
  document.location = "index.html"
})
.catch(err => {
  console.log(err);
});

},

  getUsers:function(callback,page,date1=1483221600,date2=1499893200)
  {

    backand.query.get("getLeads", {
    date1:  date1, 
    date2:  date2,
    pageSize: pageRowSize,
    offset: page
})

  .then(res => {
    console.log(res);
    console.log(`res.totalRows:${res.totalRows}`);
//   console.log(res.data);
    if(res.data && res.data.length)
      callback(res.data,res.data[0].totalRows,page,date1,date2);
  })
  .catch(err => {
    console.log(err);
    document.location = "login.html"
  });
  }
}
