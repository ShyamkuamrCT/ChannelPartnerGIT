$(document).ready(function(){
    getcountry();
    getCompanycountry();
    getjobtitle();
$('#regisProcess').prop('disabled', false);
$('#orgnizationName').val(localStorage.getItem("companyname"));

});

var baseUrl = 'http://api.medvantage.tech:7098';
var masterUrl = 'http://api.medvantage.tech:7083';
function registerForm(){
    //var status = formValidation();
    var emailReg = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    var regText = /^[a-zA-Z_ '.\\s]{1,40}$/;
    var numReg = /^\+?[1-9][0-9]{7,14}$/;
    if($('#contactPersonName').val() == "" || !regText.test($("#contactPersonName").val())){
        $('#contactPersonName').focus();
        $('#contactPersonName').css('border','solid 1px red');
        $('.errorfname').html('Enter First Name');
        return false;
      
    }
 
    else if($('#email').val() == "" || !emailReg.test($("#email").val())){
        $('#email').focus();
        $('#email').css('border','solid 1px red');
        $('.erroremail').html('Enter valid email');
        return false;
    }
    else if($('#phone').val() == "" || !numReg.test($("#phone").val())){
        $('#phone').focus();
        $('#phone').css('border','solid 1px red');
        $('.errorphone').html('Enter valid phone no');
        return false;
    }
    else if($('#jobTitle').val() == ""){
        $('#jobTitle').focus();
        $('#jobTitle').css('border','solid 1px red');
        $('.errorjobtitle').html('select job title');
        return false;
    }
    else if($('#organization').val() == "" || !regText.test($("#organization").val())){
        $('#organization').focus();
        $('#organization').css('border','solid 1px red');
        $('.errororg').html('Enter Orgnization Name');
        return false;
    }
    else if($('#terms').prop('checked') == false){
        $('.container_check .checkmark').css('border','solid 1px red !important');
        alert('Please check on Terms and conditions');
        return false;
    }
    else{
     var customerId = 'CT'+randomString(10, '#aA');
    var obj = {
        'contactPerson' : $('#contactPersonName').val(),
        'CustomerID' : customerId,
        'emailID' : $('#email').val(),
        'mobile' : $('#phone').val(),
        'jobTitleID' : $('#jobTitle').val(),
        'companyName' : $('#organization').val(),
        'terms' : $('#terms').val()
    }

    $.ajax({
        url: baseUrl+'/api/ApplicationRequest/InsertApplicationRequest',
        headers: { 
            'Accept': 'application/json-patch+json',
            'Content-Type': 'application/json-patch+json' 
        },
        data:  JSON.stringify(obj),
        type: 'post',
        dataType: 'json',
        cache: false,
        success: function (response) { 
            if(response.status == '1'){
                $('#customerEmail').val($('#email').val());
                $('#customerPhone').val($('#phone').val());
                $('#personname').val($('#contactPersonName').val());
                $('#companyname').val($('#organization').val());
                $('#customerId').val(customerId);

                
                $('#otpsection-txt').show();
                $('.otpsection-txt').css('display','block');
                $('.otpsection-txt').css('background-color','#000000c7');
            }
            // else{
            //     if(response.status == '0'){
            //         $('#errorText').html(`<div class="alert alert-warning alert-dismissible fade show" role="alert">
            //         <strong>Hi `+$('#email').val()+`!</strong> `+response.responseValue+`
            //         <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            //       </div>`);
            //     }
            // }
        },
        error: function (error) {
            console.log(error);
        }
    });
}

}

var getjobtitle = function(){
    $.ajax({
        url: masterUrl+'/api/DesignationMaster/GetAllDesignationMaster',
        type: 'get',
        cache: false,
        success: function (response) {
            if(response.status == '1'){
                var i;
                $('#jobTitle').append(`<option value="">Select job title</option>`)
                for(i=0;i<response.responseValue.length;i++){
                    $('#jobTitle').append(`<option value="`+response.responseValue[i].id+`">`+response.responseValue[i].designationName+`</option>`);
                }
             
            }
            
        }
    });
}
var getcountry = function(){

    $.ajax({
        url: masterUrl+'/api/CountryMaster/GetAllCountryMaster',
        type: 'get',
        cache: false,
        success: function (response) {
            if(response.status == '1'){
                var i;
                $('#country').append(`<option value="">select country</option>`)
                for(i=0;i<response.responseValue.length;i++){
                    $('#country').append(`<option value="`+response.responseValue[i].id+`">`+response.responseValue[i].countryName+`</option>`);
                }
             
            }
            
        }
    });
   }

 function getallstate(){
    var countryid= $('#country option:selected').val();
    $('#state').empty();
    $.ajax({
        url: masterUrl+'/api/StateMaster/GetStateMasterByCountryId?id='+countryid,
        type: 'get',
        cache: false,
        success: function (response) {
            if(response.status == '1'){
                var i;
                $('#state').append(`<option value="">select State</option>`)
                for(i=0;i<response.responseValue.length;i++){
                    $('#state').append(`<option value="`+response.responseValue[i].id+`">`+response.responseValue[i].stateName+`</option>`);
                }
             
            }
            
        }
    });

 }  

 function getallcity(){
    var stateid= $('#state option:selected').val();
    $('#city').empty();
    $.ajax({
        url: masterUrl+'/api/CityMaster/GetCityMasterByStateId?id='+stateid,
        type: 'get',
        cache: false,
        success: function (response) {
            if(response.status == '1'){
                var i;
                $('#city').append(`<option value="">select City</option>`)
                for(i=0;i<response.responseValue.length;i++){
                    $('#city').append(`<option value="`+response.responseValue[i].id+`">`+response.responseValue[i].name+`</option>`);
                }
             
            }
            
        }
    });

 }

 var getCompanycountry = function(){

    $.ajax({
        url: masterUrl+'/api/CountryMaster/GetAllCountryMaster',
        type: 'get',
        cache: false,
        success: function (response) {
            if(response.status == '1'){
                var i;
                $('#companyCountry').append(`<option value="">select country</option>`)
                for(i=0;i<response.responseValue.length;i++){
                    $('#companyCountry').append(`<option value="`+response.responseValue[i].id+`">`+response.responseValue[i].countryName+`</option>`);
                }
             
            }
            
        }
    });
   }

 function getcompanystate(){
    var countryid= $('#companyCountry option:selected').val();
    $('#companyState').empty();
    $.ajax({
        url: masterUrl+'/api/StateMaster/GetStateMasterByCountryId?id='+countryid,
        type: 'get',
        cache: false,
        success: function (response) {
            if(response.status == '1'){
                var i;
                $('#companyState').append(`<option value="">select State</option>`)
                for(i=0;i<response.responseValue.length;i++){
                    $('#companyState').append(`<option value="`+response.responseValue[i].id+`">`+response.responseValue[i].stateName+`</option>`);
                }
             
            }
            
        }
    });

 }  

 function getcompanycity(){
    var stateid= $('#companyState option:selected').val();
    $('#companyCity').empty();
    $.ajax({
        url: masterUrl+'/api/CityMaster/GetCityMasterByStateId?id='+stateid,
        type: 'get',
        cache: false,
        success: function (response) {
            if(response.status == '1'){
                var i;
                $('#companyCity').append(`<option value="">select City</option>`)
                for(i=0;i<response.responseValue.length;i++){
                    $('#companyCity').append(`<option value="`+response.responseValue[i].id+`">`+response.responseValue[i].name+`</option>`);
                }
             
            }
            
        }
    });

 }
function randomString(length, chars) {
    var mask = '';
    if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
    if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (chars.indexOf('#') > -1) mask += '0123456789';
    if (chars.indexOf('!') > -1) mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
    var result = '';
    for (var i = length; i > 0; --i) result += mask[Math.round(Math.random() * (mask.length - 1))];
    return result;
}
function otpverify(){
        var otp = $('#otpNumber').val();
        var email =  $('#customerEmail').val();
        var mobile =  $('#customerPhone').val();
        var obj ={
            'otp' : otp,
            'email' : email,
            'mobile': mobile
        }
    $.ajax({
        url: baseUrl+'/api/ApplicationRequest/VerifyOtp',
        headers: { 
            'Accept': 'application/json-patch+json',
            'Content-Type': 'application/json-patch+json' 
        },
        data:  JSON.stringify(obj),
        type: 'PUT',
        dataType: 'json',
        cache: false,
        success: function (response) { 
            if(response.status == '1'){
                $('#otpmsg').html(`<div class="alert alert-success alert-dismissible fade show" role="alert">
                        OTP are verify Successfully
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                      </div>`);
            localStorage.setItem("customerEmail", $('#customerEmail').val());
            localStorage.setItem("customerPhone", $('#customerPhone').val());
            localStorage.setItem("personname", $('#personname').val());
            localStorage.setItem("companyname", $('#companyname').val());
            localStorage.setItem("customerId", $('#customerId').val());
            
            
            window.setTimeout(function() {
                window.location.href = 'auth';
                 $('#otpmsg').hide(500);
                }, 1000);
            }
           
        },
        error: function (error) {
            console.log(error);
        }
    });
}


   $('#closeOtpsec').click(function(){
    $('#otpsection-txt').hide();
    $('#closemodel').hide();
   })

   $('#closeSecpsec').click(function(){
    $('#success-txt').hide();
    $('#closemodelsec').hide();
    $('#success-txt').css('display','none');
   })

   function submitApplication(){
    // var customerEmail = localStorage.getItem("customerEmail");
    // var customerPhone = localStorage.getItem("customerPhone");
    // var personname = localStorage.getItem("personname");
    var customerId = localStorage.getItem("customerId");
    var country = parseInt($('#country').val());
    var state = parseInt($('#state').val());
    var city = parseInt($('#city').val());
    var postalCode = parseInt($('#postalCode').val());
    var companyCountry = parseInt($('#companyCountry').val());
    var companyState = parseInt($('#companyState').val());
    var companyCity = parseInt($('#companyCity').val());
    var companyPostalCode = parseInt($('#companyPostalCode').val());

    var totalRevenue = parseInt($('#totalRevenue').val());
    var totalActiveCustomer = parseInt($('#totalActiveCustomer').val());
    var noofEmployee = parseInt($('#noofEmployee').val());
   

    var obj = {
        'password' : $('#password').val(),
        'customerID': customerId,
        'countryID': country,
        'stateID': state,
        'cityID': city,
        'zipCode': $('#postalCode').val(),
        'address': $('#address').val(),
        'companyCountryID': companyCountry,
        'companyStateID': companyState,
        'companyCityID': companyCity,
        'companyZipCode': $('#companyPostalCode').val(),
        'companyAddress': $('#companyAddress').val(),
        'website': $('#websiteurl').val(),
        'revenue' : totalRevenue,
        'noOfCustomer' : totalActiveCustomer,
        'noOfEmployee' : noofEmployee,
        'othervendorProducts' : $('#companyVendor').val()
    }

    console.log(JSON.stringify(obj));
    //return;
    $.ajax({
        url: baseUrl+'/api/ApplicationRequest/UpdateApplicationRequest',
        headers: { 
            'Accept': 'application/json-patch+json',
            'Content-Type': 'application/json-patch+json' 
        },
        data:  JSON.stringify(obj),
        type: 'PUT',
        dataType: 'json',
        cache: false,
        success: function (response) { 
            if(response.status == '1'){
                $('#successmsg').html(`<div class="alert alert-success alert-dismissible fade show" role="alert">
                        Hi ! your Application has been submitted Successfully.
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                      </div>`);
                      $('.success-txt').show();
                      $('.success-txt').css('display','block');
                      $('.success-txt').css('background-color','#000000c7');
                      window.setTimeout(function() {
                        localStorage.clear();
                        window.location.href = 'login';
                         $('#successmsg').hide(500);
                         $('#closemodelsec').hide();
                         $('.success-txt').css('display','none');
                        }, 2000);
                    }
        },
        error: function (error) {
            console.log(error);
        }
    });
   }

   $('#websiteurl').change(function(){
var weburl = /^(http|https|ftp):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i;
var websiteurl = $('#websiteurl').val();
if(!weburl.test(websiteurl))
{
    $('#weberror').text('invalid website url');
    $('#weberror').focus();
    return false;
}
   });

  function loginForm(){
    var obj = {
        'loginUser' : $('#mobile').val(),
        'password' : $('#password').val()
    }

    $.ajax({
        url: baseUrl+'/api/ApplicationRequest/InsertPartnerLogin',
        headers: { 
            'Accept': 'application/json-patch+json',
            'Content-Type': 'application/json-patch+json' 
        },
        data:  JSON.stringify(obj),
        type: 'post',
        dataType: 'json',
        cache: false,
        success: function (response) { 
            console.log(response.responseText);
            if(response.status == '1'){
                $('.successmsg').html(`<div class="alert alert-success alert-dismissible fade show" role="alert">
                Hi ! you have successfully logged.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>`);
            }
            else {
            if(response.status == '0'){
                $('.successmsg').html(`<div class="alert alert-warning alert-dismissible fade show" role="alert">
                `+response.message+`.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>`);
            }
        }
         
        },
        error: function (error) {
            console.log(error);
        }
    });
  }
  $('.btn-close').click(function(){
    this.css('display','none');
  })