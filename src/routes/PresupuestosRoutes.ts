import { Router } from "express"
import {body, param} from 'express-validator'
import { PresupuestoControllers } from "../controllers/PresupuestoControllers";
import {GastosController} from "../controllers/GastosController"
import { HandleInputErrors } from "../middleware/validation";
import { validatePresupuestoID,validatePresupuestoExist, ValidatePresupuestoInput } from "../middleware/presupuesto";
import {  validateGastosId, ValidateGastosInput, validateGastoExist } from "../middleware/Gastos";
const router = Router();

router.param('PresupuestoId',validatePresupuestoID)
router.param('PresupuestoId',validatePresupuestoExist)
router.param('gastosId',validatePresupuestoExist)
router.param('gastosId',validateGastoExist)
router.get('/', PresupuestoControllers.getAll)
router.post("/", ValidatePresupuestoInput, HandleInputErrors, PresupuestoControllers.create)
router.get('/:PresupuestoId', PresupuestoControllers.buscar)
router.put('/:PresupuestoId',PresupuestoControllers.actualizar)
router.delete('/:PresupuestoId', PresupuestoControllers.eliminar)

router.get('/:PresupuestoId/Gastos',GastosController.getAll)
router.post('/:PresupuestoId/Gastos',ValidateGastosInput,HandleInputErrors,GastosController.create)
router.get('/:PresupuestoId/Gastos/:gastosId',validateGastosId,GastosController.getById)
router.put('/:PresupuestoId/Gastos/:gastosId',validateGastosId,GastosController.updateById)
router.delete('/:PresupuestoId/Gastos/:gastosId',validateGastosId,GastosController.deleteById)

export default router