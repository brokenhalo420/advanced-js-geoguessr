// ideas for evaluating diff:
  // < 0.05 is excellent
  // < 0.2 is ok
  // < 1 is meh
  // > 5 is bad
const getScoreFromDistance = (distance) => {
    if(distance < 0.05) {
        return "Excellent"
    } else if (distance < 0.2) {
        return "Good"
    } else if (distance < 1) {
        return "OK"
    } 
    return "Bad"
}

module.exports = getScoreFromDistance