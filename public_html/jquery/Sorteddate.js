$(document).ready(function () {
  var arr =  [{ ID: 1, 'CreatedYM': '2015-Jun-12'},
  { ID: 2, 'CreatedYM': '2014-May-13'}, 
  { ID: 3, 'CreatedYM': '2014-Dec-15'}, 
  { ID: 4, 'CreatedYM': '2015-Aug-17'}, 
  { ID: 5, 'CreatedYM': '2014-Dec-11'}
];

var sortedarr = arr.sort(function(a,b){   
    // convert them into dates
    var d1 = new Date(Date.parse(a.CreatedYM));
    var d2 = new Date(Date.parse(b.CreatedYM));
    return d1 > d2 ? 1  // if d1 > d2 return 1
    : d1 < d2 ? -1 // if d1 < d2 return -1
    : 0; // else return 0
});
console.log(sortedarr);  
});

