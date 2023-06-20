window.addEventListener('DOMContentLoaded', () => {
    fetch('/api/settings/slash')
      .then(response => response.json())
      .then(data => {
        const commandList = document.getElementById('command-list');

        if (typeof data === 'object') {
          Object.keys(data).forEach(commandName => {
            const command = data[commandName];
            const row = document.createElement('tr');

            const nameCell = document.createElement('td');
            nameCell.textContent = command.name;
            row.appendChild(nameCell);

            const statusCell = document.createElement('td');
            statusCell.textContent = command.active ? 'Ativo' : 'Desativado';
            row.appendChild(statusCell);

            const lastModifiedCell = document.createElement('td');
            lastModifiedCell.textContent = command.editedAt;
            row.appendChild(lastModifiedCell);

            const optionsCell = document.createElement('td');
            const optionsIcon = document.createElement('i');
            optionsIcon.className = 'material-icons';
            optionsIcon.textContent = 'more_vert';
            optionsIcon.addEventListener('click', (event) => {
              event.stopPropagation();
              const optionsMenu = optionsCell.querySelector('.options-menu');
              optionsMenu.classList.toggle('show');
            });

            const optionsMenu = document.createElement('div');
            optionsMenu.classList.add('options-menu');

            const optionsList = document.createElement('ul');

            const detailsOption = document.createElement('li');
            detailsOption.textContent = 'Detalhes';
            detailsOption.addEventListener('click', (event) => {
              event.stopPropagation();
              const detailsPopup = createDetailsPopup(command);
              document.body.appendChild(detailsPopup);
            });
            optionsList.appendChild(detailsOption);

            const toggleOption = document.createElement('li');
            toggleOption.className = 'toggle-option';
            toggleOption.addEventListener('click', (event) => {
              event.stopPropagation();
              fetch(`/api/settings/slash`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ active: command.name })
              })
                .then(response => response.json())
                .then(result => {
                  console.log('Comando editado:', result);
                  // Aqui você pode atualizar a interface de acordo com a resposta da API
                })
                .catch(error => {
                  console.error('Erro ao editar o comando:', error);
                });
            });

            const toggleLabel = document.createElement('span');
            toggleLabel.textContent = command.active ? 'Desativar' : 'Ativar';

            toggleOption.appendChild(toggleLabel);

            optionsList.appendChild(toggleOption);

            optionsMenu.appendChild(optionsList);
            optionsCell.appendChild(optionsIcon);
            optionsCell.appendChild(optionsMenu);
            row.appendChild(optionsCell);

            commandList.appendChild(row);
          });
        } else {
          console.error('Erro ao carregar a lista de comandos:', data);
        }
      })
      .catch(error => {
        console.error('Erro ao obter a lista de comandos:', error);
      });
  });

  function createDetailsPopup(command) {
    const detailsPopup = document.createElement('div');
    detailsPopup.className = 'command-details';
    const popupContent = document.createElement('div');
    popupContent.className = 'details-popup';
    const title = document.createElement('h2');
    title.textContent = 'Detalhes do Comando';
    const name = document.createElement('p');
    name.textContent = `Nome: ${command.name}`;
    const category = document.createElement('p');
    category.textContent = `Categoria: ${command.category}`;
    const slash = document.createElement('p');
    slash.textContent = `Local: ${command.slash}`;
    const editedAt = document.createElement('p');
    editedAt.textContent = `Última Edição: ${command.editedAt}`;
    const description = document.createElement('p');
    description.textContent = `Descrição: ${command.data.description}`;
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Fechar';
    closeButton.addEventListener('click', () => {
      document.body.removeChild(detailsPopup);
    });
    popupContent.appendChild(title);
    popupContent.appendChild(name);
    popupContent.appendChild(category);
    popupContent.appendChild(slash);
    popupContent.appendChild(editedAt);
    popupContent.appendChild(description);
    popupContent.appendChild(closeButton);
    detailsPopup.appendChild(popupContent);
    return detailsPopup;
  }