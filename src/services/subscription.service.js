import axios from "axios";

export default class SubscriptionService {
  constructor(token) {
    this.token = token;
    this.API_URL = `${import.meta.env.VITE_API_URL}`;
  }

  async generateWallet({ body, network }) {
    try {
      let typeGenerate = network == "TRON" ? "buy" : "buy-usdc";
      const { data } = await axios.post(`${this.API_URL}/subscription/${typeGenerate}`, body, {
        headers: { Authorization: this.token },
      });

      return { status: true, data };
    } catch (error) {
      return { status: false, data: error };
    }
  }
  
  async giveSubscription({ idProduct, idUser, password }) {
    try {
      const { data } = await axios.post(`${this.API_URL}/subscription/give`, { idProduct, idUser, password }, {
        headers: { Authorization: this.token },
      });

      return { status: true, data };
    } catch (error) {
      return { status: false, data: error };
    }
  }
  
  async giveCommission({ idProduct, idUser, amount, password }) {
    try {
      const { data } = await axios.post(`${this.API_URL}/subscription/give-commission`, { idProduct, idUser, amount, password }, {
        headers: { Authorization: this.token },
      });

      return { status: true, data };
    } catch (error) {
      return { status: false, data: error };
    }
  }
  
  async giveDeposit({ idProduct, idUser, amount, password }) {
    try {
      const { data } = await axios.post(`${this.API_URL}/subscription/give-deposit`, { idProduct, idUser, amount, password }, {
        headers: { Authorization: this.token },
      });

      return { status: true, data };
    } catch (error) {
      return { status: false, data: error };
    }
  }

  async removeDeposit({ idUser, password }) {
    try {
      const { data } = await axios.post(`${this.API_URL}/subscription/remove-deposit`, { idUser, password }, {
        headers: { Authorization: this.token },
      });

      return { status: true, data };
    } catch (error) {
      return { status: false, data: error };
    }
  }

  async getReports() {
    try {
      const { data } = await axios.get(`${this.API_URL}/subscription/commissionsAll`, {
        headers: { Authorization: this.token },
      });

      return { status: true, data };
    } catch (error) {
      return { status: false, data: error };
    }
  }

  async getCommissions({ isAdmin = false, pending = false } = {}) {
    try {
      if (pending) {
        if (isAdmin) {
          const { data } = await axios.get(`${this.API_URL}/subscription/commissions-pending-all-users`, {
            headers: { Authorization: this.token },
          });
          return { status: true, data };
        } else {
          const { data } = await axios.get(`${this.API_URL}/subscription/commissions-pending-user`, {
            headers: { Authorization: this.token },
          });
          return { status: true, data };
        }
      }
    } catch (error) {
      return { status: false, data: error };
    }
  }

  async getProfits({ isAdmin = false, pending = false } = {}) {
    try {
      if (pending) {
        if (isAdmin) {
          const { data } = await axios.get(`${this.API_URL}/subscription/profits-all`, {
            headers: { Authorization: this.token },
          });
          return { status: true, data };
        } else {
          const { data } = await axios.get(`${this.API_URL}/subscription/profits`, {
            headers: { Authorization: this.token },
          });
          return { status: true, data };
        }
      }
    } catch (error) {
      return { status: false, data: error };
    }
  }

  async splitWithdrawal({splits, password}) {
    try {
      const { data } = await axios.post(
        `${this.API_URL}/subscription/splitpayments`,
        {splits, password},
        { headers: { Authorization: this.token } }
      );
      return { status: true, data };
    } catch (error) {
      return { status: false, data: error };
    }
  }

  async rejectWithdrawal({splits, password}) {
    try {
      const { data } = await axios.post(
        `${this.API_URL}/subscription/rejectpayments`,
        {splits, password},
        { headers: { Authorization: this.token } }
      );
      return { status: true, data };
    } catch (error) {
      return { status: false, data: error };
    }
  }
}
