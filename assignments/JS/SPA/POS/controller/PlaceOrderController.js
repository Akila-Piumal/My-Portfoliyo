$(document).ready(function () {
    // auto generate Order ID
    autoGenerateOrderID();

    // set Current Date
    $('#dateInput').val(getCurrentDate());

});

function autoGenerateOrderID() {
    if ($.isEmptyObject(orders)) {
        $('#orderId').val('O001');
    } else {
        let lastId;
        for (let i = 0; i < orders.length; i++) {
            lastId = orders[i].id;
        }
        let newID = idGenerator(lastId);
        $('#orderId').val(newID);
    }
}

function getCurrentDate() {

    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }

    function formatDate(date = new Date()) {
        return [
            date.getFullYear(),
            padTo2Digits(date.getMonth() + 1),
            padTo2Digits(date.getDate()),
        ].join('-');
    }

    return formatDate();
}

function setCustomerIDsToComboBox() {
    $('#cmbCusID').empty();

    for (let customer of customerArray) {
        $('#cmbCusID').append(` <option >${customer.id}</option>`)
    }

    $('#cmbCusID').val('');
}

$('#cmbCusID').change(function () {
    let customer = searchCustomerWithID($('#cmbCusID').val());
    setValuesToInvoiceDetails(customer.id, customer.name, customer.contactNo, customer.address);
});

function setValuesToInvoiceDetails(id, name, contactNo, address) {
    $('#cusIDInInvoice').val(id);
    $('#cusNameInInvoice').val(name);
    $('#contactNoInInvoice').val(contactNo);
    $('#cusAddressInInvoice').val(address);
}