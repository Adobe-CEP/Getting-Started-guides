import React, { Component } from 'react';
import loremIpsum from 'lorem-ipsum';

import AppStyles from "./App.css";

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      count: 5,
      units: 'paragraphs',
    }

    this.insertLoremIpsum = this.insertLoremIpsum.bind(this);
    this.handleUnitsChange = this.handleUnitsChange.bind(this);
    this.handleCountChange = this.handleCountChange.bind(this);
  }

  insertLoremIpsum() {
    const text = loremIpsum(this.state).replace(/\n/g, '\\r');
    const csInterface = new CSInterface();
    const script = `_addTextLayer("${text}")`;
    csInterface.evalScript(script);
  }

  handleUnitsChange(evt) {
    const units = evt.target.value;
    this.setState(state => ({
        count: state.count,
        units
    }));
  }

  handleCountChange(evt) {
    const count = evt.target.value;
    this.setState(state => ({
      count,
      units: state.units
    }));
  }

  render() {
    return (
      <div className={AppStyles.wrapper}>
        <label className={AppStyles.field}><span className={AppStyles.label}>Units</span>
          <select className={AppStyles.input} onChange={this.handleUnitsChange} value={this.state.units}>
            <option value="paragraphs">Paragraphs</option>
            <option value="sentences">Sentences</option>
            <option value="words">Words</option>
          </select>
        </label>
        <label className={AppStyles.field}><span className={AppStyles.label}>Count</span>
          <input className={AppStyles.input} onChange={this.handleCountChange} type="number" min={0} max={99} value={this.state.count}/>
        </label>
        <div className={AppStyles.buttons}>
          <button className={AppStyles.button} onClick={this.insertLoremIpsum}>Insert</button>
        </div>
      </div>
    );
  }
}

export default App;
