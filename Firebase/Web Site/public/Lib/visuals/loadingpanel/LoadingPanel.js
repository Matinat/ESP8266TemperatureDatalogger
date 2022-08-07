if (true) {
    let link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "./../Lib/visuals/loadingpanel/LoadingPanel.css";
    document.head.appendChild(link);
}
var Lib;
(function (Lib) {
    var Visuals;
    (function (Visuals) {
        class LoadingPanel {
            constructor() {
                this.htmlelement = document.createElement("div");
                this.htmlelement.className = "loadingpanel";
                this.htmlelement.style.zIndex = Number.MAX_SAFE_INTEGER.toString();
                let span = document.createElement("span");
                span.className = "loadingpanel-span";
                this.htmlelement.appendChild(span);
            }
            show(surface) {
                surface.appendChild(this.htmlelement);
            }
            hide() {
                this.htmlelement.remove();
            }
            get isShowing() {
                return !!this.htmlelement.parentElement;
            }
        }
        Visuals.LoadingPanel = LoadingPanel;
    })(Visuals = Lib.Visuals || (Lib.Visuals = {}));
})(Lib || (Lib = {}));
