$(document).ready(function () {
    var data = [{
            "id": 1,
            "name": "Jeanette",
            "country": "India",
            "interest": "Cricket",
            "gender": "Female"

        }, {
            "id": 2,
            "name": "Giavani",
            "country": "Australia",
            "interest": "Cricket",
            "gender": "Male"

        }]

    if (localStorage.getItem("myDetails") == null) {
        localStorage.setItem('myDetails', JSON.stringify(data));
    } else {
        data = JSON.parse(localStorage.getItem('myDetails'));
    }

//var a =  JSON.parse(localStorage.getItem('myDetails'));
////     $.getJSON('data/myDetailsTable.json', function (data) {
//        $.each(a, function (k, v) {
////           console.log(v,v.first_name)
//                     $("tbody").append("<tr>" +
//                        "<td>" +v.name + "</td>" +
//                        "<td>" +v.country + "</td>" +
//                        "<td>" +v.interest + "</td>" +
//                        "<td>" +v.gender + "</td>"+
//                        "<td><button class='btn btn-info btn-sm' data-toggle='modal' id='edit' data-target='#myModal'>Edit</button></td>"+ "</tr>");
//                });
//            });
    bindTable(data);

    $("#saving").click(function () {
        var data1 = [];
        var checkbox = []
        var name = $("#name").val();
        var select = $('#sel1').val();
        $.each($("input[name='interest']:checked"), function () {
            checkbox.push($(this).val());
//                console.log(checkbox,"checkbox")
        });
        var interest = checkbox.join(", ");
//            console.log(a)
//        = $("input[name='interest']:checked").val();
        var gender = $("input[name='gender']:checked").val();

        var data = JSON.parse(localStorage.getItem('myDetails'));
        var obj = {"id": data.length + 1, "name": name, "country": select, "gender": gender, "interest": interest};
        data1.push(obj);
        var tempStorageData = JSON.parse(localStorage.getItem('myDetails'));
        tempStorageData.push(obj);
        localStorage.setItem('myDetails', JSON.stringify(tempStorageData));

//        console.log(a);
        $("#refresh").click(function () {
//        data = JSON.parse(localStorage.getItem('myDetails'));
            bindTable(data1);
//        data.concat(data1);

            data1 = [];
        })

    });
    $('body').on('click', '#edit', function () {

        var currentRowvalue = $(this).parent().parent().index();/*.index to count row position like 0 1 2 and we are storing that value in currentrowvalue*/
        $('#updater').attr('currentrow', currentRowvalue)/*.attr to add attribute while currentrow is name of attribute here attributed is added so wen udate button is clicked which row user is updating becomes clear like updation has been done for 0th row or 1st row*/
        $("#editname").val($(this).parent().parent().find('td').eq(0).html());/*edit button parent is TD and parent is TR so 2 parent()*/
        $("#editsel1").val($(this).parent().parent().find('td').eq(1).html());
        var tableCheckboxData = $(this).parent().parent().find('td').eq(2).html();
        
        var splitval = tableCheckboxData.split(',');
        console.log(splitval)
        $.each(splitval, function (k, v) {
            console.log(v.trim())
//            debugger;
            $('input.editcheckbox[value="'+v.trim()+'"]').prop('checked', true);
        });

        var tableRadioData = $(this).parent().parent().find('td').eq(3).html();
        console.log(tableRadioData)
        $('input.editradio[value="'+tableRadioData+'"]').prop('checked', true);

    });
    $("#updater").click(function () {
        var checkbox = [];
        var updatingRow = $(this).attr('currentrow');/* on click of update button becoz of line no 14 which currentrow is getting updated will be stored var updating row*/
        var name = $("#editname").val();
        $("tbody").find('tr').eq(updatingRow).find('td').eq(0).html(name)
        var selectbox = $("#editsel1").val();
        $("tbody").find('tr').eq(updatingRow).find('td').eq(1).html(selectbox)
        $.each($("input[name='interest']:checked"), function () {
            checkbox.push($(this).val());
//                console.log(checkbox,"checkbox")
        });
        var interest = checkbox.join(", ");
//        var interest = $("input[name='interest']:checked").val();
        $("tbody").find('tr').eq(updatingRow).find('td').eq(2).html(interest)
        var gender = $("input[name='gender']:checked").val();
        $("tbody").find('tr').eq(updatingRow).find('td').eq(3).html(gender)
//        console.log(name, selectbox, interest, gender)
    });
//    $("#refresh").click(function () {
//        data = JSON.parse(localStorage.getItem('myDetails'));
//        bindTable(data);
//    })
});
function bindTable(data) {

    $.each(data, function (k, v) {
//           console.log(v,v.first_name)

        $("tbody").append("<tr>" +
                "<td>" + v.name + "</td>" +
                "<td>" + v.country + "</td>" +
                "<td>" + v.interest + "</td>" +
                "<td>" + v.gender + "</td>" +
                "<td><button class='btn btn-info btn-sm' data-toggle='modal' id='edit' data-target='#myModaledit'>Edit</button></td>" + "</tr>");
    });

}

//function bindData(data, id) {
//
//    $("tbody").append("<tr>" +
//                "<td>" + data[id].name + "</td>" +
//                "<td>" + data[id].country + "</td>" +
//                "<td>" + data[id].interest + "</td>" +
//                "<td>" + data[id].gender + "</td>" +
//                "<td><button class='btn btn-info btn-sm' data-toggle='modal' id='edit' data-target='#myModal'>Edit</button></td>" + "</tr>");
//}
//var obj = {
//    name: 'Dhayalan',
//    score: 100
//};
//
//var obj = JSON.parse(localStorage.getItem('gameStorage'));