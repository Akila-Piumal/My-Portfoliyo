$(document).ready(function () {
    // auto generate Order ID
    autoGenerateOrderID();

    // set Current Date
    $('#dateInput').val(getCurrentDate());

    $('#btnAddCart').attr('disabled', true);

    $('#btnPurchase').attr('disabled', true);
});

// Auto generate Order ID
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

// set Current Date
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

// set all Customer IDs to the combo box
function setCustomerIDsToComboBox() {
    $('#cmbCusID').empty();

    for (let customer of customerArray) {
        $('#cmbCusID').append(` <option >${customer.id}</option>`)
    }

    if ($('#cusIDInInvoice').val() == '') {
        $('#cmbCusID').val('');
    }
}

// add change event to the customer ID combo box
$('#cmbCusID').change(function () {
    let customer = searchCustomerWithID($('#cmbCusID').val());
    setValuesToInvoiceDetails(customer.id, customer.name, customer.contactNo, customer.address);
    $('#selectItem').focus();
});

// set customer Details to the text fields
function setValuesToInvoiceDetails(id, name, contactNo, address) {
    $('#cusIDInInvoice').val(id);
    $('#cusNameInInvoice').val(name);
    $('#contactNoInInvoice').val(contactNo);
    $('#cusAddressInInvoice').val(address);
}

// When enter key press on Customer ID input field
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

// clear the fields in the invoice details
function clearInvoiceDetailsFields() {
    $('#cmbCusID').val('');
    $('#cusIDInInvoice').val('');
    $('#cusNameInInvoice').val('');
    $('#contactNoInInvoice').val('');
    $('#cusAddressInInvoice').val('');
}

// New Customer Model Content starts

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

$('#btnCloseCustomerInInvoice').click(function () {
    clearFieldsInNewCusModelInInvoice();
});

// New Customer Model Content Ends

// set all Item Codes to the combo box
function setItemCodesToComboBox() {
    $('#selectItem').empty();

    for (let item of Items) {
        $('#selectItem').append(` <option >${item.code}</option>`)
    }

    if ($('#itemCodeInCart').val() == '') {
        $('#selectItem').val('');
    }
}

// add change event to the Item Code combo box
$('#selectItem').change(function () {
    let item = searchItemWithCode($('#selectItem').val());

    changeTheFields(item);
});

// set Item Details to the text fields
function setValuesToSelectItem(code, name, price, qtyOnHand) {
    $('#itemCodeInCart').val(code);
    $('#ItemNameInCart').val(name);
    $('#ItemPriceInCart').val(price);
    $('#qtyOnHandInCart').val(qtyOnHand);
}

// When enter key press on Item Code input field
$('#itemCodeInCart').on('keypress', function (event) {
    if (event.key == "Enter") {
        let item = searchItemWithCode($('#itemCodeInCart').val());

        if (item == null) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Item Not Exist!'
            })
            setValuesToSelectItem('', '', '', '');
            $('#OrderQtyInCart').val('');
            $('#selectItem').val('');
            $('#selectItem').focus();
        } else {
            changeTheFields(item);

            $('#selectItem').val($('#itemCodeInCart').val());

            $('#OrderQtyInCart').focus();
        }
    }
});

// set values to the fields when combo box value changed and enter key press on item code input
function changeTheFields(item) {
    let length = $('#tblCart>tr').length;
    if (length == 0) {
        setValuesToSelectItem(item.code, item.name, item.price, item.quantity);
        $('#OrderQtyInCart').focus();
    } else {
        for (let i = 0; i < length; i++) {
            let itemCodeInTable = $('#tblCart>tr').eq(i).children().eq('0').text();
            if (itemCodeInTable === item.code) {
                let tableQuantity = $('#tblCart>tr').eq(i).children().eq('3').text();
                let newQtyOnHAnd = parseInt(item.quantity) - parseInt(tableQuantity);
                setValuesToSelectItem(item.code, item.name, item.price, newQtyOnHAnd);
                return;
            }
        }
        setValuesToSelectItem(item.code, item.name, item.price, item.quantity);
        $('#OrderQtyInCart').focus();
    }
}

// clear the fields in the item details
function clearSelectItemFields() {
    $('#selectItem').val('');
    $('#itemCodeInCart').val('');
    $('#ItemNameInCart').val('');
    $('#ItemPriceInCart').val('');
    $('#qtyOnHandInCart').val('');
}

// New Item Model Content starts

$("#newItemModelInCart").on('shown.bs.modal', function () {
    $(this).find('#btnSaveItemInCart').attr("disabled", true);
    $(this).find('#newItemNameInInvoice').focus();
    $('#newItemCodeInInvoice').css("border", "3px solid green");

    if ($.isEmptyObject(Items)) {
        $('#newItemCodeInInvoice').val('P001');
    } else {
        let lastId;
        for (let i = 0; i < Items.length; i++) {
            lastId = Items[i].code;
        }
        let newID = idGenerator(lastId);
        $('#newItemCodeInInvoice').val(newID);
    }
});

$('#newItemNameInInvoice').on('keyup', function (event) {

    let currentObject = $('#newItemNameInInvoice');
    let currentPattern = itemNamePattern;
    let warnMsgObject = $('#warnMsgForItemNameInInvoice');
    let btnObject = $('#btnSaveItemInCart');
    let nextFocusPattern = itemPricePattern;
    let nextFocusObject = $('#newItemPriceInInvoice');
    let nextWarnMsgObj = $('#warnMsgForPriceInInvoice');

    let result = validate(currentObject, currentPattern, warnMsgObject, btnObject, nextFocusPattern, nextFocusObject, nextWarnMsgObj);

    if (event.which === 13) {
        if (result === true) {
            $('#newItemPriceInInvoice').focus();
        }
    }
});

$('#newItemPriceInInvoice').on('keyup', function (event) {

    let currentObject = $('#newItemPriceInInvoice');
    let currentPattern = itemPricePattern;
    let warnMsgObject = $('#warnMsgForPriceInInvoice');
    let btnObject = $('#btnSaveItemInCart');
    let nextFocusPattern = itemQuantityPattern;
    let nextFocusObject = $('#newItemQuantityInInvoice');
    let nextWarnMsgObj = $('#warnMsgForQuantityInInvoice');

    let result = validate(currentObject, currentPattern, warnMsgObject, btnObject, nextFocusPattern, nextFocusObject, nextWarnMsgObj);

    if (event.which === 13) {
        if (result === true) {
            $('#newItemQuantityInInvoice').focus();
        }
    }
});

$('#newItemQuantityInInvoice').on('keyup', function (event) {

    let currentObject = $('#newItemQuantityInInvoice');
    let currentPattern = itemQuantityPattern;
    let warnMsgObject = $('#warnMsgForQuantityInInvoice');
    let btnObject = $('#btnSaveItemInCart');

    let result = validate(currentObject, currentPattern, warnMsgObject, btnObject, null, null, null);

    if (event.which === 13) {
        if (result === true) {
            Swal.fire({
                title: 'Do you want to save the Item?',
                showDenyButton: true,
                confirmButtonText: 'Save',
                denyButtonText: `Don't save`,
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire('Saved!', '', 'success');
                    saveItemInPlaceOrder();
                    $('#newItemModelInCart').modal('hide');
                    clearFieldsInNewItemModelInInvoice();
                } else if (result.isDenied) {
                    clearFieldsInNewItemModelInInvoice();
                    $('#newItemModelInCart').modal('hide');
                    Swal.fire('Changes are not saved', '', 'info')
                }
            });
        }
    }
});

function saveItemInPlaceOrder() {
    let code = $('#newItemCodeInInvoice').val();
    let name = $('#newItemNameInInvoice').val();
    let price = $('#newItemPriceInInvoice').val();
    let quantity = $('#newItemQuantityInInvoice').val();

    var item = {
        code: code,
        name: name,
        price: price,
        quantity: quantity
    }

    Items.push(item);

    addDataToTableInItem();

    bindRowClickEventInItem();

    bindRowDblClickEventInItem();

    setItemCodesToComboBox();

    $('#selectItem').val(code);

    setValuesToSelectItem(code, name, price, quantity);

}

function clearFieldsInNewItemModelInInvoice() {
    $('#newItemCodeInInvoice').val('');
    $('#newItemNameInInvoice').val('');
    $('#newItemPriceInInvoice').val('');
    $('#newItemQuantityInInvoice').val('');
    $('#newItemCodeInInvoice').css("border", "1px solid gray");
    $('#newItemNameInInvoice').css("border", "1px solid gray");
    $('#newItemPriceInInvoice').css("border", "1px solid gray");
    $('#newItemQuantityInInvoice').css("border", "1px solid gray");
}

$('#btnSaveItemInCart').click(function () {
    Swal.fire({
        title: 'Do you want to save the Item?',
        showDenyButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire('Saved!', '', 'success');
            saveItemInPlaceOrder();
            $('#newItemModelInCart').modal('hide');
            clearFieldsInNewItemModelInInvoice();
        } else if (result.isDenied) {
            clearFieldsInNewItemModelInInvoice();
            $('#newItemModelInCart').modal('hide');
            Swal.fire('Changes are not saved', '', 'info')
        }
    });
});

$('#btnCloseNewItemModelInCart').click(function () {
    clearFieldsInNewItemModelInInvoice();
});

// New Item Model Content Ends

// When enter key press on Order quantity input field
$('#OrderQtyInCart').on('keyup', function (event) {

    let currentObject = $('#OrderQtyInCart');
    let currentPattern = itemQuantityPattern;
    let warnMsgObject = $('#warnMsgForOrderQty');
    let btnObject = $('#btnAddCart');

    let result = validate(currentObject, currentPattern, warnMsgObject, btnObject, null, null, null);

    let qtyOnHand = parseInt($('#qtyOnHandInCart').val());
    let orderQuantity = parseInt(currentObject.val());

    if ($('#cmbCusID').val() != null && $('#selectItem').val() != null && $('#OrderQtyInCart').val() != '' && orderQuantity <= qtyOnHand && orderQuantity > 0) {
        $('#btnAddCart').removeAttr("disabled");
        $('#OrderQtyInCart').css('border', '3px solid green');
        warnMsgObject.css('display', 'none');
    } else {
        $('#btnAddCart').attr("disabled", true);
        $('#OrderQtyInCart').css('border', '3px solid red');
        warnMsgObject.css('display', 'block');
        $('#maxQuantity').text(qtyOnHand);
    }

    if (event.which === 13) {
        if ($('#btnAddCart').text() == "Add to Cart") {
            if (result === true) {
                addToCart();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Added to the cart',
                    showConfirmButton: false,
                    timer: 1500
                })
                $('#OrderQtyInCart').val('');
                $('#btnAddCart').attr('disabled', true);
            }
        } else {
            updateQuantity();
        }
    }

});

// Update the quantity of buying
function updateQuantity() {
    let length = $('#tblCart>tr').length;
    for (let i = 0; i < length; i++) {
        let itemCodeInTable = $('#tblCart>tr').eq(i).children().eq('0').text();
        let itemCode = $('#itemCodeInCart').val();
        let price = $('#ItemPriceInCart').val();
        if (itemCode == itemCodeInTable) {
            let updateQuantity = $('#OrderQtyInCart').val();
            let total = parseInt(updateQuantity) * parseFloat(price);
            $('#tblCart>tr').eq(i).children().eq('3').text(updateQuantity);
            $('#tblCart>tr').eq(i).children().eq('4').text(total.toFixed(2));
            let item = searchItemWithCode(itemCode);
            let newQtyOnHand = parseInt(item.quantity) - parseInt(updateQuantity);
            $('#qtyOnHandInCart').val(newQtyOnHand);
            calculateTheTotal();
            clearTableColors();
            $('#btnNewItemInPlaceOrder').text('+New Item');
            $('#btnAddCart').text('Add to Cart');
            $('#OrderQtyInCart').val('');
            $('#OrderQtyInCart').css("border", "1px solid gray");
            setValuesToSelectItem('', '', '', '');
            $('#selectItem').val('');
            $('#selectItem').focus();
        }
    }
}

// clear table row colors to default
function clearTableColors() {
    let length = $('#tblCart>tr').length;
    for (let i = 0; i < length; i++) {
        $('#tblCart>tr').eq(i).css('background-color', 'white');
    }
}

// add items to the cart
function addToCart() {
    let code = $('#itemCodeInCart').val();
    let name = $('#ItemNameInCart').val();
    let price = $('#ItemPriceInCart').val();
    let qtyOnHand = $('#qtyOnHandInCart').val();
    let quantity = $('#OrderQtyInCart').val();
    let Total = (parseFloat(price) * parseInt(quantity)).toFixed(2);
    let newQtyOnHand = parseInt(qtyOnHand) - parseInt(quantity);

    var row = `<tr><th scope='row'>${code}</th><td>${name}</td><td>${price}</td><td>${quantity}</td><td>${Total}</td></tr>`;

    let length = $('#tblCart>tr').length;
    if (length == 0) {
        $('#tblCart').append(row);
        $('#qtyOnHandInCart').val(newQtyOnHand);
        $("#tblCart>tr").css('cursor', 'pointer');
        bindRowClickEventInCart();
        calculateTheTotal();
    } else {
        for (let i = 0; i < length; i++) {
            let itemCodeInTable = $('#tblCart>tr').eq(i).children().eq('0').text();
            if (itemCodeInTable === code) {
                let currentQuantity = $('#tblCart>tr').eq(i).children().eq('3').text();
                let newQuantity = parseInt(quantity) + parseInt(currentQuantity)
                let newTotal = (parseFloat(price) * newQuantity).toFixed(2);
                $('#tblCart>tr').eq(i).children().eq('3').text(newQuantity);
                $('#tblCart>tr').eq(i).children().eq('4').text(newTotal);
                $('#qtyOnHandInCart').val(newQtyOnHand);
                calculateTheTotal();
                // cash gaana dala passe item ekk add karama
                if ($('#cashInHand').val() != '') {
                    checkTheCashSufficient();
                }
                return;
            }
        }
        $('#tblCart').append(row);
        $('#qtyOnHandInCart').val(newQtyOnHand);
        $("#tblCart>tr").css('cursor', 'pointer');
        bindRowClickEventInCart();
        calculateTheTotal();
        if ($('#cashInHand').val() != '') {
            checkTheCashSufficient();
        }
    }

    $('#OrderQtyInCart').css("border", "1px solid gray");
    $('#OrderQtyInCart').focus();
}

// click event to add to cart button
$('#btnAddCart').click(function () {
    if ($('#btnAddCart').text() == 'Add to Cart') {
        addToCart();
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Added to the cart',
            showConfirmButton: false,
            timer: 1500
        })
        $('#OrderQtyInCart').val('');
        $('#btnAddCart').attr('disabled', true);
    } else {
        clearTableColors();
        $('#btnNewItemInPlaceOrder').text('+New Item');
        $('#btnAddCart').text('Add to Cart');
        $('#OrderQtyInCart').val('');
        setValuesToSelectItem('', '', '', '');
        $('#selectItem').val('');
        $('#OrderQtyInCart').css("border", "1px solid gray");
        $('#selectItem').focus();
    }
});

// calculate the Total
function calculateTheTotal() {
    let length = $('#tblCart>tr').length;
    let total = 0;
    for (let i = 0; i < length; i++) {
        let OneItemTotalText = $('#tblCart>tr').eq(i).children().eq('4').text();
        let OneItemTotal = parseFloat(OneItemTotalText);
        total = total + OneItemTotal;
    }
    let discountPresentage = parseInt($('#discount').val())
    let discount = (total / 100) * discountPresentage;
    let subTotal = total - discount;

    $('#totalPrice').val(total.toFixed(2));
    $('#totalPrice').css('border', '3px solid green');
    $('#subTotal').val(subTotal.toFixed(2));
    $('#subTotal').css('border', '3px solid green');
    $('#discount').css('border', '3px solid green');
}

// row click event
function bindRowClickEventInCart() {
    $('#tblCart>tr').click(function () {
        $('#btnNewItemInPlaceOrder').text("Update");
        $('#btnAddCart').text("Cancel Update");
        let length = $('#tblCart>tr').length;
        for (let i = 0; i < length; i++) {
            $('#tblCart>tr').eq(i).css('background-color', 'white');
        }
        $(this).css('background-color', '#b2bec3');

        let itemCode = $(this).children().eq('0').text();
        let item = searchItemWithCode(itemCode);

        $('#selectItem').val(itemCode);
        setValuesToSelectItem(itemCode, item.name, item.price, item.quantity);
        $('#OrderQtyInCart').val($(this).children().eq('3').text());
        $('#OrderQtyInCart').focus();
    });
}

// click event to New Item button
$('#btnNewItemInPlaceOrder').click(function () {
    if ($('#btnNewItemInPlaceOrder').text() == 'Update') {
        $('#newItemModelInCart').modal('hide');
        updateQuantity();
    } else {
        $('#newItemModelInCart').modal('toggle');
    }
});

// Cancel the focus of TAB key
$('#newCustomerIdInInvoice, #newCustomerNameInInvoice, #newCustomerAddressInInvoice, #newCustomerGenderInInvoice, #newCustomerNumberInInvoice, #newItemCodeInInvoice, #newItemNameInInvoice, #newItemPriceInInvoice, #newItemQuantityInInvoice').on('keydown', function (event) {
    if (event.key === "Tab") {
        event.preventDefault();
    }
});

var discountPattern = /^[0-9]{1,3}$/;

$('#discount').on('keyup', function (event) {

    let currentObject = $('#discount');
    let currentPattern = discountPattern;
    let warnMsgObject = $('#warnMsgForDiscount');
    let btnObject = $('#btnPurchase');
    let nextFocusPattern = itemPricePattern;
    let nextFocusObject = $('#cashInHand');
    let nextWarnMsgObj = $('#warnMsgForCashInHand');

    let result = validate(currentObject, currentPattern, warnMsgObject, btnObject, nextFocusPattern, nextFocusObject, nextWarnMsgObj);

    let result2 = checkTheDiscount();

    calculateSubTotal();

    checkTheCashSufficient();

    if ($('#cashInHand').val() == '') {
        $('#btnPurchase').attr('disabled', true);
    } else {
        $('#btnPurchase').removeAttr('disabled');
    }

    if (event.which === 13) {
        if (result === true && result2 === true) {
            nextFocusObject.focus();
        }
    }
});

// calculate the subTotal
function calculateSubTotal() {
    let total = parseInt($('#totalPrice').val());
    if ($('#discount').val() != '') {
        let discountPresentage = parseInt($('#discount').val())
        let discount = (total / 100) * discountPresentage;
        let subTotal = total - discount;

        $('#subTotal').val(subTotal.toFixed(2));
        $('#subTotal').css('border', '3px solid green');
        $('#discount').css('border', '3px solid green');
    }
}

// check the discount presentage is less than 100
function checkTheDiscount() {
    let disPresentage = parseInt($('#discount').val());
    if (disPresentage <= 100) {
        $('#btnPurchase').removeAttr("disabled");
        $('#discount').css('border', '3px solid green');
        $('#warnMsgForDiscount').css('display', 'none');
        return true;
    } else {
        $('#btnPurchase').attr("disabled", true);
        $('#discount').css('border', '3px solid red');
        $('#warnMsgForDiscount').css('display', 'block');
        return false;
    }
}

$('#cashInHand').on('keyup', function (event) {

    let currentObject = $('#cashInHand');
    let currentPattern = itemPricePattern;
    let warnMsgObject = $('#warnMsgForCashInHand');
    let btnObject = $('#btnPurchase');

    let result = validate(currentObject, currentPattern, warnMsgObject, btnObject, null, null, null);

    let result2;
    if (result == true) {
        result2 = checkTheCashSufficient();
    }

    if (event.which === 13) {
        if (result === true && result2 === true) {
            alert('purchase');
        }
    }
});

// check that the cash is sufficient to purchase
function checkTheCashSufficient() {
    let cashInHand = parseFloat($('#cashInHand').val());
    let subTotal = parseFloat($('#subTotal').val());

    if ($('#cashInHand').val() == '' || cashInHand < subTotal) {
        $('#btnPurchase').attr("disabled", true);
        $('#cashInHand').css('border', '3px solid red');
        $('#warnMsgForCashInHand').css('display', 'block');
        return false;
    } else {
        $('#btnPurchase').removeAttr("disabled");
        $('#cashInHand').css('border', '3px solid green');
        $('#warnMsgForCashInHand').css('display', 'none');
        return true;
    }
}