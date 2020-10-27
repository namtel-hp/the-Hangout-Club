"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RegisterInFirebase = exports.signOutUser = exports.signInWithEmail = void 0;

var _firebase = _interopRequireDefault(require("./firebase.config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var auth = _firebase["default"].auth(); // const dispatch = useDispatch()


var signInWithEmail = function signInWithEmail(user) {
  return auth.signInWithEmailAndPassword(user.email, user.password);
};

exports.signInWithEmail = signInWithEmail;

var signOutUser = function signOutUser() {
  return auth.signOut();
};

exports.signOutUser = signOutUser;

var RegisterInFirebase = function RegisterInFirebase(cred) {
  var response;
  return regeneratorRuntime.async(function RegisterInFirebase$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(auth.createUserWithEmailAndPassword(cred.email, cred.password));

        case 3:
          response = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(response.user.updateProfile({
            displayName: cred.displayName
          }));

        case 6:
          return _context.abrupt("return", _context.sent);

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          throw _context.t0;

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

exports.RegisterInFirebase = RegisterInFirebase;