var Items = [];

$('#btnSaveItem').click(function () {
    Swal.fire({
        title: 'Do you want to save the Item?',
        showDenyButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
    }).then((result) => {
        if (result.isConfirmed) {
            saveItem();
            Swal.fire('Saved!', '', 'success');
            $('#newItemModel').modal('hide');
            clearFieldsInItem();
        } else if (result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info')
        }
    });
});

function clearFieldsInItem() {
    $('#newItemCode').val('');
    $('#newItemName').val('');
    $('#OneItemPrice').val('');
    $('#NewItemQuantity').val('');
    $('#newItemCode').css("border", "1px solid gray");
    $('#newItemName').css("border", "1px solid gray");
    $('#OneItemPrice').css("border", "1px solid gray");
    $('#NewItemQuantity').css("border", "1px solid gray");
}

function saveItem() {
    var item = {
        code: $('#newItemCode').val(),
        name: $('#newItemName').val(),
        price: $('#OneItemPrice').val(),
        quantity: $('#NewItemQuantity').val()
    }

    Items.push(item);

    addDataToTableInItem();

    bindRowClickEventInItem();

    bindRowDblClickEventInItem();
}

function addDataToTableInItem() {
    $('#tblItem').empty();

    for (var item of Items) {
        var row = `<tr><th scope="row">${item.code}</th><td>${item.name}</td><td>${item.price}</td><td>${item.quantity}</td></tr>`

        $('#tblItem').append(row);
        $("#tblItem>tr").css('cursor', 'pointer');
    }
}

function setValues(code, name, price, quantity) {
    $('#itemCode').val(code);
    $('#itemName').val(name);
    $('#itemPrice').val(price);
    $('#itemQuantity').val(quantity);
    $('#btnUpdate').removeAttr("disabled");
    $('#btnDelete').removeAttr("disabled");
}

function bindRowClickEventInItem() {
    $('#tblItem>tr').click(function () {
        let code = $(this).children().eq('0').text();
        let name = $(this).children().eq('1').text();
        let price = $(this).children().eq('2').text();
        let quantity = $(this).children().eq('3').text();

        setValues(code, name, price, quantity);
    });
}

function searchItemWithCode(code) {
    for (let i = 0; i < Items.length; i++) {
        if (code === (Items[i].code)) {
            let item = {
                code: Items[i].code,
                name: Items[i].name,
                price: Items[i].price,
                quantity: Items[i].quantity
            }
            return item;
        }
    }
    return null;
}

function searchItemWithName(name) {
    for (let i = 0; i < Items.length; i++) {
        if (name === (Items[i].name)) {
            let item = {
                code: Items[i].code,
                name: Items[i].name,
                price: Items[i].price,
                quantity: Items[i].quantity
            }
            return item;
        }
    }
    return null;
}

function searchItem() {
    let searchBarText = $('#searchBar').val();

    if ($('#cmbSelect').find('option:selected').val() === "code") {
        if ($.isEmptyObject(Items)) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Empty Set',
            })
        } else {
            if (searchItemWithCode(searchBarText) !== null) {
                let item = searchItemWithCode(searchBarText);
                setValues(item.code, item.name, item.price, item.quantity)
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Item not exist'
                })
                clearItemDetailsFields();
            }
        }
    } else if ($('#cmbSelect').find('option:selected').val() === "name") {

        if ($.isEmptyObject(Items)) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Empty Set',
            })
        } else {
            if (searchItemWithName(searchBarText) !== null) {
                let item = searchItemWithName(searchBarText);
                setValues(item.code, item.name, item.price, item.quantity)
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Item not exist'
                })
                clearItemDetailsFields();
            }
        }
    }
}

function clearItemDetailsFields() {
    $('#itemCode').val('');
    $('#itemName').val('');
    $('#itemPrice').val('');
    $('#itemQuantity').val('');
    $('#searchBar').val('');
    $('#btnUpdate').attr('disabled', true);
    $('#btnDelete').attr('disabled', true);
}

$(window).ready(function () {
    $('#btnUpdate').attr('disabled', true);
    $('#btnDelete').attr('disabled', true);
});

// key event to ENTER key
$('#itemCode').keypress(function (e) {
    if (e.which == 13) {
        if ($.isEmptyObject(Items)) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Empty Set',
            })
        } else {
            if (searchItemWithCode($('#itemCode').val()) !== null) {
                let item = searchItemWithCode($('#itemCode').val());
                setValues(item.code, item.name, item.price, item.quantity)
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Item not exist'
                })
                clearItemDetailsFields();
            }
        }
    }
});

$('#searchBar').keypress(function (e) {
    if (e.which == 13) {
        searchItem();
    }
});

$('#btnSearchForItem').click(function () {
    searchItem();
});

$("#newItemModel").on('shown.bs.modal', function () {
    $(this).find('#btnSaveItem').attr("disabled", true);
    $(this).find('#newItemCode').focus();
});

var itemCodePattern = /^(P)[0-9]{3}$/;
var itemNamePattern = /^[A-z0-9 ]{4,25}$/;
var itemPricePattern = /^[1-9][0-9]*(.[0-9]{2})?$/;
var itemQuantityPattern = /^[1-9][0-9]*$/;

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

$('#newItemCode').on('keyup', function (event) {

    let currentObject = $('#newItemCode');
    let currentPattern = itemCodePattern;
    let warnMsgObject = $('#warnMsgForCode');
    let btnObject = $('#btnSaveItem');
    let nextFocusPattern = itemNamePattern;
    let nextFocusObject = $('#newItemName');
    let nextWarnMsgObj = $('#warnMsgForItemName');

    let result = validate(currentObject, currentPattern, warnMsgObject, btnObject, nextFocusPattern, nextFocusObject, nextWarnMsgObj);

    if (event.which === 13) {
        if (result === true) {
            $('#newItemName').focus();
        }
    }
});

$('#newItemName').on('keyup', function (event) {

    let currentObject = $('#newItemName');
    let currentPattern = itemNamePattern;
    let warnMsgObject = $('#warnMsgForItemName');
    let btnObject = $('#btnSaveItem');
    let nextFocusPattern = itemPricePattern;
    let nextFocusObject = $('#OneItemPrice');
    let nextWarnMsgObj = $('#warnMsgForPrice');

    let result = validate(currentObject, currentPattern, warnMsgObject, btnObject, nextFocusPattern, nextFocusObject, nextWarnMsgObj);

    if (event.which === 13) {
        if (result === true) {
            $('#OneItemPrice').focus();
        }
    }
});

$('#OneItemPrice').on('keyup', function (event) {

    let currentObject = $('#OneItemPrice');
    let currentPattern = itemPricePattern;
    let warnMsgObject = $('#warnMsgForPrice');
    let btnObject = $('#btnSaveItem');
    let nextFocusPattern = itemQuantityPattern;
    let nextFocusObject = $('#NewItemQuantity');
    let nextWarnMsgObj = $('#warnMsgForQuantity');

    let result = validate(currentObject, currentPattern, warnMsgObject, btnObject, nextFocusPattern, nextFocusObject, nextWarnMsgObj);

    if (event.which === 13) {
        if (result === true) {
            $('#NewItemQuantity').focus();
        }
    }
});

$('#NewItemQuantity').on('keyup', function (event) {

    let currentObject = $('#NewItemQuantity');
    let currentPattern = itemQuantityPattern;
    let warnMsgObject = $('#warnMsgForQuantity');
    let btnObject = $('#btnSaveItem');
    let nextFocusPattern = null;
    let nextFocusObject = null;
    let nextWarnMsgObj = null;

    let result = validate(currentObject, currentPattern, warnMsgObject, btnObject, nextFocusPattern, nextFocusObject, nextWarnMsgObj);

    if (event.which === 13) {
        if (result === true) {
            Swal.fire({
                title: 'Do you want to save the Item?',
                showDenyButton: true,
                confirmButtonText: 'Save',
                denyButtonText: `Don't save`,
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    Swal.fire('Saved!', '', 'success');
                    saveItem();
                    $('#newItemModel').modal('hide');
                    clearFieldsInItem();
                } else if (result.isDenied) {
                    clearFieldsInItem();
                    $('#newItemModel').modal('hide');
                    Swal.fire('Changes are not saved', '', 'info')
                }
            });
        }
    }
});

$('#newItemCode, #newItemName, #OneItemPrice, #NewItemQuantity, #itemCodeNew, #itemNameNew, #itemPriceNew, #itemQuantityNew').on('keydown', function (event) {
    if (event.key === "Tab") {
        event.preventDefault();
    }
});

$('#btnClear').click(function () {
    clearItemDetailsFields();
});

$('#btnClose').click(function () {
    clearFieldsInItem();
});

function bindRowDblClickEventInItem() {
    $('#tblItem>tr').on('dblclick', function () {

        let code = $(this).children().eq('0').text();

        deleteItem(code);

    });
}

$("#updateItemModel").on('shown.bs.modal', function () {
    $('#itemCodeNew').val($('#itemCode').val());
    $('#itemNameNew').val($('#itemName').val());
    $('#itemPriceNew').val($('#itemPrice').val());
    $('#itemQuantityNew').val($('#itemQuantity').val());
    $('#itemNameNew').focus();
    $('#btnUpdateItem').attr("disabled", true);

    $('#itemCodeNew').css("border", "3px solid green");
    $('#itemNameNew').css("border", "3px solid green");
    $('#itemPriceNew').css("border", "3px solid green");
    $('#itemQuantityNew').css("border", "3px solid green");
});

$('#itemNameNew').on('keyup', function (event) {

    let currentObject = $('#itemNameNew');
    let currentPattern = itemNamePattern;
    let warnMsgObject = $('#warnMsgForItemNameNew');
    let btnObject = $('#btnUpdateItem');

    let result = validate(currentObject, currentPattern, warnMsgObject, btnObject, null, null, null);

    if (event.which === 13) {
        if (result === true) {
            $('#itemPriceNew').focus();
        }
    }

});

$('#itemPriceNew').on('keyup', function (event) {

    let currentObject = $('#itemPriceNew');
    let currentPattern = itemPricePattern;
    let warnMsgObject = $('#warnMsgForPriceNew');
    let btnObject = $('#btnUpdateItem');

    let result = validate(currentObject, currentPattern, warnMsgObject, btnObject, null, null, null);

    if (event.which === 13) {
        if (result === true) {
            $('#itemQuantityNew').focus();
        }
    }
});

$('#itemQuantityNew').on('keyup', function (event) {

    let currentObject = $('#itemQuantityNew');
    let currentPattern = itemQuantityPattern;
    let warnMsgObject = $('#warnMsgForQuantityNew');
    let btnObject = $('#btnUpdateItem');

    let result = validate(currentObject, currentPattern, warnMsgObject, btnObject, null, null, null);

    if (event.which === 13) {
        if (result === true) {
            Swal.fire({
                title: 'Do you want to Update the Item?',
                showDenyButton: true,
                confirmButtonText: 'Update',
                denyButtonText: `Don't update`,
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire('Updated!', '', 'success');
                    updateItem();
                    clearUpdateModelFields();
                    clearItemDetailsFields();
                    $('#updateItemModel').modal('hide');
                } else if (result.isDenied) {
                    clearUpdateModelFields();
                    clearItemDetailsFields();
                    $('#updateItemModel').modal('hide');
                    Swal.fire('Changes are not saved', '', 'info')
                }
            });
        }
    }
});

function updateItem() {
    let code = $('#itemCodeNew').val();
    let name = $('#itemNameNew').val();
    let price = $('#itemPriceNew').val();
    let quantity = $('#itemQuantityNew').val();

    for (var item of Items) {
        if (item.code === code) {
            let index = Items.indexOf(item);
            Items[index].name = name;
            Items[index].price = price
            Items[index].quantity = quantity;
        }
    }

    let length = $('#tblItem>tr').length;
    for (let i = 0; i < length; i++) {
        let itemCodeInTable = $('#tblItem>tr').eq(i).children().eq('0').text();
        if (itemCodeInTable === code) {
            $('#tblItem>tr').eq(i).children().eq('0').text(code);
            $('#tblItem>tr').eq(i).children().eq('1').text(name);
            $('#tblItem>tr').eq(i).children().eq('2').text(price);
            $('#tblItem>tr').eq(i).children().eq('3').text(quantity);
        }
    }
}

function clearUpdateModelFields() {
    $('#itemCodeNew').val('');
    $('#itemNameNew').val('');
    $('#itemPriceNew').val('');
    $('#itemQuantityNew').val('');
    $('#itemCodeNew').css("border", "1px solid gray");
    $('#itemNameNew').css("border", "1px solid gray");
    $('#itemPriceNew').css("border", "1px solid gray");
    $('#itemQuantityNew').css("border", "1px solid gray");
}

$('#btnUpdateItem').click(function () {
    Swal.fire({
        title: 'Do you want to Update the Item?',
        showDenyButton: true,
        confirmButtonText: 'Update',
        denyButtonText: `Don't update`,
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire('Updated!', '', 'success');
            updateItem();
            clearUpdateModelFields();
            clearItemDetailsFields();
            $('#updateItemModel').modal('hide');
        } else if (result.isDenied) {
            clearUpdateModelFields();
            clearItemDetailsFields();
            $('#updateItemModel').modal('hide');
            Swal.fire('Changes are not saved', '', 'info')
        }
    });
});

$('#btnCloseInUpdateItem').click(function () {
    clearUpdateModelFields();
});

function deleteItem(code) {
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
            for (var item of Items) {
                if (item.code === code) {
                    let index = Items.indexOf(item);
                    Items.splice(index, 1);
                }
            }
            addDataToTable();
            bindRowClickEvent();
            bindRowDblClickEvent();
            clearItemDetailsFields();
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
        }
    });
}

$('#btnDelete').click(function () {
    let code = $('#itemCode').val();
    deleteItem(code);
});