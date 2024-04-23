import bcrypt from 'bcrypt';
import { Article } from '../models/article.model';
import { RefreshToken } from '../models/refresh-token.model';
import { generateTokens, roles } from '../utils';
import type { Request, Response } from 'express';
import { getTokenInfo } from '../utils';
import { article } from '../routes/article.route';
import multer, { Multer } from 'multer';
import { sendEmailCreatedArticle, sendEmailUpdateArticle } from '../services/email.service';
import { User } from '../models/user.model';
import { Faculty } from '../models/faculty.model';


// model article : files: {
//     type: [String],
//     required: true,
// },
// images: {
//     type: [String],
//     required: true,
// },
// entry_id: {
//     type: String,
//     required: true,
//     trim: true,
// },
// student_id: {
//     type: String,
//     required: true,
//     trim: true,
// },
// faculty_id: {
//     type: String,
//     required: true,
//     trim: true,
// },
// term_condition: {
//     type: Boolean,
//     required: true,
// }
//wirte crud for article


export const create = async (req: Request, res: Response) => {
    try {
       
        // const 
        // const article = new Article(req.body);
        // const newArticle = await Article.create(article);
        const { files, images } = await req.files as { [key: string]: Express.Multer.File[] };
        
        // Lưu tên file Word vào MongoDB
        const { body } = req;
        const student_id = body.student_id;
        const studentInfo = await User.findOne({
            _id: student_id
        });

        const facultyInfo = await Faculty.findOne({
            _id: studentInfo?.faculty_id
        });
        const marketingCoordinator = await User.findOne({
            role: roles.marketingCoordinator,
            faculty_id: facultyInfo?._id
        });
         const newArticle = await Article.create({
            ...req.body,
            files: await files.map((file) => file.filename),
            images: await images.map((image) => image.filename),
        });
        const data = {
            name: studentInfo!.name,
            email: marketingCoordinator!.email,
            // url : `http://localhost:3000/article/${newArticle._id}`
        }
        await sendEmailCreatedArticle(data);

        return res.status(200).json({
            error: false, message: 'Article created', data: newArticle
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: 'Internal Server Error', info : error });
    }


};

export const findAll = async (req: Request, res: Response) => {
    try {
        const articles = await Article.find();
        return res.status(200).json({
            error: false, message: 'All articles', data: articles
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: 'Internal Server Error', info : error });
    }
};

export const findOne = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const article = await Article.findById(id);
        if (!article) {
            return res.status(404).json({ error: true, message: 'Article not found' });
        }
        return res.status(200).json({
            error: false, message: 'Article found', data: article
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: 'Internal Server Error', info : error });
    }
};

//update tính lại, condinron
export const update = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { body } = req;
        
        const { files, images } = await req.files as { [key: string]: Express.Multer.File[] };
        
        const student_id = body.student_id;
        const studentInfo = await User.findOne({
            _id: student_id
        });

        const facultyInfo = await User.findOne({
            _id: studentInfo?.faculty_id
        });
        const marketingCoordinator = await User.findOne({
            role: roles.marketingCoordinator,
            faculty_id: facultyInfo?.faculty_id
        });
        //  const newArticle = await Article.create({
        //     ...req.body,
        //     files: await files.map((file) => file.filename),
        //     images: await images.map((image) => image.filename),
        // });

        const article = await Article.findByIdAndUpdate
            (id, {
                ...body,
                files: await files.map((file) => file.filename),
                images: await images.map((image) => image.filename),
            
            }, { new: true });
      
        const data = {
            name: studentInfo!.name,
            email: marketingCoordinator!.email,
            // url : `http://localhost:3000/article/${newArticle._id}`
        }
        await sendEmailUpdateArticle(data);
        return res.status(200).json({
            error: false, message: 'Article updated', data: article
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: 'Internal Server Error', info : error });
    }
}

export const remove = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const article = await Article.findByIdAndDelete(id);
        if (!article) {
            return res.status(404).json({ error: true, message: 'Article not found' });
        }
        return res.status(200).json({
            error: false, message: 'Article deleted', data: article
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: 'Internal Server Error', info : error });
    }
}

export const getArticleByStudentId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const article = await Article.find({
            student_id: id
        });
        if (!article) {
            return res.status(404).json({ error: true, message: 'Article not found' });
        }
        return res.status(200).json({
            error: false, message: 'Article found', data: article
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: 'Internal Server Error', info : error });
    }

}

export const getArticleByFacultyId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const article = await Article.find({
            faculty_id: id
        });
        if (!article) {
            return res.status(404).json({ error: true, message: 'Article not found' });
        }
        return res.status(200).json({
            error: false, message: 'Article found', data: article
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: 'Internal Server Error', info : error });
    }

}
