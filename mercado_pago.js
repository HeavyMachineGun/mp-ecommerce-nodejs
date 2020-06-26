const mercadopago  = require('mercadopago');
const TOKEN= "APP_USR-8058997674329963-062418-89271e2424bb1955bc05b1d7dd0977a8-592190948";

mercadopago.configure({
	access_token: TOKEN,
	integrator_id: 'dev_24c65fb163bf11ea96500242ac130004',
});

module.exports = {
  generaMercadoPagoBoton: function ({title,price,unit,img}) {
    // 

    let preference = {
	  items: [
	    {
	      id:'1234',
	      currency_id: "MXN",
	      description:'Dispositivo móvil de Tienda e-commerce',
	      picture_url: `https://heavy-mp-commerce-nodejs.herokuapp.com/${img.replace('./','')}`,
	      title: title,
	      unit_price: Number(price),
	      quantity: parseInt(unit,10),
	    }
	  ],
	  external_reference: "programatonpro@gmail.com",
	  payment_methods: {
        "excluded_payment_methods": [
            {
                "id": "amex"
            }
        ],
        "excluded_payment_types": [
            {
                "id": "atm"
            }
        ],
        "installments": 6
    },
	payer: {
	    "name": "Lalo",
	    "surname": "Landa",
	    "email": "test_user_58295862@testuser.com",
	    "phone": {
	        "area_code": "52",
	        "number": Number("5549737300")
	    },
	    "identification": {
	        "type": "DNI",
	        "number": "535650015"
	    },
	    "address": {
	        "street_name": "Insurgentes Sur",
	        "street_number": 1602,
	        "zip_code": "03940"
	    }
    },
    "notification_url":"https://heavy-mp-commerce-nodejs.herokuapp.com/ipn",
    "back_urls": {
        "success": "https://heavy-mp-commerce-nodejs.herokuapp.com/success",
        "failure": "https://heavy-mp-commerce-nodejs.herokuapp.com/failure",
        "pending": "https://heavy-mp-commerce-nodejs.herokuapp.com/pending"
    },
    "auto_return": "approved",
	};

	return mercadopago.preferences.create(preference)
	.then(function(response){
	// Este valor reemplazará el string "$$init_point$$" en tu HTML
	  global.init_point = response.body.init_point;

	  return response.body.id;
	}).catch(function(error){
	  console.log(error);
	});
  },
  realizarPago: function({token,payment_method_id,installments, issuer_id }){
  		var payment_data = {
			  transaction_amount: 150,
			  token: token,
			  description: 'Incredible Iron Keyboard',
			  installments: installments,
			  payment_method_id: payment_method_id,
			  issuer_id: issuer_id,
			  payer: {
			    email: 'test_user_58295862@testuser.com'
			  }
			};

			// Guarda y postea el pago
			mercadopago.payment.save(payment).then(function (data) {
			  // ...    
			  // Imprime el estado del pago
			  Console.log(payment.status);
			}).catch(function (error) {
			  // ...
			});

  }
};


