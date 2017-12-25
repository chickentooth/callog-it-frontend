<template>
    <div class="content overflow-hidden __web-inspector-hide-shortcut__">
        <div class="row">
            <div class="col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4">
                <!-- Login Block -->
                <div class="block block-themed animated fadeIn">
                    <div class="block-header bg-primary">
                        <ul class="block-options">
                            <li>
                                <i v-show="loggingIn" class="fa fa-2x fa-asterisk fa-spin text-flat-lighter"></i>
                            </li>
                            <li>
                                <a href="#">Forgot Password?</a>
                            </li>
                            
                            <li>
                                <a href="#" data-toggle="tooltip" data-placement="left" title="" data-original-title="New Account"><i class="si si-plus"></i></a>
                            </li>
                        </ul>
                        <h3 class="block-title">Login</h3>
                    </div>
                    <div class="block-content block-content-full block-content-narrow">
                        <!-- Login Title -->
                        <h1 class="h2 font-w600 push-30-t push-5">Callog IT</h1>
                        <p>Welcome, please login.</p>
                        <!-- END Login Title -->

                        <!-- Login Form -->
                        <!-- jQuery Validation (.js-validation-login class is initialized in js/pages/base_pages_login.js) -->
                        <!-- For more examples you can check out https://github.com/jzaefferer/jquery-validation -->
                        <div class="js-validation-login form-horizontal push-30-t push-50" novalidate="novalidate">
                            <div class="form-group">
                                <div class="col-xs-12">
                                    <div class="form-material form-material-primary floating">
                                        <input v-model="credentials.username" class="form-control" type="text" id="login-username" name="login-username">
                                        <label for="login-username">Username</label>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-xs-12">
                                    <div class="form-material form-material-primary floating">
                                        <input v-model="credentials.password" class="form-control" type="password" id="login-password" name="login-password">
                                        <label for="login-password">Password</label>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-xs-12">
                                    <label class="css-input switch switch-sm switch-primary">
                                        <input type="checkbox" id="login-remember-me" name="login-remember-me"><span></span> Remember Me?
                                    </label>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-xs-12 col-sm-6 col-md-4">
                                    <button class="btn btn-block btn-primary"  @click="submit()"><i class="si si-login pull-right"></i> Log in</button>
                                </div>
                            </div>
                        </div>
                        <!-- END Login Form -->
                    </div>
                </div>
                <!-- END Login Block -->
            </div>
        </div>
    </div>
</template>

<script>
    import utils from '../../utils'

    export default {
        name: 'Login',
        data: function () {
          return {
              credentials: {
                  username: '',
                  password: ''
              },
              loggingIn: false,
              error: ''
          }
        },
        mounted: function () {
            let loginPageScript = document.createElement('script')
            loginPageScript.setAttribute('src', '/static/js/pages/base_pages_login.js')
            document.head.appendChild(loginPageScript)
        },
        methods: {
            submit () {
                this.loggingIn = true
                const credentials = {
                    username: this.credentials.username,
                    password: this.credentials.password
                }
                // Auth.login() returns a promise. A redirect will happen on success.
                // For errors, use .then() to capture the response to output
                // error_description (if exists) as shown below:
                this.$auth.login(credentials, 'dashboard').then((response) => {
                    this.loggingIn = false
                    this.error = utils.getError(response)
                })
            }
        }
    }
</script>