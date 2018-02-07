import React, { Component } from 'react';
import PropTypes from 'prop-types';
import formStoreShape from './PropTypes';
import Subscription from './Subscription';

class Form extends Component {
    constructor(props, context) {
        super(props, context);

        this.formStore = context.formStore;

        props.exposeMethods({
            launchValidate: this.launchValidate.bind(this),
        });

        this.subFormStore = new Subscription();
    }

    getChildContext() {
        return { formStore: this.subFormStore };
    }

    componentDidMount() {
        if (this.formStore) {
            // 父级元素订阅
            this.formStore.subscribe(() => (this.subFormStore.notify()));
        }
        // 订阅
        this.subFormStore.subscribe(this.props.onValidate);
    }

    componentWillUnmount() {
        this.subFormStore.clear();
    }

    // 触发校验
    launchValidate() {
        // 返回true表示不通过校验
        return this.subFormStore.notify();
    }

    render() {
        return (
            <div className={this.props.className}>
                { this.props.children }
            </div>
        );
    }
}

Form.propTypes = {
    onValidate: PropTypes.func,
    children: PropTypes.node,
    className: PropTypes.string,
    exposeMethods: PropTypes.func,
};

Form.defaultProps = {
    onValidate: () => {},
    children: null,
    className: '',
    exposeMethods: () => {},
};

Form.childContextTypes = {
    formStore: formStoreShape,
};

Form.contextTypes = {
    formStore: formStoreShape,
};

export default Form;
