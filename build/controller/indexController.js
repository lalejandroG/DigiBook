"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const elephantsql_1 = __importDefault(require("../elephantsql"));
class IndexController {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            console.log(req.body.correo);
            const user = yield elephantsql_1.default.query('SELECT * FROM cuenta as c WHERE c.correo = $1', [req.body.correo]);
            console.log("mierda");
            console.log(user.rowCount);
            if (user.rowCount != 0) {
                if (req.body.password === user.rows[0].contraseña) {
                    console.log(user.rows[0]);
                    res.json(user.rows[0]);
                }
                else {
                    res.status(400).json({ msg: "Credenciales invalidas" });
                }
            }
            else {
                res.status(404).json({ msg: "Usuario no registrado" });
            }
        });
    }
}
const indexController = new IndexController();
exports.default = indexController;
