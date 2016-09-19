'use strict';

import React from 'react';

import TreeNode from './node';
import defaultDecorators from './decorators';
import defaultAnimations from '../default/animations';
import defaultEvents from '../default/events';
import defaultOptions from '../default/options';

class TreeView extends React.Component {
    constructor(props){
        super(props);
        this.onEvent = this.onEvent.bind(this);
        this._prepareState();
        this._eventBubbles = this._event();

        const state = this.props.state;
        state.__treeView_colSelected = [];

        for (var i = 0; i <= state.__treeView_maxLevel; i++) {
            state.__treeView_colSelected.push(false);
        }
    }
    onEvent(type = 'col', value) {
        const { updateMe, options, state } = this._eventBubbles;
        const data = this.props.data;
        const eventParams = {value, updateMe, data, state, options};
        switch(type) {
            case 'col': {
                this.props.onSelectedCol(eventParams);
                break;
            }
            case 'search': {
                this.props.onSearch(eventParams);
                break;
            }
            default:
            break;
        }
    }
    render(){
        const decorators = this.props.decorators;
        let data = this.props.data;
        if(!Array.isArray(data)){ data = [data]; }
        return (
            <div className="treeview">
                {
                    this.props.use.search &&
                    <decorators.SearchTree
                        onEvent={this.onEvent}
                    />
                }
                {
                    this.props.use.colSelect &&
                    <decorators.ColSelected
                        maxLevel={this.props.state.__treeView_maxLevel}
                        onEvent={this.onEvent}
                        colSelected={this.props.state.__treeView_colSelected}
                    />
                }
                <ul className="list-group" ref="treeBase">
                    {data.map((node, index) =>
                        <TreeNode
                            key={node.id || index}
                            node={node}
                            _eventBubbles={this._eventBubbles}
                            {...this._eventBubbles}
                        />
                    )}
                </ul>
            </div>
        );
    }
    _prepareState(data = this.props.data, maxLv = 0, state = this.props.state, level = []) {
        if (state.__treeView_maxLevel < maxLv || state.__treeView_maxLevel === undefined) {
            state.__treeView_maxLevel = maxLv;
        }
        if(!Array.isArray(data)){ data = [data]; }
        data.forEach((e, i) => {
            e.__treeView_level = [...level, i];
            e.__treeView_visibled = true;
            e.__treeView_toggled = true;
            const children = e[this.props.options.nodeName];
            if (Array.isArray(children)) {
                e.__treeView_level = [...e.__treeView_level, this.props.options.nodeName];
                this._prepareState(children, maxLv + 1, state, e.__treeView_level);
            }
        });
    }
    _event(){
        return {
            state: this.props.state,
            use: Object.assign(defaultEvents.useEvent, this.props.use),
            animations: Object.assign(defaultAnimations, this.props.animations),
            options: Object.assign(defaultOptions, this.props.options),
            decorators: Object.assign(defaultDecorators, this.props.decorators),
            updateMe: this.props.updateMe,
            onToggle: this.props.onToggle,
            onActive: this.props.onActive,
            onSelected: this.props.onSelected,
            onFirstChildSelected: this.props.onFirstChildSelected
        };
    }
}

TreeView.propTypes = {
    state: React.PropTypes.oneOfType([
        React.PropTypes.object,
        React.PropTypes.array
    ]).isRequired,
    data: React.PropTypes.oneOfType([
        React.PropTypes.object,
        React.PropTypes.array
    ]).isRequired,
    updateMe: React.PropTypes.func.isRequired,
    use: React.PropTypes.object,
    animations: React.PropTypes.oneOfType([
        React.PropTypes.object,
        React.PropTypes.bool
    ]),
    decorators: React.PropTypes.object,
    options: React.PropTypes.object,
    onToggle: React.PropTypes.func,
    onActive: React.PropTypes.func,
    onSelected: React.PropTypes.func,
    onFirstChildSelected: React.PropTypes.func,
    onSelectedCol: React.PropTypes.func,
    onSearch: React.PropTypes.func
};

TreeView.defaultProps = {
    use: defaultEvents.useEvent,
    animations: defaultAnimations,
    decorators: defaultDecorators,
    options: defaultOptions,
    onToggle: defaultEvents.onToggle,
    onActive: defaultEvents.onActive,
    onSelected: defaultEvents.onSelected,
    onSelectedCol: defaultEvents.onSelectedCol,
    onFirstChildSelected: defaultEvents.onFirstChildSelected,
    onSearch: defaultEvents.onSearch
};

export default TreeView;
