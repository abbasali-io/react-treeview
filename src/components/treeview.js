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
        this.state = {
            data: this.props.data
        };
        this._status = {};
        this._status.__TREEVIEW_COL_SELECTED = [];
        this.onEvent = this.onEvent.bind(this);
        this._render = this._render.bind(this);

        this._prepareData();
        this._event = this._prepareEvent();

        for (var i = 0; i <= this._status.__TREEVIEW_MAXLEVEL; i++) {
            this._status.__TREEVIEW_COL_SELECTED.push(false);
        }
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
    }
    onEvent(type = 'col', value) {
        const _render = this._render;
        const { options, _status } = this._event;
        const data = this.state.data;
        const eventParams = {value, _render, data, _status, options};
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
    _render() {
        this.forceUpdate();
    }
    render(){
        const decorators = this._event.decorators;
        let data = this.state.data;
        if(!Array.isArray(data)){ data = [data]; }
        return (
            <div className="treeview">
                {
                    this._event.use.search &&
                    <decorators.SearchTree
                        onEvent={this.onEvent}
                    />
                }
                {
                    this._event.use.colSelect &&
                    <decorators.ColSelected
                        maxLevel={this._event._status.__TREEVIEW_MAXLEVEL}
                        onEvent={this.onEvent}
                        colSelected={this._event._status.__TREEVIEW_COL_SELECTED}
                    />
                }
                <ul className="list-group" ref="treeBase">
                    {data.map((node, index) =>
                        <TreeNode
                            key={node.id || index}
                            node={node}
                            _event={this._event}
                            {...this._event}
                        />
                    )}
                </ul>
            </div>
        );
    }
    _prepareData(data = this.state.data, maxLv = 0, _status = this._status, level = []) {
        if (_status.__TREEVIEW_MAXLEVEL < maxLv || _status.__TREEVIEW_MAXLEVEL === undefined) {
            _status.__TREEVIEW_MAXLEVEL = maxLv;
        }
        if(!Array.isArray(data)){ data = [data]; }
        data.forEach((e, i) => {
            e.__TREEVIEW_LEVEL = [...level, i];
            e.__TREEVIEW_VISIBLED = true;
            e.__TREEVIEW_TOGGLED = true;
            const children = e[this.props.options.nodeName];
            if (Array.isArray(children)) {
                e.__TREEVIEW_LEVEL = [...e.__TREEVIEW_LEVEL, this.props.options.nodeName];
                this._prepareData(children, maxLv + 1, _status, e.__TREEVIEW_LEVEL);
            }
        });
    }
    _prepareEvent(){
        return {
            _status: this._status,
            use: Object.assign(defaultEvents.useEvent, this.props.use),
            animations: Object.assign(defaultAnimations, this.props.animations),
            options: Object.assign(defaultOptions, this.props.options),
            decorators: Object.assign(defaultDecorators, this.props.decorators),
            onToggle: this.props.onToggle,
            onActive: this.props.onActive,
            onSelected: this.props.onSelected,
            onFirstChildSelected: this.props.onFirstChildSelected
        };
    }
}

TreeView.propTypes = {
    data: React.PropTypes.oneOfType([
        React.PropTypes.object,
        React.PropTypes.array
    ]).isRequired,
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