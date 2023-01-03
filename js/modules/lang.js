const d = document

export default function langFunction(){
    const $selectLang = d.querySelector(".langSelect"),
        $textsToChange = d.querySelectorAll("[data-sectionLang]")

    let lang = ""

    d.addEventListener("DOMContentLoaded", e=>{
        if(!localStorage.getItem("lang")) localStorage.setItem("lang", "en")
        lang = localStorage.getItem("lang")
        d.querySelector(`.langSelect li[data-value="${lang}"]`).click()
    })


    const changeLang = async(e)=>{

        if(e.target.matches(`.langSelect li[data-value="es"]`)){
            localStorage.setItem("lang", "es")
        }else if(e.target.matches(`.langSelect li[data-value="en"]`)){
            localStorage.setItem("lang", "en")
        }

        if(e.target.matches(".langSelect li")){
            lang = localStorage.getItem("lang")
            const langDb = await fetch(`../../db/${lang}.json`)
            const texts = await langDb.json()

            if(lang === "es"){
                d.querySelector("title").textContent = `<Kev/> | Portafolio Web`
                d.getElementById("langSelect").innerHTML = `Español <ion-icon name="chevron-down-outline"></ion-icon>`
                d.getElementById("sendBtn").value = "Enviar"
            }else{
                d.querySelector("title").textContent = "<Kev/> | Portfolio Web"
                d.getElementById("langSelect").innerHTML = `English <ion-icon name="chevron-down-outline"></ion-icon>`
                d.getElementById("sendBtn").value = "Send"
            }

            d.querySelector("html").lang = lang
            $textsToChange.forEach(el=>{
                const section = el.dataset.sectionlang
                const value = el.dataset.valuelang

                el.textContent = texts[section][value]

                el.title ? el.title= texts[section][value]: ""

            })
        }

    }

    $selectLang.addEventListener("click", e=> changeLang(e))

    
}