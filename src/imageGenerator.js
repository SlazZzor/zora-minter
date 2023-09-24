const { infuraApiKey, infuraApiSecret } = require("../config.js");
const { create } = require("ipfs-http-client");
const { shuffleArray } = require("./utils")


function getImageIpfs(){
    return new Promise ((resolve, reject) => {
        try {
            const resolution = shuffleArray(["400x400", "500x500", "600x600", "700x700", "800x800", "640x480", "800x600", "320x240", "320x200"])[0]
            const auth = 'Basic ' + Buffer.from(infuraApiKey + ':' + infuraApiSecret).toString('base64');
            const client = create({
                host: 'ipfs.infura.io',
                port: 5001,
                protocol: 'https',
                headers: {
                    authorization: auth,
                }
            });
            fetch(`https://source.unsplash.com/${resolution}/`)
                .then((response) => {
                    fetch(response.url).then(r => r.blob()
                        .then((blobFile) => {
                            client.add(blobFile).then((result) => {
                                const url = `ipfs://${result.path}`;
                                resolve(url);
                            });        
                }))
            });
        } catch (error){
            console.error(error);
            console.error(`Ошибка во время генерации картинки, использую несуществующие картинки`);
            return ("ipfs://bafkreig" + generateRandomString(51)).toLowerCase();
        }
    })
};


module.exports = { getImageIpfs };