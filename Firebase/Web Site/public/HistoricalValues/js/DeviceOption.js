class DeviceOption {
    constructor(id, serie) {
        this.id = id;
        this.serie = serie;
        this.htmlelement = document.createElement("option");
        this.htmlelement.value = id.toString();
        this.htmlelement.innerHTML = serie;
    }
}
