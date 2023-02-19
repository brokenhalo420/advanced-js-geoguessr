class User {
    constructor(obj) {
        this.id = obj.id
        this.userName = obj.username;
        this.password = obj.password;
    }
}

module.exports = { User };