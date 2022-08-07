class ParameterDeviceOption {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.htmlelement = document.createElement("option");
        this.htmlelement.value = id;
        this.htmlelement.innerHTML = name;
    }
}
