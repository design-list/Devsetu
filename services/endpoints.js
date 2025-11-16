//services/endpoints.js

let baseApiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

let uploadFileUrl = process.env.NEXT_PUBLIC_CDN_BASE_URL;


export const endpoints = {

    baseApiUrl,

    AdminLogin: {
        adminLogin:`${baseApiUrl}/users/login`,
        register:`${baseApiUrl}/users/register`
    },

    UserLogin: {
        userLogin:`${baseApiUrl}/user_details`
    },

    Pujas: {
        puja:`${baseApiUrl}/pujas`
    },
    
    Chadhava: {
        chadhava: `${baseApiUrl}/chadhava`,
    },

    FileUpload: {
        upload: `/api/upload`,
    },
    
    Home: {
        home: `${baseApiUrl}/home`,
    },

    Offerings: {
        offering: `${baseApiUrl}/offerings`,
    },

    Faqs: {
        faq: `${baseApiUrl}/faqs`,
    },

    Packages: {
        package: `${baseApiUrl}/packages`,
    },

    UserDetail: {
        userdetail: `${baseApiUrl}/user_details`,
    },

    HomeBanner: {
        homebanner: `${baseApiUrl}/hero-banner`,
    },

    Cart: {
        cart: `${baseApiUrl}/cart`,
    },

    Payment: {
        Order: `${baseApiUrl}/payment/order`,
        Verify: `${baseApiUrl}/payment/verify`,
        Reconcile: `${baseApiUrl}/payment/reconcile`,
    },

    Articels: {
        aartis: `${baseApiUrl}/aartis`,
        chalisa: `${baseApiUrl}/articles/chalisas`,
        mantras: `${baseApiUrl}/articles/mantras`,
        horoscope: `${baseApiUrl}/articles/horoscope`,
    },

    MobileLogin: {
        sendotp: `${baseApiUrl}/whatsapp-otp`,
        verifyotp: `${baseApiUrl}/whatsapp-otp/verify`,
    },

    Web: {
        puja:`${baseApiUrl}/web/pujas`,
        chadhava:`${baseApiUrl}/web/chadhavas`,
        cart:`${baseApiUrl}/web/cart`,
        byPhone:`${baseApiUrl}/web/cart/by-phone`,
        userdetail:`${baseApiUrl}/web/user-details`
    },

    OrderConfirmationMessage: {
        orderconfirmation: `${baseApiUrl}/order-confirmation-on-whatsapp`,
    }
}