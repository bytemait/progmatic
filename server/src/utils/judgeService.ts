import dotenv from 'dotenv';
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import axios from 'axios';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface Judge0Response {
    token: string;
    status: {
        id: number;
    };
}

dotenv.config({
    path: path.resolve(__dirname, "../../.env"),
});

const apikey = process.env.JUDGE0_API_KEY;
const apiurl = process.env.JUDGE0_API_URL;

export const submitCode = async (sourceCode: string, languageId: number, programInput: string): Promise<Judge0Response> => {
    const encodedSource = Buffer.from(sourceCode).toString('base64');
    const encodedInput = Buffer.from(programInput).toString('base64');

    try {
        const { data } = await axios.post(`${apiurl}/submissions`, {
            source_code: encodedSource,
            language_id: languageId,
            stdin: encodedInput,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'X-RapidAPI-Key': apikey,
                'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
            },
            params: {
                base64_encoded: 'true',
                fields: '*',
            }
        });

        let { data: resultData } = await axios.get(`${apiurl}/submissions/${data.token}`, {
            headers: {
                'X-RapidAPI-Key': apikey,
                'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
            },
            params: { base64_encoded: 'true' },
        });

        while (resultData.status.id === 2) {
            await new Promise(resolve => setTimeout(resolve, 2000));
            const { data: tempData } = await axios.get(`${apiurl}/submissions/${data.token}`, {
                headers: {
                    'X-RapidAPI-Key': apikey,
                    'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
                },
                params: { base64_encoded: 'true' },
            });
            resultData = tempData;
        }

        return resultData;
    } catch (error) {
        console.error('Error submitting code:', error);
        throw error;
    }
};