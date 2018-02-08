import React, { Component } from 'react';
import PropTypes from 'prop-types';
import formStoreShape from './PropTypes';
import Subscription from './Subscription';

class Form extends Component {
    constructor(props, context) {
        super(props, context);

        this.onValidateFormStore = context.onValidateFormStore;
        this.setValueFormStore = context.setValueFormStore;

        props.exposeMethods({
            launchValidate: this.launchValidate.bind(this),
            getValue: this.getValue.bind(this),
        });

        this.onValidateSubFormStore = new Subscription(listeners => (
            listeners.some(listener => (listener()))
        ));

        this.setValueSubFormStore = new Subscription(listeners => (
            listeners.reduce((auc, listener) => ({
                ...auc,
                ...listener(),
            }), {})
        ));
    }

    getChildContext() {
        return {
            onValidateFormStore: this.onValidateSubFormStore,
            setValueFormStore: this.setValueSubFormStore,
        };
    }

    componentDidMount() {
        // 如果叶子节点，设置了onValidate 和 setValue 就被当作叶子节点
        if (this.onValidateFormStore) {
            // 子节点向父级元素发起订阅
            this.onValidateFormStore.subscribe(() => (this.launchValidate()));
        }
        if (this.setValueFormStore) {
            // 子节点向父级元素发起订阅
            this.setValueFormStore.subscribe(() => ({
                [this.props.name]: this.getValue(),
            }));
        }
        // 订阅
        // this.onValidateSubFormStore.subscribe(this.props.onValidate);
        // this.setValueSubFormStore.subscribe(this.props.setValue);
    }

    componentWillUnmount() {
        // todo
        // 当某一个子节点被卸载以后，父节点中相应的函数应该被移除
        this.onValidateSubFormStore.clear();
        this.setValueSubFormStore.clear();
    }

    getValue() {
        if (this.props.setValue) {
            // 叶子节点
            return this.props.setValue();
        }
        return this.setValueSubFormStore.notify();
    }

    // 触发校验
    launchValidate() {
        // 返回true表示不通过校验
        if (this.props.onValidate) {
            // 叶子节点
            return this.props.onValidate();
        }
        return this.onValidateSubFormStore.notify();
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
    name: PropTypes.func,
    onValidate: PropTypes.func,
    setValue: PropTypes.func,
    children: PropTypes.node,
    className: PropTypes.string,
    exposeMethods: PropTypes.func,
};

Form.defaultProps = {
    name: '',
    onValidate: null,
    setValue: null,
    children: null,
    className: '',
    exposeMethods: () => {},
};

Form.childContextTypes = {
    onValidateFormStore: formStoreShape,
    setValueFormStore: formStoreShape,
};

Form.contextTypes = {
    onValidateFormStore: formStoreShape,
    setValueFormStore: formStoreShape,
};

export default Form;
