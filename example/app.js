'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import TreeView from '../src/index';
import data from './data';

import '../src/default/style.css';

// import * as filters from './filter';

// Example: Customising The Header Decorator To Include Icons
// const decorators = {};
/*
decorators.Header = (props) => {
    const style = props.style;
    const iconType = props.node.children ? 'folder' : 'file-text';
    const iconClass = `fa fa-${iconType}`;
    const iconStyle = { marginRight: '5px' };
    return (
        <div style={style.base}>
            <div style={style.title}>
                <i className={iconClass} style={iconStyle}/>
                {props.node.name}
            </div>
        </div>
    );
};
decorators.Loading = (props) => { ...... }
decorators.Toggle = (props) => { ...... }
decorators.Header = (props) => { ...... }
decorators.Selected = (props) => { ...... }
decorators.FirstChildSelected = (props) => { ...... }
decorators.ColSelected = (props) => { ...... }
decorators.SearchTree = (props) => { ...... }
*/

class DemoTree extends React.Component {
    constructor(props){
        super(props);
        this.state = {data};
        // this.onFilterMouseUp = this.onFilterMouseUp.bind(this);
        this.updateMe = this.updateMe.bind(this);
    }
    updateMe(){
        this.forceUpdate();
    }
    // onFilterMouseUp(e){
    //     const filter = e.target.value.trim();
    //     if(!filter){ return this.setState({data}); }
    //     var filtered = filters.filterTree(data, filter);
    //     filtered = filters.expandFilteredNodes(filtered, filter);
    //     this.setState({data: filtered});
    // }
    render(){
        return (
            <div>
                <TreeView
                    data={this.state.data}
                    use={
                        {
                            select: true,
                            firstChildSelect: true,
                            colSelect: true,
                            search: true,
                            active: true
                        }
                    }
                    options={
                        { nodeName: 'subs' }
                    }
                />
            </div>

        );
    }
}

const content = document.getElementById('content');
ReactDOM.render(<DemoTree/>, content);
