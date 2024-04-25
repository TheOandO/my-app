import type { Request, Response, NextFunction } from 'express';
import { User } from '../models/user.model';
import { Entry } from '../models/entry.model';
import { SchoolYear } from '../models/school-year.model';
export class DowloadZipMiddleware {
    constructor() { }

    async checkExpireEntry(req: Request, res: Response, next: NextFunction) {
        const { body } = req;
        const entry_id = req.params.id;
        //check permission post article
        const entryInfo = await Entry.findOne({
            _id: entry_id
        });
        if (!entryInfo) {
            return res.status(404).json({ error: true, message: 'Entry not found' });
        } else {
            const now = new Date();
            const expire_date = new Date(entryInfo.dateline2);
            if (now > expire_date) {
                return res.status(403).send({ error: 'true', info: 'Access Denied. Entry is expired' });
            } else {
                return next();
            }
        }
    };

    async checkStudentExist(req: Request, res: Response, next: NextFunction) {
        const { body } = req;
        const student_id = body.student_id;
        const studentInfo = await User.findOne({
            _id: student_id
        });
        if (!studentInfo) {
            return res.status(404).json({ error: true, message: 'Student not found' });
        } else {
            return next();
        }
    };

    async checkSchoolYearExist(req: Request, res: Response, next: NextFunction) {
        const { body } = req;
        const school_year = body.school_year;
        const entryInfo = await SchoolYear.findOne({
            _id: school_year
        });
        if (!entryInfo) {
            return res.status(404).json({ error: true, message: 'School year not found' });
        } else {
            return next();
        }
    }



}
