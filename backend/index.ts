import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import questionRoute from './routes/question.routes';
import questionnaireRoute from './routes/questionnaire.routes';
import respondentRoute from './routes/respondent.routes';
import resultRoute from './routes/result.routes';


dotenv.config();
const app: Express = express();
const port = process.env.PORT;

const FRONTEND_URL = process.env.FRONTEND_URL || '';
const allowedOrigins = [FRONTEND_URL];
const options: cors.CorsOptions = {
    origin: allowedOrigins
};
app.use(cors(options));
app.use(express.json());
app.use(questionRoute);
app.use(questionnaireRoute);
app.use(respondentRoute);
app.use(resultRoute);


const url = process.env.DB_URL;

function start() {
    try {
        // eslint-disable-next-line no-unused-expressions
        url && mongoose.connect(url);
        app.listen(port, () =>
            // eslint-disable-next-line no-console
            console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
        );
    } catch (e) {
        // eslint-disable-next-line no-console
        console.log('!!!Server Error', e);
        process.exit(1);
    }
}

start();
