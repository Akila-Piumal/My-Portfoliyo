$(document).ready(function () {
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
});