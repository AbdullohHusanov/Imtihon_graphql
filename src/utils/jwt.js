import pkg from 'jsonwebtoken';

export default {
    sign: payload => pkg.sign(payload, "qwer"),
    verify: token => pkg.verify(token, "qwer")
}
