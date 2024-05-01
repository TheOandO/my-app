import { Router, Request, Response } from 'express';
import { user } from './user.route';
import { article } from './article.route';
import { faculty } from './faculty.route';
import { schoolYear } from './school-year.route';
import { entry } from './entry.route';
import { comment } from './comment.route';
import { dowload } from './dowload.route';
import { analysis } from './analysis.route';
import path from 'path';
import fs from 'fs';
// import { UserMiddleware } from '../middlewares';

const routes = Router();
// const userMiddleware = new UserMiddleware();

// Home route
routes.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the API project!');
});

// API routes
routes.use('/api/user', user);
routes.use('/api/article', article);
routes.use('/api/faculty', faculty);
routes.use('/api/school-year', schoolYear);
routes.use('/api/entry', entry);
routes.use('/api/comment', comment);
routes.use('/api/getContribution', dowload);
routes.use('/api/analysis', analysis);
// api get image
routes.get('/image/:image', (req: Request, res: Response) => {
  const imagePath = path.join(__dirname, `../assets/uploads/${req.params.image}`);
  // Kiểm tra xem tệp ảnh có tồn tại hay không
  if (fs.existsSync(imagePath)) {
    //check file is image
    const ext = path.extname(imagePath);
    if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif' || ext === '.bmp' || ext === '.webp' || ext === '.svg' || ext === '.ico' || ext === '.tiff') {
      // Thiết lập header và gửi tệp cho client
      res.setHeader("Content-Type", `image/${ext.slice(1)}`);
      res.sendFile(imagePath);
    }
    else {
      res.status(404).send("Image not found");
    }
  } else {
    // Nếu tệp không tồn tại, trả về lỗi 404
    res.status(404).send("Image not found");
  }
});

// With Middleware
// routes.use('/api/user', userMiddleware.validateToken, userMiddleware.hasAnyRole(['user', 'admin']), user);

export default routes;
