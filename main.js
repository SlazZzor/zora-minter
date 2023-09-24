const { JsonRpcProvider, Wallet, Contract } = require("ethers");
const { generatePath } = require("./src/pathGenerator.js");
const { sleep, randomIntFromInterval, shuffleArray, logger, workerPromise } = require("./src/utils.js")
const { sleepMin, sleepMax, proxyUrl, shuffleKeys, maxThreads } = require("./config.js");
const { getProvider } = require('./src/proxyProvider.js')
const { Worker, isMainThread, workerData } = require("node:worker_threads");
const { isPromiseResolved } = require('promise-status-async');
const fs = require("fs");
const { isPromise } = require("node:util/types");


async function main(privateKey){
    try{
        const provider = getProvider(proxyUrl);
        const wallet = new Wallet(privateKey, provider);
        const path = await generatePath(wallet);
        for (nftInfo of path){
            const { mintAddress, arguments, abi, fnName, nftName } = nftInfo;
            try {
                const nftContract = new Contract(mintAddress, abi, wallet);
                logger(`Начинаю минт ${nftName}`, wallet.address);
                const transaction = await nftContract[fnName](...arguments, {"gasPrice": Math.floor(5 * 10 ** 5 * Math.random() * 2)});
                await transaction.wait();
                logger(`Успешно заминтил ${nftName}`, wallet.address);
                await sleep(randomIntFromInterval(sleepMin, sleepMax) * 1000);
            } catch(e){
                logger(e, privateKey);
                logger(`Произошла ошибка в время минта ${nftName}, иду дальше`, privateKey);
                await sleep(randomIntFromInterval(sleepMin, sleepMax) * 1000);
            };
        };
        return 1;
    } catch (error){
        logger(error, privateKey);
        logger("Произошла ошибка во время начала исполнения программы, иду дальше", privateKey);
    };
};


(async () => {
    let currentThreads = 0;
    let workers = [];
    let maximumThreads = maxThreads;
    const privateKeys = (fs.readFileSync("private_keys.txt", "utf-8", (err) => console.error(err))).split("\n");

    if (shuffleKeys){
        shuffleArray(privateKeys);
    };

    if (isMainThread){
        for (key of privateKeys){
            if (currentThreads >= maximumThreads){
                await Promise.any(workers);
                workers = workers.filter(((value) => {
                    isPromiseResolved(value).then(result => {
                        return !result
                    })
                }));    
                currentThreads = workers.length;
            };
            if (currentThreads < maximumThreads){
                workers.push(workerPromise(__filename, {privateKey: key}));
                currentThreads = workers.length;
                await sleep(randomIntFromInterval(sleepMin, sleepMax) * 1000);
            };
        };
    } else {
        const privateKey = workerData["privateKey"];
        await main(privateKey)
    }
})();