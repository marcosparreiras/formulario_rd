// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';

const CRM_TOKEN = process.env.CRM_TOKEN;
const CRM_STAGE = process.env.CRM_STAGE;
const CRM_USER = process.env.CRM_USER;
const CRM_SOURCE = process.env.CRM_SOURCE;
const CRM_CAMPAING = process.env.CRM_CAMPAING;
const URL_ORGANIZATION = `https://crm.rdstation.com/api/v1/organizations?token=${CRM_TOKEN}`;
const URL_DEAL = `https://crm.rdstation.com/api/v1/deals?token=${CRM_TOKEN}`;

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, tel } = req.body;
        console.log(req.body);

        try {
            const axiosOrganization = await axios.post(URL_ORGANIZATION, {
                organization: {
                    name: `${name} ${Math.random()}`,
                },
            });

            const organizationID = axiosOrganization.data._id;

            const axiosDeal = await axios.post(URL_DEAL, {
                campaign: {
                    _id: CRM_CAMPAING,
                },
                contacts: [
                    {
                        emails: [
                            {
                                email: email,
                            },
                        ],
                        phones: [
                            {
                                phone: tel,
                            },
                        ],
                        name: name,
                    },
                ],
                deal: {
                    name: name,
                    deal_stage_id: CRM_STAGE,
                    user_id: CRM_USER,
                },
                deal_source: {
                    _id: CRM_SOURCE,
                },
                organization: {
                    _id: organizationID,
                },
            });

            const dealID = axiosDeal.data._id;

            res.json({ organizationID, dealID });
        } catch (err) {
            res.json({ error: err.message });
        }
    } else {
        res.json({ error: 'We just support POST requests' });
    }
}
