import type { Request, Response, NextFunction } from 'express';
import { User } from '../models/user.model';
import { Entry } from '../models/entry.model';
import { SchoolYear } from '../models/school-year.model';
export class ArticleMiddleware {
    constructor() { }

    async checkPermissionPostArticle(req: Request, res: Response, next: NextFunction) {
        const { body } = req;
        const student_id = body.student_id;
        //check permission post article
        const studentInfo = await User.findOne({
            _id: student_id
        });
        const entryInfo = await Entry.findOne({
            _id: body.entry_id
        });
        if (!studentInfo) {
            return res.status(404).json({ error: true, message: 'Student not found' });
        } else if (!entryInfo) {
            return res.status(404).json({ error: true, message: 'Entry not found' });

        } else {
            //get ObjectId of faculty_id
            if (studentInfo.faculty_id.toString() === entryInfo.faculty_id.toString()) {
                return next();
            } else {
                return res.status(403).send({ error: 'true', info: 'Access Denied. Student not in this faculty' });
            }
        }


        // const user = getTokenInfo({ req })?.user;
        // const has_role = (user as TUser)?.roles.find((e) => e === role);
        // return student_id ? next() : res.status(403).send({ error: 'Access Denied' });
    };

    async checkExpireSchoolYear(req: Request, res: Response, next: NextFunction) {
        const { body } = req;
        const school_year = body.school_year;
        const schoolYearInfo = await SchoolYear.findOne({
            _id: school_year
        });
        if (!schoolYearInfo) {
            return res.status(404).json({ error: true, message: 'School year not found' });
        } else {
            const now = new Date();
            const start_date = new Date(schoolYearInfo.start_time);
            const end_date = new Date(schoolYearInfo.end_time);
            if (now < start_date || now > end_date) {
                return res.status(403).send({ error: 'true', info: 'Access Denied. School year is expired' });
            } else {
                return next();
            }

        }
    }



}
