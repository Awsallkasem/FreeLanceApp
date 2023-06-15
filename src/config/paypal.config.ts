import * as paypal from 'paypal-rest-sdk';

paypal.configure({
  mode: 'sandbox', // or 'live' for production
  client_id: 'AQVNOFKZjoN7p3xv0hQdlU7y20ZmNNn0XP7N35ZCdp_M9xq9yymLdCDW3UPaJmNtg1nHiJu1gYd6Iv17',
  client_secret: 'EEk4JuNoccfqae7UZSos_1tjsZ4LZ-kgD84LlRFL5FNXzaNmJEhQJDxP4KcAn23bJx9kEVoNlT8NfNKM',
});

export default paypal;
