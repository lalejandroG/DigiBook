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
            console.log(req.body.newPostObj);
            console.log(req.body.newPostObj.correo);
            const user = [];
            user[0] = [yield elephantsql_1.default.query('SELECT * FROM cuenta as c WHERE c.correo = ?', req.body.newPostObj.correo)];
            console.log("mierda");
            const userjson = JSON.parse(JSON.stringify(user))[0];
            if (userjson) {
                if (req.body.newPostObj.password === userjson.contraseña) {
                    res.json(user);
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
