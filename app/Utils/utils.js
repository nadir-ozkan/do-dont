"use strict";

const addLeadingZero = function(sayi) {
    sayi = "" + sayi; // metin olarak algılanmasını garantile
    return sayi.length==1 ? "0" + sayi : sayi;
}

const mergeObjects = (obj1, obj2) => {
    const newObj = {};
    Object.keys(obj1).forEach((key) => {
        newObj[key] = obj1[key];
    });
    Object.keys(obj2).forEach((key) => {
        newObj[key] = obj2[key];
    });
    return newObj;
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

const getJsTime = function (dateStr) {
    const arr = dateStr.split(".");

    const year = parseInt(arr[2], 10);
    const month = parseInt(arr[1], 10)-1;  // Nedense sıfır tabanlı çalışıyor ay
    const day = parseInt(arr[0], 10);

    const date = new Date(year, month, day, 23, 59, 59);  // O günün sonuna gelen ms değeri...

    return date.getTime();
}

const objToArray = function (obj) {
    let arr = [];
    if (obj) {
        Object.keys(obj).forEach((key) => {
            arr.push(obj[key]);
        });
    }
    return arr;
}

const isToday = function (dayStr) {
  return getDateObj().dateStrP == dayStr;
}

const hUnit = function (percent) {
    return (window.innerHeight / 100 * percent) + "px";
}

const getConfig = function() {
    return require('../../config.js').config;
}

module.exports = {
    getDateObj,
    addLeadingZero,
    objToArray,
    mergeObjects,
    isToday,
    hUnit,
    config : getConfig(),
    getJsTime
}
