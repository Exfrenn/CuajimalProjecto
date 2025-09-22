import { AuthProvider } from "react-admin";

export const authProvider: AuthProvider = {
    //Runs when user attemps to login
    login:({username, password}) => {
        if(username === 'A01785655' && password === 'TC2007B') {
            localStorage.setItem("username",username); //Store  auth state in local storage
            return Promise.resolve(); //Login successful
        }else{ return Promise.reject();} //Login failed
    },

    // called when the user clicks on the logout button
    async logout() {
        localStorage.removeItem("username");
    },
    // called when the API returns an error
    async checkError({ status }: { status: number }) {
        if (status === 401 || status === 403) {
            localStorage.removeItem("username");
            throw new Error("Session expired");
        }
    },
    // called when the user navigates to a new location, to check for authentication
    async checkAuth() {
        if (!localStorage.getItem("username")) {
            throw new Error("Authentication required");
        }
    },
};
