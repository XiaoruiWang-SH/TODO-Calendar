
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
