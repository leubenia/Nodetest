
let do123 = "te123"

console.log(do123);
if (!/^[0-9a-z+]{3,}/gi.test(do123)) {
  console.log("맞아요! 트루!!!!")
}
let pw = "2311"
console.log(pw)
if(!/^[0-9a-z]{4,}/gi.test(pw)){
  console.log("맞아요 트루")
}
var re3 = new RegExp(do123, 'gi');
if(re3.test(pw)){
  console.log("맞아요 트루!!")
}

// var a = '텍스트'
// var b = 3 ; //문자열 길이
// var regex = new RegExp('^[0-9a-z]^['+do123+']$') ;
// string.replace(regex, "replacement");
// console.log(regex.test(pw))

//var regex = new RegExp('^\\d*\\.\\d{'+b+'}$')   ;  이것도 가능

// var test = '12';
// var re2 = new RegExp('!^[0-9a-z]{4,}', 'gi');
// //var re3 = new RegExp('[ezs]', 'gi');
// console.log(re2.test(test));
// //console.log(re3.test(test));
