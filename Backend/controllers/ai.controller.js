import * as ai from '../services/ai.service.js';

export const getResult = async (req, res) => {
    try {
        const { prompt } = req.query;
        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        const result = await ai.generateResult(prompt);
        res.send( result );
    } catch (error) {
        console.error('Error generating result:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}