if (true) {
    let css = document.createElement("link");
    css.href = './../Lib/visuals/dialogs/style/dialogform.css';
    css.rel = "stylesheet";
    document.head.appendChild(css);
}
var Lib;
(function (Lib) {
    var Visuals;
    (function (Visuals) {
        var Dialogs;
        (function (Dialogs) {
            class DialogForm {
                constructor(elementid) {
                    this.elementcontainer = document.createElement("div");
                    if (elementid)
                        this.elementcontainer.id = elementid;
                    this.elementcontainer.className = "dialog-overlay";
                    this.elementcontainer.onclick = (e) => {
                        if (e.target === this.elementcontainer) {
                            this.close(0);
                        }
                    };
                    let div = document.createElement("div");
                    div.className = "dialog";
                    this.elementcontainer.appendChild(div);
                    this.dialogform = document.createElement("div");
                    this.dialogform.className = "content";
                    div.appendChild(this.dialogform);
                    this.elementheader = document.createElement("div");
                    this.elementheader.className = "header";
                    this.dialogform.appendChild(this.elementheader);
                    this.elementtitle = document.createElement("h3");
                    this.elementtitle.className = "h h3";
                    this.elementheader.appendChild(this.elementtitle);
                    let dialogformclosemodalbuttontop = document.createElement("label");
                    dialogformclosemodalbuttontop.className = "close-button";
                    dialogformclosemodalbuttontop.style.cursor = "pointer";
                    dialogformclosemodalbuttontop.onclick = (e) => this.close(0);
                    dialogformclosemodalbuttontop.style.marginLeft = "auto";
                    this.elementheader.appendChild(dialogformclosemodalbuttontop);
                    this.elementbody = document.createElement("div");
                    this.elementbody.className = "main";
                    this.elementbody.style.padding = "3px";
                    this.dialogform.appendChild(this.elementbody);
                    this.elementfooter = document.createElement("div");
                    this.elementfooter.className = "footer";
                    this.dialogform.appendChild(this.elementfooter);
                }
                get dialogformContent() {
                    return this.dialogform;
                }
                get elementContainer() {
                    return this.elementcontainer;
                }
                get elementHeader() {
                    return this.elementheader;
                }
                get elementBody() {
                    return this.elementbody;
                }
                get elementFooter() {
                    return this.elementfooter;
                }
                get elementTitle() {
                    return this.elementtitle;
                }
                static messagebox(message, title, buttonstyle, onclosing) {
                    let msgbox = new DialogForm("msgbox");
                    let text = document.createElement("p");
                    text.innerHTML = message;
                    msgbox.elementbody.appendChild(text);
                    msgbox.elementtitle.innerHTML = title;
                    if (buttonstyle)
                        msgbox.setButtons(buttonstyle);
                    msgbox.onClosing = onclosing;
                    msgbox.show();
                    return msgbox;
                }
                setButtons(style, callback) {
                    let buttonsfooter = document.createElement("div");
                    buttonsfooter.className = "buttonsfooter";
                    let button1 = document.createElement("button");
                    button1.type = "button";
                    button1.className = "button-green";
                    buttonsfooter.appendChild(button1);
                    if (style === 1) {
                        button1.innerHTML = "Ok";
                        button1.onclick = () => this.close(1);
                    }
                    else if (style === 328) {
                        button1.innerHTML = "Info";
                        button1.className = "button-info";
                        buttonsfooter.appendChild(button1);
                        button1.onclick = callback;
                    }
                    else {
                        let button2 = document.createElement("button");
                        button2.type = "button";
                        button2.className = "button-red";
                        buttonsfooter.appendChild(button2);
                        if (style === 3) {
                            button1.innerHTML = "Ok";
                            button1.onclick = () => this.close(1);
                            button2.innerHTML = "Cancelar";
                            button2.onclick = () => this.close(2);
                        }
                        else if (style === 12) {
                            button1.innerHTML = "Sí";
                            button1.onclick = () => this.close(4);
                            button2.innerHTML = "No";
                            button2.onclick = () => this.close(8);
                        }
                        else if (style === 18) {
                            button1.innerHTML = "Reintentar";
                            button1.onclick = () => this.close(16);
                            button2.innerHTML = "Cancelar";
                            button2.onclick = () => this.close(2);
                        }
                        else if (style === 48) {
                            button1.innerHTML = "Reintentar";
                            button1.onclick = () => this.close(16);
                            button2.innerHTML = "Abortar";
                            button2.onclick = () => this.close(32);
                        }
                        else if (style === 14) {
                            button1.innerHTML = "Sí";
                            button1.onclick = () => this.close(4);
                            button2.innerHTML = "No";
                            button2.onclick = () => this.close(8);
                            let button3 = document.createElement("button");
                            button3.type = "button";
                            button3.className = "button-red";
                            button3.innerHTML = "Cancelar";
                            buttonsfooter.appendChild(button3);
                            button3.onclick = () => this.close(2);
                        }
                    }
                    this.elementfooter.appendChild(buttonsfooter);
                }
                show(...params) {
                    document.body.appendChild(this.elementcontainer);
                }
                close(motive) {
                    if (this.onClosing && this.onClosing(motive) && motive !== 64)
                        return;
                    this.elementcontainer.remove();
                    if (this.onClosed)
                        this.onClosed();
                }
            }
            DialogForm.DEFAULTCOLOR = "#337AB7";
            Dialogs.DialogForm = DialogForm;
        })(Dialogs = Visuals.Dialogs || (Visuals.Dialogs = {}));
    })(Visuals = Lib.Visuals || (Lib.Visuals = {}));
})(Lib || (Lib = {}));
