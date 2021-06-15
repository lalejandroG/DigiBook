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
            try {
                const user = yield elephantsql_1.default.query('SELECT * FROM cuenta as c WHERE c.correo = $1', [req.body.correo]);
                console.log(user.rowCount);
                if (req.body.password === user.rows[0].password) {
                    console.log(user.rows[0]);
                    res.json({ data: user.rows[0], cod: "00" });
                }
                else {
                    res.json({ msg: "Credenciales invalidas", cod: "01" });
                }
            }
            catch (error) {
                res.json({ msg: "Usuario no registrado", cod: "01" });
            }
        });
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            console.log(req.body.correo);
            try {
                const validacion = yield elephantsql_1.default.query('SELECT * FROM cuenta as c WHERE c.correo = $1', [req.body.correo]);
                console.log(validacion.rowCount);
                if (validacion.rowCount != 0) {
                    res.json({ msg: "Usuario ya existe", cod: "01" });
                }
                else {
                    try {
                        const user = yield elephantsql_1.default.query('INSERT INTO cuenta(correo, password, nombre) VALUES($1, $2, $3)', [req.body.correo, req.body.password, req.body.nombre]);
                        const datos = yield elephantsql_1.default.query('SELECT * FROM cuenta as c WHERE c.correo = $1', [req.body.correo]);
                        console.log(user);
                        if (user.rowCount != 0) {
                            console.log(datos.rows[0]);
                            res.json({ data: datos.rows[0], cod: "00" });
                        }
                        else {
                            res.json({ msg: "Error al registrar", cod: "01" });
                        }
                    }
                    catch (error) {
                        res.json({ msg: "Usuario ya existe", cod: "01" });
                    }
                }
            }
            catch (error) {
                res.json({ msg: "Usuario no existe" });
            }
        });
    }
    recuperarPsw(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            console.log(req.body.correo);
            try {
                const datos = yield elephantsql_1.default.query('SELECT * FROM cuenta as c WHERE c.correo = $1', [req.body.correo]);
                console.log(datos.rowCount);
                if (datos.rowCount === 0) {
                    res.json({ msg: "Usuario no existe", cod: "01" });
                }
                else {
                    try {
                        const user = yield elephantsql_1.default.query('UPDATE cuenta SET password = $1 WHERE correo = $2', [req.body.password, req.body.correo]);
                        console.log(user);
                        if (user.rowCount != 0) {
                            console.log(datos.rows[0]);
                            res.json({ data: datos.rows[0], cod: "00" });
                        }
                        else {
                            res.json({ msg: "Fallo en recuperar contraseña", cod: "01" });
                        }
                    }
                    catch (error) {
                        res.json({ msg: "Usuario no existe", cod: "01" });
                    }
                }
            }
            catch (error) {
                res.json({ msg: "Usuario no existe" });
            }
        });
    }
}
const indexController = new IndexController();
exports.default = indexController;
