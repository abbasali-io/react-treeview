'use strict';

export default {
    toggle: (props) => {
        return {
            animation: { rotateZ: props.node.toggled ? 180 : 0 },
            duration: 200
        };
    },
    drawer: (/* props */) => {
        return {
            enter: {
                animation: 'slideDown',
                duration: 150
            },
            leave: {
                animation: 'slideUp',
                duration: 150
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
