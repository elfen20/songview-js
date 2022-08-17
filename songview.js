// songview.js
// (c) Gernot Lenkner 2022

class SongView {    

    constructor() {
        this.blocks = [];
        this.meta = {};

        this.Blocktypes = {
            Meta: 'Meta',
            Song: 'Song',
            Alike: 'Alike',
            Repeat : 'Repeat',
        }
    }

    parseBlocks() {
        let tempBlock = {
            Type: 'Song',
            Name: 'Default',
            Lines: []
        };
        let newBlock = {};
        songview.blocks = [];
        songview.blocks.push(tempBlock);
        let lines = songview.textArea.value.split(/\r?\n/);
        for (let line of lines) {
            if (line.length > 1) {
                let control = line.substring(0,2);
                switch (control) {
                    case '# ':
                        // SongBlock
                        newBlock = {
                            Type: 'Song',
                            Name: line.substring(1).trim(),
                            Lines: []
                        };
                        songview.blocks.push(newBlock);
                        tempBlock = newBlock;
                        break; 
                    case '#!':
                        // MetaBlock
                        newBlock = {
                            Type: 'Meta',
                            Name: line.substring(2).trim(),
                            Lines: []
                        };
                        songview.meta = newBlock;
                        tempBlock = newBlock;
                        break;
                    default:
                        tempBlock.Lines.push(line.trim());
                        break;
                }
            }
        }
    }

    render() {

    }


    update() {
        //this.viewer.innerHTML = this.textArea.nodeValue;
        //songview.viewer.innerHTML = songview.textArea.value;
        songview.parseBlocks();
        console.debug(songview.blocks);
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