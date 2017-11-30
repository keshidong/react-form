import React, { Component } from 'react';
import Form from '../src/index';

class App extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.form1.launchValidate();
    }
    render() {
        return (
            <Form
                name="form1"
                onValidate={() => {
                    console.log(11);
                }}
                ref={(r) => {
                    this.form1 = r;
                }}
            >
                <button
                    onClick={this.handleClick}
                >launch validate</button>
                <div>
                    <Form
                        name="form21"
                        onValidate={() => {
                            console.log(21);
                        }}
                    >
                        <div>2</div>
                        <div>3</div>
                    </Form>
                    <Form
                        name="form22"
                        onValidate={() => {
                            console.log(22);
                        }}
                    >
                        <Form
                            name="form3"
                            onValidate={() => {
                                console.log(3);
                            }}
                        >3</Form>
                    </Form>
                </div>
            </Form>
        );
    }
}

export default App;
