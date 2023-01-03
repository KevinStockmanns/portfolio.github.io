const d = document,
    body = d.querySelector("body")

export function navBtn(){
    const $navBtn = d.getElementById("navBtn")

    document.addEventListener("click", e=>{
        if(e.target === $navBtn || e.target.matches(".line")){
            $navBtn.classList.toggle("active")
        }
        if(!e.target.matches("#navBtn") && !e.target.matches(".line") && !e.target.matches(".setting") && !e.target.matches(".setting *") && $navBtn.classList.contains("active")){
            $navBtn.classList.remove("active")
        }
    })
}

export function theme (){
    const $themeBtn = d.getElementById("setting-theme"),
     LS = localStorage

    const darkTheme = ()=>{
        body.classList.remove("light")
        $themeBtn.classList.remove("active")
        LS.setItem("theme", "dark")
    }
    const lightTheme = ()=>{
        body.classList.add("light")
        $themeBtn.classList.add("active")
        LS.setItem("theme", "light")
    }


    $themeBtn.addEventListener("click",e=>{
        if(body.classList.contains("light")){
            darkTheme()
        }else{
            lightTheme()
        }
    })


    d.addEventListener("DOMContentLoaded", e=>{
        if(LS.getItem("theme") === null) LS.setItem("theme", "dark")
        else if(LS.getItem("theme") === "light") lightTheme()
        else darkTheme()
    })
}

export function headerScroll(){
    const $header = d.getElementById("header"),
        $navbar = d.getElementById("navbar")


    window.addEventListener("scroll", e=>{
        if( scrollY > 50 ){
            $header.classList.add("onScroll")
        }else{
            $header.classList.remove("onScroll")
        }

        if(scrollY > 30 && scrollY < d.body.offsetHeight - (innerHeight + d.getElementById("footer").offsetHeight)){
            $navbar.classList.add("onScroll")
        }else{
            $navbar.classList.remove("onScroll")
        }
    })
}


export function scrollSpy(){
    const $sections = d.querySelectorAll("[data-scrollSpy]")

    const cb = (entries)=>{
        entries.forEach(entry=>{
            let id = entry.target.id
            if(entry.isIntersecting){
                d.querySelectorAll(".nav-link").forEach(el=>el.classList.remove("visible"))
                d.querySelector(`.nav-link[href="#${id}"`).classList.add("visible")
            }
        })
    }

    const observer = new IntersectionObserver(cb, {threshold: .5})
    $sections.forEach(el=> observer.observe(el))
}



export function upBtn (){
    const $btn = d.getElementById("upBtn")

    d.addEventListener("scroll",e=>{
        // console.log(innerHeight, body.clientHeight)
        if( scrollY === (body.offsetHeight - innerHeight)){
            setTimeout(() => {
                scrollY === (body.offsetHeight - innerHeight) ? $btn.classList.add("visible") : $btn.classList.remove("visible")
            }, 1500);
        }else{
            $btn.classList.remove("visible")
        }
    })
}