const user = {
    firstName: 'John',
    lastName: 'Doe',
    middleName: 'Smith',
    transaction: {
        date: '01/01/2020',
        paid: 3000000,
        currency: 'Kn',
        purchaseId: 1234567890,
        descriptions: [
          {
              name: 'german shepard',
              quantity: 1,
              price: 40000
          },
          {
              name: 'rotweiler',
              quantity: 4,
              price: 2900000
          },
          {
              name: 'labrador',
              quantity: 8,
              price: 8000000
          },
          {
              name: 'landseer',
              quantity: 1,
              price: 100000
          }
        ]
    },
    getFullName() {
        return `${this.firstName} ${this.lastName} ${this.middleName? this.middleName : ''}`;
    }
}

const fullName = user.getFullName();
const purchaseId = user.transaction.purchaseId;
const quantityDesc = user.transaction.descriptions.map((desc) => {
    return `<tr class="table-row gray-row">
        <td class='template-data'>${desc.quantity}</td>
        <td class='template-data'>${desc.name}</td>
        <td class='template-data'>${desc.price.toLocaleString('en-US')}</td>
    </tr>`
}).join('');
const currency = user.transaction.currency;
const totalAmount = user.transaction.descriptions.reduce((prev, amt) => {
    return prev + amt.price;
}, 0);
const paid = user.transaction.paid;
const amountDue = totalAmount - paid;

document.getElementById('user').innerHTML = fullName;
document.getElementById('purchaseId').innerHTML = purchaseId;
document.getElementById('cartDetail').innerHTML = quantityDesc;
document.getElementById('purchase-date').innerHTML = user.transaction.date;
document.getElementById('total-amount').innerHTML = `${totalAmount.toLocaleString('en-US')} <strong>(${currency})</strong>`;
document.getElementById('amount-paid').innerHTML = `${paid.toLocaleString('en-US')} <strong>(${currency})</strong>`;
document.getElementById('amount-due').innerHTML = `${amountDue.toLocaleString('en-US')}`;


