let names = ['Nadir', 'Eylem', 'Çınar', 'Nazan', 'Bahadır'];

names.forEach(function (name,idx,arr) {
  console.log("anon", idx, name);
});

names.forEach((name,idx) => console.log("arrow", idx, name));

let writeNames = (arr) => arr.forEach((item,idx) => console.log(idx, item));

// There is an implicit return at below function
// name + idx + name is returned from the function.
let newNames = names.map((name,idx) => name + idx + name);

writeNames(newNames);

let greeter = {
  name : 'Nadir',
  sayHello : function(){
    names.forEach(function(name){
      console.log(this.name + ' says hi to ' + name);
    });
  },
  sayHelloArraw : function () {
    names.forEach((name) => {
      console.log(this.name + ' says hi to ' + name);
    });
  }
}

// Arraw functions binds PARENT'S this example.
greeter.sayHello();
greeter.sayHelloArraw();

let add = function(a, b){
  return a + b;
}

// statement type arrow function
let add2 = (a, b) => {
  return a + b;
} ;

// Expression type arrow function
// implicit return statement
let add3 = (a, b) => a + b;

console.log("add  " + add(2,3));
console.log("add2 " + add2(2,3));
console.log("add3 " + add3(2,3));
