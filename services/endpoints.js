//let url = "https://" + window.location.host + "/moslcms/cms/";
// let url = process.env.CMS_BASE_URL;

let baseApiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;


export const endpoints = {

    baseApiUrl,

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

    // Cart: {
    //     cart: "cart", // 👈 Add this line
    // },
    
    Web: {
        puja:`${baseApiUrl}/web/pujas`,
        chadhava:`${baseApiUrl}/web/chadhavas`
    },
}