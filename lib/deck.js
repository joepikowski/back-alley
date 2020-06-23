const API_Client = require('./api_client.js');

class Deck extends API_Client {

    constructor(host = 'deckofcardsapi.com', endpoint = '/api/deck'){
        super(host);
        this.endpoint = endpoint;
        this.id = '';
    }

    async new(n = 1, callback){
        const data = {
            'deck_count': 1
        };
        const res = await this.deckRequest({
            'method': 'get',
            'path': `/new/shuffle/`,
            'query': data,
            'handler': this.processJSON.bind(this),
            'callback': callback
        });
        this.id = res.deck_id;
        return res.success;
    }

    async shuffle(callback){
        const res = await this.deckRequest({
            'method': 'get',
            'path': `/${this.id}/shuffle/`,
            'handler': this.processJSON.bind(this),
            'callback': callback
        });
        return res.success;
    }

    async draw(count = 1, callback){
        const data = {
            'count': count
        };
        const res = await this.deckRequest({
            'method': 'get',
            'query': data,
            'path': `/${this.id}/draw/`,
            'handler': this.processJSON.bind(this),
            'callback': callback
        });
        return res;
    }

    deckRequest(r){
        return new Promise( (resolve, reject) => {
            this.executeRequest(r)
            .then(this.resolveRequest.bind(this,r,resolve))
            .catch(this.rejectRequest.bind(this,r,reject))
        });
    }

    executeRequest(r){
        return this[r.method](r)
            .then(r.handler)
            .catch((err) => {
                return Promise.reject(err);
            })
    }

    resolveRequest(r, resolve, res){
        if (r.callback && !r.callbackExecuted){
            r.callbackExecuted = true;
            r.callback(null, res);
        }
        resolve(res);
    }

    rejectRequest(r, reject, err){
        if (r.callback && !r.callbackExecuted){
            r.callbackExecuted = true;
            r.callback(err)
        }else{
            reject(err);
        }
    }

	processJSON(res){
        return this.process(res, this.parseJSON);
    }

    processResponse(res){
        return this.process(res, this.parseResponse);
    }

    process(res, parser){
        return new Promise( (resolve, reject) => {
            try{
                const status = res.response.statusCode;
                if (status.toString().match(/20[0-9]/) === null){
                    reject(new Error(`Bad Response From API: Status Code ${status} | ${res.body}`));
                }
                parser(res.body.trim(), resolve, reject);
            }catch(e){
                reject(new Error(`Error Parsing Response from API: Status Code ${status} | ${e}`));
            }
        });
    }

    parseJSON(body, resolve, reject){
        try {
            if (body){
                resolve(JSON.parse(body));
            }else{
                resolve(true);
            }
        }catch(e){
            reject(new Error(`Error Parsing JSON Response: ${e}`));
        }
    }

    get(req){
        return this.request('apiGet', req);
    }

    post(req){
        return this.request('apiPost', req);
    }

    put(req){
        return this.request('apiPut', req);
    }

    patch(req){
        return this.request('apiPatch', req);
    }

    delete(req){
        return this.request('apiDelete', req);
    }

    request(method, req){
        return this[method]({
            'path': this.endpoint + req.path,
            'body': req.body,
            'query': req.query,
            'headers': {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'User-Agent': 'back-alley-client/1.0.0'
            }
        });
    }
}

module.exports = Deck;
