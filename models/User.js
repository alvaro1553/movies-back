const argon2 = require('argon2');

module.exports = class User {

    constructor(){
        this._email = '';
        this._secret = null;
        this._level = null; //DB Default is 2
    }

    get email() {
        return this._email;
    }

    set email(value) {
        if(!value) throw new Error('Email cannot be empty')
        this._email = value;
    }

    get level() {
        return this._level;
    }

    set level(value) {
        if(!value) throw new Error('Level cannot be empty')
        this._level = value;
    }

    get secret() {
        return this._secret;
    }

    set secret(value) {
        if(!value) throw new Error('Secret cannot be empty')
        this._secret = value;
    }

}