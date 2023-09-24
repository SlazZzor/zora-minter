const mintsCount = 1;                              //  количество минтов на аккаунт, лимит - 15
const sleepMin = 3;                                //  в секундах минимальная задержка между минтами
const sleepMax = 5;                                //  в секундах максимальная задержка между минтами
const infuraApiKey = "";                            // IPFS Infura Api Key 
                                                    // нужен для залития картинки на IPFS
                                                    // создавать тут: https://www.infura.io/product/ipfs
                                                    // если ключ не указан, берётся случайная 
                                                    // существующая или не существующая картинка
const infuraApiSecret = "";                         // IPFS Infura Api Key Secret
const proxyUrl = "";                                // Proxy для RPC Зоры
const shuffleKeys = true;                           // true - перемешивать аккаунты, false - не перемешивать
const maxThreads = 1;                               // количество потоков

// Предупреждение: перед каждым новым thread'ом есть задержка из случайно числа между sleepMin и sleepMax


module.exports = { mintsCount, sleepMin, sleepMax, infuraApiKey, infuraApiSecret, proxyUrl, shuffleKeys, maxThreads };