const User = require('../models/User');

class ACLService {
    constructor() {
    this.uploadDir = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir);
    }
  }

    /**
     * @param {User} user
     * @param {string[]} roles
     * @returns {boolean}
     */
    checkRole(user, roles) {

    }
}

module.exports = new ACLService();
