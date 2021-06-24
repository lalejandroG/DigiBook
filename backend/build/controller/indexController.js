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
const md5_1 = require("ts-md5/dist/md5");
class IndexController {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            console.log(req.body.correo);
            try {
                const user = yield elephantsql_1.default.query('SELECT * FROM cuenta as c WHERE c.correo = $1', [req.body.correo]);
                console.log(user.rowCount);
                if (md5_1.Md5.hashStr(req.body.password) === user.rows[0].password) {
                    console.log(md5_1.Md5.hashStr(req.body.password) + " EN BD: " + user.rows[0].password);
                    console.log(user.rows[0]);
                    res.json({ data: user.rows[0], cod: "00" });
                }
                else {
                    res.json({ msg: "Credenciales invalidas", cod: "01" });
                }
            }
            catch (error) {
                res.json({ msg: "Credenciales invalidas", cod: "01", error: error });
            }
        });
    }
    getRecurso(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const recurso = yield elephantsql_1.default.query('SELECT * FROM recurso');
                console.log(recurso.rows);
                res.send({ data: recurso, cod: "00" });
            }
            catch (error) {
                console.log(error);
                res.json({ msg: "No se pudo completar su petición", cod: "01", error: error });
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
                        const user = yield elephantsql_1.default.query('INSERT INTO cuenta(correo, password, nombre) VALUES($1, md5($2), $3)', [req.body.correo, req.body.password, req.body.nombre]);
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
                        res.json({ msg: "No se pudo completar su petición", cod: "01", error: error });
                    }
                }
            }
            catch (error) {
                res.json({ msg: "No se pudo completar su petición", cod: "01", error: error });
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
                        const user = yield elephantsql_1.default.query('UPDATE cuenta SET password = md5($1) WHERE correo = $2', [req.body.password, req.body.correo]);
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
                        res.json({ msg: "No se pudo completar su petición", cod: "01", error: error });
                    }
                }
            }
            catch (error) {
                res.json({ msg: "No se pudo completar su petición", cod: "01", error: error });
            }
        });
    }
    perfil(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            console.log(req.body.correo);
            try {
                const user = yield elephantsql_1.default.query('SELECT * FROM cuenta as c WHERE c.id_cuenta = $1', [req.body.id]);
                console.log(user.rowCount);
                if (user.rowCount === 0) {
                    console.log(user.rows[0]);
                    res.json({ data: user.rows[0], cod: "00" });
                }
                else {
                    res.json({ msg: "Usuario no registrado", cod: "01" });
                }
            }
            catch (error) {
                res.json({ msg: "No se pudo completar su petición", cod: "01", error: error });
            }
        });
    }
    detalle_producto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            console.log(req.body.id);
            try {
                const recurso = yield elephantsql_1.default.query('SELECT r.resumen, r.titulo, r.imagen, r.url, co.id_cuenta, co.contenido, avg(co.calificacion), cu.nombre FROM recurso as r, comentario as co, cuenta as cu WHERE r.id_recurso = $1 AND co.id_recurso = $1 AND cu.id_cuenta = co.id_cuenta GROUP BY co.calificacion, r.resumen, r.titulo, r.imagen, r.url, co.id_cuenta, co.contenido, cu.nombre ORDER BY co.contenido LIMIT 1 ', [req.body.id]);
                console.log(recurso.rows);
                res.json({ data: recurso, cod: "00" });
            }
            catch (error) {
                console.log(error);
                res.json({ msg: "No se pudo completar su petición", cod: "01", error: error });
            }
        });
    }
    favorite(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fav = yield elephantsql_1.default.query('SELECT * FROM favoritos WHERE id_cuenta = $1', [req.body.id]);
                if (fav.rowCount != 0) {
                    const recurso = yield elephantsql_1.default.query('SELECT * FROM recurso');
                    console.log(recurso.rows);
                    res.send({ data: recurso, cod: "00" });
                }
                else {
                    res.json({ msg: "No posee favoritos", cod: "01", error: "No posee favoritos" });
                }
            }
            catch (error) {
                console.log(error);
                res.json({ msg: "No se pudo completar su petición", cod: "01", error: error });
            }
        });
    }
    comments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            console.log(req.body.id);
            try {
                const comments = yield elephantsql_1.default.query('SELECT co.id_cuenta, co.contenido, cu.nombre, co.calificacion FROM comentario as co, cuenta as cu WHERE co.id_recurso = $1 AND cu.id_cuenta = co.id_cuenta ', [req.body.id]);
                console.log(comments.rows);
                res.json({ data: comments, cod: "00" });
            }
            catch (error) {
                console.log(error);
                res.json({ msg: "No se pudo completar su petición", cod: "01", error: error });
            }
        });
    }
}
const indexController = new IndexController();
exports.default = indexController;
