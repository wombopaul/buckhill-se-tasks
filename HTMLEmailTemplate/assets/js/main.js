
var request = new XMLHttpRequest();
request.open('GET', 'http://pet-shop.buckhill.com.hr/api/v1/order/dec77983-24d7-3866-99c1-f1b5c72c134d');
request.setRequestHeader('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvcGV0LXNob3AuYnVja2hpbGwuY29tLmhyIiwiZXhwIjoxNjk2Mjk1MzI4LCJ1c2VyX3V1aWQiOiI2OWQyYTlhMi1kYWIxLTNjNmQtOThkZi04Nzc4MmQzZDYyY2EifQ.lvmgUT5qqKVwiNcX66PGmuxkdBwPnIOxwhmvFzw_WKbEQgfBZvtijeb4pgohNrqNXh0mO0zi1ijsTgcOu0aBnpQxxepCADfUBrVqr2_9rSI0YpqmETI8RUW4P5NoyvPEv5A3TgxrRn0DaDcrpQCT6j1nFI-fNiBtj2qbRBQI4DAnVHeZYs-OQp2z-yekmF_bYvVrjTxo-wZGvHeElGaRE3LgLQnHAVr_H4bz_TU6LWAA82wkv5KemjMXNX7bchTe_nYa7pmLx511r9k4nk9YbSq-M0dh9CYFWPA50xzjDqwHSD1AAxzji2gNb87L2agEChNpSUxhgNZhJhHf1eYdEQ');
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