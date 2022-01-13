function primeNumber(num) {
  if (num === 0 || num === 1) {
    return false;
  } else if (num % 2 === 0 && num !== 2) {
    return false;
  } else {
    for (var i = 3; i < num; i++) {
      if (num % i === 0) {
        return false;
      }
    }
  }

  return true;
}

module.exports = { primeNumber };
