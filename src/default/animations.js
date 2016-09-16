'use strict';

export default {
    toggle: (props) => {
        return {
            animation: { rotateZ: props.node.toggled ? 180 : 0 },
            duration: 400
        };
    },
    drawer: (/* props */) => {
        return {
            enter: {
                animation: 'slideDown',
                duration: 300
            },
            leave: {
                animation: 'slideUp',
                duration: 300
            }
        };
    },
    searchItem: () => {
        return {
            enter: {
                animation: { opacity: 1 },
                duration: 150
            },
            leave: {
                animation: { opacity: 0 },
                duration: 150
            }
        };
    }
};
