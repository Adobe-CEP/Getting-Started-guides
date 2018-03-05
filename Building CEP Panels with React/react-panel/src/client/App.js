import React, { Component } from 'react';
import Label from './components/Label';
import Divider from './components/Divider';
import loremIpsum from 'lorem-ipsum';

import styles from './App.css';

class App extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            count: 5,
            units: 'paragraphs',
            ipsum: '',
        };

        ['insertLoremIpsum', 'handleUnitsChange', 'handleCountChange', 'generateIpsum'].forEach(
            fn => (this[fn] = this[fn].bind(this))
        );
    }

    insertLoremIpsum() {
        const text = this.state.ipsum.replace(/\n/g, '\\r');
        const script = `_addTextLayer("${text}")`;
        if (typeof window.__adobe_cep__ !== 'undefined') {
            const csInterface = new CSInterface();
            csInterface.evalScript(script);
        } else {
            // we're not in a CEP environment!
            alert(`
Not in a CEP environment. We would have executed:

${script}
`);
        }
    }

    handleUnitsChange(evt) {
        const units = evt.target.value;
        this.setState(
            state => ({
                units,
                ipsum: ''
            })
        );
    }

    handleCountChange(evt) {
        const count = evt.target.value;
        this.setState(
            state => ({
                count,
                ipsum: ''
            })
        );
    }

    generateIpsum() {
        this.setState(state => ({
            ipsum: loremIpsum({
                count: state.count,
                units: state.units,
            }),
        }));
    }

    render() {
        return (
            <div className={styles.wrapper}>
                <Label label="Units">
                    <select
                        className={styles.input}
                        onChange={this.handleUnitsChange}
                        value={this.state.units}>
                        <option value="paragraphs">Paragraphs</option>
                        <option value="sentences">Sentences</option>
                        <option value="words">Words</option>
                    </select>
                </Label>
                <Label label="Count">
                    <input
                        className={styles.input}
                        onChange={this.handleCountChange}
                        type="number"
                        min={0}
                        max={99}
                        value={this.state.count}
                    />
                </Label>
                <div className={styles.buttons}>
                    <button className={styles.button} onClick={this.generateIpsum}>Generate</button>
                    <button
                        disabled={this.state.ipsum === ''}
                        className={styles.button}
                        onClick={this.insertLoremIpsum}>
                        Insert
                    </button>
                </div>
                <Divider />
                <div className={styles.preview}>{this.state.ipsum || "Click Generate to create some text."}</div>
            </div>
        );
    }
}

export default App;
