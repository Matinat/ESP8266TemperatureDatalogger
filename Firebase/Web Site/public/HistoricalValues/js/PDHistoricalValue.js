class PDHistoricalValue {
	constructor() {
     
    }
    static parseArray(ajaxarray) {
        let ret = new Array(ajaxarray.length);
        for (let i = 0; i < ajaxarray.length; i++) {
            ret[i] = new PDHistoricalValue(ajaxarray[i]);
        }
        return ret;
    }
    static compareInstant(a, b) {
        if (a.i > b.i)
            return 1;
        if (a.i < b.i)
            return -1;
        return 0;
    }
}