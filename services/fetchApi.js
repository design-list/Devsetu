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

    GetChadhavaDetails(data) {
        console.log("GetChadhavaDetails", data)
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

}