const userService = require('../services/UserService');

class UserController {
    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */
    addUser(req, res) {
        const {username, email, password} = req.body;
        const user = userService.createUser(username, email, password);
        res.status(201).json({success: true, user});
    }

    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */
    login(req, res) {
        const {email, password} = req.body;
        if(userService.login(email, password)) {
            res.status(201).json({success: true});
        } else {
            res.status(401).json({success: false});
        }
    }

    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */
    logout(req, res) {
        userService.logout();
        res.status(201).json({success: true});
    }
}

module.exports = new UserController();
