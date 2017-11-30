import PropTypes from 'prop-types';

const formStoreShape = PropTypes.shape({
    subscribe: PropTypes.func.isRequired,
    notify: PropTypes.func.isRequired,
});

export default formStoreShape;
