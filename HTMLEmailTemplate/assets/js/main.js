
var request = new XMLHttpRequest();
request.open('GET', 'http://pet-shop.buckhill.com.hr/api/v1/order/88ecf349-a0d0-380e-b71c-ba4b971f8671');
request.setRequestHeader('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvcGV0LXNob3AuYnVja2hpbGwuY29tLmhyIiwiZXhwIjoxNjk2Mjk5NDE2LCJ1c2VyX3V1aWQiOiJiZjMxZWM0Yy05ZTQ5LTM4MjktOWY3Yy0zOWUxNmQ1Y2FjZTEifQ.mk5OvfNS9et9nO3xRgJX7hoqvLGxUa3scOmbDlOnT3WC5zVwQ81US_XAw5vg0FNjyGfFPZHnMzegctaKAwToKsCwdCpTJAmHvqPXgtmYuN8jjyl9IgunVo3mrpXfrKapijIARNbxc2AjZJhyKj65CVth5eMYMo66hqRXTXJ-LtDVMcJlSyI4A2BrYZtyxifL3bAgc1FcDHUbzgQ4QP0dXy4oNOtCFpOu-Qe5uEQ2czFrVewTES8xC4w5YfpDz7zrOZ6_agqFNpitNCcbgx3LGHyQ8p8ILe7oMwRQ5HTT_RpGzD4HNuQoWmVmLq-fAE2iUzNyDA6mCWXwNSo_87GFUA');
request.onload = function(){
    if(request.status == 200){
        var data = JSON.parse(request.responseText);
        
        createHTML(data);

    }else{
        console.log('Connect to serve but error was returned');
    }
};

request.onerror = function(){
    console.log('Connection error');
};

request.send();

Handlebars.registerHelper('caculateTotalAmount', function(amount, delivery_fee){
 var totalAmount = amount + delivery_fee;
 return totalAmount;
});

Handlebars.registerHelper('formatDate', function(date){

const dateObject = new Date(date);

// Format the date into a human-readable format
const formattedDate = `${dateObject.toLocaleDateString()} ${dateObject.toLocaleTimeString()} UTC`;

return formattedDate;
    
});

function createHTML(purchaseData){
    //console.log(purchaseData);
    var rawTemplate = document.getElementById('invoiceTemplate').innerHTML;
    var compiledTemplate = Handlebars.compile(rawTemplate);
    var generatedHTML = compiledTemplate(purchaseData);

    var inoviceContainer = document.getElementById('invoice-container');
    inoviceContainer.innerHTML = generatedHTML;
}