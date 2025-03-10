
export default class ItemData {
    constructor(id, name, checked, important, createTime, expireTime=null, updateTime=createTime) {
        this.id = id;
        this.name = name;
        this.checked = checked;
        this.important = important;
        this.createTime = createTime;
        this.expireTime = expireTime;
        this.updateTime = updateTime;
    }

    setChecked(checked) {
        this.checked = checked;
    }

    setImportant(important) {
        this.important = important;
    }

    setExpireTime(expireTime) {
        this.expireTime = expireTime;
    }

    setUpdateTime(updateTime) {
        this.updateTime = updateTime;
    }

    isExpired() {
        return this.expireTime < new Date();
    }

};


export class ItemDataList {
    constructor() {
        this.importantMap = new Map();
        this.normalMap = new Map();
    }

    addTask(itemData) {
        if (itemData.important) {
            this.importantMap = new Map([[itemData.id, itemData], ...this.importantMap])
        } else {
            this.normalMap = new Map([[itemData.id, itemData], ...this.normalMap])
        }
    }

    hasTask(id) {
        return this.importantMap.has(id) || this.normalMap.has(id);
    }
     
    findTask(id) {
        if (this.importantMap.has(id)) {
            return this.importantMap.get(id);
        } else {
            return this.normalMap.get(id);
        }
    }

    removeTask(id) {
        if (this.importantMap.has(id)) {
            this.importantMap.delete(id);
        } else {
            this.normalMap.delete(id);
        }
    }

    getList() {
        return [...this.importantMap.values(), ...this.normalMap.values()];
    }
};