const btnValidate = document.getElementById('btn-validate');

btnValidate.addEventListener('click', function () {


  const allInputs = document.querySelectorAll('input[type=file]')

  const requiredFields = Array.from(allInputs).filter(el => el.required);

  // Os campos obrigatórios não podem ser vazios
  if (!requiredFields.map(a => a.files.length > 0).includes(false)) {
    const form = document.querySelector('.files-form');
    const formData = new FormData();

    const inputs = [
      'product',
      'customer',
      'unit_product',
      'sale',
      'stock',
      'seller',
      'order',
      'sellers_portfolio'
    ];

    inputs.forEach(name => {
      const input = form.querySelector(`input[name="${name}"]`);
      if (input && input.files.length > 0) {
        for (const file of input.files) {
          formData.append(name, file);
        }
      }
    });

    function getCookie(name) {
      let cookieValue = null;
      if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
          cookie = cookie.trim();
          if (cookie.startsWith(name + '=')) {
            cookieValue = decodeURIComponent(cookie.slice(name.length + 1));
            break;
          }
        }
      }
      return cookieValue;
    }

    const csrfToken = getCookie('csrftoken');

    fetch(`${window.location.origin}/upload`, {
      method: 'POST',
      headers: {
        'X-CSRFToken': csrfToken
      },
      body: formData,
      credentials: 'include'
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        alert('Arquivos enviados com sucesso!');
      })
      .catch(error => {
        console.error('Erro ao enviar arquivos:', error);
        alert('Ocorreu um erro no envio.');
      });
  }
  else{

    alert("Os campos obrigatórios não podem estar vazios")

  }
});