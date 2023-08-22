const eventEmitter = require('../events');
const { sleep } = require('../util');

module.exports = async (req, res) => {
  await sleep(2000);
  return res.json({ status: 'success' });
};
