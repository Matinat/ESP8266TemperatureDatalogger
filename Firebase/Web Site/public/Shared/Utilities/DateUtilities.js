class DateUtilities {
    static get dateFormat() {
        if (DateUtilities.dateformat === undefined)
            DateUtilities.loadFormatDate();
        return DateUtilities.dateformat;
    }
    static get dateFormatSeparator() {
        if (DateUtilities.dateformatseparator === undefined)
            DateUtilities.loadFormatDate();
        return DateUtilities.dateformatseparator;
    }
    static loadFormatDate() {
        let y = new Date(2013, 9, 25);
        let lds = y.toLocaleDateString();
        for (let i = 0; i < lds.length; ++i) {
            let sep = lds[i];
            if (!DateUtilities.isNumeric(sep)) {
                DateUtilities.dateformatseparator = sep;
                break;
            }
        }
        this.dateformatyyyypos = lds.search("2013");
        this.dateformatddpos = lds.search("25");
        this.dateformatmmpos = lds.search("10");
        if (this.dateformatmmpos == -1) {
            this.dateformatmmpos = lds.search("9");
            if (this.dateformatmmpos == -1) {
                if (this.dateformatyyyypos != 0 && this.dateformatddpos != 0) {
                    this.dateformatmmpos = 0;
                }
                else if ((this.dateformatyyyypos + 4 < lds.length) && (this.dateformatddpos + 2 < lds.length)) {
                    this.dateformatmmpos = Infinity;
                }
                else if (this.dateformatyyyypos < this.dateformatddpos) {
                    this.dateformatmmpos = ((this.dateformatddpos - this.dateformatyyyypos) / 2) + this.dateformatyyyypos;
                }
                else if (this.dateformatddpos < this.dateformatyyyypos) {
                    this.dateformatmmpos = ((this.dateformatyyyypos - this.dateformatddpos) / 2) + this.dateformatddpos;
                }
            }
        }
        let formatString = "";
        let order = [this.dateformatyyyypos, this.dateformatddpos, this.dateformatmmpos];
        order.sort(function (a, b) { return a - b; });
        for (let i = 0; i < order.length; i++) {
            if (order[i] == this.dateformatyyyypos) {
                formatString += "YYYY" + DateUtilities.dateformatseparator;
                DateUtilities.dateformatyyyypos = i;
            }
            else if (order[i] == this.dateformatddpos) {
                formatString += "DD" + DateUtilities.dateformatseparator;
                DateUtilities.dateformatddpos = i;
            }
            else if (order[i] == this.dateformatmmpos) {
                formatString += "MM" + DateUtilities.dateformatseparator;
                DateUtilities.dateformatmmpos = i;
            }
        }
        DateUtilities.dateformat = formatString.substring(0, formatString.length - 1);
    }
    static parseDate(date) {
        try {
            let aux = date.split(DateUtilities.dateFormatSeparator);
            if (aux.length === 3) {
                let parsed = new Date(parseInt(aux[DateUtilities.dateformatyyyypos]), parseInt(aux[DateUtilities.dateformatmmpos]) - 1, parseInt(aux[DateUtilities.dateformatddpos]));
                if (DateUtilities.validateDate(parsed))
                    return parsed;
            }
        }
        catch (e) { }
        return undefined;
    }
    static dateToString(date) {
        let dd = date.getDate().toString();
        if (date.getDate() < 10)
            dd = '0' + dd;
        let mm = (date.getMonth() + 1).toString();
        if (date.getMonth() < 9)
            mm = '0' + mm;
        let yyyy = date.getFullYear().toString();
        if (!DateUtilities.dateformatseparator)
            DateUtilities.loadFormatDate();
        let values = [];
        values[DateUtilities.dateformatddpos] = dd;
        values[DateUtilities.dateformatmmpos] = mm;
        values[DateUtilities.dateformatyyyypos] = yyyy;
        return values[0] + DateUtilities.dateformatseparator + values[1] + DateUtilities.dateformatseparator + values[2];
    }
    static timeToString(date) {
        let hh = date.getHours().toString();
        if (date.getHours() < 10)
            hh = '0' + hh;
        let mm = date.getMinutes().toString();
        if (date.getMinutes() < 10)
            mm = '0' + mm;
        let ss = date.getSeconds().toString();
        if (date.getSeconds() < 10)
            ss = '0' + ss;
        return hh + ':' + mm + ':' + ss;
    }
    static datetimeToString(date) {
        return DateUtilities.dateToString(date) + ' ' + DateUtilities.timeToString(date);
    }
    static validateDate(date) {
        return !isNaN(date.getTime());
    }
    static validateTimeFormat(time) {
        try {
            let aux = time.split(":");
            return aux.length == 3 && aux[0].match(/^\d{1,2}$/) != null && aux[1].match(/^\d{1,2}$/) != null && aux[2].match(/^\d{1,2}$/) != null &&
                parseInt(aux[0]) < 24 && parseInt(aux[1]) < 60 && parseInt(aux[2]) < 60;
        }
        catch (e) { }
        return false;
    }
    static isNumeric(n) {
        let aux = parseFloat(n);
        return !isNaN(aux) && isFinite(aux);
    }
    static parseUTCtoGMT(date) {
        let parsed = new Date(date);
        parsed.setMinutes(date.getMinutes() - parsed.getTimezoneOffset());
        return parsed;
    }
    static parseGMTtoUTC(date) {
        let parsed = new Date(date);
        parsed.setMinutes(date.getMinutes() + parsed.getTimezoneOffset());
        return parsed;
    }
}
