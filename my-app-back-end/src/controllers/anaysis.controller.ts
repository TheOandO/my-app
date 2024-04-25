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
import { User } from '../models/user.model';
import { Faculty } from '../models/faculty.model';

export const analysisContributeBySchoolYear = async (req: Request, res: Response) => {
    try {
        const articles = await Article.find({ school_year_id: req.params.id });
        let contributionsMap = new Map();
        for (const article of articles) {
            const userInfo = await User.findOne({ _id: article.student_id });
            const facultyInfo = await Faculty.findOne({ _id: userInfo?.faculty_id });
            if (contributionsMap.has(facultyInfo?._id)) {
                let contributions = contributionsMap.get(facultyInfo?._id);
                contributions.contributions += 1;
                contributionsMap.set(facultyInfo?._id, contributions);
            } else {
                contributionsMap.set(facultyInfo?._id, {

                    facultyName: facultyInfo?.name,
                    contributions: 0

                });
            }

        }
        return res.status(200).json({
            error: false, message: 'Contributions by faculty', data: Array.from(contributionsMap.values())
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: 'Internal Server Error', info: error });
    }
}

export const analysisContributeByRate = async (req: Request, res: Response) => {
    try {
        const articles = await Article.find({ school_year_id: req.params.id });
        let contributionsMap = new Map();
        for (const article of articles) {
            const userInfo = await User.findOne({ _id: article.student_id });
            const facultyInfo = await Faculty.findOne({ _id: userInfo?.faculty_id });
            if (contributionsMap.has(facultyInfo?._id)) {
                let contributions = contributionsMap.get(facultyInfo?._id);
                contributions.contributions += 1;
                contributionsMap.set(facultyInfo?._id, contributions);
            } else {
                contributionsMap.set(facultyInfo?._id, {

                    facultyName: facultyInfo?.name,
                    contributions: 0

                });
            }

        } 
        const totalContributions = articles.length;
        let contributionsRateMap = new Map();
        for (const [key, value] of contributionsMap) {
            const rate = (value.contributions / totalContributions) * 100;
            contributionsRateMap.set(key, {
                facultyName: value.facultyName,
                contributions: value.contributions,
                rate: rate
            });
        }
        return res.status(200).json({
            error: false, message: 'Contributions by faculty', data: Array.from(contributionsRateMap.values())
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: 'Internal Server Error', info: error });
    }
}

export const numberStudentContributeInFaculty = async (req: Request, res: Response) => {
    try {
        const articles = await Article.find({ school_year_id: req.params.id });
        let contributionsMap = new Map();
        for (const article of articles) {
            const userInfo = await User.findOne({ _id: article.student_id });
            const facultyInfo = await Faculty.findOne({ _id: userInfo?.faculty_id });
            if (contributionsMap.has(facultyInfo?._id)) {
                let contributions = contributionsMap.get(facultyInfo?._id);
                contributions.contributions.add(userInfo?._id);
                contributionsMap.set(facultyInfo?._id, contributions);
            } else {
                contributionsMap.set(facultyInfo?._id, {
                    facultyName: facultyInfo?.name,
                    contributions: new Set([userInfo?._id])
                });
            }

        }
        let numberStudentMap = new Map();
        for (const [key, value] of contributionsMap) {
            numberStudentMap.set(key, {
                facultyName: value.facultyName,
                numberStudent: value.contributions.size
            });
        }
        return res.status(200).json({
            error: false, message: 'Number student contribute in each faculty', data: Array.from(numberStudentMap.values())
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: 'Internal Server Error', info: error });
    }
}
