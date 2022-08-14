// songview.js
// (c) Gernot Lenkner 2022

class SongView {
    constructor() {
    }

    update() {
       //this.viewer.innerHTML = this.textArea.nodeValue;
       songview.viewer.innerHTML = songview.textArea.value;
    }

    init() {
        songview.textArea = document.querySelector("#svTextArea");
        songview.viewer = document.querySelector("#svViewer");
        songview.textArea.addEventListener("keyup", songview.update)
        console.debug("SongView Init");
    }

}

const songview = new SongView();

document.addEventListener("DOMContentLoaded", songview.init)