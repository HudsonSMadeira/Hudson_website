document.querySelector('form').addEventListener('submit', function(event) {
  event.preventDefault(); // Evita o comportamento padrão de redirecionamento imediato
  
  // Simulação do envio do formulário
  fetch(this.action, {
      method: this.method,
      body: new FormData(this),
      headers: { 'Accept': 'application/json' }
  }).then(response => {
      if (response.ok) {
          alert("Mensagem enviada com sucesso!"); // Mostra a mensagem de sucesso
          window.location.href = "portfolio.html";   // Redireciona para a primeira página (substitua pelo nome correto da sua página)
      } else {
          alert("Erro ao enviar a mensagem, tente novamente.");
      }
  }).catch(error => {
      alert("Erro ao enviar a mensagem, tente novamente.");
  });
});

/* class FormSubmit {
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
        
        setTimeout(() => {
          window.location.href = "portfolio.html"; 
        }, 3000); 
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
  formSubmit.init();*/