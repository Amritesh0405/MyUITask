$(document).ready(function () {
    var obj = { key: 'a', key1: 'b', key2: 'c',key3:'d',key4: 'e', key5: 'f', key6: 'g',key7:'h' };
          var keys=Object.keys(obj);
          var arrangeArr=[];
          $.each(obj,function(keys,value){
              arrangeArr.push (keys+'_'+value);
          });
          console.log('h',arrangeArr)
    });