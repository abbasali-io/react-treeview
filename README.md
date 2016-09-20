# zanroo/react-treeview
## customize from
### (https://github.com/alexcurtis/react-treebeard/)

## ปรับแต่งเยอะพอสมควร ไม่ใช้ remote up-stream ของเดิม

### Install

`npm install react-treebeard --save`

### [Example] ดูใน

1. `example/app.js`

### [Preview]
1. `npm install`

2. `npm install --global webpack webpack-dev-server gulp-cli`

3. `gulp`

### แก้เสร็จแล้ว จะ build สำหรับ prepublish ขึ้น npm
`npm run prepublish`

### Prop Values Required

#### data
`React.PropTypes.Array.Required` or `React.PropTypes.Object.Required`

#### state (สำหรับเก็บค่า status ที่จำเป็น
`React.PropTypes.Object.Required`

#### updateMe run คำสั่ง `this.forceUpdate();`
`React.PropTypes.func.Required`

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
#### default
```javascript
{
	itemName: 'name',
	nodeName: 'children',
	selectedName: 'selected'
}
```

### decorators (Overwrite การแสดงผลในส่วนต่างๆ)
#### ดูจาก `src/components/decorators.js`
#### รับต่าแค่ตัวที่จะ overwrite

### animations (Overwrite Handle Animations )
#### ดูจาก `src/components/decorators.js`
#### รับต่าแค่ตัวที่จะ overwrite

### (Overwrite Event Animations )
`React.PropTypes.func`
#### arguments แต่ละตัวดูจาก `default/events.js, components/treeview.js, components/node.js`
#### onToggle, onActive, onSelected, onSelectedCol, onFirstChildSelected, onSearch
