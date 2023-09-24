const { ethers, JsonRpcProvider, FetchRequest } = require('ethers');
const fetch = require('node-fetch');
const { HttpsProxyAgent } = require('https-proxy-agent');
const http = require('node:http');


function getProvider(proxyUrl = ""){
    const getUrl = async (req, _signal) => {
        let signal;
      
        if (_signal) {
            const controller = new AbortController();
            signal = controller.signal;
            _signal.addListener(() => { controller.abort(); });
        }
      
        const init = {
          method: req.method,
          headers: req.headers,
          body: req.body || undefined,
          signal
        };
    
        if (proxyUrl != ""){
            init.agent = new HttpsProxyAgent(proxyUrl);
        };
      
        const resp = await fetch(req.url, init);
      
        const headers = {};
        resp.headers.forEach((value, key) => {
          headers[key.toLowerCase()] = value;
        });
      
        const respBody = await resp.arrayBuffer();
        const body = (respBody == null) ? null: new Uint8Array(respBody);
        
        return {
          statusCode: resp.status,
          statusMessage: resp.statusText,
          headers,
          body
        };
    };

    FetchRequest.registerGetUrl(getUrl);
    const provider = new JsonRpcProvider("https://rpc.zora.energy");
    return provider;
};


module.exports = { getProvider };