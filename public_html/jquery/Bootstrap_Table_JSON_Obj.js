$(document).ready(function () {
    var data = [{
            "Name": "Amrit",
            "Loc": "Delhi",
            "Email": "Activity",
            "Gender": "male",
            "phone": '879888888',
            "country": "India",
            "occupation": "Developer",
            "fathername": "Akhil",
            "lastname": "vaiv"
        },

        {
            "Name": "madhu",
            "Loc": "mumbai",
            "Email": "Activity",
            "Gender": "female",
            "phone": '879888777',
            "country": "India",
            "occupation": "Buisness",
            "fathername": "Akash",
            "lastname": "Deva"
        },
        {
            "Name": "saurabh",
            "Loc": "Delhi",
            "Email": "Activity",
            "Gender": "male",
            "phone": '8798888555',
            "country": "India",
            "occupation": "Developer",
            "fathername": "Ajay",
            "lastname": "vaisnav"
        },
        {
            "Name": "Alok",
            "Loc": "Hyderabad",
            "Email": "Activity",
            "Gender": "male",
            "phone": '8798888999',
            "country": "India",
            "occupation": "Banker",
            "fathername": "Abhi",
            "lastname": "Mishra"
        }];
    $.each(data, function (key, val) {
        console.log(val.Name);
        console.log(val.Loc);
        console.log(val.Email);
        console.log(val.Gender);
        console.log(val.phone);
        console.log(val.country);
        console.log(val.occupation);
        console.log(val.fathername);
         console.log(val.lastname);
        $("tbody").append("<tr>" +
                "<td>" + val.Name + "</td>" +
                "<td>" + val.Loc + "</td>" +
                "<td>" + val.Email + "</td>" +
                "<td>" + val.Gender + "</td>" +
                "<td>" + val.phone + "</td>" +
                "<td>" + val.country+ "</td>" +
                "<td>" + val.occupation+ "</td>" +
                "<td>" + val.fathername + "</td>" +
                "<td>" + val.lastname + "</td>" +
                "</tr>");
    });
});


