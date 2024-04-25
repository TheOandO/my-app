import type { Request, Response, NextFunction } from 'express';
import { User } from '../models/user.model';
import { Entry } from '../models/entry.model';
import { SchoolYear } from '../models/school-year.model';
export class AnalysisMiddleware {
    constructor() { }

    async checkAnalysisBySchoolYear(req: Request, res: Response, next: NextFunction) {
        const { body } = req;
        const school_year = body.school_year;
        const schoolYearInfo = await SchoolYear.findOne({
            _id: school_year
        });
        if (!schoolYearInfo) {
            return res.status(404).json({ error: true, message: 'School year not found' });
        } else {
            return next();
        }

    }


}
