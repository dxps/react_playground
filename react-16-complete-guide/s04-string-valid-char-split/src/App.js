import React, {Component} from 'react';
import './App.css';
import ValidationComp from './ValidationComp/ValidationComp';
import CharComp from './CharComp/CharComp';

class App extends Component {

  state = {
    value: ''
  }

  valueChangeHandler = (value) => {
    this.setState({value});
  }

  charDeleteHandler = (idx) => {
    console.log('charDeleteHandler> Deleting char at index ' + idx);
    const valueArray = this.state.value.split('');
    console.log('charDeleteHandler> valueArray:', valueArray);
    valueArray.splice(idx, 1);
    const value = valueArray.join('');
    this.setState({ value });
  }

  render() {

    const charsArray = this.state.value.split('');
    const charCompList = charsArray.map(
      (char, idx) => {
        return <CharComp key={idx} 
                  idx={idx} char={char}
                  charDeleteHandler={ () => this.charDeleteHandler(idx) } />
      }
    );

    return (
      <div>
        <div className="valueInput">
          Value:
          <input
            type="text"
            value={this.state.value}
            onChange={(event) => this.valueChangeHandler(event.target.value)}/>
          ({this.state.valueLength} chars)
        </div>
        <ValidationComp value={this.state.value}/>
        {charCompList}
      </div>
    );
  }

}

export default App;
