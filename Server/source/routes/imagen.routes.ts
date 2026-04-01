import { Router } from 'express'
import { ImageController } from '../controller/imageController'


export class ImageRoutes {
    static get routes(): Router {
        const router = Router()
        const controller = new ImageController()

        router.post("/upload", (req, res, next) => { controller.upload(req, res, next); });
        router.get("/files", (req, res, next) => { controller.getListFiles(req, res, next); });
        router.get("/files/:name", (req, res, next) => { controller.download(req, res, next); });
        return router
    }


}