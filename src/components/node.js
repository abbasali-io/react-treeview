'use strict';

import React from 'react';
import {VelocityTransitionGroup} from 'velocity-react';

import NodeHeader from './header';

class TreeNode extends React.Component {
    constructor(props){
        super(props);
        this.onEvent = this.onEvent.bind(this);
    }
    onEvent(type = 'toggled'){
        const {node, updateMe, state, options} = this.props;
        switch(type) {
            case 'toggled': {
                this.props.onToggle(node, updateMe, state, options);
                break;
            }
            case 'active': {
                this.props.onActive(node, updateMe, state, options);
                break;
            }
            case 'select': {
                this.props.onSelected(node, updateMe, state, options);
                break;
            }
            case 'firstChild': {
                this.props.onFirstChildSelected(node, updateMe, state, options);
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
    render(){
        const decorators = this.decorators();
        const animations = this.animations();
        if (this.props.node.visibled) {
            return (
            <VelocityTransitionGroup {...animations.searchItem}>
                {
                    !this.props.state.onSearching &&
                    <li className="list-group-item" ref="topLevel">
                        { this.renderHeader(decorators, animations) }
                        { this.renderDrawer(decorators, animations) }
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
        const toggled = this.props.node.toggled;
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
                use={this.props.use}
                options={this.props.options}
            />
        );
    }
    renderChildren(decorators){
        if(this.props.node.loading && this.props.node.visibled){ return this.renderLoading(decorators); }
        let children = this.props.node[this.props.options.nodeName];
        if (!Array.isArray(children)) { children = children ? [children] : []; }
        return (
            <ul className="treeview-node list-group" ref="subtree">
                {children.map((child, index) =>
                    <TreeNode
                        key={child.id || index}
                        node={child}
                        {...this._eventBubbles()}
                    />
                )}
            </ul>
        );
    }
    renderLoading(decorators){
        return (
            <ul className="treeview-node list-group">
                <li className="list-group-item">
                    <decorators.Loading/>
                </li>
            </ul>
        );
    }
    _eventBubbles(){
        return {
            state: this.props.state,
            use: this.props.use,
            options: this.props.options,
            updateMe: this.props.updateMe,
            onToggle: this.props.onToggle,
            onActive: this.props.onActive,
            onSelected: this.props.onSelected,
            onFirstChildSelected: this.props.onFirstChildSelected,
            animations: this.props.animations,
            decorators: this.props.decorators
        };
    }
}

TreeNode.propTypes = {
    node: React.PropTypes.object.isRequired,
    state: React.PropTypes.oneOfType([
        React.PropTypes.object,
        React.PropTypes.array
    ]).isRequired,
    updateMe: React.PropTypes.func.isRequired,
    use: React.PropTypes.object,
    decorators: React.PropTypes.object.isRequired,
    animations: React.PropTypes.oneOfType([
        React.PropTypes.object,
        React.PropTypes.bool
    ]).isRequired,
    options: React.PropTypes.object,
    onToggle: React.PropTypes.func,
    onActive: React.PropTypes.func,
    onSelected: React.PropTypes.func,
    onFirstChildSelected: React.PropTypes.func
};

export default TreeNode;
