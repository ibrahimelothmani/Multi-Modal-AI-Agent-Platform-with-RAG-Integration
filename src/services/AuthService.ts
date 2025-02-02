import keycloak from "./KeycloakService";

export interface LoginRequest {
  email: string;
  password: string;
}


class AuthService {

  route: { navigate: (path: string[]) => void };
  constructor(route: { navigate: (path: string[]) => void }) {
    this.route = route;
  }
  async login() {
    try {
      const authenticated = await keycloak.init({
        onLoad: "login-required",
        checkLoginIframe: false,
      });

      if (authenticated) {
        localStorage.setItem("token", keycloak.token || "");
        return true;
      }
      return false;
    } catch (error) {
      console.error("Keycloak initialization failed:", error);
      throw error;
    }
  }

  logout() {
    localStorage.removeItem("token");
    keycloak.logout();
    this.route.navigate(["/login"]);
  }


  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);
    return null;
  }

  isLoggedIn() {
    return keycloak.authenticated ?? false;
  }

  getToken() {
    return keycloak.token;
  }
}

const route = {
  navigate: (path: string[]) => {
    // Implement your navigation logic here
    console.log(`Navigating to ${path.join('/')}`);
  }
};

export default new AuthService(route);