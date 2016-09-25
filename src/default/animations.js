'use strict';

export default {
    toggle: (props) => {
        return {
            animation: { opacity: props.node.__TREEVIEW_TOGGLED ? 1 : 0.8 },
            duration: 200
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
                duration: 200
            },
            leave: {
                animation: { opacity: 0 },
                duration: 100
            }
        };
    }
};
