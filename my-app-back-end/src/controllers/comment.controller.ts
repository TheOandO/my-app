
import bcrypt from 'bcrypt';
import { Comment } from '../models/comment.model';
import { RefreshToken } from '../models/refresh-token.model';
import { generateTokens, roles } from '../utils';
import type { Request, Response } from 'express';
import { getTokenInfo } from '../utils';
import { comment } from '../routes/comment.route';
export const create = async (req: Request, res: Response) => {
    try {
        const { body } = req;
        const comment = new Comment(req.body);
        const newComment = await Comment.create(comment);
        return res.status(201).json({
            error: false, message: 'Comment created successfully', data: newComment
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: 'Internal Server Error', info : error });
    }
    
    
};

export const findAll = async (req: Request, res: Response) => {
    try {
        const comments = await Comment.find();
        return res.status(200).json({
            error: false, message: 'All comments', data: comments
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: 'Internal Server Error', info : error });
    }
};

export const findOne = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findById(id);
        if (!comment) {
            return res.status(404).json({ error: true, message: 'Comment not found' });
        }
        return res.status(200).json({
            error: false, message: 'Comment found', data: comment
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: 'Internal Server Error', info : error });
    }
};

export const update = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { body } = req;
        const comment = await Comment.findByIdAndUpdate(id, body, { new: true });
        if (!comment) {
            return res.status(404).json({ error: true, message: 'Comment not found' });
        }
        return res.status(200).json({
            error: false, message: 'Comment updated', data: comment
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: 'Internal Server Error', info : error });
    }
};


export const remove = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findByIdAndDelete(id);
        if (!comment) {
            return res.status(404).json({ error: true, message: 'Comment not found' });
        }
        return res.status(200).json({
            error: false, message: 'Comment deleted', data: comment
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: 'Internal Server Error', info : error });
    }
};


export const createComment = async (req: Request, res: Response) => {
    try {
        const { body } = req;
        const comment = new Comment(req.body);
        const newComment = await Comment.create(comment);
        return res.status(201).json({
            error: false, message: 'Comment created successfully', data: newComment
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: 'Internal Server Error', info : error });
    }
    
    
};
