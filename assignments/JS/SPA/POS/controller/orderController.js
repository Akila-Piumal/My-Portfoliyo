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

