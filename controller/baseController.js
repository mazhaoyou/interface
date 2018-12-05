class baseController {
    constructor(res) {
        this.res = res
        this.results = {
            code:200,
            status: 'successful',
            content: null
        }
    }

    json(status, data) {
        return this.res.status(200).json(status, this.result(data.content))
    }

    result(data){
        this.results.content = data;
        return this.results
    }

}

module.exports = baseController