class User {
    constructor(obj) {
        this.id = obj.id
        this.username = obj.username;
        this.password = obj.password;
    }
}

module.exports = { User };