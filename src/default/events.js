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
			e.visibled = true;
		} else if (defaultMatcher(filterText, e, options)) {
			eFounded = true;
			e.visibled = true;
		} else {
			e.visibled = false;
		}
        if (hasChildren) {
			if (eFounded){
				e.toggled = true;
			}
			setTreeNode(e[options.nodeName], filterText, options, eFounded);
        }
    });
};

export default {
	onToggle: (node, updateMe, state, options) => {
		const toggled = !node.toggled;
		// if(state.prevNode){state.prevNode.active = false;}
        if(node[options.nodeName]){
            node.toggled = toggled;
        }
        // node.active = true;
        // state.prevNode = node;
        if(typeof updateMe === 'function') {
			updateMe(state);
        }
    },
    onActive: (node, updateMe, state) => {
		if(state.prevNode){state.prevNode.active = false;}
        node.active = true;
        state.prevNode = node;
        if(typeof updateMe === 'function') {
			updateMe(state);
        }
    },
    onSelected: (node, updateMe, state, options) => {
		const selected = !node[options.selectedName];
		node[options.selectedName] = selected;
		if(typeof updateMe === 'function') {
			updateMe(state);
        }
    },
    onSelectedCol: (level, updateMe, state, options) => {
		if (!Array.isArray(state.data)){
			state.data = [state.data];
		}
		state.colSelected[level] = !state.colSelected[level];
		setColNode(state.data, level, state.colSelected[level], options);
		if(typeof updateMe === 'function') {
			updateMe();
        }
    },
    onFirstChildSelected: (node, updateMe, state, options) => {
		const selected = !node[options.selectedName];
		const children = node[options.nodeName];
		node[options.selectedName] = selected;
		node.toggled = selected;
		if(Array.isArray(children)) {
			children.map((data) => {
				data[options.selectedName] = selected;
			});
		}
		if(typeof updateMe === 'function') {
			updateMe(state);
        }
    },
    onSearch: (ele, updateMe, state, options) => {
		clearTimeout(state.waitSearching);
		const filterText = ele.target.value;
		state.waitSearching = setTimeout(() => {
			state.onSearching = true;
			updateMe(state);
			setTimeout(() => {
				if (!Array.isArray(state.data)){
					state.data = [state.data];
				}
				setTreeNode(state.data, filterText, options);
				if(typeof updateMe === 'function') {
					state.onSearching = false;
					updateMe(state);
				}
			}, 300);
		}, 300);
    },
    useEvent: {
		active: false,
		select: false,
		firstChildSelect: false,
		colSelect: false,
		search: false
    }
};
