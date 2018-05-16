$(document).ready(function () {
    var data = [{
            "Name": "Amrit",
            "Loc": "Delhi",
            "Email": "Activity",
            "Gender": "male"
        },

        {
            "Name": "madhu",
            "Loc": "mumbai",
            "Email": "Activity",
            "Gender": "female"
        },
        {
            "Name": "saurabh",
            "Loc": "Delhi",
            "Email": "Activity",
            "Gender": "male"
        },
        {
            "Name": "Alok",
            "Loc": "Hyderabad",
            "Email": "Activity",
            "Gender": "male"
        }];

    $.each(data, function (key, val) {
        console.log(val.Name);
        console.log(val.Loc);
        console.log(val.Email);
        console.log(val.Gender);
        $("#addTbody").append("<tr>" +
                "<td>" + val.Name + "</td>" +
                "<td>" + val.Loc + "</td>" +
                "<td>" + val.Email + "</td>" +
                "<td>" + val.Gender + "</td>" +
                "</tr>");
    });
});
//------------------------------------------------------------------------------
