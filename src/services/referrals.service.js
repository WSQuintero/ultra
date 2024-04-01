import axios from "axios";

export default class ReferralService {
  constructor(token) {
    this.token = token;
    this.API_URL = `${import.meta.env.VITE_API_URL}`;
  }

  async get({ depth = 1, limit = 2, idUser = null, pending = false, path = false, emailSearch = '' } = {}) {
    try {
      if (pending) {
        const { data } = await axios.get(`${this.API_URL}/users/pending-direct-users`, {
          headers: { Authorization: this.token },
        });

        return { status: true, data };
      }

      const { data } = await axios.get(`${this.API_URL}/users/referrals-binary`, {
        params: {
          depth,
          emailSearch,
          path,
          ...(idUser ? { idUser } : {}),
        },
        headers: { Authorization: this.token },
      });

      return { status: true, data };
    } catch (error) {
      return { status: false, data: error };
    }
  }

  async assing({ idUser, side }) {
    try {
      const { data } = await axios.post(
        `${this.API_URL}/users/add-side-direct-user`,
        { idUser, side },
        { headers: { Authorization: this.token } }
      );

      return { status: true, data };
    } catch (error) {
      return { status: false, data: error };
    }
  }
}
