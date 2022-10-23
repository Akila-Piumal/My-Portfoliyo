
$('#btnSaveCustomer').click(function () {
    Swal.fire({
        title: 'Do you want to save the Customer?',
        showDenyButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            saveCustomer();
            Swal.fire('Saved!', '', 'success');
            $('#newCustomerModel').modal('hide');
            clearFields();
        } else if (result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info')
        }
    });
});

function clearFields() {
    $('#customerIdInput').val('');
    $('#customerNameInput').val('');
    $('#customerAddressInput').val('');
    $('#customerSalaryInput').val('');
    $('#maleOrFemale').val('');
    $('#CustomerNumberInput').val('');
    $('#customerIdInput').css("border", "1px solid gray");
    $('#customerNameInput').css("border", "1px solid gray");
    $('#customerAddressInput').css("border", "1px solid gray");
    $('#customerSalaryInput').css("border", "1px solid gray");
    $('#maleOrFemale').css("border", "1px solid gray");
    $('#CustomerNumberInput').css("border", "1px solid gray");
}

function saveCustomer() {
    let ID = $('#customerIdInput').val();
    let Name = $('#customerNameInput').val();
    let address = $('#customerAddressInput').val();
    let gender = $('#maleOrFemale').val();
    let contactNo = $('#CustomerNumberInput').val();

    let newCustomer=Object.assign({},customer);
    newCustomer.id=ID;
    newCustomer.name=Name;
    newCustomer.address=address;
    newCustomer.gender=gender;
    newCustomer.contactNo=contactNo;

    customerArray.push(newCustomer);

    addDataToTable();

    bindRowClickEvent();

    bindRowDblClickEvent();

    setCustomerIDsToComboBox();

    // update the customerCount
    setCusCount();
}

function addDataToTable() {
    $('#tblCustomer').empty();

    for (var customer of customerArray) {
        var row = `<tr><th scope='row'>${customer.id}</th><td>${customer.name}</td><td>${customer.address}</td><td>${customer.gender}</td><td>${customer.contactNo}</td></tr>`;

        $('#tblCustomer').append(row);
        $("#tblCustomer>tr").css('cursor', 'pointer');
    }
}

function setCustomerValues(id, name, address, gender, contactNo) {
    $('#customerID').val(id);
    $('#customerName').val(name);
    $('#customerAddress').val(address);
    $('#gender').val(gender);
    $('#contactNumber').val(contactNo);

    $('#btnUpdateCus').removeAttr("disabled");
    $('#btnDeleteCus').removeAttr("disabled");

}

function bindRowClickEvent() {
    $('#tblCustomer>tr').click(function () {
        let id = $(this).children().eq('0').text();
        let name = $(this).children().eq('1').text();
        let address = $(this).children().eq('2').text();
        let gender = $(this).children().eq('3').text();
        let contactNo = $(this).children().eq('4').text();

        setCustomerValues(id, name, address, gender, contactNo)
    });
}

function searchCustomerWithID(id) {
    for (let i = 0; i < customerArray.length; i++) {
        if (id === (customerArray[i].id)) {
            let newCustomer=Object.assign({},customer);
            newCustomer.id=customerArray[i].id;
            newCustomer.name=customerArray[i].name;
            newCustomer.address=customerArray[i].address;
            newCustomer.gender=customerArray[i].gender;
            newCustomer.contactNo=customerArray[i].contactNo;

            return newCustomer;
        }
    }
    return null;
}

function searchCustomerWithName(name) {
    for (let i = 0; i < customerArray.length; i++) {
        if (name === (customerArray[i].name)) {
            let newCustomer=Object.assign({},customer);
            newCustomer.id=customerArray[i].id;
            newCustomer.name=customerArray[i].name;
            newCustomer.address=customerArray[i].address;
            newCustomer.gender=customerArray[i].gender;
            newCustomer.contactNo=customerArray[i].contactNo;
            return newCustomer;
        }
    }
    return null;
}

function searchCustomer() {
    let searchBarText = $('#searchBarCustomer').val();

    if ($('#cmbSelectIDOrName').find('option:selected').val() === "id") {
        if ($.isEmptyObject(customerArray)) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Empty Set',
            })
        } else {

            if (searchCustomerWithID(searchBarText) !== null) {
                let customer = searchCustomerWithID(searchBarText);
                setCustomerValues(customer.id, customer.name, customer.address, customer.gender, customer.contactNo);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Customer not exist'
                })
                clearCustomerDetailsFields();
            }
        }
    } else if ($('#cmbSelectIDOrName').find('option:selected').val() === "name") {
        if ($.isEmptyObject(customerArray)) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Empty Set',
            })
        } else {
            if (searchCustomerWithName(searchBarText) !== null) {
                let customer = searchCustomerWithName(searchBarText);
                setCustomerValues(customer.id, customer.name, customer.address, customer.gender, customer.contactNo);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Customer not exist'
                })
                clearCustomerDetailsFields();
            }
        }
    }
}

function clearCustomerDetailsFields() {
    $("#customerID").val("");
    $("#customerName").val("");
    $("#customerAddress").val("");
    $("#gender").val("");
    $("#contactNumber").val("");
    $("#searchBarCustomer").val("");
    $('#btnUpdateCus').attr('disabled', true);
    $('#btnDeleteCus').attr('disabled', true);
}

$(window).ready(function () {
    $('#btnUpdateCus').attr('disabled', true);
    $('#btnDeleteCus').attr('disabled', true);

    // add customers in start
    let newCustomer=Object.assign({},customer);
    newCustomer.id='C001';
    newCustomer.name='Akila';
    newCustomer.address='Mathugama';
    newCustomer.gender='Male';
    newCustomer.contactNo='0783223485';

    customerArray.push(newCustomer);

    let newCustomer2=Object.assign({},customer);
    newCustomer2.id='C002';
    newCustomer2.name='Kamal';
    newCustomer2.address='Kaluthara';
    newCustomer2.gender='Male';
    newCustomer2.contactNo='0711234567';

    customerArray.push(newCustomer2);

    addDataToTable();
    setCustomerIDsToComboBox();
    bindRowClickEvent();
    bindRowDblClickEvent();
    setCusCount();
});

// key event to ENTER key
$('#customerID').keypress(function (e) {
    if (e.which === 13) {
        if ($.isEmptyObject(customerArray)) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Empty Set',
            })
        } else {
            if (searchCustomerWithID($('#customerID').val()) !== null) {
                let customer = searchCustomerWithID($('#customerID').val());
                setCustomerValues(customer.id, customer.name, customer.address, customer.gender, customer.contactNo)
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Customer not exist'
                })
                clearCustomerDetailsFields();
            }
        }
    }
});

$('#searchBarCustomer').keypress(function (e) {
    if (e.which == 13) {
        searchCustomer();
    }
});

$('#btnSearchForCustomer').click(function () {
    searchCustomer();
});

$("#newCustomerModel").on('shown.bs.modal', function () {
    $(this).find('#customerNameInput').focus();
    $(this).find('#btnSaveCustomer').attr("disabled", true);
    $(this).find('#maleOrFemale').val('');
    $('#customerIdInput').css("border", "3px solid green");

    if ($.isEmptyObject(customerArray)) {
        $('#customerIdInput').val('C001');
    } else {
        let lastId;
        for (let i = 0; i < customerArray.length; i++) {
            lastId = customerArray[i].id;
        }
        let newID = idGenerator(lastId);
        $('#customerIdInput').val(newID);
    }
});

function idGenerator(lastId) {
    if (lastId.charAt(3) === '9') {
        if (lastId.charAt(2) === '9') {
            if (lastId.charAt(1) !== '9') {
                let index1NewNumber = parseInt(lastId.charAt(1)) + 1;
                let newID = (lastId.substring(0, 1)) + index1NewNumber + 0 + 0;
                return newID;
            } else {
                // C999
            }
        } else {
            let index2NewNumber = parseInt(lastId.charAt(2)) + 1;
            let newID = (lastId.substring(0, 2)) + index2NewNumber + 0;
            return newID;
        }
    } else {
        let lastNumber = parseInt(lastId.charAt(3));
        let newID = (lastId.substring(0, 3)) + (lastNumber + 1);
        return newID;
    }
}

var cusID = /^(C)[0-9]{3}$/;
var cusName = /^[A-z ]{5,25}$/;
var cusAddress = /^[A-z0-9, /]{5,35}$/;
var conNumber = /^(078|077|072|075|076|074|071|070)[0-9]{7}$/;

function testPattern(val, pattern) {
    return pattern.test(val);
}

function validate(object, pattern, warnMsgObject, btnObject, nextFocusPattern, nextFocusObject, nextWarnMsgObj) {
    let val = object.val();
    let result = testPattern(val, pattern);
    if (result !== true) {
        object.css("border", "3px solid red");
        warnMsgObject.css('display', 'block');
        btnObject.attr("disabled", true);

        return false;

    } else {
        object.css("border", "3px solid green");
        warnMsgObject.css('display', 'none');
        btnObject.removeAttr("disabled");

        if (nextFocusObject !== null) {
            let focusedTextVal = nextFocusObject.val();
            if (testPattern(focusedTextVal, nextFocusPattern) === false) {
                nextFocusObject.css("border", "3px solid red");
                nextWarnMsgObj.css('display', 'block');
                btnObject.attr("disabled", true);
            }
        }

        return true;

    }
}

$('#customerNameInput').on('keyup', function (event) {

    let currentObject = $('#customerNameInput');
    let currentPattern = cusName;
    let warnMsgObject = $('#warnMsgForName');
    let btnObject = $('#btnSaveCustomer');
    let nextFocusPattern = cusAddress;
    let nextFocusObject = $('#customerAddressInput');
    let nextWarnMsgObj = $('#warnMsgForAddress');

    let result = validate(currentObject, currentPattern, warnMsgObject, btnObject, nextFocusPattern, nextFocusObject, nextWarnMsgObj);

    if (event.which === 13) {
        if (result === true) {
            $('#customerAddressInput').focus();
        }
    }
});

$('#customerAddressInput').keyup(function (e) {
    let val = $('#customerAddressInput').val();
    let result = cusAddress.test(val);
    if (result !== true) {
        $('#customerAddressInput').css("border", "3px solid red");
        $('#warnMsgForAddress').css('display', 'block');
        $('#btnSaveCustomer').attr("disabled", true);
    } else {
        $('#customerAddressInput').css("border", "3px solid green");
        $('#warnMsgForAddress').css('display', 'none');
        $('#btnSaveCustomer').removeAttr("disabled");

        if ($('#maleOrFemale').val() == null) {
            $('#maleOrFemale').css("border", "3px solid red");
            $('#btnSaveCustomer').attr("disabled", true);
        }
        if (e.which == 13) {
            $('#maleOrFemale').focus();
            down("#maleOrFemale");
        }
    }
});

function down(what) {
    pos = $(what).offset();  // remember position
    $(what).css("position", "absolute");
    $(what).offset(pos);   // reset position
    $(what).attr("size", "3"); // open dropdown
}

function up(what) {
    $(what).css("position", "static");
    $(what).attr("size", "1");  // close dropdown
}

$('#maleOrFemale').keypress(function (e) {
    if (e.which == 13) {
        $('#maleOrFemale').css("border", "3px solid green");
        $('#CustomerNumberInput').focus();
        up(this);
        $('#CustomerNumberInput').css("border", "3px solid red");
        $('#warnMsgForConNumber').css('display', 'block');
    }
});

$('#CustomerNumberInput').on('keyup', function (event) {

    let currentObject = $('#CustomerNumberInput');
    let currentPattern = conNumber;
    let warnMsgObject = $('#warnMsgForConNumber');
    let btnObject = $('#btnSaveCustomer');

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
                    saveCustomer();
                    $('#newCustomerModel').modal('hide');
                    clearFields();
                } else if (result.isDenied) {
                    clearFields();
                    $('#newCustomerModel').modal('hide');
                    Swal.fire('Changes are not saved', '', 'info')
                }
            });
        }
    }
});

$('#customerIdInput, #customerNameInput, #customerAddressInput, #maleOrFemale, #CustomerNumberInput, #newCustomerId, #newName, #newAddress, #newGender, #newPhoneNumber').on('keydown', function (event) {
    if (event.key == "Tab") {
        event.preventDefault();
    }
});

$("#updateCustomerModel").on('shown.bs.modal', function () {
    $(this).find('#newName').focus();
    $(this).find('#btnUpdateCustomer').attr("disabled", true);
    $(this).find('#newGender').val('');

    $('#newCustomerId').val($('#customerID').val());
    $('#newName').val($('#customerName').val());
    $('#newAddress').val($('#customerAddress').val());
    $('#newGender').val($('#gender').val());
    $('#newPhoneNumber').val($('#contactNumber').val());

    $('#newCustomerId').css("border", "3px solid green");
    $('#newName').css("border", "3px solid green");
    $('#newAddress').css("border", "3px solid green");
    $('#newGender').css("border", "3px solid green");
    $('#newPhoneNumber').css("border", "3px solid green");
});

$('#btnClearInCustomer').click(function () {
    clearCustomerDetailsFields();
});

$('#btnCloseInNewCustomer').click(function () {
    clearFields();
});

function bindRowDblClickEvent() {
    $('#tblCustomer>tr').on('dblclick', function () {

        let id = $(this).children().eq('0').text();

        deleteCustomer(id);
    });
}

// Update model input fields

$('#newName').on('keyup', function (event) {
    let currentObject = $('#newName');
    let currentPattern = cusName;
    let warnMsgObject = $('#warnMsgForNameInUpdate');
    let btnObject = $('#btnUpdateCustomer');

    let result = validate(currentObject, currentPattern, warnMsgObject, btnObject, null, null, null);

    if (event.which === 13) {
        if (result === true) {
            $('#newAddress').focus();
        }
    }
});

$('#newAddress').on('keyup', function (event) {
    let currentObject = $('#newAddress');
    let currentPattern = cusAddress;
    let warnMsgObject = $('#warnMsgForAddressInUpdate');
    let btnObject = $('#btnUpdateCustomer');

    let result = validate(currentObject, currentPattern, warnMsgObject, btnObject, null, null, null);

    if (event.which === 13) {
        if (result === true) {
            $('#newGender').focus();
            down("#newGender");
        }
    }
});

$('#newGender').on('keyup', function (event) {
    if (event.which == 13) {
        $('#newPhoneNumber').focus();
        up(this);
    }
});

$('#newPhoneNumber').on('keyup', function (event) {
    let currentObject = $('#newPhoneNumber');
    let currentPattern = conNumber;
    let warnMsgObject = $('#warnMsgForConNumberInUpdate');
    let btnObject = $('#btnUpdateCustomer');

    let result = validate(currentObject, currentPattern, warnMsgObject, btnObject, null, null, null);

    if (event.which === 13) {
        if (result === true) {
            Swal.fire({
                title: 'Do you want to Update the Customer?',
                showDenyButton: true,
                confirmButtonText: 'Update',
                denyButtonText: `Don't Update`,
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire('Updated!', '', 'success');
                    updateCustomer();
                    clearUpdateModelFieldsInCustomer();
                    clearCustomerDetailsFields();
                    $('#updateCustomerModel').modal('hide');
                } else if (result.isDenied) {
                    clearUpdateModelFieldsInCustomer();
                    clearCustomerDetailsFields();
                    $('#updateCustomerModel').modal('hide');
                    Swal.fire('Changes are not saved', '', 'info')
                }
            });
        }
    }
});

function updateCustomer() {
    let ID = $('#newCustomerId').val();
    let Name = $('#newName').val();
    let address = $('#newAddress').val();
    let gender = $('#newGender').val();
    let contactNo = $('#newPhoneNumber').val();

    for (let customer of customerArray) {
        if (customer.id === ID) {
            let index = customerArray.indexOf(customer);
            customerArray[index].name = Name;
            customerArray[index].address = address;
            customerArray[index].gender = gender;
            customerArray[index].contactNo = contactNo;
        }
    }

    let rowCountOfCusTable = $('#tblCustomer>tr').length;
    for (let i = 0; i < rowCountOfCusTable; i++) {
        let cusIdInTable = $('#tblCustomer>tr').eq(i).children().eq('0').text();
        if (cusIdInTable === ID) {
            $('#tblCustomer>tr').eq(i).children().eq('0').text(ID);
            $('#tblCustomer>tr').eq(i).children().eq('1').text(Name);
            $('#tblCustomer>tr').eq(i).children().eq('2').text(address);
            $('#tblCustomer>tr').eq(i).children().eq('3').text(gender);
            $('#tblCustomer>tr').eq(i).children().eq('4').text(contactNo);
        }
    }

}

function clearUpdateModelFieldsInCustomer() {
    $('#newCustomerId').val('');
    $('#newName').val('');
    $('#newAddress').val('');
    $('#newGender').val('');
    $('#newPhoneNumber').val('');
    $('#newCustomerId').css("border", "1px solid gray");
    $('#newName').css("border", "1px solid gray");
    $('#newAddress').css("border", "1px solid gray");
    $('#newGender').css("border", "1px solid gray");
    $('#newPhoneNumber').css("border", "1px solid gray");
}

$('#btnUpdateCustomer').click(function () {

    Swal.fire({
        title: 'Do you want to Update the Customer?',
        showDenyButton: true,
        confirmButtonText: 'Update',
        denyButtonText: `Don't Update`,
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire('Updated!', '', 'success');
            updateCustomer();
            clearUpdateModelFieldsInCustomer();
            clearCustomerDetailsFields();
            $('#updateCustomerModel').modal('hide');
        } else if (result.isDenied) {
            clearUpdateModelFieldsInCustomer();
            clearCustomerDetailsFields();
            $('#updateCustomerModel').modal('hide');
            Swal.fire('Changes are not saved', '', 'info')
        }
    });
});

$('#btnCloseInUpdateCustomer').click(function () {
    clearUpdateModelFieldsInCustomer();
});

function deleteCustomer(id) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            for (var customer of customerArray) {
                if (customer.id === id) {
                    let index = customerArray.indexOf(customer);
                    customerArray.splice(index, 1);
                }
            }
            // $(this).remove();
            addDataToTable();
            bindRowClickEvent();
            bindRowDblClickEvent();
            clearCustomerDetailsFields();
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
        }
    });
}

$('#btnDeleteCus').click(function () {
    let id = $('#customerID').val();
    deleteCustomer(id);
});