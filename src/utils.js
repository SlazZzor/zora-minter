const fs = require("fs");
const { Worker, workerData } = require("node:worker_threads");



function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};


function randomIntFromInterval(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min);
};


function shuffleArray(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
};


function generateRandomString(length) {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < length; i++) {
     const randomIndex = Math.floor(Math.random() * characters.length);
     result += characters[randomIndex];
    }
    return result;
};


function logger(text, address = ''){
    function format_timestamp(){
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        date = new Date() 
        return `${months[date.getMonth()].slice(0, 3)}-${Math.floor(date.getDate()/10)}${date.getDate()%10}-${date.getFullYear()} ${Math.floor(date.getHours()/10)}${date.getHours()%10}:${Math.floor(date.getMinutes()/10)}${date.getMinutes()%10}:${Math.floor(date.getSeconds()/10)}${date.getSeconds()%10}`
    }
    let log = (`Кошелёк ${address.slice(0, 10)} 🏷️ ${format_timestamp()} | ${text}`);
    fs.appendFile('logs.txt', log + '\n', (err) => {
        if (err){
            console.log(err);
        };
    });
    console.log(log);
};


function workerPromise(filename, data){
    return new Promise ((resolve, reject) => {
        const worker = new Worker(filename, {workerData: data})
        worker.on("exit", () => resolve());
    });
};

module.exports = { sleep, randomIntFromInterval, shuffleArray, generateRandomString, logger, workerPromise };