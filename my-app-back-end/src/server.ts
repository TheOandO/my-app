import express, { Express, NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import createError from 'http-errors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import morgan from 'morgan';
import routes from './routes';
import type { TServerConfig } from './types';
import bodyParser from 'body-parser';
import path from 'path';
export class InitServer {
    server: Express;
    database: typeof mongoose;

    constructor() {
        this.server = express();
        this.database = mongoose;
    }

    setup(config: TServerConfig) {
        // Setup server configs
        this.server.set('host', config.host);
        this.server.set('port', config.port);
        this.server.set('db_url', config.db_url);
        this.server.set('log_level', config.log_level);

        // Setup middlewares
        this.server.use(cors());
        this.server.use(helmet());
        this.server.use(morgan('tiny'));
        this.server.use(cookieParser());
        this.server.use(express.json());
        this.server.use(express.urlencoded({ extended: false }));

        //setup assets folder for static files
        this.server.use(express.static('assets'));
        this.server.use('/uploads', express.static(path.join(__dirname, 'uploads')));

        //setup urlencoded for form data
        this.server.use(express.urlencoded({ extended: true }));
        
        this.server.use(express.json());
       
        this.server.use(bodyParser.json()); //đọc body repuest gửi lên theo cấu trúc json
        this.server.use(bodyParser.urlencoded({ extended: true })); // khi gửi extended = true thg gặp lỗi về ký tự

       


        // Setup routes
        this.server.use('/', routes);

        this.server.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            res.header(
              "Access-Control-Allow-Headers",
              "Origin, X-Requested-With, Content-Type, Accept"
            );
            next();
          });

        // Create 404 error if requested route is not defined
        this.server.use((req: Request, res: Response, next: NextFunction) => {
            next(createError(404));
        });
    }

    async start() {
        const host = this.server.get('host');
        const port = this.server.get('port');

        try {
            await this.database.connect(process.env.DB_URL!);
            this.server.listen(port, () => console.log(`[server]: server is running at ${host}:${port}`));
        } catch (error) {
            console.error(error);
            process.exit(1);
        }
    }
}
