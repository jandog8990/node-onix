module.exports = {
    db_url: 'mongodb://localhost:27017/abantu',
    ngrok_url: 'https://eac02189dd21.ngrok.io',
    emailSMTP: {
        'host': 'smtp.gmail.com',
        'port': 465,
        'type': 'OAuth2',
        'user': 'holla@abantuaudio.com',
        'clientId': '737899434511-d74g3lqopqc0is3aneipjbf1gb77hmp8.apps.googleusercontent.com',
        'clientSecret': 'ZKFav22uVUzCJawxJg6WckMA',
        'refreshToken': '1/7O5gm03wfzZSbh0EuQ0d9ewbe7yo1UraMTzgZgjrUXeiyaEaUYixxVDalniOxBPj'
    },
    jwtSecret: "d!$@b@ntu@u6!0$3cR3T",	// keeps a secret key to encode/decode tokens
    jwtSession: { session: false },	// Passport wont manage session
    stateTax: { 'TX': '.0825' },
    discountCodes: {
        'blackHistory': {
            'code': 'BLKHST1',
            'days': 28,
            'discount': 50
        }
    },
    freeSpook: {
        "supportSpook": "https://freespook.com/support-spook/",
        "hisOwnWords": "https://freespook.com/in-his-own-words/"
    },
    payPalKeys: {
        'CLIENT_ID': 'AXfKJ1Ga95WZSg-LQytsWCwUAEOzlOHY3HS8Id9fVwrv0k0pW7csYMoWe8GnajP5h9VLyxHfC0-6ucEy',
        'SECRET': 'EHQV7P3Y6Wy3BmdAuvQJsx7uPI2-6bPFMf_N63YrDRDtVWKBUzgII7QuqgMu-FA3E4tmoB6PkY0fQOun',
        'PAYPAL_API': 'https://api.sandbox.paypal.com'
    },
    stripeTestUser: '5d1f998f5e6edb6788848ee2',
    stripeDiscounts: {
        'roots': 0.3,
        'leaf': 0.0
    },
    stripeKeysLive: {
        'secretKey': 'sk_live_sh3gPh88qv451chmPdnH0auu',
        'publicKey': 'pk_live_yOkXcHuFcbSVyX8DUkNRW1U8',
        'ep_secret': 'whsec_2cMbBJm4k2Xd7Wkt3vAz4nsro4CqHQtb',
        'roots': 'plan_FIQBqILpW2I6DZ',
        'leaf': 'plan_FPaDHhozAJBjwN',
        'trial': 'plan_CtP9yjtmtJpoEW',
        'free': 'plan_CtP981IyZaVKh3',
        'basic': 'plan_CtPAwhYYgpYgTh',
        'expireDays': 30,
        'trialDiscount': 0.3,
        'freeTokens': 2,
        // 'texasTaxId': 'txr_1EoMtWE8jA0TqbIKfFTzAt8J',
        'stateTaxIds': {
            'TX': 'txr_1EoNPrE8jA0TqbIKFkBgtHGF',
        }, 
        'noTaxId': 'txr_1EoYhGE8jA0TqbIKWhR2Zhc4',
        'abantuRoots': 'Abantu Roots',
        'abantuLeaf': 'Abantu Leaf',
        'abantuTrial': 'Abantu Trial',
        'abantuFree': 'Abantu Free',
        'abantuBasic': 'Abantu Basic',
    },
    stripeKeysTest: {
        'secretKey': 'sk_test_1W60AjLfty1HJc17ZNvFQhol',
        'publicKey': 'pk_test_g6QQSewSeXvwDQV7E0wCyxdP',
        'ep_secret': 'whsec_YTnH43MW3wJYvlCWHHZKIczxES9EHop1',
        'roots': 'plan_FRLjSydyf6f9sg',
        'leaf': 'plan_FRLjetfsY3mKaC',
        'trial': 'plan_CORaSQ5t18TMkL',
        'free': 'plan_CaK8Y9dQSBC4I4',
        'basic': 'plan_CORcrXezlUk5iX',
        'expireDays': 30,
        'trialDiscount': 0.3,
        'freeTokens': 2,
        // 'texasTaxId': 'txr_1EoNPrE8jA0TqbIKFkBgtHGF',
        'stateTaxIds': {
            'TX': 'txr_1EoNPrE8jA0TqbIKFkBgtHGF',
        }, 
        'noTaxId': 'txr_1EoYgpE8jA0TqbIKG6NwRqE6',
        'abantuRoots': 'Abantu Roots',
        'abantuLeaf': 'Abantu Leaf',
        'abantuTrial': 'Abantu Trial',
        'abantuFree': 'Abantu Free',
        'abantuBasic': 'Abantu Basic'
    }
};
