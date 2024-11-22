const axios = require('axios');

const ACCESS_TOKEN = 'APP_USR-7109462265224838-070720-3299c9ffcd1b7d7df9a872424c8f63a3-1889607597'; // Reemplaza con tu Access Token

const generarLinkDePago = async (req, res) => {
  try {
    const { items, back_urls } = req.body;

    if (!items || !back_urls) {
      return res.status(400).json({ error: 'Faltan datos requeridos: items y back_urls' });
    }

    const preference = {
      items,
      back_urls,
      auto_return: 'approved',
    };

    const response = await axios.post('https://api.mercadopago.com/checkout/preferences', preference, {
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    const payment_link = response.data.init_point;

    res.json({ payment_link });
  } catch (error) {
    console.error('Error al generar el link de pago:', error);
    res.status(500).json({ error: 'Error al generar el link de pago' });
  }
};

module.exports = {
  generarLinkDePago,
};