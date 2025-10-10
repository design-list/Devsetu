import Api from '.';
import { endpoints } from './endpoints';

// let baseApiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export default class fetchApi extends Api {

    AddNewPuja(data) {
        let url = this.buildUrl(endpoints.Pujas.puja, "full")
        return this.fetchNormal(url, "POST", JSON.stringify(data)).then(response => response)
    }

    GetAllPuja(data) {
        let url = this.buildUrl(endpoints.Pujas.puja, "full")
        return this.fetch(url, "GET", null, data).then(response => response)
    }

    GetAllWebPuja(data) {
        let url = this.buildUrl(endpoints.Web.puja, "full")
        return this.fetch(url, "GET", null, data).then(response => response)
    }

    GetPujaDetails(data) {
        let url = this.buildUrl(endpoints.Pujas.puja, "full")
        return this.fetchParams(url, "GET", null, `/${data}`).then(response => response)
    }

    UpdetePuja(data) {
        let url = this.buildUrl(endpoints.Pujas.puja, "full")
        if (data.id) {
            return this.fetchParams(url, "PUT", JSON.stringify(data), `/${data.id}`).then(response => response)
        }
    }

    DeletePuja(data) {
        let url = this.buildUrl(endpoints.Pujas.puja, "full")
        if (data.id) {
            return this.fetchParams(url, "DELETE", null, `/${data.id}`).then(response => response)
        }
    }

    AddNewChadhava(data) {
        let url = this.buildUrl(endpoints.Chadhava.chadhava, "full")
        return this.fetchNormal(url, "POST", JSON.stringify(data)).then(response => response)
    }

    GetAllChadhava(data) {
        let url = this.buildUrl(endpoints.Chadhava.chadhava, "full")
        return this.fetch(url, "GET", null, data).then(response => response)
    }

    GetAllWebChadhava(data) {
        let url = this.buildUrl(endpoints.Web.chadhava, "full")
        return this.fetch(url, "GET", null, data).then(response => response)
    }

    GetChadhavaWebDetails(data) {
        let url = this.buildUrl(endpoints.Web.chadhava, "full")
        return this.fetchParams(url, "GET", null, `/${data}`).then(response => response)
    }

    GetChadhavaDetails(data) {
        let url = this.buildUrl(endpoints.Chadhava.chadhava, "full")
        return this.fetchParams(url, "GET", null, `/${data}`).then(response => response)
    }

    UpdeteChadhava(data) {
        let url = this.buildUrl(endpoints.Chadhava.chadhava, "full")
        if (data.id) {
            return this.fetchParams(url, "PUT", JSON.stringify(data), `/${data.id}`).then(response => response)
        }
    }

    DeleteChadhava(data) {
        let url = this.buildUrl(endpoints.Chadhava.chadhava, "full")
        if (data.id) {
            return this.fetchParams(url, "DELETE", null, `/${data.id}`).then(response => response)
        }
    }

    AddNewArticles(data) {
        let url = this.buildUrl(endpoints.Articles.articles, "full")
        return this.fetchNormal(url, "POST", JSON.stringify(data)).then(response => response)
    }


    GetAllArticles(data) {
        let url = this.buildUrl(endpoints.Articles.articles, "full")
        return this.fetch(url, "GET", null, data).then(response => response)
    }

    GetArticlesDetails(data) {
        console.log("GetChadhavaDetails", data)
        let url = this.buildUrl(endpoints.Articles.articles, "full")
        return this.fetchParams(url, "GET", null, `/${data}`).then(response => response)
    }

    UpdeteArticles(data) {
        let url = this.buildUrl(endpoints.Articles.articles, "full")
        if (data.id) {
            return this.fetchParams(url, "PUT", JSON.stringify(data), `/${data.id}`).then(response => response)
        }
    }

    DeleteArticles(data) {
        let url = this.buildUrl(endpoints.Articles.articles, "full")
        if (data.id) {
            return this.fetchParams(url, "DELETE", null, `/${data.id}`).then(response => response)
        }
    }
    
    GetAllHome(data) {
        let url = this.buildUrl(endpoints.Home.home, "full")
        return this.fetch(url, "GET", null, data).then(response => response)
    }

    // ============================ CART ============================
    
    // AddNewCart(data) {
    //     let url = this.buildUrl(endpoints.Cart.cart, "full");
    //     return this.fetchNormal(url, "POST", JSON.stringify(data)).then(response => response);
    // }

    // GetAllCart(data) {
    //     let url = this.buildUrl(endpoints.Cart.cart, "full");
    //     return this.fetch(url, "GET", null, data).then(response => response);
    // }

    // GetCartDetails(data) {
    //     let url = this.buildUrl(endpoints.Cart.cart, "full");
    //     return this.fetchParams(url, "GET", null, `/${data}`).then(response => response);
    // }

    // UpdateCart(data) {
    //     let url = this.buildUrl(endpoints.Cart.cart, "full");
    //     if (data.id) {
    //         return this.fetchParams(url, "PUT", JSON.stringify(data), `/${data.id}`).then(response => response);
    //     }
    // }

    // DeleteCart(data) {
    //     let url = this.buildUrl(endpoints.Cart.cart, "full");
    //     if (data.id) {
    //         return this.fetchParams(url, "DELETE", null, `/${data.id}`).then(response => response);
    //     }
    // }

    AddNewOffering(data) {
        let url = this.buildUrl(endpoints.Offerings.offering, "full")
        return this.fetchNormal(url, "POST", JSON.stringify(data)).then(response => response)
    }

    GetAllOffering(data) {
        let url = this.buildUrl(endpoints.Offerings.offering, "full")
        return this.fetch(url, "GET", null, data).then(response => response)
    }

    GetOfferingDetails(data) {
        let url = this.buildUrl(endpoints.Offerings.offering, "full")
        return this.fetchParams(url, "GET", null, `/${data}`).then(response => response)
    }

    UpdeteOffering(data) {
        let url = this.buildUrl(endpoints.Offerings.offering, "full")
        if (data.id) {
            return this.fetchParams(url, "PUT", JSON.stringify(data), `/${data.id}`).then(response => response)
        }
    }

    DeleteOffering(data) {
        let url = this.buildUrl(endpoints.Offerings.offering, "full")
        if (data.id) {
            return this.fetchParams(url, "DELETE", null, `/${data.id}`).then(response => response)
        }
    }

    AddNewFaqs(data) {
        let url = this.buildUrl(endpoints.Faqs.faq, "full")
        return this.fetchNormal(url, "POST", JSON.stringify(data)).then(response => response)
    }

    GetAllFaqs(data) {
        let url = this.buildUrl(endpoints.Faqs.faq, "full")
        return this.fetch(url, "GET", null, data).then(response => response)
    }

    GetFaqsDetails(data) {
        let url = this.buildUrl(endpoints.Faqs.faq, "full")
        return this.fetchParams(url, "GET", null, `/${data}`).then(response => response)
    }

    UpdeteFaqs(data) {
        let url = this.buildUrl(endpoints.Faqs.faq, "full")
        return this.fetchNormal(url, "PUT", JSON.stringify(data)).then(response => response)
    }

    DeleteFaqs(data) {
        let url = this.buildUrl(endpoints.Faqs.faq, "full")
        if (data.id) {
            return this.fetchParams(url, "DELETE", null, `/${data.id}`).then(response => response)
        }
    }

}