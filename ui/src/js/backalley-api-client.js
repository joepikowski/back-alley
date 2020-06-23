class BackAlleyAPI {

    constructor(){
        this.endpoint = '/backalley/api';
    }

    startGame(){
        return this.get({
            path: `/startGame`
        });
    }

    playCard(player, card){
        return this.get({
            path: `/playCard/${player}/${card}`
        });
    }

    recordBid(player, bid){
        return this.get({
            path: `/bid/${player}/${bid}`
        });
    }

    addPlayer(player){
        return this.get({
            path: `/addPlayer/${player}`
        });
    }

    removePlayer(player){
        return this.get({
            path: `/removePlayer/${player}`
        });
    }

    sendChatMsg(player, msg){
        const data = {
            msg: msg
        };
        return this.post({
            path: `/chatMessage/${player}`,
            body: JSON.stringify(data)
        });
    }

    reset(){
        return this.get({
            path: `/reset/`
        });
    }

    undo(steps){
        return this.get({
            path: `/undo/${steps}`
        });
    }

    get(req){
        return this.request('get', req);
    }

    post(req){
        return this.request('post', req);
    }

    put(req){
        return this.request('put', req);
    }

    del(req){
        return this.request('delete', req);
    }

    request(method, req){
        let {path, body} = req;
        return fetch(this.endpoint + path, {
            method: method,
            body: body,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

}

export default new BackAlleyAPI();
