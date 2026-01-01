const bodyContainer = document.querySelector('.body-container')
const loginInfo = `<div class="in-clover-text">Clover</div>
                <div class="in-first-line">
                    <input type="email" name="" id="" class="input-place" placeholder="Email">
                </div>
                <div class="in-second-line">
                    <input type="password" name="" id="" class="input-place" placeholder="Password">
                </div>
                <p class="message"></p>
                <div class="in-third-line">
                    <button class="login-bttn">Login</button>
                </div>
                <p>Don't have an account? <span class="signup-switch">Signup</span></p>`
const signupInfo = `<div class="out-clover-text">Clover</div>
                <div class="out-first-line">
                    <input type="email" name="" id="" class="input-place" placeholder="Email">
                </div>
                <div class="out-second-line">
                    <input type="password" name="" id="" class="input-place" placeholder="Password">
                </div>
                <div class="out-third-line">
                    <input type="password" name="" id="" class="input-place" placeholder="Confirm Password">
                </div>
                <div class="out-fourth-line">
                    <input type="number" name="" id="" class="input-place code-input" placeholder="Code">
                    <button class="send-code-bttn">Send Code</button>
                </div>
                <p class="message"></p>
                <div class="out-fifth-line">
                    <button class="signup-bttn">Signup</button>
                </div>
                <p>Already have an account? <span class="login-switch">Login</span></p>`
const pathname = location.pathname
document.addEventListener('DOMContentLoaded', () => {
    if (pathname === '/login') {
        bodyContainer.innerHTML = loginInfo;
        logClicks()
    }else if (pathname === '/signup') {
        bodyContainer.innerHTML = signupInfo;
        signClicks()
    }
})


function logClicks() {
    document.querySelector('.signup-switch').addEventListener('click', () => {
        bodyContainer.innerHTML = signupInfo
        location.pathname = '/signup';
        // signClicks()
    })
}
function signClicks() {
    document.querySelector('.login-switch').addEventListener('click', () => {
        bodyContainer.innerHTML = loginInfo
        location.pathname = '/login';
        // logClicks()
    })
}