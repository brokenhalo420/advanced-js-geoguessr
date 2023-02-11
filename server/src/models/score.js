class Score {
    constructor(obj) {
        this.id = obj.id
        this.timestamp = obj.timestamp;
        this.points = obj.points;
        this.userId = obj.user_id;
    }
}

module.exports = { Score };