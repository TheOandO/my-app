import bcrypt from 'bcrypt';
import { Article } from '../models/article.model';
import { RefreshToken } from '../models/refresh-token.model';
import { generateTokens, roles } from '../utils';
import type { Request, Response } from 'express';
import { getTokenInfo } from '../utils';
import { article } from '../routes/article.route';
import multer, { Multer } from 'multer';
import path from 'path';
import { Entry } from '../models/entry.model';
import fs from 'fs/promises';
import AdmZip from 'adm-zip';

export const dowloadContributionsZipByEntryId = async (req: Request, res: Response) => {
    try {
        const articles = await Article.find({ entry_id: req.params.id });
        if (articles.length === 0) {
            return res.status(404).json({ error: true, message: 'Articles not found. Please check entry id' });
        } else {
            const zip = await new AdmZip();
            // await zip.addLocalFile(path.join(__dirname, `../assets/uploads/6619db0d9f601702d96f849b_1713024034289.jpg`));
            for (const article of articles) {
                const files = article.files.concat(article.images);
                for (const file of files) {
                    const filePath = path.join(__dirname, `../assets/uploads/${file}`);
                    const stats = await fs.stat(filePath);
                    if (stats.isFile()) {
                        await zip.addLocalFile(filePath);
                    }
                }
            }
            const downloadName = `articles_${Date.now()}.zip`;
            const data = await zip.toBuffer();
            res.set('Content-Type', 'application/octet-stream');
            res.set('Content-Disposition', `attachment; filename=${downloadName}`);
            // res.set('Content-Length',data.length);
            res.send(data);

        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: 'Internal Server Error', info: error });
    }
}

export const dowloadContributionsZipByStudentId = async (req: Request, res: Response) => {
    try {
        const articles = await Article.find({ student_id: req.params.id });
        if (articles.length === 0) {
            console.log(articles);
            return res.status(404).json({ error: true, message: 'Articles not found. Please check student id' });
        } else {
            const zip = await new AdmZip();
            // await zip.addLocalFile(path.join(__dirname, `../assets/uploads/6619db0d9f601702d96f849b_1713024034289.jpg`));
            for (const article of articles) {
                const files = article.files.concat(article.images);
                for (const file of files) {
                    const filePath = path.join(__dirname, `../assets/uploads/${file}`);
                    const stats = await fs.stat(filePath);
                    if (stats.isFile()) {
                        await zip.addLocalFile(filePath);
                    }
                }
            }
            const downloadName = `articles_${Date.now()}.zip`;
            const data = await zip.toBuffer();
            res.set('Content-Type', 'application/octet-stream');
            res.set('Content-Disposition', `attachment; filename=${downloadName}`);
            // res.set('Content-Length',data.length);
            res.send(data);


        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: 'Internal Server Error', info: error });
    }
}

export const dowloadContributionsZipBySchoolYearId = async (req: Request, res: Response) => {
    try {
        const articles = await Article.find({ school_year_id: req.params.id });
        if (articles.length === 0) {
            return res.status(404).json({ error: true, message: 'Articles not found' });
        } else {
            const zip = await new AdmZip();
            // await zip.addLocalFile(path.join(__dirname, `../assets/uploads/6619db0d9f601702d96f849b_1713024034289.jpg`));
            for (const article of articles) {
                const files = article.files.concat(article.images);
                for (const file of files) {
                    const filePath = path.join(__dirname, `../assets/uploads/${file}`);
                    const stats = await fs.stat(filePath);
                    if (stats.isFile()) {
                        await zip.addLocalFile(filePath);
                    }
                }
            }
            const downloadName = `articles_${Date.now()}.zip`;
            const data = await zip.toBuffer();
            res.set('Content-Type', 'application/octet-stream');
            res.set('Content-Disposition', `attachment; filename=${downloadName}`);
            // res.set('Content-Length',data.length);
            res.send(data);

        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: 'Internal Server Error', info: error });
    }
}

export const dowloadContributionsZipByArticleId = async (req: Request, res: Response) => {
    try {
        const article = await Article.findOne({ _id: req.params.id });
        if (!article) {
            return res.status(404).json({ error: true, message: 'Article not found' });
        } else {
            const zip = await new AdmZip();
            // await zip.addLocalFile(path.join(__dirname, `../assets/uploads/6619db0d9f601702d96f849b_1713024034289.jpg`));

            const files = article.files.concat(article.images);
            for (const file of files) {
                const filePath = path.join(__dirname, `../assets/uploads/${file}`);
                const stats = await fs.stat(filePath);
                if (stats.isFile()) {
                    await zip.addLocalFile(filePath);
                }
            }

            const downloadName = `articles_${Date.now()}.zip`;
            const data = await zip.toBuffer();
            res.set('Content-Type', 'application/octet-stream');
            res.set('Content-Disposition', `attachment; filename=${downloadName}`);
            // res.set('Content-Length',data.length);
            res.send(data);

        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: 'Internal Server Error', info: error });
    }
}

export const saveFile = async (req: Request, res: Response) => {
    try {
        const fileName = req.params.fileName;
        const filePath = `src/assets/uploads/${fileName}`;
      
        try {
          const file = await fs.readFile(filePath);
          res.set('Content-Type', 'application/octet-stream'); // Set content type
          res.set('Content-Disposition', `attachment; filename="${fileName}"`); // Set filename
          res.send(file);
        } catch (error) {
          console.error(error);
          res.status(404).send('File not found');
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: 'Internal Server Error', info: error });
    }
}
