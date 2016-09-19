'use strict';

import React from 'react';
import {VelocityComponent} from 'velocity-react';

const Loading = () => {
    return (
        <div className="loading">
            loading...
        </div>
    );
};

const Toggle = (props) => {
    const toggled = props.toggled;
    const glyphName = !toggled ? 'glyphicon glyphicon-plus' : 'glyphicon glyphicon-minus';
    return (
        <span className={glyphName}></span>
    );
};

Toggle.propTypes = {
    node: React.PropTypes.object.isRequired,
    toggled: React.PropTypes.bool
};

const Header = (props) => {
    return (
        <div>
            {props.node[props.options.itemName]}
        </div>
    );
};

Header.propTypes = {
    node: React.PropTypes.object.isRequired,
    options: React.PropTypes.object.isRequired
};

const Selected = (props) => {
    return (
        <input type="checkbox" checked={props.node[props.options.selectedName]} onChange={() => props.onEvent('select')}/>
    );
};

Selected.propTypes = {
    node: React.PropTypes.object.isRequired,
    onEvent: React.PropTypes.func.isRequired,
    options: React.PropTypes.object.isRequired
};

const FirstChildSelected = (props) => {
    return (
        <span className="glyphicon glyphicon-sort-by-attributes" onClick={() => props.onEvent('firstChild')}></span>
    );
};

FirstChildSelected.propTypes = {
    onEvent: React.PropTypes.func.isRequired
};

const ColSelected = (props) => {
    const { maxLevel, colSelected, onEvent } = props;
    const items = [];
    const itemTemplate = (i, callback) => {
        return <input key={i} type="checkbox" checked={colSelected[i]} onChange={() => callback('col', i)}/>;
    };
    for (var i = 0; i <= maxLevel; i++) {
        items.push(itemTemplate(i, onEvent));
    }
    return (
        <div className="col-selected">
            {items}
        </div>
    );
};

ColSelected.propTypes = {
    maxLevel: React.PropTypes.number.isRequired,
    onEvent: React.PropTypes.func.isRequired,
    colSelected: React.PropTypes.array
};

const SearchTree = (props) => {
    return (
        <div className="input-group">
            <span className="input-group-addon">
              <i className="fa fa-search"></i>
            </span>
            <input type="text"
                className="form-control"
                placeholder="Search the tree..."
                onKeyUp={(e) => props.onEvent('search', e)}
            />
        </div>
    );
};

SearchTree.propTypes = {
    onEvent: React.PropTypes.func
};

class Container extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        const { decorators, terminal, onEvent, node, className, use} = this.props;
        return (
            <div
                ref="clickable"
                className={className}
                onClick={use.active ? () => onEvent('active') : ()=>{}}
                style={{cursor: 'pointer'}}>
                <div onClick={() => onEvent()} className="toggle" style={{display: 'inline-block'}}>
                    { !terminal ? this.renderToggle() : null }
                </div>
                {
                    use.select &&
                    <div className="selected" style={{display: 'inline-block'}}>
                        <decorators.Selected
                            node={node}
                            onEvent={onEvent}
                            options={this.props.options}
                        />
                    </div>
                }
                <div className="header" style={{display: 'inline-block'}}>
                    <decorators.Header
                        node={node}
                        options={this.props.options}
                    />
                </div>
                {
                    (
                        use.firstChildSelect &&
                        Array.isArray(node[this.props.options.nodeName]) &&
                        !node.loading
                    ) &&
                    <div className="selected firstChild" style={{display: 'inline-block'}}>
                        <decorators.FirstChildSelected onEvent={onEvent} />
                    </div>
                }
            </div>
        );
    }
    renderToggle(){
        const animations = this.props.animations;
        if(!animations){ return this.renderToggleDecorator(); }
        return (
            <VelocityComponent ref="velocity"
                duration={animations.toggle.duration}
                animation={animations.toggle.animation}>
                {this.renderToggleDecorator()}
            </VelocityComponent>
        );
    }
    renderToggleDecorator(){
        const {decorators} = this.props;
        return (<decorators.Toggle node={this.props.node} toggled={this.props.node.__treeView_toggled} />);
    }
}

Container.propTypes = {
    className: React.PropTypes.string,
    decorators: React.PropTypes.object.isRequired,
    terminal: React.PropTypes.bool.isRequired,
    onEvent: React.PropTypes.func.isRequired,
    animations: React.PropTypes.oneOfType([
        React.PropTypes.object,
        React.PropTypes.bool
    ]).isRequired,
    node: React.PropTypes.object.isRequired,
    use: React.PropTypes.object,
    options: React.PropTypes.object
};

export default {
    Loading,
    Toggle,
    Header,
    Selected,
    FirstChildSelected,
    ColSelected,
    SearchTree,
    Container
};
