import { formValidations } from "./modules/contactForm.js"
import { headerScroll, navBtn, scrollSpy, theme, upBtn } from "./modules/header.js"
import langFunction from "./modules/lang.js"
import { scrollAnimation } from "./modules/scrollAnimation.js"

document.addEventListener("DOMContentLoaded", e=>{
    headerScroll()
    navBtn()
    scrollSpy()
    formValidations()
    scrollAnimation()
    upBtn()
})



theme()
langFunction()