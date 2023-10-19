

const form = document.getElementById("contacts-form") as HTMLFormElement;
const sendButton = document.getElementById("submit") as HTMLButtonElement;


sendButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const sendData = Object.fromEntries(formData);
    
    try {
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

    } catch (err) {
        console.log('------- *** --------', '\n', err, '\n', '------- *** --------');
    }
});