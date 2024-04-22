import bcrypt from 'bcrypt';
import { User } from '../models/user.model';
import { RefreshToken } from '../models/refresh-token.model';
import { generateTokens, roles } from '../utils';
import type { Request, Response } from 'express';
import { getTokenInfo } from '../utils';

export const signup = async (req: Request, res: Response) => {
    try {
        const { body } = req;
        const user_username = await User.findOne({ username: body.username });
        const user_email = await User.findOne({ email: body.email });

        if (user_email || user_username) {
            let message = `${user_username ? 'Username' : 'Email'} already exists`;
            if (user_username && user_email) {
                message = 'Username and email already exist';
            }
            return res.status(400).json({ error: true, message });
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(body.password, salt);
        const new_user = await User.create({ ...body, password: hashedPassword, role: roles.student});

        return res.status(201).json({
            error: false, message: 'User created successfully', user: {
                username: new_user.username,
                email: new_user.email,
                // role: new_user.role,
                  roles: [roles.student],
                _id: new_user._id,
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: 'Internal Server Error', info : error });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        const invalid_error_object = {
            error: true,
            message: 'Username or password is wrong',
        };

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json(invalid_error_object);
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(400).json(invalid_error_object);
        }

        const tokens = await generateTokens(user);

        res.status(200).json({
            error: false,
            access_token: tokens?.access_token,
            message: 'User logged in successfully',
            user: {
                username: user.username,
                email: user.email,
                roles: user.roles,
                _id: user._id,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: 'Internal Server Error', info : error });
    }
};


export const getById = async (req: Request, res: Response) => {
    try {
        const token = await getTokenInfo({ req }) as any;
        const { id } = req.params;
        // if (await token.user.roles.includes(roles.admin || roles.marketingManager)) {
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json({ error: true, message: 'User not found' });
            } else {
                return res.status(200).json({ error: false, user });
            }
        // } else {
        //     if (token.user._id === id) {
        //         const user = await User.findById(id);
        //         if (!user) {
        //             return res.status(404).json({ error: true, message: 'User not found' });
        //         } else {
        //             return res.status(200).json({ error: false, user });
        //         }
        //     }
        //     return res.status(403).json({ error: true, message: 'Access Denied' });

        // }

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: 'Internal Server Error', info : error });
    }
};

export const getAll = async (req: Request, res: Response) => {
    try {
        const token = await getTokenInfo({ req }) as any;
        if (await token.user.roles.includes(roles.admin || roles.marketingManager)) {
            const users = await User.find();
            return res.status(200).json({ error: false, users });
        } else {
            return res.status(403).json({ error: true, message: 'Access Denied' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: 'Internal Server Error', info : error });
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const token = await getTokenInfo({ req }) as any;
        const { id } = req.params;
        if (await token.user.roles.includes(roles.admin || roles.marketingManager)) {
            const user = await User.findByIdAndDelete(id);
            if (!user) {
                return res.status(404).json({ error: true, message: 'User not found' });
            } else {
                return res.status(200).json({ error: false, user: token.user, message: 'User deleted successfully' });
            }
        } else {
            return res.status(403).json({ error: true, message: 'Access Denied' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: 'Internal Server Error', info : error });
    }
}

export const editUser = async (req: Request, res: Response) => {
    try {
        const token = await getTokenInfo({ req }) as any;
        const { id } = req.params;
        const { body } = req;
        const user_username = await User.findOne({ username: body.username });
        const user_email = await User.findOne({ email: body.email });

        if (user_email || user_username) {
            let message = `${user_username ? 'Username' : 'Email'} already exists`;
            if (user_username && user_email) {
                message = 'Username and email already exist';
            }
            return res.status(400).json({ error: true, message });
        }
        if (await token.user.roles.includes(roles.admin || roles.marketingManager)) {

            const user = await User.findByIdAndUpdate(id, {
                username: body.username,
                email: body.email,
                roles: body.roles
            }, { new: true });
            if (!user) {
                return res.status(404).json({ error: true, message: 'User not found' });
            } else {
                return res.status(200).json({ error: false, user, message: 'User updated successfully' });
            }
        } else {
            if (token.user._id === id) {
                const user = await User.findByIdAndUpdate(id,
                    {
                        username: body.username,
                        email: body.email,
                    }, { new: true });

                if (!user) {
                    return res.status(404).json({ error: true, message: 'User not found' });
                } else {
                    return res.status(200).json({ error: false, user, message: 'User updated successfully' });
                }
            }
            return res.status(403).json({ error: true, message: 'Access Denied' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: 'Internal Server Error', info : error });
    }
}

export const logout = async (req: Request, res: Response) => {
    const current_user = req.body.user;
    const user_id = JSON.parse(current_user)._id;

    try {
        await RefreshToken.findOneAndDelete({ user_id });
        res.status(200).json({ error: false, message: 'User logged out successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: 'Internal Server Error', info : error });
    }
};

export const changePassword = async (req: Request, res: Response) => {
    try {
        const token = await getTokenInfo({ req }) as any;
        const { id } = req.params;
        const { body } = req;
        const user = await User.findById(id); 
        if (!user) {
            return res.status(404).json({ error: true, message: 'User not found' });
        }
        if (await token.user.roles.includes(roles.admin || roles.marketingManager)) {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(body.password, salt);
            const user = await User.findByIdAndUpdate(id, { password: hashedPassword }, { new: true });
            return res.status(200).json({ error: false, user, message: 'Password changed successfully' });
        } else {
            if (token.user._id === id) {
                const salt = await bcrypt.genSalt();
                const hashedPassword = await bcrypt.hash(body.password, salt);
                const user = await User.findByIdAndUpdate(id, { password: hashedPassword }, { new: true });
                return res.status(200).json({ error: false, user, message: 'Password changed successfully' });
            }
            return res.status(403).json({ error: true, message: 'Access Denied' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: 'Internal Server Error', info : error });
    }
    
}


export const refresh = async (req: Request, res: Response) => {
    const current_user = req.body.user;
    const user_id = JSON.parse(current_user)._id;

    try {
        const refresh_token_doc = await RefreshToken.findOne({ user_id: user_id });
        const token_info = getTokenInfo({
            token: refresh_token_doc?.refresh_token || '',
            token_type: 'refresh',
        });

        if (token_info?.user && token_info?.is_valid_token) {
            const tokens = await generateTokens(token_info?.user);
            return res.status(200).json({
                error: false,
                user: token_info?.user,
                access_token: tokens?.access_token,
                message: 'Token refreshed successfully',
            });
        }

        return res.status(200).json({
            error: true,
            status: 407,
            message: 'Refresh token is not valid or not found. Login Again.',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: 'Internal Server Error', info : error });
    }
};

export const validate = async (req: Request, res: Response) => {
    const token = req.body.access_token;

    const is_valid_token = getTokenInfo(token)?.is_valid_token;

    if (is_valid_token) {
        res.status(200).json({
            error: false,
            message: 'Token is valid',
        });
    } else {
        refresh(req, res);
    }
};


export const changeRole = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { role } = req.body;
        const user = await User.findByIdAndUpdate (id, { role
        }, { new: true });
        if (!user) {
            return res.status(404).json({ error: true, message: 'User not found' });
        } else {
            return res.status(200).json({ error: false, user, message: 'Role updated successfully' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: 'Internal Server Error', info : error });
    }
}


export const getRole = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user
        = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: true, message: 'User not found' });
        } else {
            return res.status(200).json({ error: false, roles: user.roles });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: 'Internal Server Error', info : error });
    }
}

export const getAllRole = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        const roles = users.map(user => {
            return {
                _id: user._id,
                roles: user.roles
            }
        });
        return res.status(200).json({ error: false, roles });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: 'Internal Server Error', info : error });
    }
}


