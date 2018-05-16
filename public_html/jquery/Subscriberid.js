$(document).ready(function () {
    var s;
    var finalData = [];
    d3.json('DATA/Subscriberid.json', function (k, v) {
        $.each(v, function (k1, v1) {
            $.each(v1, function (k2, v2) {
                $.each(v2, function (k3, v3) {
                    $("tbody").append("<tr>" +
                            "<td>" + (v3.subscriberid) + "</td>" + "</tr>");
                    finalData.push(v3);
                });
            });
        });
    });
    $(document).on("click", ".ww tr td", function () {
        var json_text = JSON.stringify(finalData);
        $('#display').text(json_text);
//        it is also a wayout to break line  $('#display').html($("#display").html().replace(/,/g, ",<br />"));
        $('#display').each(function () {

            var mydata = $(this).html().split(',').join(",<br/>");
            $(this).html(mydata);

        });
    });

});
    