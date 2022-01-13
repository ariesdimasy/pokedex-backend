function get_random(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function random_number() {
  return Math.floor(Math.random() * 1000);
}

module.exports = { get_random, random_number };
