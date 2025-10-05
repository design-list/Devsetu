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
    Web: {
        puja:`${baseApiUrl}/web/pujas`,
        chadhava:`${baseApiUrl}/web/chadhavas`
    },
}