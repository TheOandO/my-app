import bcrypt from 'bcrypt';
import {  Entry } from '../models/entry.model';
import { RefreshToken } from '../models/refresh-token.model';
import { generateTokens, roles } from '../utils';
import type { Request, Response } from 'express';
import { getTokenInfo } from '../utils';
import { entry } from '../routes/entry.route';
//crud for entries
export const createEntry = async (req: Request, res: Response) => {
    try {
        const { body } = req;
        const entry = new Entry(req.body);
        const newEntry = await Entry.create(entry);
        return res.status(201).json({
            error: false, message: 'Entry created successfully', data: newEntry
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: 'Internal Server Error', info : error });
    }
    
};

export const getAll = async (req: Request, res: Response) => {
    try {
        const entries = await Entry.find();
        return res.status(200).json({
            error: false, message: 'All entries', data: entries
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: 'Internal Server Error', info : error });
    }
};

export const getById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const entry = await Entry.findById(id);
        if (!entry) {
            return res.status(404).json({ error: true, message: 'Entry not found' });
        }
        return res.status(200).json({
            error: false, message: 'Entry found', data: entry
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: 'Internal Server Error', info : error });
    }
};

export const editEntry = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { body } = req;
        const entry = await Entry.findByIdAndUpdate
        (id , body, { new: true }); 
        if (!entry) {
            return res.status(404).json({ error: true, message: 'Entry not found' });
        }
        return res.status(200).json({
            error: false, message: 'Entry updated', data: entry
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: 'Internal Server Error', info : error });
    }
};

export const deleteEntry = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const entry = await Entry.findByIdAndDelete(id);
        if (!entry) {
            return res.status(404).json({ error: true, message: 'Entry not found' });
        }
        return res.status(200).json({
            error: false, message: 'Entry deleted', data: entry
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: 'Internal Server Error', info : error });
    }
};