const navLinks = document.querySelectorAll('header nav a');
const logoLink = document.querySelector('.logo');
const sections = document.querySelectorAll('section');
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('header nav');
const footer = document.querySelector('footer');
const homeLink = document.querySelector('.home');

menuIcon.addEventListener('click', () => {
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
});

const activePage = (index) => { 
  const header = document.querySelector('header');
  const barsBox = document.querySelector('.bars-box');

  // garantir que o header esteja visível imediatamente (removendo animação/deslocamento)
  header.classList.add('active');

  navLinks.forEach(link => {
    link.classList.remove('active');
  });

  barsBox.classList.add('active');

  sections.forEach(section => section.classList.remove('active'));

  footer.classList.remove('active');

  // remover menu aberto e ícone imediatamente
  menuIcon.classList.remove('bx-x');
  navbar.classList.remove('active');

  // mostrar a seção alvo imediatamente (sem delay)
  sections[index].classList.add('active');

  if (index === 0) footer.classList.add('active');
};

navLinks.forEach((link, idx) => {
  link.addEventListener('click', () => {
    if (!link.classList.contains('active')) {
      // trocar página imediatamente, sem transição
      activePage(idx);
      link.classList.add('active');
    }
  });
});

logoLink.addEventListener('click', () => {
  if (!navLinks[0].classList.contains('active')) {
    activePage(0);
    navLinks[0].classList.add('active');
  }
});

homeLink.addEventListener('click', () => {
  if (!navLinks[0].classList.contains('active')) {
    activePage(0);
    navLinks[0].classList.add('active');
  }
});

/* ---------------- Resumo --------------------*/

const resumeBtns = document.querySelectorAll('.resume-btn');

resumeBtns.forEach((btn, idx) => {
  btn.addEventListener('click', () => {
    const resumeDetails = document.querySelectorAll('.resume-detail');

    resumeBtns.forEach(btn => {
      btn.classList.remove('active');
    });
    btn.classList.add('active');

    resumeDetails.forEach(detail => {
      detail.classList.remove('active');
    });
    resumeDetails[idx].classList.add('active');
  });
});

/* ---------------- Portflio --------------------*/

const arrowRight = document.querySelector('.portfolio-box .navigation .arrow-right');
const arrowLeft = document.querySelector('.portfolio-box .navigation .arrow-left');
const portfolioDetail = document.querySelectorAll('.portfolio-detail');

let index = 0;

const activePortfolio = () => {
  const imgSlide = document.querySelector('.portfolio-carousel .img-slide');

  imgSlide.style.transform = `translateX(calc(${index * -100}% - ${index * 2}rem))`;

  portfolioDetail.forEach(detail => {
    detail.classList.remove('active');
  });
  portfolioDetail[index].classList.add('active');
}

arrowRight.addEventListener('click', () => {
  if (index < 4) {
    index++;
    arrowLeft.classList.remove('disabled');
  }
  else {
    index = 5;
    arrowRight.classList.add('disabled');
  }

  activePortfolio();
});

arrowLeft.addEventListener('click', () => {
  if (index > 1) {
    index--;
    arrowRight.classList.remove('disabled');
  }
  else {
    index = 0;
    arrowLeft.classList.add('disabled');
  }

  activePortfolio();
});


/* ---------------- Envio de mensagem --------------------*/

class FormSubmit {
  constructor(settings) {
    this.settings = settings;
    this.form = document.querySelector(settings.form);
    this.formButton = document.querySelector(settings.button);
    if (this.form) {
      this.url = this.form.getAttribute("action");
    }
    this.sendForm = this.sendForm.bind(this);
  }

  displaySuccess() {
      this.form.innerHTML = this.settings.success;
      
      /*setTimeout(() => {
        window.location.href = "home"; 
      }, 3000);*/
    }

  displayError() {
    this.form.innerHTML = this.settings.error;
  }

  getFormObject() {
    const formObject = {};
    const fields = this.form.querySelectorAll("[name]");
    fields.forEach((field) => {
      formObject[field.getAttribute("name")] = field.value;
    });
    return formObject;
  }

  onSubmission(event) {
    event.preventDefault();
    event.target.disabled = true;
    event.target.innerText = "Enviando...";
  }

  async sendForm(event) {
    try {
      this.onSubmission(event);
      await fetch(this.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(this.getFormObject()),
      });
      this.displaySuccess();
    } catch (error) {
      this.displayError();
      throw new Error(error);
    }
  }

  init() {
    if (this.form) this.formButton.addEventListener("click", this.sendForm);
    return this;
  }
}

const formSubmit = new FormSubmit({
  form: "[data-form]",
  button: "[data-button]",
  success: "<h1 class='success'>Mensagem enviada!</h1>",
  error: "<h1 class='error'>Não foi possível enviar sua mensagem.</h1>",
});

formSubmit.init();
