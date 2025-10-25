//services/endpoints.js

let baseApiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;


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

    Articles: {
        articles: `${baseApiUrl}/articles`,
    },

    FileUpload: {
        upload: `${baseApiUrl}/upload`,
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

    Cart: {
        cart: `${baseApiUrl}/cart`,
    },

    Payment: {
        Order: `${baseApiUrl}/payment/order`,
        Verify: `${baseApiUrl}/payment/verify`,
    },

    Aartis: {
        aartis: `${baseApiUrl}/aartis`,
    },

    Web: {
        puja:`${baseApiUrl}/web/pujas`,
        chadhava:`${baseApiUrl}/web/chadhavas`
    },
}