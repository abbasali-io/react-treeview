'use strict';

import React from 'react';
import {VelocityTransitionGroup} from 'velocity-react';

import NodeHeader from './header';

class TreeNode extends React.Component {
    constructor(props){
        super(props);
        this.onEvent = this.onEvent.bind(this);
        this._render = this._render.bind(this);
        this._event = this.props._event;
    }
    onEvent(type = 'toggled'){
        const _render = this._render;
        const {_status, options} = this._event;
        const node = this.props.node;
        const eventParams = {node, _render, _status, options};
        switch(type) {
            case 'toggled': {
                this._event.onToggle(eventParams);
                break;
            }
            case 'active': {
                this._event.onActive(eventParams);
                break;
            }
            case 'select': {
                this._event.onSelected(eventParams);
                break;
            }
            case 'firstChild': {
                this._event.onFirstChildSelected(eventParams);
                break;
            }
            default:
            break;
        }
    }
    animations(){
        const props = this.props;
        if(props.animations === false){ return false; }
        let anim = Object.assign({}, props.animations, props.node.animations);
        return {
            toggle: anim.toggle(this.props),
            drawer: anim.drawer(this.props),
            searchItem: anim.searchItem(this.props)
        };
    }
    decorators(){
        const props = this.props;
        let nodeDecorators = props.node.decorators || {};
        return Object.assign({}, props.decorators, nodeDecorators);
    }
    _render() {
        this.forceUpdate();
    }
    render(){
        const decorators = this.decorators();
        const animations = this.animations();
        if (this.props.node.__TREEVIEW_VISIBLED) {
            return (
            <VelocityTransitionGroup {...animations.searchItem}>
                {
                    !this.props._status.__TREEVIEW_ONSEARCHING &&
                    <li className="treeview-node-item" ref="topLevel">
                        { this.renderHeader(decorators, animations) }
                        { this.props.node[this._event.options.nodeName].length > 0 && this.renderDrawer(decorators, animations) }
                    </li>
                }
            </VelocityTransitionGroup>
            );
        }
        return (
            this.renderDrawer(decorators, animations)
        );
    }
    renderDrawer(decorators, animations){
        const toggled = this.props.node.__TREEVIEW_TOGGLED;
        if(!animations && !toggled){ return null; }
        if(!animations && toggled){
            return this.renderChildren(decorators, animations);
        }
        return (
            <VelocityTransitionGroup {...animations.drawer} ref="velocity">
                {toggled ? this.renderChildren(decorators, animations) : null}
            </VelocityTransitionGroup>
        );
    }
    renderHeader(decorators, animations){
        return (
            <NodeHeader
                decorators={decorators}
                animations={animations}
                node={Object.assign({}, this.props.node)}
                onEvent={this.onEvent}
                use={this._event.use}
                options={this._event.options}
            />
        );
    }
    renderChildren(decorators){
        if(this.props.node.loading && this.props.node.__TREEVIEW_VISIBLED){ return this.renderLoading(decorators); }
        const children = this.props.node[this._event.options.nodeName];
        return (
            <ul className="treeview-node" ref="subtree">
                {children.map((child, index) =>
                    <TreeNode
                        key={child.id || index}
                        node={child}
                        _event={this._event}
                        {...this._event}
                    />
                )}
            </ul>
        );
    }
    renderLoading(decorators){
        return (
            <ul className="treeview-node">
                <li className="treeview-node-item">
                    <decorators.Loading/>
                </li>
            </ul>
        );
    }
}

TreeNode.propTypes = {
    node: React.PropTypes.object.isRequired,
    _status: React.PropTypes.oneOfType([
        React.PropTypes.object,
        React.PropTypes.array
    ]).isRequired,
    _event: React.PropTypes.object.isRequired
};

export default TreeNode;
