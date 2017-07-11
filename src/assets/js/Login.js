
// Whole-script strict mode syntax

class Login {

    constructor() {
        console.log('*** Login ctor start');
        this._isLoggedIn = false;
        this._setUpUI();
        console.log('*** Login ctor end');
    }
  
    _setUpUI() {
        console.log(`*** Login._setUpUI()`);
        //habdle validation
        
        //handle sign in 
        $("#sign-in-form-button").on("click", this.loginHandler);
    }

  /**
   * Handler for good sign in.
   */
    signInSuccess() {
        console.log(`*** Login.signInSuccess()`);
        sessionStorage.setItem('isLogedIn', this._isLoggedIn);
        //redirect to index page.
        $("#sign-in-form-success-message").removeClass("hide");
        $("#sign-in-form-err-message").addClass("hide");
        window.location = "./index.html"; 
    } 

    /**
     * Handler for bad sign in.

     */
    signInFailed(){
        console.log(`*** Login.signInFailed()`);
        sessionStorage.removeItem('isLogedIn');
        $("#sign-in-form-success-message").addClass("hide");
        $("#sign-in-form-err-message").removeClass("hide");
    }

    loginHandler(e) {
        console.log("loginHandler()");
        //e.stopPropagation();
        e.preventDefault();
        let username = $("#sign-in-form-username").val();
        let password = $("#sign-in-form-password").val();
        ds.BASignIn(username, password);
    }

}