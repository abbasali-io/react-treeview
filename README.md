# zanroo/react-treeview
## customize from
### (https://github.com/alexcurtis/react-treebeard/)

## ปรับแต่งเยอะพอสมควร ไม่ใช้ remote up-stream ของเดิม

### Install

`npm install zanroo-react-treeview --save`

### [Example] ดูใน

1. `example/app.js`

### [Preview]
1. `npm install`

2. `npm install --global webpack webpack-dev-server gulp-cli`

3. `gulp`

### แก้เสร็จแล้ว จะ build สำหรับ prepublish ขึ้น npm
`npm run prepublish`

## How to use
```javascript
import TreeView from "zanroo-react-treeview"
import '../src/default/style.css';
// You can embed style manual
..
..

render() {
    return <TreeView data={yoursData} {...other} />
}
```
Default Theme Styles: (https://github.com/zanroo/react-treeview/blob/master/src/default/style.css)

## Prop Values Required

### data
`React.PropTypes.Array.Required` or `React.PropTypes.Object.Required`

### use จะใช้งานส่วนใดบ้าง default (false) ทุกตัว
`React.PropTypes.object`
```javascript
{
    select: true,
    firstChildSelect: true,
    colSelect: true,
    search: true
}
```

### options (ใช้กรณี key ของแต่ละ node ไม่ตรงกับ default)
`React.PropTypes.object`
default
```javascript
{
	itemName: 'name',
	nodeName: 'children',
	selectedName: 'selected'
}
```

### decorators (Overwrite การแสดงผลในส่วนต่างๆ)
ดูจาก `src/components/decorators.js`
รับต่าแค่ตัวที่จะ overwrite
โดยจะได้
```javascript
Loading.propTypes = undefined;

Toggle.propTypes = {
    node: React.PropTypes.object.isRequired,
    toggled: React.PropTypes.bool
};

Header.propTypes = {
    node: React.PropTypes.object.isRequired,
    options: React.PropTypes.object.isRequired
};

Selected.propTypes = {
    node: React.PropTypes.object.isRequired,
    onEvent: React.PropTypes.func.isRequired,
    options: React.PropTypes.object.isRequired
};

FirstChildSelected.propTypes = {
    onEvent: React.PropTypes.func.isRequired
};

ColSelected.propTypes = {
    maxLevel: React.PropTypes.number.isRequired,
    onEvent: React.PropTypes.func.isRequired,
    colSelected: React.PropTypes.array
};

SearchTree.propTypes = {
    onEvent: React.PropTypes.func
};
```

ระวังการ Overwrite decorators.Container ส่วนนี้ default เป็นส่วนที่ส่งค่า props ด้านบนให้ decorators แต่ละตัว
```javascript
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
```

### [Velocity] animations (Overwrite Handle Animations)
ดูจาก `src/components/decorators.js`
รับต่าแค่ตัวที่จะ overwrite

### (Overwrite Event Animations )
`React.PropTypes.func`
arguments แต่ละตัวดูจาก `default/events.js, components/treeview.js, components/node.js`
onToggle, onActive, onSelected, onSelectedCol, onFirstChildSelected, onSearch
เมื่อ overwrite ให้เซตค่าตามที่ต้องการ ตาม arguments ที่ได้รับมา ดูตัวอย่างจาก events.js จากในไฟล์ข้างบน โดย arguments ที่ส่งเข้าแต่ละ event reference กับค่าต้นทางอยู่แล้วหากเรียบร้อยจะมี function _render สั่ง render ใหม่อีกรอบตาม cycle ปกติของ React
