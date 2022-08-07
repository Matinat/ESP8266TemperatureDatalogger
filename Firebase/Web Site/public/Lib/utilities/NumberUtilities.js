var Lib;
(function (Lib) {
    var Utilities;
    (function (Utilities) {
        var NumberUtilities;
        (function (NumberUtilities) {
            function rangeIntersection(a, b) {
                let min = (a.start < b.start ? a : b);
                let max = (min == a ? b : a);
                if (min.end < max.start)
                    return null;
                return { start: max.start, end: (min.end < max.end ? min.end : max.end) };
            }
            NumberUtilities.rangeIntersection = rangeIntersection;
            function toFixed(bignumber, fractionDigits) {
                let str = bignumber.toFixed(fractionDigits);
                if (str.indexOf('e+') < 0) {
                    if (Utilities.RegionalUtilities.DECIMAL_SEPARATOR !== '.')
                        str = str.replace('.', Utilities.RegionalUtilities.DECIMAL_SEPARATOR);
                    return str;
                }
                return toStringWithoutScientificNotation(str) + Utilities.RegionalUtilities.DECIMAL_SEPARATOR + Array(fractionDigits + 1).join('0');
            }
            NumberUtilities.toFixed = toFixed;
            function toStringWithoutScientificNotation(bignumber) {
                if (typeof bignumber !== "number") {
                    bignumber = parseFloat(bignumber);
                    if (isNaN(bignumber)) {
                        return "NaN";
                    }
                }
                let sign;
                let e;
                if (bignumber < 0) {
                    sign = "-";
                    bignumber = Math.abs(bignumber);
                }
                else
                    sign = "";
                if (bignumber < 1.0) {
                    e = parseInt(bignumber.toString().split('e-')[1]);
                    if (e) {
                        bignumber *= Math.pow(10, e - 1);
                        bignumber = '0' + Utilities.RegionalUtilities.DECIMAL_SEPARATOR + (new Array(e)).join('0') + bignumber.toString().substring(2);
                    }
                }
                else {
                    e = parseInt(bignumber.toString().split('e+')[1]);
                    if (e) {
                        bignumber /= Math.pow(10, e);
                        bignumber += (new Array(e + 1)).join('0');
                    }
                }
                return sign + bignumber;
            }
            NumberUtilities.toStringWithoutScientificNotation = toStringWithoutScientificNotation;
            function calculateMCD(a, b) {
                while (b != 0) {
                    let t = b;
                    b = a % b;
                    a = t;
                }
                return a;
            }
            NumberUtilities.calculateMCD = calculateMCD;
            function isNumeric(n) {
                let aux = parseFloat(n);
                return !isNaN(aux) && isFinite(aux);
            }
            NumberUtilities.isNumeric = isNumeric;
            function round(value, decimals) {
                return Number(Math.round(Number(value + 'e' + decimals)) + 'e-' + decimals);
            }
            NumberUtilities.round = round;
        })(NumberUtilities = Utilities.NumberUtilities || (Utilities.NumberUtilities = {}));
    })(Utilities = Lib.Utilities || (Lib.Utilities = {}));
})(Lib || (Lib = {}));
