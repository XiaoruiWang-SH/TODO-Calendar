
export default class ItemData {
    constructor(id, name, checked, important, createTime, expireTime) {
        this.id = id;
        this.name = name;
        this.checked = checked;
        this.important = important;
        this.createTime = createTime;
        this.expireTime = expireTime;
    }

    setChecked(checked) {
        this.checked = checked;
    }

    setImportant(important) {
        this.important = important;
    }

    isExpired() {
        return this.expireTime < new Date();
    }


};