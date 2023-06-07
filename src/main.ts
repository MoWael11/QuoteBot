const icon = document.getElementById('icon') as HTMLDivElement
const modalBox = document.getElementById('modal-box') as HTMLDivElement
const characters = document.querySelectorAll('.character') as NodeListOf<HTMLDivElement>
const loading = document.querySelector('.loading') as HTMLDivElement
const modalBoxContent = document.getElementById('modal-box-content') as HTMLHeadingElement
const modalBoxTitle = document.getElementById('modal-box-title') as HTMLParagraphElement

const getRandomAction = () => {
  const actions = [
    'greet in your most iconic way',
    'give a style advice based on your taste',
    'tell me about your latest adventure',
    'reveal your dreams to me',
    'tell me who your best friend is',
    'write your LinkedIn bio'
  ];
  const indexRandom = Math.floor(Math.random() * actions.length);
  return actions[indexRandom];
}

const playCharacter = async (nameCharacter: string) => {
  loading.classList.remove('hidden')
  loading.classList.add('flex')
  const action = getRandomAction();
  
  const temperature = 0.7;
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer sk-pLgidafsdfdafdsfdafd5HrTULlnvPGtQatkkz` 
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{
        role: "user",
        content: `Sei ${nameCharacter} e ${action} con un massimo di 100 caratteri senza mai uscire dal tuo personaggio`
      }],
      temperature: temperature
    })
  })
  const data = await response.json()
  let message: string
  if (data.status != 200) {
    message = 'Numero di token scaduto'
    modalBoxContent.style.color = 'red'
  } else {
    message = data.choices[0].text 
  }
  modalBoxTitle.innerHTML = nameCharacter
  modalBoxContent.innerHTML = message
  modalBox.classList.remove('hidden')
  loading.classList.add('hidden')
  loading.classList.remove('flex')
}

characters.forEach((character) => {
  character.addEventListener('click', () => {
    playCharacter(character.dataset.character as string)
  })
})

icon.addEventListener('click', () => {
  modalBox.classList.add('hidden')
})