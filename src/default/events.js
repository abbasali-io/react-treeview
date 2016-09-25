'use strict';

const setColNode = (
		list = [],
		maxLv = 0,
		selected,
		options,
		lv = 0
) => list.forEach((e) => {
	if (lv === maxLv || maxLv === 'all') {
		e[options.selectedName] = selected;
	}
    if (Array.isArray(e[options.nodeName])) {
		if (lv <= maxLv || maxLv === 'all') {
			setColNode(e[options.nodeName], maxLv, selected, options, lv + 1);
		}
    }
});

const defaultMatcher = (filterText, node, options) => {
    return node[options.itemName].toLowerCase().indexOf(filterText.toLowerCase()) !== -1;
};

const findNode = (node, filterText, matcher, options, founded = false) => {
	const isMatcher = matcher(filterText, node, options);
	if (!isMatcher) {
		node.__TREEVIEW_VISIBLED = false;
	}
	if (founded) {
		node.__TREEVIEW_VISIBLED = true;
	}
    return matcher(filterText, node, options) || // i match
        (node[options.nodeName] && // or i have decendents and one of them match
        node[options.nodeName].length &&
        !!node[options.nodeName].find(child => findNode(child, filterText, matcher, options, founded)));
};

const setTreeNode = (list = [], filterText, options, founded = false) => {
	list
	.filter(child => findNode(child, filterText, defaultMatcher, options, founded))
	.forEach((e) => {
		let eFound = founded;
		if (defaultMatcher(filterText, e, options)) {
			eFound = true;
		} else {
			eFound = false;
		}
		e.__TREEVIEW_VISIBLED = true;
		e.__TREEVIEW_TOGGLED = true;
		const hasChildren = Array.isArray(e[options.nodeName]);
        if (hasChildren && e[options.nodeName].length) {
			setTreeNode(e[options.nodeName], filterText, options, eFound);
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
		const filterText = ele.target.value.trim();
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
