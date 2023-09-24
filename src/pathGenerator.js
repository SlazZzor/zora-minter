const { shuffleArray, generateRandomString } = require("./utils");
const nftMintAbi = require("./abi/zoraEyeAbi.json");
const sqr16Abi = require("./abi/sqr16Abi.json");
const words = require("./words.json");
const zoraNFTCreatorAbi = require("./abi/zoraNFTCreatorAbi.json");
const { mintsCount } = require("../config.js");
const { getImageIpfs } = require("./imageGenerator.js")



async function generatePath(wallet){
    let path;

    const nftMintInfo = {
        zoraNFTCreator: {
            mintAddress: "0xA2c2A96A232113Dd4993E8b048EEbc3371AE8d85",
            arguments: [
                words[Math.floor(words.length * Math.random())], // name 
                generateRandomString(3).toUpperCase(), // symbol 
                "18446744073709551615", // editionSize
                0, // royaltyBPS
                wallet.address, // fundsRecipient
                wallet.address, // defaultAdmin 
                [ "0", "4294967295", BigInt((Math.floor(new Date().getTime() / 1000))), 
                              "18446744073709551615", "0", "0", 
                              "0x0000000000000000000000000000000000000000000000000000000000000000" 
                            ], // saleConfig
                words[Math.floor(words.length * Math.random())], // description
                "", // animationURI
                await getImageIpfs(), // imageUri
                "0x0000000000000000000000000000000000000000" // createReferral
            ],
            abi: zoraNFTCreatorAbi,
            fnName: "createEditionWithReferral",
            nftName: "Zora NFT Collection"
        },
        zoraEye: {
            mintAddress: "0x8A43793D26b5DBd5133b78A85b0DEF8fB8Fce9B3",
            arguments: [99], 
            abi: nftMintAbi,
            fnName: "mint",
            nftName: "Zora Eye"
        },
        allure: {
            mintAddress: "0x53cb0B849491590CaB2cc44AF8c20e68e21fc36D",
            arguments: [3],
            abi: nftMintAbi,
            fnName: "mint",
            nftName: "Allure"
        },
        aGreatDay: {
            mintAddress: "0x4de73D198598C3B4942E95657a12cBc399E4aDB5",
            arguments: [1],
            abi: nftMintAbi,
            fnName: "mint",
            nftName: "A Great Day"
        },
        ZoraOGPass: {
            mintAddress: "0x266b7E8Df0368Dd4006bE5469DD4EE13EA53d3a4",
            arguments: [3],
            abi: nftMintAbi,
            fnName: "mint",
            nftName: "Zora OG Pass"
        },
        sqr16: {
            mintAddress: "0xbC2cA61440fAF65a9868295Efa5d5D87c55B9529",
            arguments: [4], 
            abi: sqr16Abi,
            fnName: "mint",
            nftName: "SQR16"
        },
        theNewZorbTimes: {
            mintAddress: "0xb79c6871aD5d620419C7beB390ae92B8fF377A7c",
            arguments: [3], 
            abi: nftMintAbi,
            fnName: "mint",
            nftName: "The New Zorb Times"
        },
        zoraSynergy: {
            mintAddress: "0xBC6098EA4eD5fceC82AA21DFb32876769ec7a620",
            arguments: [3],
            abi: nftMintAbi,
            fnName: "mint",
            nftName: "Zora Synergy"
        },
        sunriseInDryAir: {
            mintAddress: "0x8B2c13df6f8a884Eff34539eC20Ee36C69DC76C4",
            arguments: [3],
            abi: nftMintAbi,
            fnName: "mint",
            nftName: "Sunrise In Dry Air"
        },
        shalushai: {
            mintAddress: "0xc1d55E7CD84d32B88b53F8F48b601A404149afF5",
            arguments: [2],
            abi: nftMintAbi,
            fnName: "mint",
            nftName: "Shalushai"
        },
        iluvuzoraorb: {
            mintAddress: "0x041D54c20cE67959eF5b0FE9fb23e3BEdFdFb2b3",
            arguments: [1],
            abi: nftMintAbi,
            fnName: "mint",
            nftName: "I Luv U Zora Orb"
        },
        bone: {
            mintAddress: "0x1A6b1817de2Dbb236F2443B20fb6dFD24064288c",
            arguments: [1],
            abi: nftMintAbi,
            fnName: "mint",
            nftName: "Bone"      
        },
        novaparcel: {
            mintAddress: "0x7b49666092AB73043Bd36459bA0A4282b1d30e03",
            arguments: [2],
            abi: nftMintAbi,
            fnName: "mint",
            nftName: "Nova Parcel"      
        },
        cattleReturn: {
            mintAddress: "0x921482429347bb8DD567f1b04aA27d044671930C",
            arguments: [1],
            abi: nftMintAbi,
            fnName: "mint",
            nftName: "Cattle Return"   
        }
    };
    path = (shuffleArray(Object.keys(nftMintInfo)).slice(0, mintsCount).map((value) =>
    {
        return nftMintInfo[value];
    }))

    return path;
};


module.exports = { generatePath }