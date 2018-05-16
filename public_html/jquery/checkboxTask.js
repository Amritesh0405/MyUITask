var checkBoxList = {mainInterest: ["Cricket", "Cooking", "Tennis", "Badminton", "Chess", "Football"],
    mainPlayers: ["Sachin", "Sanjeev", "Sania", "Leander", "Vishwanath", "Ronaldo"],
    nextInterest: ["Cricket", "Cooking", "Tennis", "Badminton", "Swimming", "Carrom"],
    nextPlayers: ["Sachin", "Sanjeev", "Sania", "Leander", "Amrit", "Samuel"]};
var checkedList = {mainInterest: [],
    mainPlayers: [],
    nextInterest: [],
    nextPlayers: []
}
$(document).ready(function () {

    $("#nextPage").click(function () {
        if ($(this).val() == "Next Page") {
            $(this).val("Previous Page");
        } else {
            $(this).val("Next Page");
        }
        bindNextPage();

    });
    $("#interestCheckbox,#topPlayersCheckbox,#nextInterestCheckbox,#nextTopPlayersCheckbox").on("click", "input[type='checkbox']", function () {
        displayCheckedValues(this);
    });

    init();

});

function bindCheckedValues(arr,name){
    $.each(arr,function(key,val){
        $('input.'+name+'[value="'+val.trim()+'"]').prop('checked', true);
    });
}





function displayCheckedValues(_this) {
    console.log(_this);

    var currentAttr = $(_this).attr("name");
    var currentVal = $(_this).val();
    if ($(_this).is(":checked")) {
        if (currentAttr == 'interest') {
            checkedList.mainInterest.push(currentVal);
        } else if (currentAttr == 'players') {
            checkedList.mainPlayers.push(currentVal);
        } else if (currentAttr == 'nextInterest') {
            checkedList.nextInterest.push(currentVal);
        } else {
            checkedList.nextPlayers.push(currentVal);
        }
    } else {

        if (currentAttr == 'interest' && checkedList.mainInterest.indexOf(currentVal) != -1) {
            checkedList.mainInterest.splice(checkedList.mainInterest.indexOf(currentVal), 1);
        } else if (currentAttr == 'players' && checkedList.mainPlayers.indexOf(currentVal) != -1) {
            checkedList.mainPlayers.splice(checkedList.mainPlayers.indexOf(currentVal), 1);
        } else if (currentAttr == 'nextInterest' && checkedList.nextInterest.indexOf(currentVal) != -1) {
            checkedList.nextInterest.splice(checkedList.nextInterest.indexOf(currentVal), 1);
        } else if (currentAttr == 'nextPlayers' && checkedList.nextPlayers.indexOf(currentVal) != -1) {
            checkedList.nextPlayers.splice(checkedList.nextPlayers.indexOf(currentVal), 1);
        }

    }
    displayOptionList();
    //alert("interest:" + interest);
}

function displayOptionList(){
    
    var interest = checkedList.mainInterest.join(", ");
    var players = checkedList.mainPlayers.join(", ");
    var nextInterest = checkedList.nextInterest.join(", ");
    var nextPlayers = checkedList.nextPlayers.join(", ");
    //clear("interest,players,nextInterest,nextPlayers");
    $(".mainCheckedOptions").html("<div id='interest'>Interest: " + interest + "</div><div id='players'>Players: " + players + "</div>");
    $(".nextCheckedOptions").html("<div id='nextInterest'>Interest: " + nextInterest + "</div><div id='nextPlayers'>Players: " + nextPlayers + "</div>");
}


function bindNextPage() {
    
    bindCheckbox(checkBoxList.nextInterest, "nextInterestCheckbox", "nextInterest");
    bindCheckbox(checkBoxList.nextPlayers, "nextTopPlayersCheckbox", "nextPlayers");
    
    commonInterest = mergeSelectedOption(checkedList.mainInterest,checkBoxList.nextInterest);
    commonPlayers = mergeSelectedOption(checkedList.mainPlayers,checkBoxList.nextPlayers);
    
    checkedList.nextInterest = arrayUnique(checkedList.nextInterest.concat(commonInterest));
    console.log(checkedList.nextInterest);
    
    checkedList.nextPlayers = arrayUnique(checkedList.nextPlayers.concat(commonPlayers));
    
    bindCheckedValues(checkedList.nextInterest,"nextInterest");
    bindCheckedValues(checkedList.nextPlayers,"nextPlayers");
    
    $(".nextPage").toggleClass("hide");
    $(".mainPage").toggleClass("hide");
    
    $(".mainCheckedOptions").toggleClass("hide");
    $(".nextCheckedOptions").toggleClass("hide");
    
    $(".checkedOptions").html("");
    
    displayOptionList();
    //$("#nextPage").toggle("value","Previous Page");
}
function arrayUnique(array) {
    var a = array.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1);
        }
    }

    return a;
}

    // Merges both arrays and gets unique items
//var array3 = arrayUnique(array1.concat(array2));

function mergeSelectedOption(mainInterest,nextInterest){
    var commonItem = $.grep(mainInterest, function(element) {
    return $.inArray(element, nextInterest ) !== -1;
    });
    return commonItem;
}

function remove(){
    
}

function clear(id) {
    $.each((id.split(",")),function(key,val){
        $("#"+val).html("");
    });
    
}
function bindCheckbox(arr, id, name) {
    clear(id);
    $.each(arr, function (index, val) {
        $("#" + id).append("<div><label class='checkbox-inline'><input class='"+name+"' type='checkbox' value='" + val + "' name='" + name + "'>" + val
                + "</label></div>");
    });
}

function init() {
    bindCheckbox(checkBoxList.mainInterest, "interestCheckbox", "interest");
    bindCheckbox(checkBoxList.mainPlayers, "topPlayersCheckbox", "players");
}
