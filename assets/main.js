const showMenu=(toggleId,navId) =>{
    const toggle=document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click',()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

const navLink=document.querySelectorAll('.nav_link')

function linkAction(){
    // showMenu
    navLink.forEach(n => n.classList.remove('active'))
    this.classList.add('active')
    // RemoveMenu
    const navMenu=document.getElementById('nav-menu')
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click',linkAction))

// scroll reveal animation

const sr = ScrollReveal({
    origin:'top',
    distance: '80px',
    duration: 2000,
    reset: true
})
// Home
sr.reveal('.home_title',{})
sr.reveal('.button',{delay:100})
sr.reveal('.home_img',{delay:150})
sr.reveal('.home_social-icon',{interval:400})
// About
sr.reveal('.about_img',{})
sr.reveal('.about_subtitle-',{delay:100})
sr.reveal('.about_text',{delay:100})
// Skills
sr.reveal('.skills-subtitle',{delay:100})
sr.reveal('.skills_text',{delay:150})
sr.reveal('.skills_data',{interval:175})
sr.reveal('.skills_img',{delay:150})
// Works
sr.reveal('.work_img',{interval:100})
// Contact
sr.reveal('.contact_input',{interval:100})

