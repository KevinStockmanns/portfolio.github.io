const d = document

export function scrollAnimation(){
    const $elements = d.querySelectorAll(".scroll-animation")
    let timeInitial = 0.5

    $elements.forEach(el=>{
        el.style.transition = `${timeInitial}s`
        timeInitial = timeInitial + 0.1
    })

    const cb = (entries)=>{
        entries.forEach(entry=>{
            if(entry.isIntersecting){                
                entry.target.classList.add("active")
            }
        })
    }

    const observer = new IntersectionObserver(cb, {threshold: .1})
    $elements.forEach(el=> observer.observe(el))
}