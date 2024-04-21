import bcrypt from 'bcrypt';
import { Faculty } from '../models/faculty.model';
import { RefreshToken } from '../models/refresh-token.model';
import { generateTokens, roles } from '../utils';
import type { Request, Response } from 'express';
import { getTokenInfo } from '../utils';
import { faculty } from '../routes/faculty.route';

//crud for faculty
export const createFaculty = async (req: Request, res: Response) => {
    try {
        const { body } = req;
        const faculty = new Faculty(req.body);
        const newFaculty = await Faculty.create(faculty);
        return res.status(201).json({
            error: false, message: 'Faculty created successfully', data: newFaculty
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: 'Internal Server Error', info : error  });
    }
    
    
};

export const getAllFaculty = async (req: Request, res: Response) => {
    try {
        const faculties = await Faculty.find();
        return res.status(200).json({
            error: false, message: 'All faculties', data: faculties
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: 'Internal Server Error', info : error});
    }
};

export const getFacultyById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const faculty = await Faculty.findById(id);
        if (!faculty) {
            return res.status(404).json({ error: true, message: 'Faculty not found' });
        }
        return res.status(200).json({
            error: false, message: 'Faculty found', data: faculty
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: 'Internal Server Error', info : error });
    }
};

export const editFaculty = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { body } = req;
        const faculty = await Faculty.findByIdAndUpdate
        (id , body, { new: true }); 
        if (!faculty) {
            return res.status(404).json({ error: true, message: 'Faculty not found' });
        }
        return res.status(200).json({
            error: false, message: 'Faculty updated successfully', data: faculty
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: 'Internal Server Error', info : error });
    }
};

export const deleteFaculty = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const faculty = await Faculty.findByIdAndDelete(id);
        if (!faculty) {
            return res.status(404).json({ error: true, message: 'Faculty not found' });
        }
        return res.status(200).json({
            error: false, message: 'Faculty deleted successfully', data: faculty
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: 'Internal Server Error', info : error });
    }
};

