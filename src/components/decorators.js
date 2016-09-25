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
    const icon = !toggled ?
    'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGhlaWdodD0iMzJweCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMzIgMzI7IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAzMiAzMiIgd2lkdGg9IjMycHgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxnIGlkPSJMYXllcl8xIi8+PGcgaWQ9InBsdXNfeDVGX2FsdCI+PHBhdGggZD0iTTE2LDBDNy4xNjQsMCwwLDcuMTY0LDAsMTZzNy4xNjQsMTYsMTYsMTZzMTYtNy4xNjQsMTYtMTZTMjQuODM2LDAsMTYsMHogTTI0LDE4aC02djZoLTR2LTZIOHYtNGg2ICAgVjhoNHY2aDZWMTh6IiBzdHlsZT0iZmlsbDojNEU0RTUwOyIvPjwvZz48L3N2Zz4=' :
    'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGhlaWdodD0iMzJweCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMzIgMzI7IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAzMiAzMiIgd2lkdGg9IjMycHgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxnIGlkPSJMYXllcl8xIi8+PGcgaWQ9Im1pbnVzX3g1Rl9hbHQiPjxwYXRoIGQ9Ik0xNiwwQzcuMTY0LDAsMCw3LjE2NCwwLDE2czcuMTY0LDE2LDE2LDE2czE2LTcuMTY0LDE2LTE2UzI0LjgzNiwwLDE2LDB6IE0yNCwxOEg4di00aDE2VjE4eiIgc3R5bGU9ImZpbGw6IzRFNEU1MDsiLz48L2c+PC9zdmc+';
    const style = {
        width: '14px',
        height: 'auto'
    };
    return (
        <img src={icon} style={style}/>
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
    const style = {
        width: '14px',
        height: 'auto'
    };
    const icon = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGhlaWdodD0iOTYiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDk2IDk2IiB3aWR0aD0iOTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxwYXRoIGQ9Ik01Mi4yMDQgNjAuNjY0bDExLjcyLTcuODEyYzEuMTk2IDAuNzEyIDIuNTc2IDEuMTQ4IDQuMDY4IDEuMTQ4IDQuNDEyIDAgOC0zLjU4NCA4LThzLTMuNTg4LTgtOC04Yy00LjM1NiAwLTcuOTA0IDMuNTA4LTcuOTg0IDcuODUybC04LjAxNiA1LjM0NHYtMTQuNDMyYzAuMDc2LTAuMDQwIDAuMTUyLTAuMDU2IDAuMjItMC4wOTZsMTEuNzE2LTcuODEyYzEuMiAwLjcxNiAyLjU4IDEuMTQ4IDQuMDcyIDEuMTQ4IDQuNDE2IDAgOC0zLjU4NCA4LThzLTMuNTg0LTgtOC04Yy00LjM2IDAtNy45MDggMy41MDgtNy45ODQgNy44NTJsLTguMDI0IDUuMzQ0di0yNy4yaC04djE1LjE5NmwtOC4wMTYtNS4zNDRjLTAuMDg0LTQuMzQ0LTMuNjI0LTcuODUyLTcuOTg0LTcuODUyLTQuNDEyIDAtOCAzLjU4NC04IDhzMy41ODggOCA4IDhjMS40OTIgMCAyLjg2OC0wLjQzNiA0LjA2OC0xLjE0OGwxMS43MTYgNy44MTJjMC4wNjggMC4wNDggMC4xNDggMC4wNjQgMC4yMiAwLjF2MTQuNDI0bC04LjAxNi01LjM0Yy0wLjA4NC00LjM0NC0zLjYyOC03Ljg1Mi03Ljk4NC03Ljg1Mi00LjQxMiAwLTggMy41ODQtOCA4IDAgNC40MTIgMy41ODggOCA4IDggMS40OTIgMCAyLjg3Mi0wLjQzMiA0LjA2OC0xLjE0OGwxMS43MTYgNy44MTJjMC4wNjggMC4wNTIgMC4xNDggMC4wNjggMC4yMiAwLjA5NnYxNC40MjhsLTguMDE2LTUuMzQ0Yy0wLjA4NC00LjM0LTMuNjI4LTcuODQ4LTcuOTg0LTcuODQ4LTQuNDEyIDAtOCAzLjU4NC04IDhzMy41ODggOCA4IDhjMS40OTIgMCAyLjg3Mi0wLjQzNiA0LjA2OC0xLjE0OGwxMS43MTYgNy44MTJjMC4wNjggMC4wNDggMC4xNDggMC4wNjQgMC4yMiAwLjF2MjMuMjQ0aDh2LTExLjIzNmMwLjA3Ni0wLjA0MCAwLjE1Mi0wLjA2MCAwLjIyLTAuMWwxMS43MTYtNy44MTJjMS4yIDAuNzEyIDIuNTggMS4xNDggNC4wNzIgMS4xNDggNC40MTYgMCA4LTMuNTg0IDgtOHMtMy41ODQtOC04LThjLTQuMzU2IDAtNy45MDggMy41MDgtNy45ODQgNy44NTJsLTguMDE2IDUuMzQ0di0xNC40MjhjMC4wNDQtMC4wNDAgMC4xMjQtMC4wNTYgMC4xOTItMC4xMDR6IiBmaWxsPSIjMDAwMDAwIi8+PC9zdmc+';
    return <img onClick={() => props.onEvent('firstChild')} src={icon} style={style} />;
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
            <input type="checkbox" checked={colSelected.all} onChange={() => onEvent('col', 'all')}/>
            {items}
        </div>
    );
};

ColSelected.propTypes = {
    maxLevel: React.PropTypes.number.isRequired,
    onEvent: React.PropTypes.func.isRequired,
    colSelected: React.PropTypes.object
};

const SearchTree = (props) => {
    return (
        <div className="search">
            <input type="text"
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
                onClick={use.active ? () => onEvent('active') : ()=>{}}>
                <div onClick={() => onEvent()} className="toggle" style={{display: 'inline-block', cursor: 'pointer'}}>
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
                <div className="header" style={{display: 'inline-block', cursor: use.active ? 'pointer' : 'default'}}>
                    <decorators.Header
                        node={node}
                        options={this.props.options}
                    />
                </div>
                {
                    (
                        use.firstChildSelect &&
                        Array.isArray(node[this.props.options.nodeName]) &&
                        node[this.props.options.nodeName].length > 0 &&
                        !node.loading
                    ) &&
                    <div className="selected first-child" style={{display: 'inline-block', cursor: 'pointer'}}>
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
        return (<decorators.Toggle node={this.props.node} toggled={this.props.node.__TREEVIEW_TOGGLED} />);
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
