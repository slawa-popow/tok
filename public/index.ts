const perr = document.getElementById('error-message') as HTMLParagraphElement;
perr.textContent = '';
let counter = 0;

const viewMessageFromServer = async (res: {errorsMessages: {message: string; field: string}[]}) => {
    if (perr) {
        perr.textContent = '';
        if (res.errorsMessages.length > 0) {
            let msg = 'Не валидные значения полей: ';
            for (let emsg of res.errorsMessages) {
                msg += ` ${emsg.field} `
            }
            perr.textContent = msg;
            perr.classList.add('errtext');
            counter = 0;
        } else {
            perr.textContent = 'Ваше сообщение отправлено.';
            perr.classList.remove('errtext');
        }
    }
}



const form = document.getElementById("contacts-form") as HTMLFormElement;
const sendButton = document.getElementById("submit") as HTMLButtonElement;


sendButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const sendData = Object.fromEntries(formData);
    
    try {
        if (counter < 3) {
            const response = await fetch('/sendMessage', {
                method: "POST", 
                mode: "cors",  
                cache: "no-cache",  
                credentials: "include", 
                headers: { 
                    "Content-Type": "application/json",   
                },
                redirect: "follow", 
                referrerPolicy: "no-referrer", 
                body: JSON.stringify(sendData),   
              });
              const resp = await response.json();
              console.log(resp);
              await viewMessageFromServer(resp);
              counter++;
        }

    } catch (err) {
        console.log('------- *** --------', '\n', err, '\n', '------- *** --------');
    }
});