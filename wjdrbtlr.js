
let test = "te123"

console.log(test);
if (!/^[0-9a-z+]{3,}/gi.test(test)) {
  console.log("맞아요! 트루!")
}
