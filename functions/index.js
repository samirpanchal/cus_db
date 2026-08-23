const functions = require("firebase-functions");
const xmlrpc = require("xmlrpc");

// We'll configure these as environment variables in production, but hardcode for local testing
const ODOO_URL = process.env.ODOO_URL || "http://localhost:8069";
const ODOO_DB = process.env.ODOO_DB || "postgres";
const ODOO_USERNAME = process.env.ODOO_USERNAME || "admin";
const ODOO_PASSWORD = process.env.ODOO_PASSWORD || "admin";

const getOdooClient = (path) => {
  const urlObj = new URL(ODOO_URL);
  const options = {
    host: urlObj.hostname,
    port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
    path: path
  };
  return urlObj.protocol === 'https:' ? xmlrpc.createSecureClient(options) : xmlrpc.createClient(options);
};

const authenticateOdoo = () => {
  return new Promise((resolve, reject) => {
    const client = getOdooClient('/xmlrpc/2/common');
    client.methodCall('authenticate', [ODOO_DB, ODOO_USERNAME, ODOO_PASSWORD, {}], (error, uid) => {
      if (error) reject(error);
      else if (!uid) reject(new Error("Authentication failed"));
      else resolve(uid);
    });
  });
};

const executeKw = (uid, model, method, args) => {
  return new Promise((resolve, reject) => {
    const client = getOdooClient('/xmlrpc/2/object');
    client.methodCall('execute_kw', [ODOO_DB, uid, ODOO_PASSWORD, model, method, args], (error, value) => {
      if (error) reject(error);
      else resolve(value);
    });
  });
};

exports.createLead = functions.https.onRequest(async (req, res) => {
  // Setup CORS
  res.set('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') {
    res.set('Access-Control-Allow-Methods', 'GET, POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).send('');
  }

  try {
    const data = req.body;
    const uid = await authenticateOdoo();
    
    const leadData = {
      name: `Website Contact: ${data.subject || 'General Inquiry'}`,
      contact_name: data.name,
      email_from: data.email,
      description: data.message,
    };

    const leadId = await executeKw(uid, 'crm.lead', 'create', [[leadData]]);
    
    return res.status(200).json({ success: true, leadId });
  } catch (error) {
    console.error("Error creating lead in Odoo:", error);
    return res.status(500).json({ error: 'Failed to create lead in ERP' });
  }
});

exports.createQuotation = functions.https.onRequest(async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') {
    res.set('Access-Control-Allow-Methods', 'GET, POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).send('');
  }

  try {
    const data = req.body;
    const uid = await authenticateOdoo();
    
    let partnerId;
    const partnerSearch = await executeKw(uid, 'res.partner', 'search', [[['email', '=', data.email]]]);
    
    if (partnerSearch && partnerSearch.length > 0) {
      partnerId = partnerSearch[0];
    } else {
      partnerId = await executeKw(uid, 'res.partner', 'create', [[{
        name: data.company ? `${data.name} (${data.company})` : data.name,
        email: data.email
      }]]);
    }

    const quoteId = await executeKw(uid, 'sale.order', 'create', [[{
      partner_id: partnerId,
      note: `Requested materials: ${data.materials}\n\nAdditional Requirements: ${data.message}`
    }]]);
    
    return res.status(200).json({ success: true, quoteId });
  } catch (error) {
    console.error("Error creating quotation in Odoo:", error);
    return res.status(500).json({ error: 'Failed to create quotation in ERP', details: error.toString(), env: process.env.ODOO_URL });
  }
});
