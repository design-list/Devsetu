//services/fechApi.js

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

    GetPujaBySlug(data) {
        let url = this.buildUrl(endpoints.Web.puja, "full")
        return this.fetchParams(url, "GET", null, `/${data}`).then(response => response)
    }

    UpdetePujaFlags(data) {
        let url = this.buildUrl(`${endpoints.Pujas.puja}/${data.id}/flags`, "full")
        return this.fetch(url, "PUT", JSON.stringify(data), null).then(response => response)
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

    UpdeteChadhavaFlags(data) {
        let url = this.buildUrl(`${endpoints.Chadhava.chadhava}/${data.id}/flags`, "full")
        return this.fetch(url, "PUT", JSON.stringify(data), null).then(response => response)
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

    GetAllHome(data) {
        let url = this.buildUrl(endpoints.Home.home, "full")
        return this.fetch(url, "GET", null, data).then(response => response)
    }

    
    AddNewCart(data) {
        let url = this.buildUrl(endpoints.Cart.cart, "full");
        return this.fetchNormal(url, "POST", JSON.stringify(data)).then(response => response);
    }

    GetAllCart(data) {
        let url = this.buildUrl(endpoints.Cart.cart, "full");
        return this.fetch(url, "GET", null, data).then(response => response);
    }

    GetCartDetails(data) {
        let url = this.buildUrl(endpoints.Cart.cart, "full");
        return this.fetchParams(url, "GET", null, `/${data}`).then(response => response);
    }

    UpdateCart(data) {
        let url = this.buildUrl(endpoints.Cart.cart, "full");
        if (data.id) {
            return this.fetchParams(url, "PUT", JSON.stringify(data), `/${data.id}`).then(response => response);
        }
    }

    DeleteCart(data) {
        let url = this.buildUrl(endpoints.Cart.cart, "full");
        if (data.id) {
            return this.fetchParams(url, "DELETE", null, `/${data.id}`).then(response => response);
        }
    }

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


    GetAllPackage(data) {
        let url = this.buildUrl(endpoints.Packages.package, "full")
        return this.fetch(url, "GET", null, data).then(response => response)
    }

    AddNewPackage(data) {
        let url = this.buildUrl(endpoints.Packages.package, "full")
        return this.fetchNormal(url, "POST", JSON.stringify(data)).then(response => response)
    }

    GetPackageDetails(data) {
        let url = this.buildUrl(endpoints.Packages.package, "full")
        return this.fetchParams(url, "GET", null, `/${data}`).then(response => response)
    }

    UpdetePackage(data) {
        let url = this.buildUrl(endpoints.Packages.package, "full")
        return this.fetchNormal(url, "PUT", JSON.stringify(data)).then(response => response)
    }

    DeletePackage(data) {
        let url = this.buildUrl(endpoints.Packages.package, "full")
        if (data.id) {
            return this.fetchParams(url, "DELETE", null, `/${data.id}`).then(response => response)
        }
    }

    GetAllUserDetail(data) {
        let url = this.buildUrl(endpoints.UserDetail.userdetail, "full")
        return this.fetch(url, "GET", null, data).then(response => response)
    }

    AddNewUserDetail(data) {
        let url = this.buildUrl(endpoints.UserDetail.userdetail, "full")
        return this.fetchNormal(url, "POST", JSON.stringify(data)).then(response => response)
    }

    PaymentOrder(data) {
        let url = this.buildUrl(endpoints.Payment.Order, "full")
        return this.fetchNormal(url, "POST", JSON.stringify(data)).then(response => response)
    }

    PaymentVerify(data) {
        let url = this.buildUrl(endpoints.Payment.Verify, "full")
        return this.fetchNormal(url, "POST", JSON.stringify(data)).then(response => response)
    }
    
    CheckLogin(data) {
        let url = this.buildUrl(endpoints.AdminLogin.adminLogin, "full")
        return this.fetchNormal(url, "POST", JSON.stringify(data)).then(response => response)
    }

    Registration(data) {
        let url = this.buildUrl(endpoints.AdminLogin.register, "full")
        return this.fetchNormal(url, "POST", JSON.stringify(data)).then(response => response)
    }

    GetCartById(id) {
        let url = this.buildUrl(endpoints.Web.cart, "full")
        return this.fetchParams(url, "GET", null, `/${id}`).then(response => response)
    }


    AddNewAartis(data) {
        let url = this.buildUrl(endpoints.Articels.aartis, "full")
        return this.fetchNormal(url, "POST", JSON.stringify(data)).then(response => response)
    }

    GetAllAartis(data) {
        let url = this.buildUrl(endpoints.Articels.aartis, "full")
        return this.fetch(url, "GET", null, data).then(response => response)
    }

    GetAartisById(id) {
        console.log("Fetching Aarti by ID:", id);
        let url = this.buildUrl(endpoints.Articels.aartis, "full")
        return this.fetchParams(url, "GET", null, `/${id}`).then(response => response)
    }

    UpdeteAartis(data) {
        let url = this.buildUrl(endpoints.Articels.aartis, "full")
        if (data.id) {
            return this.fetchParams(url, "PUT", JSON.stringify(data), `/${data.id}`).then(response => response);
        }
    }

    DeleteAartis(id) {
        let url = this.buildUrl(endpoints.Articels.aartis, "full")
        if (id) {
            return this.fetchParams(url, "DELETE", null, `/${id}`).then(response => response)
        }
    }

    AddNewChalisa(data) {
        let url = this.buildUrl(endpoints.Articels.chalisa, "full")
        return this.fetchNormal(url, "POST", JSON.stringify(data)).then(response => response)
    }

    GetAllChalisa(data) {
        let url = this.buildUrl(endpoints.Articels.chalisa, "full")
        return this.fetch(url, "GET", null, data).then(response => response)
    }

    GetChalisaById(id) {
        let url = this.buildUrl(endpoints.Articels.chalisa, "full")
        return this.fetchParams(url, "GET", null, `/${id}`).then(response => response)
    }

    UpdeteChalisa(data) {
        let url = this.buildUrl(endpoints.Articels.chalisa, "full")
        if (data.id) {
            return this.fetchParams(url, "PUT", JSON.stringify(data), `/${data.id}`).then(response => response);
        }
    }

    DeleteChalisa(id) {
        let url = this.buildUrl(endpoints.Articels.chalisa, "full")
        if (id) {
            return this.fetchParams(url, "DELETE", null, `/${id}`).then(response => response)
        }
    }

    AddNewMantras(data) {
        let url = this.buildUrl(endpoints.Articels.mantras, "full")
        return this.fetchNormal(url, "POST", JSON.stringify(data)).then(response => response)
    }

    GetAllMantras(data) {
        let url = this.buildUrl(endpoints.Articels.mantras, "full")
        return this.fetch(url, "GET", null, data).then(response => response)
    }

    GetMantrasById(id) {
        let url = this.buildUrl(endpoints.Articels.mantras, "full")
        return this.fetchParams(url, "GET", null, `/${id}`).then(response => response)
    }

    UpdeteMantras(data) {
        let url = this.buildUrl(endpoints.Articels.mantras, "full")
        if (data.id) {
            return this.fetchParams(url, "PUT", JSON.stringify(data), `/${data.id}`).then(response => response);
        }
    }

    DeleteMantras(id) {
        let url = this.buildUrl(endpoints.Articels.mantras, "full")
        if (id) {
            return this.fetchParams(url, "DELETE", null, `/${id}`).then(response => response)
        }
    }


    AddNewHoroscope(data) {
        let url = this.buildUrl(endpoints.Articels.horoscope, "full")
        return this.fetchNormal(url, "POST", JSON.stringify(data)).then(response => response)
    }

    GetAllHoroscope(data) {
        let url = this.buildUrl(endpoints.Articels.horoscope, "full")
        return this.fetch(url, "GET", null, data).then(response => response)
    }

    GetHoroscopeById(id) {
        let url = this.buildUrl(endpoints.Articels.horoscope, "full")
        return this.fetchParams(url, "GET", null, `/${id}`).then(response => response)
    }

    UpdeteHoroscope(data) {
        let url = this.buildUrl(endpoints.Articels.horoscope, "full")
        if (data.id) {
            return this.fetchParams(url, "PUT", JSON.stringify(data), `/${data.id}`).then(response => response);
        }
    }

    DeleteHoroscope(id) {
        let url = this.buildUrl(endpoints.Articels.horoscope, "full")
        if (id) {
            return this.fetchParams(url, "DELETE", null, `/${id}`).then(response => response)
        }
    }

}