import { Router } from 'express';
import * as controller from '../controllers/article.controller';
import { UserMiddleware } from '../middlewares';
import { roles } from '../utils';
import multer, { Multer } from 'multer';
import path from 'path';
import { ArticleMiddleware } from '../middlewares/article.middleware';
export const article = Router();
const articleMiddleware = new ArticleMiddleware();
const userMiddleware = new UserMiddleware();
// Cấu hình Multer
const storage: multer.StorageEngine = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, 'src/assets/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${req.body.student_id}_${Date.now()}${path.extname(file.originalname)}`);
    },
});

const upload: Multer = multer({ storage });

// const userMiddleware = new UserMiddleware();
article.post('/create', upload.fields([
    { name: 'files', maxCount: 5 },
    { name: 'images', maxCount: 5 },
]), userMiddleware.hasRole(roles.student), articleMiddleware.checkPermissionPostArticle, articleMiddleware.checkExpireSchoolYear, controller.create);
article.get('/get-by-id/:id', controller.findOne);
article.get('/get-all', userMiddleware.validateToken, controller.findAll);
article.delete('/delete/:id', controller.remove);
article.put('/edit/:id', upload.fields([
    { name: 'files', maxCount: 5 },
    { name: 'images', maxCount: 5 },
]), userMiddleware.hasRole(roles.student), articleMiddleware.checkPermissionPostArticle, articleMiddleware.checkExpireSchoolYear, controller.update);


article.get('/get-by-faculty/:id', userMiddleware.validateToken, controller.getArticleByFacultyId);
article.get('/get-by-student/:id',userMiddleware.validateToken, controller.getArticleByStudentId);
