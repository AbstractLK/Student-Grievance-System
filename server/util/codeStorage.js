const codes = {};

module.exports = {
    setCode: (email, code) => {
        codes[email] = code;
    },
    getCode: (email) => {
        return codes[email];
    },
    deleteCode: (email) => {
        delete codes[email];
    }
};
