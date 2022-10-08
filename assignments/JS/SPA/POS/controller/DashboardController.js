// Login Button
$('#login_button').click(function () {
    $('#Login').css('display', 'none');
    $('#loginModel').modal('hide');
    $('#Home').css('display', 'block');
});

// Customer Button
$('#CustomerBtn').click(function () {
    $('#Cart').css('display', 'none');
    $('#Customer').css('display', 'block');
    $('#Item').css('display', 'none');
    $('#mainOfHome').css('display', 'none');
    $('#Order').css('display', 'none');

    //Change the other buttons when the Customer button clicked.
    $('#CartBtn').attr('style', 'text-decoration: none !important; color: rgba(0, 0, 0, 0.55) !important; font-weight: inherit !important; cursor: pointer');
    $('#ItemBtn').attr('style', 'text-decoration: none !important; color: rgba(0, 0, 0, 0.55) !important; font-weight: inherit !important; cursor: pointer');
    $('#OrdersBtn').attr('style', 'text-decoration: none !important; color: rgba(0, 0, 0, 0.55) !important; font-weight: inherit !important; cursor: pointer');
    $('#HomeBtn').attr('style', 'text-decoration: none !important; color: rgba(0, 0, 0, 0.55) !important; font-weight: inherit !important; cursor: pointer');
    $('#CustomerBtn').attr('style', 'text-decoration: underline !important; color: white !important; font-weight: 700 !important');

    // Remove the hover From Current page Button
    $(this).unbind('mouseenter').unbind('mouseleave');

    // Cart Button hover
    $("#CartBtn").hover(function () {
        $(this).css("color", "white");
    }, function () {
        $(this).attr('style', 'text-decoration: none !important; color: rgba(0, 0, 0, 0.55) !important; font-weight: inherit !important; cursor: pointer');
    });

    // Item Button hover
    $("#ItemBtn").hover(function () {
        $(this).css("color", "white");
    }, function () {
        $(this).attr('style', 'text-decoration: none !important; color: rgba(0, 0, 0, 0.55) !important; font-weight: inherit !important; cursor: pointer');
    });

    // Orders Button hover
    $("#OrdersBtn").hover(function () {
        $(this).css("color", "white");
    }, function () {
        $(this).attr('style', 'text-decoration: none !important; color: rgba(0, 0, 0, 0.55) !important; font-weight: inherit !important; cursor: pointer');
    });

    // Home Button hover
    $("#HomeBtn").hover(function () {
        $(this).css("color", "white");
    }, function () {
        $(this).attr('style', 'text-decoration: none !important; color: rgba(0, 0, 0, 0.55) !important; font-weight: inherit !important; cursor: pointer');
    });

});

// Cart Button
$('#CartBtn').click(function () {
    $('#Customer').css('display', 'none');
    $('#Item').css('display', 'none');
    $('#Order').css('display', 'none');
    $('#mainOfHome').css('display', 'none');
    $('#Cart').css('display', 'block');

    //Change the other buttons when the Cart button clicked.
    $('#CustomerBtn').attr('style', 'text-decoration: none !important; color: rgba(0, 0, 0, 0.55) !important; font-weight: inherit !important; cursor: pointer');
    $('#ItemBtn').attr('style', 'text-decoration: none !important; color: rgba(0, 0, 0, 0.55) !important; font-weight: inherit !important; cursor: pointer');
    $('#OrdersBtn').attr('style', 'text-decoration: none !important; color: rgba(0, 0, 0, 0.55) !important; font-weight: inherit !important; cursor: pointer');
    $('#HomeBtn').attr('style', 'text-decoration: none !important; color: rgba(0, 0, 0, 0.55) !important; font-weight: inherit !important; cursor: pointer');
    $('#CartBtn').attr('style', 'text-decoration: underline !important; color: white !important; font-weight: 700 !important');

    // Remove the hover From Current page Button
    $(this).unbind('mouseenter').unbind('mouseleave')

    // Customer Button hover
    $("#CustomerBtn").hover(function () {
        $(this).css("color", "white");
    }, function () {
        $(this).attr('style', 'text-decoration: none !important; color: rgba(0, 0, 0, 0.55) !important; font-weight: inherit !important; cursor: pointer');
    });

    // Item Button hover
    $("#ItemBtn").hover(function () {
        $(this).css("color", "white");
    }, function () {
        $(this).attr('style', 'text-decoration: none !important; color: rgba(0, 0, 0, 0.55) !important; font-weight: inherit !important; cursor: pointer');
    });

    // Orders Button hover
    $("#OrdersBtn").hover(function () {
        $(this).css("color", "white");
    }, function () {
        $(this).attr('style', 'text-decoration: none !important; color: rgba(0, 0, 0, 0.55) !important; font-weight: inherit !important; cursor: pointer');
    });

    // Home Button hover
    $("#HomeBtn").hover(function () {
        $(this).css("color", "white");
    }, function () {
        $(this).attr('style', 'text-decoration: none !important; color: rgba(0, 0, 0, 0.55) !important; font-weight: inherit !important; cursor: pointer');
    });

});

// Item button
$('#ItemBtn').click(function () {
    $('#Cart').css('display', 'none');
    $('#Customer').css('display', 'none');
    $('#Order').css('display', 'none');
    $('#mainOfHome').css('display', 'none');
    $('#Item').css('display', 'block');

    //Change the other buttons when the Item button clicked.
    $('#CartBtn').attr('style', 'text-decoration: none !important; color: rgba(0, 0, 0, 0.55) !important; font-weight: inherit !important; cursor: pointer');
    $('#CustomerBtn').attr('style', 'text-decoration: none !important; color: rgba(0, 0, 0, 0.55) !important; font-weight: inherit !important; cursor: pointer');
    $('#OrdersBtn').attr('style', 'text-decoration: none !important; color: rgba(0, 0, 0, 0.55) !important; font-weight: inherit !important; cursor: pointer');
    $('#HomeBtn').attr('style', 'text-decoration: none !important; color: rgba(0, 0, 0, 0.55) !important; font-weight: inherit !important; cursor: pointer');
    $('#ItemBtn').attr('style', 'text-decoration: underline !important; color: white !important; font-weight: 700 !important');

    // Remove the hover From Current page Button
    $(this).unbind('mouseenter').unbind('mouseleave');

    // Cart Button hover
    $("#CartBtn").hover(function () {
        $(this).css("color", "white");
    }, function () {
        $(this).attr('style', 'text-decoration: none !important; color: rgba(0, 0, 0, 0.55) !important; font-weight: inherit !important; cursor: pointer');
    });

    // Customer Button hover
    $("#CustomerBtn").hover(function () {
        $(this).css("color", "white");
    }, function () {
        $(this).attr('style', 'text-decoration: none !important; color: rgba(0, 0, 0, 0.55) !important; font-weight: inherit !important; cursor: pointer');
    });

    // Orders Button hover
    $("#OrdersBtn").hover(function () {
        $(this).css("color", "white");
    }, function () {
        $(this).attr('style', 'text-decoration: none !important; color: rgba(0, 0, 0, 0.55) !important; font-weight: inherit !important; cursor: pointer');
    });

    // Home Button hover
    $("#HomeBtn").hover(function () {
        $(this).css("color", "white");
    }, function () {
        $(this).attr('style', 'text-decoration: none !important; color: rgba(0, 0, 0, 0.55) !important; font-weight: inherit !important; cursor: pointer');
    });

});

// orders Button
$('#OrdersBtn').click(function () {
    $('#Cart').css('display', 'none');
    $('#Customer').css('display', 'none');
    $('#Item').css('display', 'none');
    $('#mainOfHome').css('display', 'none');
    $('#Order').css('display', 'block');

    //Change the other buttons when the orders button clicked.
    $('#CartBtn').attr('style', 'text-decoration: none !important; color: rgba(0, 0, 0, 0.55) !important; font-weight: inherit !important; cursor: pointer');
    $('#CustomerBtn').attr('style', 'text-decoration: none !important; color: rgba(0, 0, 0, 0.55) !important; font-weight: inherit !important; cursor: pointer');
    $('#ItemBtn').attr('style', 'text-decoration: none !important; color: rgba(0, 0, 0, 0.55) !important; font-weight: inherit !important; cursor: pointer');
    $('#HomeBtn').attr('style', 'text-decoration: none !important; color: rgba(0, 0, 0, 0.55) !important; font-weight: inherit !important; cursor: pointer');
    $('#OrdersBtn').attr('style', 'text-decoration: underline !important; color: white !important; font-weight: 700 !important');

    // Remove the hover From Current page
    $(this).unbind('mouseenter').unbind('mouseleave');

    // Cart Button hover
    $("#CartBtn").hover(function () {
        $(this).css("color", "white");
    }, function () {
        $(this).attr('style', 'text-decoration: none !important; color: rgba(0, 0, 0, 0.55) !important; font-weight: inherit !important; cursor: pointer');
    });

    // Customer Button hover
    $("#CustomerBtn").hover(function () {
        $(this).css("color", "white");
    }, function () {
        $(this).attr('style', 'text-decoration: none !important; color: rgba(0, 0, 0, 0.55) !important; font-weight: inherit !important; cursor: pointer');
    });

    // Item Button hover
    $("#ItemBtn").hover(function () {
        $(this).css("color", "white");
    }, function () {
        $(this).attr('style', 'text-decoration: none !important; color: rgba(0, 0, 0, 0.55) !important; font-weight: inherit !important; cursor: pointer');
    });

    // Home Button hover
    $("#HomeBtn").hover(function () {
        $(this).css("color", "white");
    }, function () {
        $(this).attr('style', 'text-decoration: none !important; color: rgba(0, 0, 0, 0.55) !important; font-weight: inherit !important; cursor: pointer');
    });

});

// Home Button
$('#HomeBtn').click(function () {
    $('#Cart').css('display', 'none');
    $('#Customer').css('display', 'none');
    $('#Order').css('display', 'none');
    $('#Item').css('display', 'none');
    $('#mainOfHome').css('display', 'block');

    //Change the other buttons when the Item button clicked.
    $('#CartBtn').attr('style', 'text-decoration: none !important; color: rgba(0, 0, 0, 0.55) !important; font-weight: inherit !important; cursor: pointer');
    $('#CustomerBtn').attr('style', 'text-decoration: none !important; color: rgba(0, 0, 0, 0.55) !important; font-weight: inherit !important; cursor: pointer');
    $('#OrdersBtn').attr('style', 'text-decoration: none !important; color: rgba(0, 0, 0, 0.55) !important; font-weight: inherit !important; cursor: pointer');
    $('#ItemBtn').attr('style', 'text-decoration: none !important; color: rgba(0, 0, 0, 0.55) !important; font-weight: inherit !important; cursor: pointer');
    $('#HomeBtn').attr('style', 'text-decoration: underline !important; color: white !important; font-weight: 700 !important');

    // Remove the hover From Current page Button
    $(this).unbind('mouseenter').unbind('mouseleave');

    // Cart Button hover
    $("#CartBtn").hover(function () {
        $(this).css("color", "white");
    }, function () {
        $(this).attr('style', 'text-decoration: none !important; color: rgba(0, 0, 0, 0.55) !important; font-weight: inherit !important; cursor: pointer');
    });

    // Customer Button hover
    $("#CustomerBtn").hover(function () {
        $(this).css("color", "white");
    }, function () {
        $(this).attr('style', 'text-decoration: none !important; color: rgba(0, 0, 0, 0.55) !important; font-weight: inherit !important; cursor: pointer');
    });

    // Orders Button hover
    $("#OrdersBtn").hover(function () {
        $(this).css("color", "white");
    }, function () {
        $(this).attr('style', 'text-decoration: none !important; color: rgba(0, 0, 0, 0.55) !important; font-weight: inherit !important; cursor: pointer');
    });

    // Items Button hover
    $("#ItemBtn").hover(function () {
        $(this).css("color", "white");
    }, function () {
        $(this).attr('style', 'text-decoration: none !important; color: rgba(0, 0, 0, 0.55) !important; font-weight: inherit !important; cursor: pointer');
    });

});