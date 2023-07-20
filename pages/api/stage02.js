// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';

const CRM_TOKEN = process.env.CRM_TOKEN;
const CRM_USER = process.env.CRM_USER;
const URL_ANNOTATION = `https://crm.rdstation.com/api/v1/activities?token=${CRM_TOKEN}`;

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { teamSize, businessName, salesTarget, dealID } = req.body;
        const annotation = `Empresa: ${businessName}\nTamanho do time comercial: ${teamSize}\nMeta de vendas: ${
            salesTarget === '100'
                ? 'menos de'
                : salesTarget === '500'
                ? 'mais de'
                : ''
        } ${salesTarget} mil R$`;
        try {
            const axiosAnnotation = await axios.post(URL_ANNOTATION, {
                activity: {
                    user_id: CRM_USER,
                    text: annotation,
                    deal_id: dealID,
                },
            });
            res.json(axiosAnnotation.data);
        } catch (err) {
            res.json({ error: err.message });
        }
    } else {
        res.json({ error: 'We just support POST requests' });
    }
}
