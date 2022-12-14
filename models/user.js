class User {
    constructor(obj){
        this.username = obj.username;
        this.email = obj.email;
        this.name = obj.name;
        this.password = obj.password;
    }
}

module.exports({User});