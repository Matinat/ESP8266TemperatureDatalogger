var Lib;
(function (Lib) {
    var Utilities;
    (function (Utilities) {
        var RegionalUtilities;
        (function (RegionalUtilities) {
            RegionalUtilities.LIST_SEPARATOR = ';';
            RegionalUtilities.DECIMAL_SEPARATOR = 1.1.toLocaleString().substring(1, 2);
            RegionalUtilities.NEW_LINE = "\n";
            let dateformat;
            let dateformatseparator;
            let dateformatddpos;
            let dateformatmmpos;
            let dateformatyyyypos;
            function loadFormatDate() {
                let y = new Date(2013, 9, 25);
                let lds = y.toLocaleDateString();
                for (let i = 0; i < lds.length; ++i) {
                    let sep = lds[i];
                    if (!Utilities.NumberUtilities.isNumeric(sep)) {
                        dateformatseparator = sep;
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
                        formatString += "YYYY" + dateformatseparator;
                        dateformatyyyypos = i;
                    }
                    else if (order[i] == this.dateformatddpos) {
                        formatString += "DD" + dateformatseparator;
                        dateformatddpos = i;
                    }
                    else if (order[i] == this.dateformatmmpos) {
                        formatString += "MM" + dateformatseparator;
                        dateformatmmpos = i;
                    }
                }
                dateformat = formatString.substring(0, formatString.length - 1);
            }
            function dateFormat() {
                if (dateformat === undefined)
                    loadFormatDate();
                return dateformat;
            }
            RegionalUtilities.dateFormat = dateFormat;
            function dateFormatSeparator() {
                if (dateformatseparator === undefined)
                    loadFormatDate();
                return dateformatseparator;
            }
            RegionalUtilities.dateFormatSeparator = dateFormatSeparator;
            function dateFormatDayPos() {
                if (dateformatddpos === undefined)
                    loadFormatDate();
                return dateformatddpos;
            }
            RegionalUtilities.dateFormatDayPos = dateFormatDayPos;
            function dateFormatMonthPos() {
                if (dateformatmmpos === undefined)
                    loadFormatDate();
                return dateformatmmpos;
            }
            RegionalUtilities.dateFormatMonthPos = dateFormatMonthPos;
            function dateFormatYearPos() {
                if (dateformatyyyypos === undefined)
                    loadFormatDate();
                return dateformatyyyypos;
            }
            RegionalUtilities.dateFormatYearPos = dateFormatYearPos;
        })(RegionalUtilities = Utilities.RegionalUtilities || (Utilities.RegionalUtilities = {}));
    })(Utilities = Lib.Utilities || (Lib.Utilities = {}));
})(Lib || (Lib = {}));
