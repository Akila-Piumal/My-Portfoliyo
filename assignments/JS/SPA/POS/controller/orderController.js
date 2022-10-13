// load orders to the table
function addDataToOrdersTable() {
    $('#tblOrders').empty();

    for (var order of orders) {
        let customer = order.customer;
        let discount = (order.total / 100) * order.discount;

        var row = `<tr><th scope="row">${order.id}</th><td>${order.date}</td><td>${customer.id}</td><td>${discount.toFixed(2)}</td><td>${(order.subTotal).toFixed(2)}</td>
                        <td style="padding-bottom: 0;padding-top: 0;">
                        <button style="border: none;background: transparent;" class="btnItemDetailsInTbl"><div class="itemDetImageDivInTable"></div></button></td>
                    </tr>`


        $('#tblOrders').append(row);

        $("#tblOrders>tr").css('cursor', 'pointer');
    }

    $('.btnItemDetailsInTbl').click(function () {
        let orderID = $(this).parents().eq('1').children().eq('0').text();
        displayItemDetailsOfOrder(orderID);
    });
}

// load item details of order
function displayItemDetailsOfOrder(orderID) {
    swal.fire({
        customClass: 'swal-wide',
        html: `<table class="table container-lg overflow-hidden text-center">
        <thead class="text-white" style="background-color: #00b712">
            <tr>
                <th>item Code</th>
                <th>item Name</th>
                <th>item price</th>
                <th>quantity</th>
                <th>total cost</th>
            </tr>
        </thead>
        <tbody id="tblItemDetailsOfOrder" >

        </tbody>
        </table>`
    });

    for (let orderDetail of orderDetails) {
        if (orderDetail.orderId==orderID){
            let item = orderDetail.item;
            let quantity = orderDetail.quantity;
            let total = parseFloat(orderDetail.total);
            let price = parseFloat(item.price);

            var row = `<tr><th scope="row">${item.code}</th><td>${item.name}</td><td>${price.toFixed(2)}</td><td>${quantity}</td><td>${total.toFixed(2)}</td></tr>`

            $('#tblItemDetailsOfOrder').append(row);
        }
    }
}

// search bar key event
$('#searchBarInOrder').keypress(function (e) {
    if (e.which == 13) {
        searchOrder();
    }
});

// click event to search button
$('#btnSearchOrder').click(function () {
    searchOrder();
});

// search order with order id
function searchOrderWithID(id) {
    for (let i = 0; i < orders.length; i++) {
        if (id === (orders[i].id)) {
            let order = {
                id: orders[i].id,
                date: orders[i].date,
                customer: orders[i].customer,
                total: orders[i].total,
                discount: orders[i].discount,
                subTotal: orders[i].subTotal
            }
            return order;
        }
    }
    return null;
}

// search order with order date
function searchOrderWithDate(date) {
    for (let i = 0; i < orders.length; i++) {
        if (date === (orders[i].date)) {
            let order = {
                id: orders[i].id,
                date: orders[i].date,
                customer: orders[i].customer,
                total: orders[i].total,
                discount: orders[i].discount,
                subTotal: orders[i].subTotal
            }
            return order;
        }
    }
    return null;
}

function searchOrder(){
    let searchBarText = $('#searchBarInOrder').val();

    if ($('#cmbIdOrDate').find('option:selected').val() === "id") {
        if ($.isEmptyObject(orders)) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Empty Set',
            })
        } else {
            if (searchOrderWithID(searchBarText) !== null) {
                let order = searchOrderWithID(searchBarText);
                let discount = (order.total / 100) * order.discount;
                let total = parseFloat(order.subTotal);
                setValuesToOrderFields(order.id, order.date, (order.customer).id, discount.toFixed(2),total.toFixed(2));
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Order not exist'
                })
                clearOrderDetailsFields();
            }
        }
    }else if ($('#cmbIdOrDate').find('option:selected').val() === "date"){
        if ($.isEmptyObject(orders)) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Empty Set',
            })
        } else {
            if (searchOrderWithDate(searchBarText) !== null) {
                let order = searchOrderWithDate(searchBarText);
                let discount = (order.total / 100) * order.discount;
                let total = parseFloat(order.subTotal);
                setValuesToOrderFields(order.id, order.date, (order.customer).id, discount.toFixed(2),total.toFixed(2));
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Order not exist'
                })
                clearOrderDetailsFields();
            }
        }
    }
}

// set values of search to the text fields
function setValuesToOrderFields(id,date,cusId,discount,subTotal){
    $('#orderIDInOrder').val(id);
    $('#orderDate').val(date);
    $('#customerIDInOrder').val(cusId);
    $('#discountInOrder').val(discount);
    $('#subTotalInOrder').val(subTotal);
    $('#btnUpdateInOrder').removeAttr("disabled");
    $('#btnDeleteInOrder').removeAttr("disabled");
}

// clear fields
function clearOrderDetailsFields() {
    $('#orderIDInOrder').val('');
    $('#orderDate').val('');
    $('#customerIDInOrder').val('');
    $('#discountInOrder').val('');
    $('#subTotalInOrder').val('');
    $('#btnUpdateInOrder').attr("disabled",true);
    $('#btnDeleteInOrder').attr("disabled",true);
}

function bindRowClickEventInOrderTable(){
    $('#tblOrders>tr').click(function () {
        let orderID = $(this).children().eq('0').text();
        let date = $(this).children().eq('1').text();
        let customerID = $(this).children().eq('2').text();
        let discount = $(this).children().eq('3').text();
        let subTotal = $(this).children().eq('4').text();

        setValuesToOrderFields(orderID, date, customerID, discount, subTotal);
    });
}

