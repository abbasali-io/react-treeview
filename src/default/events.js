'use strict';

const setColNode = (
		list = [],
		maxLv = 0,
		selected,
		options,
		lv = 0
) => list.forEach((e) => {
	if (lv === maxLv || maxLv === 0) {
		e[options.selectedName] = selected;
	}
    if (Array.isArray(e[options.nodeName])) {
		if (lv <= maxLv || maxLv === 0) {
			setColNode(e[options.nodeName], maxLv, selected, options, lv + 1);
		}
    }
});

const defaultMatcher = (filterText, node, options) => {
    return node[options.itemName].toLowerCase().indexOf(filterText.toLowerCase()) !== -1;
};

const setTreeNode = (list = [], filterText, options, founded = false) => {
	list.forEach((e) => {
		// define for next each founded change, founded use only children
		let eFounded = founded;
		const hasChildren = Array.isArray(e[options.nodeName]);
		if (eFounded) {
			e.__TREEVIEW_VISIBLED = true;
		} else if (defaultMatcher(filterText, e, options)) {
			eFounded = true;
			e.__TREEVIEW_VISIBLED = true;
		} else {
			e.__TREEVIEW_VISIBLED = false;
		}
        if (hasChildren) {
			setTreeNode(e[options.nodeName], filterText, options, eFounded);
			e.__TREEVIEW_TOGGLED = true;
			// e.__TREEVIEW_VISIBLED = true;
        }
    });
};

export default {
	onToggle: ({node, _render, options}) => {
		const toggled = !node.__TREEVIEW_TOGGLED;
		// if(_status.prevNode){_status.prevNode.active = false;}
        if(node[options.nodeName]){
            node.__TREEVIEW_TOGGLED = toggled;
        }
        // node.active = true;
        // _status.prevNode = node;
        if(typeof _render === 'function') {
			_render();
        }
    },
    onActive: ({node, _render, _status}) => {
		if(_status.prevNode){_status.prevNode.active = false;}
        node.active = true;
        _status.prevNode = node;
        if(typeof _render === 'function') {
			_render();
        }
    },
    onSelected: ({node, _render, options}) => {
		const selected = !node[options.selectedName];
		node[options.selectedName] = selected;
		if(typeof _render === 'function') {
			_render();
        }
    },
    onSelectedCol: ({value: level, _render, data, _status, options}) => {
		if (!Array.isArray(data)){
			data = [data];
		}
		_status.__TREEVIEW_COL_SELECTED[level] = !_status.__TREEVIEW_COL_SELECTED[level];
		setColNode(data, level, _status.__TREEVIEW_COL_SELECTED[level], options);
		if(typeof _render === 'function') {
			_render();
        }
    },
    onFirstChildSelected: ({node, _render, options}) => {
		const selected = !node[options.selectedName];
		const children = node[options.nodeName];
		node[options.selectedName] = selected;
		node.__TREEVIEW_TOGGLED = true;
		if(Array.isArray(children)) {
			children.map((data) => {
				data[options.selectedName] = selected;
			});
		}
		if(typeof _render === 'function') {
			_render();
        }
    },
    onSearch: ({value: ele, _render, data, _status, options}) => {
		clearTimeout(_status.__TREEVIEW_SEARCHING_TIMEOUT);
		const filterText = ele.target.value;
		_status.__TREEVIEW_SEARCHING_TIMEOUT = setTimeout(() => {
			_status.__TREEVIEW_ONSEARCHING = true;
			_render();
			setTimeout(() => {
				if (!Array.isArray(data)){
					data = [data];
				}
				setTreeNode(data, filterText, options);
				if(typeof _render === 'function') {
					_status.__TREEVIEW_ONSEARCHING = false;
					_render();
				}
			}, 150);
		}, 500);
    },
    useEvent: {
		active: false,
		select: false,
		firstChildSelect: false,
		colSelect: false,
		search: false
    }
};
