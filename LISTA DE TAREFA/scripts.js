const container = document.querySelector('.container')
const input = document.querySelector('.input')
const addButton = document.querySelector('.add')

function addTarefa(nomeTarefa) {
    const itemTarefa = document.createElement('div')
    itemTarefa.classList.add('item')
    
    const inputTarefa = document.createElement('input')
    inputTarefa.type = 'text'
    inputTarefa.disabled = true
    inputTarefa.value = nomeTarefa
    inputTarefa.classList.add('item-input')

    const btnEditar = document.createElement('button')
    btnEditar.classList.add('editar')
    btnEditar.innerText = 'EDITAR'
    btnEditar.addEventListener('click', () => editarTarefa(inputTarefa, nomeTarefa))

    const btnRemover = document.createElement('button')
    btnRemover.classList.add('remover')
    btnRemover.innerText = 'REMOVER'
    btnRemover.addEventListener('click', () => deletarTarefa(itemTarefa, nomeTarefa))

    container.appendChild(itemTarefa)
    itemTarefa.appendChild(inputTarefa)
    itemTarefa.appendChild(btnEditar)
    itemTarefa.appendChild(btnRemover)

}

function saveTasks() {
    window.localStorage.setItem('tasks', JSON.stringify(tasks))
}

function editarTarefa(input, nomeTarefa) {
    input.disabled = !input.disabled
    if (input.disabled) {
        const index = tasks.indexOf(nomeTarefa)
        tasks[index] = input.value
        saveTasks()
    }
}

function deletarTarefa(itemTarefa, nomeTarefa) {
    container.removeChild(itemTarefa)
    const index = tasks.indexOf(nomeTarefa)
    tasks.splice(index, 1)
    saveTasks()
}

function checkInput() {
    const valorInput = input.value
    if (valorInput !== '') {
        addTarefa(valorInput)
        tasks.push(valorInput)
        saveTasks()
        input.value = ''
    }
}

//ADICIONANDO EVENTOS DE CLICK NO BOTAO

addButton.addEventListener('click', checkInput)
window.addEventListener('keypress', (e) => {
    //verificação da tecla pressionada
    if (e.key === 'Enter') {
        checkInput()
    }
})

// criando/carregando localstorage

const tasks = JSON.parse(window.localStorage.getItem('tasks')) || []

for (const task of tasks) {
    addTarefa(task)
}
