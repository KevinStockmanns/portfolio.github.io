const d = document

export function formValidations(){
    const $form = d.getElementById("contact-form")
    $form.reset()

    const validations = {
        name: /^[A-Za-záéíóúÁÉÍÓÚÑñ\s*]{4,40}$/,
        email: /^[A-Za-z0-9]+([.-_+]?[A-Za-z0-9]+)*@[A-Za-z0-9]+([.-]?[A-Za-z0-9]+)*(\.[A-Za-z0-9]{2,10})+$/,
        msg: /^[A-Za-z0-9ñÑÁÉÍÓÚáéíóú\s?]{10,300}$/
    },
    auth = {
        name: false,
        email: false,
        msg: false
    }


    const validationInput = e=>{
        if(e.target.matches(`input[type="text"]`) || e.target.matches(`input[type="email"]`) || e.target.matches("textarea")){
            let ionIcon = e.target.parentNode.querySelector("ion-icon")

            
            if(validations[e.target.name].test(e.target.value)){
                e.target.parentNode.classList.add("succes")
                e.target.parentNode.classList.replace("error", "succes")
                ionIcon.setAttribute("name", "checkmark-outline")
                auth[e.target.name] = true
            }else{
                e.target.parentNode.classList.remove("succes")
                e.target.parentNode.classList.add("error")
                ionIcon.setAttribute("name", "close-circle-outline")
                auth[e.target.name] = false
            }




            if(e.target.value){
                e.target.parentNode.classList.add("full")
            }else{
                e.target.parentNode.classList.remove("full")
                e.target.parentNode.classList.remove("error")
            }
        }
    }


    $form.addEventListener("focusout", e=>{
        validationInput(e)
        e.target.parentNode.classList.replace("focus", "focusout")
    })
    $form.addEventListener("focusin", e=>{
        e.target.parentNode.classList.add("focus")
        e.target.parentNode.classList.remove("focusout")
    })

    
    $form.addEventListener("submit", e=>{
        const $succes = d.getElementById("form-succes"),
        $error = d.getElementById("form-error"),
        $invalid = d.getElementById("form-invalid"),
        $loader = d.getElementById("loader")
        e.preventDefault()

        $error.style.display = "none"
        $succes.style.display = "none"
        $invalid.style.display = "none"
        
        if(auth.name && auth.email && auth.msg){
            $loader.style.display = "flex"
            fetch("https://formsubmit.co/ajax/stockmannskevin@gmail.com", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: new FormData($form)
            })
            .then(res=> res.json())
            .then(data=>{
                $loader.style.display = "none"
                $succes.style.display = "inline-block"
                $form.reset()
                for(let i = 0; i < ($form.elements.length - 1); i++){
                    $form.elements[i].parentNode.classList.remove("succes")
                    $form.elements[i].parentNode.classList.remove("full")
                }
            })
            .catch(err=>{
                $loader.style.display = "none"
                $error.style.display = "inline-block"
            })
        }else{
            $invalid.style.display = "inline-block"
        }
    })
}