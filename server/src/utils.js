// ideas for evaluating diff:
  // < 0.05 is excellent
  // < 0.2 is ok
  // < 1 is meh
  // > 5 is bad

const getDistance = (p1, p2) => {
    return Math.sqrt(Math.pow(p1.lat - p2.lat, 2) + Math.pow(p1.lng - p2.lng, 2))
  }
const getScoreFromDistance = (distance, scoreModifier) => {
    let modified = distance / scoreModifier
    if(modified < 0.05) {
        return "Excellent"
    } else if (modified < 0.2) {
        return "Good"
    } else if (modified < 1) {
        return "OK"
    } 
    return "Bad"
}

module.exports = { getDistance, getScoreFromDistance }