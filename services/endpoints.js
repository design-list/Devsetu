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
    FileUpload: {
        upload: `${baseApiUrl}/upload`,
    },
}