var Lib;
(function (Lib) {
    var Utilities;
    (function (Utilities) {
        var DateUtilities;
        (function (DateUtilities) {
            function diffInHs(date1, date2) {
                return Math.abs(date1 - date2) / 36e5;
            }
            DateUtilities.diffInHs = diffInHs;
            function parseDate(date) {
                try {
                    let aux = date.split(Utilities.RegionalUtilities.dateFormatSeparator());
                    if (aux.length === 3) {
                        let parsed = new Date(parseInt(aux[Utilities.RegionalUtilities.dateFormatYearPos()]), parseInt(aux[Utilities.RegionalUtilities.dateFormatMonthPos()]) - 1, parseInt(aux[Utilities.RegionalUtilities.dateFormatDayPos()]));
                        if (validateDate(parsed))
                            return parsed;
                    }
                }
                catch (e) { }
                return undefined;
            }
            DateUtilities.parseDate = parseDate;
            function dateToString(date) {
                let dd = date.getDate().toString();
                if (date.getDate() < 10)
                    dd = '0' + dd;
                let mm = (date.getMonth() + 1).toString();
                if (date.getMonth() < 9)
                    mm = '0' + mm;
                let yyyy = date.getFullYear().toString();
                let dateformatseparator = Utilities.RegionalUtilities.dateFormatSeparator();
                let values = [];
                values[Utilities.RegionalUtilities.dateFormatDayPos()] = dd;
                values[Utilities.RegionalUtilities.dateFormatMonthPos()] = mm;
                values[Utilities.RegionalUtilities.dateFormatYearPos()] = yyyy;
                return values[0] + dateformatseparator + values[1] + dateformatseparator + values[2];
            }
            DateUtilities.dateToString = dateToString;
            function timeToString(date) {
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
            DateUtilities.timeToString = timeToString;
            function datetimeToString(date) {
                return dateToString(date) + ' ' + timeToString(date);
            }
            DateUtilities.datetimeToString = datetimeToString;
            function validateDate(date) {
                return !isNaN(date.getTime());
            }
            DateUtilities.validateDate = validateDate;
            function validateTimeFormat(time) {
                try {
                    let aux = time.split(":");
                    return aux.length == 3 && aux[0].match(/^\d{1,2}$/) != null && aux[1].match(/^\d{1,2}$/) != null && aux[2].match(/^\d{1,2}$/) != null &&
                        parseInt(aux[0]) < 24 && parseInt(aux[1]) < 60 && parseInt(aux[2]) < 60;
                }
                catch (e) { }
                return false;
            }
            DateUtilities.validateTimeFormat = validateTimeFormat;
            function parseUTCtoGMT(date) {
                let parsed = new Date(date);
                parsed.setMinutes(date.getMinutes() - parsed.getTimezoneOffset());
                return parsed;
            }
            DateUtilities.parseUTCtoGMT = parseUTCtoGMT;
            function parseGMTtoUTC(date) {
                let parsed = new Date(date);
                parsed.setMinutes(date.getMinutes() + parsed.getTimezoneOffset());
                return parsed;
            }
            DateUtilities.parseGMTtoUTC = parseGMTtoUTC;
            function diffInMs(a, b) {
                return a.getTime() - b.getTime();
            }
            DateUtilities.diffInMs = diffInMs;
            function diffInDays(a, b) {
                return diffInMs(a, b) / 86400000;
            }
            DateUtilities.diffInDays = diffInDays;
            function toTimestampString(date) {
                let mm = date.getMonth() + 1;
                let dd = date.getDate();
                let hh = date.getHours();
                let min = date.getMinutes();
                let ss = date.getSeconds();
                return date.getFullYear() + (mm > 9 ? '' : '0') + mm + (dd > 9 ? '' : '0') + dd +
                    (hh > 9 ? '' : '0') + hh + (min > 9 ? '' : '0') + min + (ss > 9 ? '' : '0') + ss;
            }
            DateUtilities.toTimestampString = toTimestampString;
            function addMinutes(date, minutes) {
                return new Date(date.getTime() + minutes * 60000);
            }
            DateUtilities.addMinutes = addMinutes;
            function validateBetweenDates(from, to, days) {
                let fromParsed, toParsed;
                if (typeof from == "string") {
                    fromParsed = Date.parse(from);
                }
                else if (from instanceof Date) {
                    fromParsed = from.toISOString().split("T")[0];
                    fromParsed = Date.parse(fromParsed);
                }
                if (typeof to == "string") {
                    toParsed = Date.parse(to);
                }
                else if (to instanceof Date) {
                    toParsed = to.toISOString().split("T")[0];
                    toParsed = Date.parse(toParsed);
                }
                if (isNaN(fromParsed)) {
                    alert("The start date provided is not valid, please enter a valid date.");
                    return false;
                }
                if (isNaN(toParsed)) {
                    alert("The end date provided is not valid, please enter a valid date.");
                    return false;
                }
                let difference = (toParsed - fromParsed);
                if (difference < 0) {
                    alert("The start date must come before the end date.");
                    return false;
                }
                let maxTime = new Date(fromParsed).setDate(new Date(fromParsed).getDate() + days);
                if (new Date(toParsed) > new Date(maxTime)) {
                    alert("The maximum range is " + days + " days");
                    return false;
                }
                return true;
            }
            DateUtilities.validateBetweenDates = validateBetweenDates;
            function addDaystoDate(datetoadd, days) {
                datetoadd.setDate(datetoadd.getDate() + days);
                return datetoadd;
            }
            DateUtilities.addDaystoDate = addDaystoDate;
            function getDatesBetween(startDate, stopDate) {
                if (startDate < stopDate) {
                    let dateArray = new Array();
                    let currentDate = startDate;
                    while (currentDate <= stopDate) {
                        let auxdate = new Date(currentDate);
                        auxdate.setHours(23, 59, 59, 999);
                        dateArray.push(auxdate);
                        currentDate = new Date(Lib.Utilities.DateUtilities.addDaystoDate(auxdate, 1));
                    }
                    dateArray[0].setHours(0, 0, 0, 0);
                    return dateArray;
                }
                else if (startDate == stopDate) {
                    let dateArray = new Array();
                    let currentDate = startDate.setHours(0, 0, 0, 0);
                    let endDate = stopDate.setHours(23, 59, 59, 999);
                    dateArray.push(currentDate);
                    dateArray.push(endDate);
                    return dateArray;
                }
                else if (startDate > stopDate) {
                    throw Error + "La fecha de inicio es mayor que la fecha de fin";
                }
            }
            DateUtilities.getDatesBetween = getDatesBetween;
        })(DateUtilities = Utilities.DateUtilities || (Utilities.DateUtilities = {}));
    })(Utilities = Lib.Utilities || (Lib.Utilities = {}));
})(Lib || (Lib = {}));
