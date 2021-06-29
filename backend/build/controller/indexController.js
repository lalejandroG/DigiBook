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
                const recurso = yield elephantsql_1.default.query('SELECT * FROM recurso WHERE aprobado = True AND eliminado = false');
                console.log(recurso.rows);
                res.send({ data: recurso, cod: "00" });
            }
            catch (error) {
                console.log(error);
                res.json({ msg: "No se pudo completar su petición", cod: "01", error: error });
            }
        });
    }
    getCategoria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categoria = yield elephantsql_1.default.query('SELECT * FROM categoria');
                console.log(categoria.rows);
                res.send({ data: categoria, cod: "00" });
            }
            catch (error) {
                console.log(error);
                res.json({ msg: "No se pudo completar su petición", cod: "01", error: error });
            }
        });
    }
    getBusqueda(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var queryText = "SELECT recurso.*, ROUND(avg(comentario.calificacion), 0) AS promedio FROM recurso INNER JOIN comentario ON recurso.id_recurso = comentario.id_recurso WHERE aprobado = True AND (titulo LIKE '%" + req.body.busqueda + "%' OR resumen LIKE '%" + req.body.busqueda + "%')";
                var textCategoria = [];
                var textEstrellas = [];
                var num = 0;
                var bool = false;
                for (num = 0; num < req.body.idsCategorias.length; num++) {
                    if (req.body.checksCategorias[num] == 1) {
                        textCategoria[textCategoria.length] = req.body.idsCategorias[num];
                    }
                }
                if (textCategoria.length > 0) {
                    queryText = queryText + " AND recurso.id_recurso IN (SELECT id_recurso FROM recurso_categoria WHERE id_categoria IN (" + textCategoria.toString() + ") GROUP BY id_recurso)";
                }
                for (num = 0; num < req.body.estrellas.length; num++) {
                    if (req.body.estrellas[num] == 1) {
                        textEstrellas[textEstrellas.length] = num;
                    }
                }
                queryText = queryText + " GROUP BY recurso.id_recurso";
                if (textEstrellas.length > 0) {
                }
                for (let i of textEstrellas) {
                    if (bool) {
                        queryText = queryText + " OR ";
                    }
                    else {
                        queryText = queryText + " HAVING ";
                    }
                    bool = true;
                    queryText = queryText + "(ROUND(avg(comentario.calificacion), 0)=" + (i) + ")";
                }
                console.log(queryText);
                const recurso = yield elephantsql_1.default.query(queryText);
                console.log(recurso.rows);
                res.send({ data: recurso, cod: "00" });
            }
            catch (error) {
                console.log(error);
                res.json({ msg: "No se pudo completar su petición", cod: "01", error: error });
            }
        });
    }
    getRevisiones(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const recurso = yield elephantsql_1.default.query('SELECT * FROM recurso WHERE aprobado = False AND eliminado = false');
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
            try {
                const user = yield elephantsql_1.default.query('SELECT cu.nombre, cu.imagen_perfil, cu.admin, cu.premium, cu.biografia, r.titulo, r.fecha, r.aprobado, r.imagen, r.id_recurso FROM cuenta as cu, recurso as r WHERE cu.id_cuenta = $1 AND r.id_cuenta_publicador = $1 AND r.eliminado = false', [req.body.id]);
                console.log(user.rows);
                res.json({ data: user, cod: "00" });
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
                const fav = yield elephantsql_1.default.query('SELECT * FROM favoritos WHERE id_recurso = $1 AND id_cuenta = $2 ', [req.body.id, req.body.id_c]);
                const premium = yield elephantsql_1.default.query('SELECT premium FROM cuenta WHERE id_cuenta = $1 ', [req.body.id_c]);
                console.log(recurso.rows);
                console.log(premium.rows);
                if (fav.rows.length > 0) {
                    res.json({ data: recurso, fav: true, premium: premium.rows[0].premium, cod: "00" });
                }
                else {
                    res.json({ data: recurso, fav: false, premium: premium.rows[0].premium, cod: "00" });
                }
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
                const fav = yield elephantsql_1.default.query('SELECT f.id_recurso, r.titulo, r.imagen FROM favoritos as f, recurso as r WHERE f.id_cuenta = $1 AND r.id_recurso = f.id_recurso ', [req.body.id]);
                console.log(fav.rows);
                res.send({ data: fav, cod: "00" });
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
    edit_profile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            console.log(req.body.id);
            try {
                yield elephantsql_1.default.query('UPDATE cuenta SET nombre = $1, biografia = $2 WHERE id_cuenta = $3 ', [req.body.nombre, req.body.biografia, req.body.id]);
                res.json({ cod: "00" });
            }
            catch (error) {
                console.log(error);
                res.json({ msg: "No se pudo completar su petición", cod: "01", error: error });
            }
        });
    }
    eliminar_favs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            console.log(req.body.id);
            try {
                yield elephantsql_1.default.query('DELETE FROM favoritos WHERE id_cuenta = $1 AND id_recurso = $2 ', [req.body.id, req.body.id_recurso]);
                res.json({ cod: "00" });
            }
            catch (error) {
                console.log(error);
                res.json({ msg: "No se pudo completar su petición", cod: "01", error: error });
            }
        });
    }
    agregar_favs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            console.log(req.body.id);
            try {
                yield elephantsql_1.default.query('INSERT INTO favoritos (id_cuenta, id_recurso)  VALUES ($1, $2) ', [req.body.id, req.body.id_recurso]);
                res.json({ cod: "00" });
            }
            catch (error) {
                console.log(error);
                res.json({ msg: "No se pudo completar su petición", cod: "01", error: error });
            }
        });
    }
    comentar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            console.log(req.body.id);
            try {
                yield elephantsql_1.default.query('INSERT INTO comentario (id_cuenta, id_recurso, contenido, calificacion)  VALUES ($1, $2, $3, $4) ', [req.body.id, req.body.id_r, req.body.comentario, req.body.calificacion]);
                res.json({ cod: "00" });
            }
            catch (error) {
                console.log(error);
                res.json({ msg: "No se pudo completar su petición", cod: "01", error: error });
            }
        });
    }
    aprobar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            console.log(req.body.id);
            try {
                yield elephantsql_1.default.query('UPDATE recurso SET aprobado = true WHERE id_recurso = $1 ', [req.body.id]);
                res.json({ cod: "00" });
            }
            catch (error) {
                console.log(error);
                res.json({ msg: "No se pudo completar su petición", cod: "01", error: error });
            }
        });
    }
    usuarios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const premium = yield elephantsql_1.default.query('SELECT * FROM cuenta WHERE premium = true');
                const free = yield elephantsql_1.default.query('SELECT * FROM cuenta WHERE premium = false');
                console.log(premium.rows);
                console.log(free.rows);
                res.send({ premium: premium, free: free, cod: "00" });
            }
            catch (error) {
                console.log(error);
                res.json({ msg: "No se pudo completar su petición", cod: "01", error: error });
            }
        });
    }
    eliminar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            console.log(req.body.id);
            try {
                yield elephantsql_1.default.query('UPDATE recurso SET eliminado = true WHERE id_recurso = $1 ', [req.body.id]);
                res.json({ cod: "00" });
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
