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
			e.__treeView_visibled = true;
		} else if (defaultMatcher(filterText, e, options)) {
			eFounded = true;
			e.__treeView_visibled = true;
		} else {
			e.__treeView_visibled = false;
		}
        if (hasChildren) {
			setTreeNode(e[options.nodeName], filterText, options, eFounded);
			e.__treeView_toggled = true;
			// e.__treeView_visibled = true;
        }
    });
};

export default {
	onToggle: ({node, updateMe, state, options}) => {
		const toggled = !node.__treeView_toggled;
		// if(state.prevNode){state.prevNode.active = false;}
        if(node[options.nodeName]){
            node.__treeView_toggled = toggled;
        }
        // node.active = true;
        // state.prevNode = node;
        if(typeof updateMe === 'function') {
			updateMe(state);
        }
    },
    onActive: ({node, updateMe, state}) => {
		if(state.prevNode){state.prevNode.active = false;}
        node.active = true;
        state.prevNode = node;
        if(typeof updateMe === 'function') {
			updateMe(state);
        }
    },
    onSelected: ({node, updateMe, state, options}) => {
		const selected = !node[options.selectedName];
		node[options.selectedName] = selected;
		if(typeof updateMe === 'function') {
			updateMe(state);
        }
    },
    onSelectedCol: ({value: level, updateMe, data, state, options}) => {
		if (!Array.isArray(data)){
			data = [data];
		}
		state.__treeView_colSelected[level] = !state.__treeView_colSelected[level];
		setColNode(data, level, state.__treeView_colSelected[level], options);
		if(typeof updateMe === 'function') {
			updateMe(state);
        }
    },
    onFirstChildSelected: ({node, updateMe, state, options}) => {
		const selected = !node[options.selectedName];
		const children = node[options.nodeName];
		node[options.selectedName] = selected;
		node.__treeView_toggled = true;
		if(Array.isArray(children)) {
			children.map((data) => {
				data[options.selectedName] = selected;
			});
		}
		if(typeof updateMe === 'function') {
			updateMe(state);
        }
    },
    onSearch: ({value: ele, updateMe, data, state, options}) => {
		clearTimeout(state.__treeView_waitSearching);
		const filterText = ele.target.value;
		state.__treeView_waitSearching = setTimeout(() => {
			state.__treeView_onSearching = true;
			updateMe(state);
			setTimeout(() => {
				if (!Array.isArray(data)){
					data = [data];
				}
				setTreeNode(data, filterText, options);
				if(typeof updateMe === 'function') {
					state.__treeView_onSearching = false;
					updateMe(state);
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
