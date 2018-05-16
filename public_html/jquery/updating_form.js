$(document).ready(function () {
    // Setup form validation on the #register-form element
    $("#register-form").validate({
        // Specify the validation rules
        rules: {
            name: "required",
            email: {
                required: true,
                email: true
            },
        gender: { // <- NAME of every radio in the same group
            required: true
        }
        },
        // Specify the validation error messages
        messages: {
            name: "Please enter your first name",
            email: "Please enter a valid email address",
            gender: "please specify your gender other option is applicable",
        },
        submitHandler: function (form) {
//            console.log(form)
//            $("#submit_button").click(function () {
                $("tbody").append("<tr>" +
                        "<td>" + $("#name").val() + "</td>" +
                        "<td>" + $("#email").val() + "</td>" +
                        "<td>" + $("input[name='gender']:checked").val() + "</td>" +
                        "<td><button class='btn btn-info btn-sm' data-toggle='modal' id='edit' data-target='#myModal'>Edit</button></td>" +
                        "<td><button id='delete'>Delete</button></td>" +
                        "</tr>");
                $(".table").show();
                $('.form-horizontal')[0].reset();/* $("#name").val('') its also a way to empty input field in form*/
//            });
        }
    });
    /*On click on edit button of row, showing details on modal to allow user to edit*/
    $('body').on('click', '#edit', function () {
        var currentRowvalue = $(this).parent().parent().index();/*.index to count row position like 0 1 2 and we are storing that value in currentrowvalue*/
        $('#updater').attr('currentrow', currentRowvalue)/*.attr to add attribute while currentrow is name of attribute here attributed is added so wen udate button is clicked which row user is updating becomes clear like updation has been done for 0th row or 1st row*/
        $("#updatedname").val($(this).parent().parent().find('td').eq(0).html());/*edit button parent is TD and parent is TR so 2 parent()*/
        $("#updatedemail").val($(this).parent().parent().find('td').eq(1).html());
        $("#updatedgender").val($(this).parent().parent().find('td').eq(2).html());
    });
    /*on click of update form ,updating table details for particular user*/
    $("#updater").click(function () {
        var updatingRow = $(this).attr('currentrow');/* on click of update button becoz of line no 14 which currentrow is getting updated will be stored var updating row*/
        var name = $("#updatedname").val();
        $("tbody").find('tr').eq(updatingRow).find('td').eq(0).html(name)
        var email= $("#updatedemail").val();
        $("tbody").find('tr').eq(updatingRow).find('td').eq(1).html(email)
        var gender = $("#updatedgender").val();
        $("tbody").find('tr').eq(updatingRow).find('td').eq(2).html(gender)
    });
 $('body').on('click', '#delete', function () { /* on click of delete button user entered data for specified row should delete*/
        var currentRowvalue = $(this).parent().parent().index();
//        $(this).closest(currentrowvalue).remove();/*its also a way to delete or remove row*/
        $("tbody").find('tr').eq(currentRowvalue).remove();
        var rowCount = $('#myTable >tbody >tr').length;
         if(rowCount==0)
         {
        $("table").hide();
    }
});
});