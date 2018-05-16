 $(document).ready(function () {
 var data = [{
            "Requirement": "Salary",
            "Rank": "1"
        },

        {
            "Requirement": "Working atmosphere",
            "Rank": "2"
        },
        {
            "Requirement": "MNC",
            "Rank": "3"
        },
        {
            "Requirement": "Facilites",
            "Rank": "4"
        }];
var selectedValues = [];
$(".selectbox").append("<div class='select' style='padding-bottom:5px'>"+"<select class='Requirement'>"+"<option>Requirement</option>"+"</select>"+"<select class='Rank'>"+"<option>Rank</option>"+"</select>"+"</div>")
$.each(data,function(k,v){
   $(".Requirement").append('<option>'+v.Requirement+'</option>')
    $(".Rank").append('<option>'+v.Rank+'</option>') 
});

$(".addvalue").click(function(){
    len = $(".select").length;
$(".selectbox").append("<div class='select'style='padding-bottom:5px'><select class='Requirement Requirement"+len+"'><option>Requirement</option></select><select class='Rank Rank"+len+"'><option>Rank</option>"+"</select>"+"</div>")
$.each(data,function(k,v){
   $(".Requirement"+len).append('<option>'+v.Requirement+'</option>')
    $(".Rank"+len).append('<option>'+v.Rank+'</option>') 
});
});

$(".btnSave").click(function(){
    empty();
        $('.select').each(function(d){
    var req = $(this).find(".Requirement").val();
    var rank =$(this).find(".Rank").val(); 
    selectedValues.push({"Requirement":req,"Rank":rank});

    });
    console.log(selectedValues)
})
//$('.Requirement').change(function() {
//  selectedValues = $('.Requirement').map(function() {
//    return $(this).val();
//  }).get();
//$('.Rank').change(function() {
//  selectedValues = $('.Rank').map(function() {
//    return $(this).val();
//  }).get();

//  console.log(selectedValues);
function empty() {
    //empty your array
    selectedValues.length = 0;
}

});


//$('.Requirement').change(function() {
//  var selectedValues = $('.Requirement').map(function() {
//    return $(this).val();
//  }).get();
//
//  console.log(selectedValues);
//});




