var Lib;
(function (Lib) {
    var Visuals;
    (function (Visuals) {
        var Inputs;
        (function (Inputs) {
            class SimpleInput {
                constructor(type, element) {
                    if (typeof element === "string")
                        this.htmlelement = document.getElementById(element);
                    else if (element instanceof HTMLDivElement)
                        this.htmlelement = element;
                    else
                        this.htmlelement = document.createElement("div");
                    this.htmlelement.style.display = "flex";
                    this.label = document.createElement("label");
                    this.label.style.display = "inline-block";
                    this.label.style.marginRight = "3px";
                    this.htmlelement.appendChild(this.label);
                    this.input = document.createElement("input");
                    this.img = document.createElement("img");
                    this.input.style.fontSize = "14px";
                    this.input.style.backgroundColor = "#fff";
                    this.input.style.backgroundImage = "none";
                    this.input.style.border = this.img.style.border = "1px solid #ccc";
                    this.input.style.padding = this.img.style.padding = "3px 3px";
                    this.input.style.borderRadius = this.img.style.borderRadius = "4px";
                    this.input.style.color = this.img.style.color = "#555";
                    this.input.style.height = this.img.style.height = this.img.style.width = "34px";
                    this.input.style.display = "inline-block";
                    this.img.style.display = "inline-block";
                    this.img.style.backgroundColor = "#eee";
                    this.input.type = this.type = type;
                    this.htmlelement.appendChild(this.input);
                    this.htmlelement.appendChild(this.img);
                }
                set title(val) {
                    this.label.innerHTML = val;
                }
                get title() {
                    return this.label.innerHTML;
                }
                get type() {
                    return this.input.type;
                }
                set type(val) {
                    if (val == "color")
                        this.img.src = "/Lib/visuals/inputs/simpleinput/img/color.png";
                    else if (val == "text")
                        this.img.src = "/Lib/visuals/inputs/simpleinput/img/text.png";
                    else if (val == "date")
                        this.img.src = "/Lib/visuals/inputs/simpleinput/img/calendar.png";
                    else if (val == "datetime-local")
                        this.img.src = "/Lib/visuals/inputs/simpleinput/img/calendarclock.png";
                    else if (val == "email")
                        this.img.src = "/Lib/visuals/inputs/simpleinput/img/email.png";
                    else if (val == "month")
                        this.img.src = "/Lib/visuals/inputs/simpleinput/img/calendar.png";
                    else if (val == "number")
                        this.img.src = "/Lib/visuals/inputs/simpleinput/img/number.png";
                    else if (val == "range")
                        this.img.src = "/Lib/visuals/inputs/simpleinput/img/range.png";
                    else if (val == "search")
                        this.img.src = "/Lib/visuals/inputs/simpleinput/img/search.png";
                    else if (val == "tel")
                        this.img.src = "/Lib/visuals/inputs/simpleinput/img/tel.png";
                    else if (val == "time")
                        this.img.src = "/Lib/visuals/inputs/simpleinput/img/clock.png";
                    else if (val == "url")
                        this.img.src = "/Lib/visuals/inputs/simpleinput/img/url.png";
                    else if (val == "week")
                        this.img.src = "/Lib/visuals/inputs/simpleinput/img/week.png";
                    else if (val == "password")
                        this.img.src = "/Lib/visuals/inputs/simpleinput/img/password.png";
                    this.input.type = val;
                }
                get value() {
                    return this.input.value;
                }
                set value(val) {
                    this.input.value = val;
                }
                get valueAsDate() {
                    let val = new Date(this.input.valueAsNumber);
                    val.setMinutes(val.getMinutes() + val.getTimezoneOffset());
                    return val;
                }
                set valueAsDate(val) {
                    let aux = new Date(val.getTime());
                    aux.setMinutes(val.getMinutes() - val.getTimezoneOffset());
                    this.input.valueAsNumber = aux.getTime();
                }
                get valueAsNumber() {
                    return this.input.valueAsNumber;
                }
                set valueAsNumber(val) {
                    this.input.valueAsNumber = val;
                }
                set onchange(fnc) {
                    this.htmlelement.onchange = (ev) => fnc(this, ev);
                }
                get disabled() {
                    return this.input.disabled;
                }
                set disabled(val) {
                    this.input.disabled = val;
                }
                format00(val) {
                    let aux = val.toString();
                    if (val < 10)
                        return "0" + aux;
                    else
                        return aux;
                }
            }
            Inputs.SimpleInput = SimpleInput;
        })(Inputs = Visuals.Inputs || (Visuals.Inputs = {}));
    })(Visuals = Lib.Visuals || (Lib.Visuals = {}));
})(Lib || (Lib = {}));
