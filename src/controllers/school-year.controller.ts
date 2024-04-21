import bcrypt from 'bcrypt';
import { SchoolYear } from '../models/school-year.model';
import { RefreshToken } from '../models/refresh-token.model';
import { generateTokens, roles } from '../utils';
import type { Request, Response } from 'express';
import { getTokenInfo } from '../utils';
import { schoolYear } from '../routes/school-year.route';

//crud for school year
export const createSchoolYear = async (req: Request, res: Response) => {
    try {
        const { body } = req;
        const schoolYear = new SchoolYear(req.body);
        const newSchoolYear = await SchoolYear.create(schoolYear);
        return res.status(201).json({
            error: false, message: 'School year created successfully', data: newSchoolYear
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: 'Internal Server Error', info : error });
    }
    
    
};

export const getAllSchoolYear = async (req: Request, res: Response) => {
    try {
        const schoolYears = await SchoolYear.find();
        return res.status(200).json({
            error: false, message: 'All school years', data: schoolYears
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: 'Internal Server Error', info : error });
    }
};

export const getSchoolYearById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const schoolYear = await SchoolYear.findById(id);
        if (!schoolYear) {
            return res.status(404).json({ error: true, message: 'School year not found' });
        }
        return res.status(200).json({
            error: false, message: 'School year found', data: schoolYear
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: 'Internal Server Error', info : error });
    }
};

export const editSchoolYear = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { body } = req;
        const schoolYear = await SchoolYear.findByIdAndUpdate
        (id , body, { new: true }); 
        if (!schoolYear) {
            return res.status(404).json({ error: true, message: 'School year not found' });
        }
        return res.status(200).json({
            error: false, message: 'School year updated successfully', data: schoolYear
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: 'Internal Server Error', info : error });
    }
};

export const deleteSchoolYear = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const schoolYear = await SchoolYear.findByIdAndDelete(id);
        if (!schoolYear) {
            return res.status(404).json({ error: true, message: 'School year not found' });
        }
        return res.status(200).json({
            error: false, message: 'School year deleted successfully', data: schoolYear
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: 'Internal Server Error', info : error });
    }
}

//crud for refresh token