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
    $('#selectItem').focus();
});

function setValuesToInvoiceDetails(id, name, contactNo, address) {
    $('#cusIDInInvoice').val(id);
    $('#cusNameInInvoice').val(name);
    $('#contactNoInInvoice').val(contactNo);
    $('#cusAddressInInvoice').val(address);
}

$('#cusIDInInvoice').on('keypress', function (event) {
    if (event.key == "Enter") {
        if (searchCustomerWithID($('#cusIDInInvoice').val()) !== null) {
            $('#cmbCusID').val($('#cusIDInInvoice').val());
            let customer = searchCustomerWithID($('#cusIDInInvoice').val());
            setValuesToInvoiceDetails(customer.id, customer.name, customer.contactNo, customer.address);
            $('#selectItem').focus();
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Customer not exist'
            })
            clearInvoiceDetailsFields();
        }
    }
});

function clearInvoiceDetailsFields() {
    $('#cmbCusID').val('');
    $('#cusIDInInvoice').val('');
    $('#cusNameInInvoice').val('');
    $('#contactNoInInvoice').val('');
    $('#cusAddressInInvoice').val('');
}

$("#newCustomerModelInInvoice").on('shown.bs.modal', function () {
    $('#newCustomerNameInInvoice').focus();
    $('#btnSaveCustomerInInvoice').attr("disabled", true);
    $('#newCustomerGenderInInvoice').val('');
    $('#newCustomerIdInInvoice').css("border", "3px solid green");

    if ($.isEmptyObject(customerArray)) {
        $('#newCustomerIdInInvoice').val('C001');
    } else {
        let lastId;
        for (let i = 0; i < customerArray.length; i++) {
            lastId = customerArray[i].id;
        }
        let newID = idGenerator(lastId);
        $('#newCustomerIdInInvoice').val(newID);
    }
});

$('#newCustomerNameInInvoice').on('keyup', function (event) {

    let currentObject = $('#newCustomerNameInInvoice');
    let currentPattern = cusName;
    let warnMsgObject = $('#warnMsgForNameInInvoice');
    let btnObject = $('#btnSaveCustomerInInvoice');
    let nextFocusPattern = cusAddress;
    let nextFocusObject = $('#newCustomerAddressInInvoice');
    let nextWarnMsgObj = $('#warnMsgForAddressInInvoice');

    let result = validate(currentObject, currentPattern, warnMsgObject, btnObject, nextFocusPattern, nextFocusObject, nextWarnMsgObj);

    if (event.which === 13) {
        if (result === true) {
            $('#newCustomerAddressInInvoice').focus();
        }
    }
});

$('#newCustomerAddressInInvoice').keyup(function (e) {
    let val = $('#newCustomerAddressInInvoice').val();
    let result = cusAddress.test(val);
    if (result !== true) {
        $('#newCustomerAddressInInvoice').css("border", "3px solid red");
        $('#warnMsgForAddressInInvoice').css('display', 'block');
        $('#btnSaveCustomerInInvoice').attr("disabled", true);
    } else {
        $('#newCustomerAddressInInvoice').css("border", "3px solid green");
        $('#warnMsgForAddressInInvoice').css('display', 'none');
        $('#btnSaveCustomerInInvoice').removeAttr("disabled");

        if ($('#newCustomerGenderInInvoice').val() == null) {
            $('#newCustomerGenderInInvoice').css("border", "3px solid red");
            $('#btnSaveCustomerInInvoice').attr("disabled", true);
        }
        if (e.which == 13) {
            $('#newCustomerGenderInInvoice').focus();
            down("#newCustomerGenderInInvoice");
        }
    }
});

$('#newCustomerGenderInInvoice').keypress(function (e) {
    if (e.which == 13) {
        $('#newCustomerGenderInInvoice').css("border", "3px solid green");
        $('#newCustomerNumberInInvoice').focus();
        up(this);
        $('#newCustomerNumberInInvoice').css("border", "3px solid red");
        $('#warnMsgForConNumberInInvoice').css('display', 'block');
    }
});

$('#newCustomerNumberInInvoice').on('keyup', function (event) {

    let currentObject = $('#newCustomerNumberInInvoice');
    let currentPattern = conNumber;
    let warnMsgObject = $('#warnMsgForConNumberInInvoice');
    let btnObject = $('#btnSaveCustomerInInvoice');

    let result = validate(currentObject, currentPattern, warnMsgObject, btnObject, null, null, null);

    if (event.which === 13) {
        if (result === true) {
            Swal.fire({
                title: 'Do you want to save the Customer?',
                showDenyButton: true,
                confirmButtonText: 'Save',
                denyButtonText: `Don't save`,
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    Swal.fire('Saved!', '', 'success');
                    saveCustomerInPlaceOrder();
                    $('#newCustomerModelInInvoice').modal('hide');
                    clearFieldsInNewCusModelInInvoice();
                } else if (result.isDenied) {
                    clearFieldsInNewCusModelInInvoice();
                    $('#newCustomerModelInInvoice').modal('hide');
                    Swal.fire('Changes are not saved', '', 'info')
                }
            });
        }
    }
});

function saveCustomerInPlaceOrder() {
    let ID = $('#newCustomerIdInInvoice').val();
    let Name = $('#newCustomerNameInInvoice').val();
    let address = $('#newCustomerAddressInInvoice').val();
    let gender = $('#newCustomerGenderInInvoice').val();
    let contactNo = $('#newCustomerNumberInInvoice').val();

    var customer = {
        id: ID,
        name: Name,
        address: address,
        gender: gender,
        contactNo: contactNo
    }

    customerArray.push(customer);

    addDataToTable();

    bindRowClickEvent();

    bindRowDblClickEvent();

    setCustomerIDsToComboBox();

    $('#cmbCusID').val(ID);

    setValuesToInvoiceDetails(ID, Name, contactNo, address);
}

function clearFieldsInNewCusModelInInvoice() {
    $('#newCustomerIdInInvoice').val('');
    $('#newCustomerNameInInvoice').val('');
    $('#newCustomerAddressInInvoice').val('');
    $('#newCustomerGenderInInvoice').val('');
    $('#newCustomerNumberInInvoice').val('');
    $('#newCustomerIdInInvoice').css("border", "1px solid gray");
    $('#newCustomerNameInInvoice').css("border", "1px solid gray");
    $('#newCustomerAddressInInvoice').css("border", "1px solid gray");
    $('#newCustomerGenderInInvoice').css("border", "1px solid gray");
    $('#newCustomerNumberInInvoice').css("border", "1px solid gray");
}

$('#btnSaveCustomerInInvoice').click(function () {
    Swal.fire({
        title: 'Do you want to save the Customer?',
        showDenyButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire('Saved!', '', 'success');
            saveCustomerInPlaceOrder();
            $('#newCustomerModelInInvoice').modal('hide');
            clearFieldsInNewCusModelInInvoice();
        } else if (result.isDenied) {
            clearFieldsInNewCusModelInInvoice();
            $('#newCustomerModelInInvoice').modal('hide');
            Swal.fire('Changes are not saved', '', 'info')
        }
    });
});
