import React, { Component } from 'react'

export default class FlavorForm extends Component {
    constructor(props) {
        super(props);
        this.state = {value: 'coconut'};
      }
    
      handleChange = (event) =>
        this.setState({value: event.target.value});
    
      handleSubmit = (event) => {
        alert('Your favorite flavor is: ' + this.state.value);
        event.preventDefault();
      }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label> Pick your favorite flavor:
                         <select value={this.state.value} onChange={this.handleChange}>
                            <option value="grapefruit">Grapefruit</option>
                            <option value="lime">Lime</option>
                            <option value="coconut">Coconut</option>
                            <option value="mango">Mango</option>
                        </select>
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}
