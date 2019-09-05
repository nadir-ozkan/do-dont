"use strict";

const addLeadingZero = function(sayi) {
    sayi = "" + sayi; // metin olarak algılanmasını garantile
    return sayi.length==1 ? "0" + sayi : sayi;
}

const getDateObj = function(){
    const simdi = new Date();
    const gun = addLeadingZero(simdi.getDate());
    const ay = addLeadingZero(simdi.getMonth() + 1);
    const yil = simdi.getFullYear().toString();        

    return {
        dateStr : gun + "_" + ay + "_" + yil,
        dateStrP : gun + "." + ay + "." + yil,
        gun,
        ay, 
        yil,
        jsTime : (simdi).getTime() 
    }
    
}

const objToArray = function (obj) {
    let arr = [];
    Object.keys(obj).forEach((key) => {
        arr.push(obj[key]);
    });
    return arr;
}

module.exports = {
    getDateObj,
    addLeadingZero,
    objToArray
}