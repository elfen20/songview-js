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
            Repeat: 'Repeat',
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
                let control = line.substring(0, 2);
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
                    case '#+':
                        // Repeat
                        newBlock = {
                            Type: 'Repeat',
                            Name: line.substring(2).trim(),
                            Lines: []
                        };
                        songview.blocks.push(newBlock);
                        tempBlock = newBlock;
                        break;
                    case '#*':
                        // Alike
                        newBlock = {
                            Type: 'Alike',
                            Name: line.substring(2).trim(),
                            Lines: []
                        };
                        songview.blocks.push(newBlock);
                        tempBlock = newBlock;
                        break;
                    default:
                        tempBlock.Lines.push(songview.parseLine(line.trim()));
                        break;
                }
            }
        }
    }

    parseLine(line) {
        let chords = [];
        let text = [];
        let pos = 0;
        let pS = line.indexOf("[", pos)
        let pE = 0;
        while (pS > -1) {
            text.push(line.substring(pos, pS));
            pE = line.indexOf("]", pS);
            if (pE == -1) {
                pE = line.length;
            }
            chords.push(line.substring(pS + 1, pE));
            pos = pE + 1;
            pS = line.indexOf("[", pos)
        }
        if (pos < line.length) {
            text.push(line.substring(pos, line.length));
        }
        return {
            Chords: chords,
            Text: text
        };
    }

    renderBlock(block) {
        let blockHtml = '';
        if (block.Lines.length > 0) {
            switch (block.Type) {
                case 'Song':
                    blockHtml = `<h4>${block.Name}</h4>`;
                    for (let line of block.Lines) {
                        blockHtml = blockHtml.concat(songview.renderLine(line),'<br>');
                    }
                    break;
            }
        }
        return blockHtml;
    }

    renderLine(line) {
        let lineHtml = '';
        let text = '';
        let chord = '';
        for (let i =0; i < line.Text.length; i++) {
            text = `<span class="svText">${line.Text[i]}</span>`;
            chord = (i < line.Chords.length) ? `<span class="svChord">${line.Chords[i]}</span>` : '';
            lineHtml = lineHtml.concat(text, chord);
        }
        return lineHtml;
    }

    renderHtml() {
        let html = "";
        for (let block of songview.blocks) {
            html = html.concat('<div class="svBlock">');
            html = html.concat(songview.renderBlock(block));
            html = html.concat('</div>');
        }
        return html;
    }


    update() {
        //this.viewer.innerHTML = this.textArea.nodeValue;
        //songview.viewer.innerHTML = songview.textArea.value;
        songview.parseBlocks();
        songview.viewer.innerHTML = songview.renderHtml();
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