import {parameterInstance} from "./../../Controllers/ParameterController/ParameterController.js"

class HistoricalPicture {
    constructor() {
        window.document.title = "Sensor";
        this.loader = new Lib.Visuals.LoadingPanel();
        this.loadingcount = 0;
        this.linecanvasid = "historicalchart";
        this.linechart = new Views.Shared.Components.Charts.LineChart.LineChartXY(this.linecanvasid);
        this.btnaddline = document.getElementById("btnaddline");
        this.btnfilterdate = document.getElementById("btnfilterdate");
        
        this.cbxparms = document.getElementById("cbxparms");
        this.inputfrom = document.getElementById("inputfrom");
        this.inputto = document.getElementById("inputto");
        this.btnexport = document.getElementById("btnexport");
        let datenow = new Date();
        let yearnow = datenow.getFullYear();
        let monthnow = datenow.getMonth();
        let daynow = datenow.getDate();
        let date = new Date(yearnow, monthnow, daynow, 0, 0, 0, 0);
        let dateparsemax = this.getMaxDate(date);
        let dateparsemin = this.getMinDate(date);
        this.inputfrom.max = dateparsemax;
        this.inputto.max = this.inputfrom.max;
        this.inputto.min = this.inputfrom.min;
        this.inputfrom.min = dateparsemin;
        this.inputfrom.valueAsDate = new Date(yearnow, monthnow, daynow);
        this.inputto.valueAsDate = new Date(yearnow, monthnow, daynow);
      
        this.inputfrom.onchange = () => this.onInputFromChange();
        this.inputto.onchange = () => this.onInputToChange();
        this.btnaddline.onclick = (ev) => this.btnaddline_onClick(ev);
        this.btnfilterdate.onclick = (ev) => this.btnfilterdate_onClick(ev);
        this.btnexport.onclick = (ev) => this.btnexport_onClick(ev);

        this.receiveDeviceParametersName();
    }
    set loadingCount(val) {
        this.loadingcount = val;
        if (val > 0) {
            if (!this.loader.isShowing)
                this.loader.show(document.body);
        }
        else {
            if (this.loader.isShowing)
                this.loader.hide();
        }
    }
    get loadingCount() {
        return this.loadingcount;
    }
    getMinDate(date) {
        let d = new Date(date), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = (d.getFullYear() - 1);
        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        return [year, month, day].join('-');
    }
    getMaxDate(date) {
        var d = new Date(date), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();
        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        return [year, month, day].join('-');
    }	    
   
    onInputFromChange() {
        if (this.inputfrom.valueAsDate > this.inputto.valueAsDate) {
            this.inputfrom.valueAsDate = new Date();
        }
        return true;
    }
    onInputToChange() {
        if (this.inputfrom.valueAsDate > this.inputto.valueAsDate) {
            this.inputto.valueAsDate = new Date();
        }
        return true;
    }
    receiveDeviceParametersName() {
		//this.params = d;
		this.cbxparms.length = 0;	

		let temp = new ParameterDeviceOption("t", "Temperatura");
		let hum = new ParameterDeviceOption("h", "Humedad");
	  
		this.cbxparms.options.add(temp.htmlelement);	
		this.cbxparms.options.add(hum.htmlelement);	
		
		$("#cbxparms").selectpicker("refresh");		
    }
 
    btnaddline_onClick(ev) {
		
       
	
        let parametername = this.cbxparms.selectedOptions.item(0).innerHTML;
        let parameterid = this.cbxparms.selectedOptions.item(0).value;
      
        if (!this.linechart.exist(parameterid) && (parameterid != "")) {
			let from = this.getDateFrom();
            let to = this.getDateTo();
            parameterInstance.getAll((pars) => this.addValues(parametername, parameterid, pars), from, to);
        }
    }
    btnfilterdate_onClick(ev) {
        let values = this.linechart.getDataset();
        this.linechart.clearData();

        if (values.length > 0) {
            let from = this.getDateFrom();
            let to = this.getDateTo();
            for (let i = 0; i < values.length; i++) {
                let value = values[i];
                parameterInstance.getAll((pars) => this.addValues(value.datasetlabel, value.parameterid, pars), from, to);
            } 
        }
    }
    addValues(label, pd_id, parameters) {
       


		 let pars = [];			
        if (parameters.length) {
            parameters.sort((a, b) => PDHistoricalValue.compareInstant(a, b));           		
			
			for (let i = 1; i < parameters.length; ++i) {
                let p = parameters[i];
				let inst = new Date(p.i);			
				
				if(pd_id == "t")
					pars.push({value: p.t, instant: inst});
				else if(pd_id == "h")
					pars.push({value: p.h, instant: inst});
				
            }
        }
        this.linechart.setData(label, pars, pd_id);
    }
    btnexport_onClick(ev) {
        this.loadData();
    }
	
	
    loadData() {
        let content;
        let values = this.linechart.getDatasetWithValues();
        if (values.length > 0) {
            content = 'Instante;Parametro;Valor';
            for (let i = 0; i < values.length; ++i) {
                let hist = values[i];
                let dato;
                if (hist.value == undefined)
                    dato = 'NO COMM';
                else
                    dato = hist.value.toString();
                content += ';\n' + Lib.Utilities.DateUtilities.datetimeToString(hist.instant) + ';' + hist.datasetlabel + ';' + dato;
            }
            const download = (name, content) => {
                const elm = document.createElement('a');
                const href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(content);
                const event = new MouseEvent('click', {
                    cancelable: true,
                    view: window,
                });
                elm.setAttribute('href', href);
                elm.setAttribute('download', name);
                elm.dispatchEvent(event);
            };
            download('report_' + this.getDate() + '.csv', content);
        }
    }
    getDate() {
        let d = new Date(), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = (d.getFullYear());
        return [year, month, day].join('-');
    }
    getDateFrom() {
        return new Date(this.inputfrom.valueAsDate.getUTCFullYear(), this.inputfrom.valueAsDate.getUTCMonth(), this.inputfrom.valueAsDate.getUTCDate(), 0, 0, 0, 0);
    }
    getDateTo() {
        return new Date(this.inputto.valueAsDate.getUTCFullYear(), this.inputto.valueAsDate.getUTCMonth(), this.inputto.valueAsDate.getUTCDate(), 23, 59, 59, 999);
    }
}
new HistoricalPicture();
