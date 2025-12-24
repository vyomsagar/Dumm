
const aiText = document.getElementById('aiText');
const submitButton = document.getElementById('submitButton');
const inputText = document.getElementById('inputText');
const chatRoom = document.getElementById('chatRoom');

console.log('inputText', inputText)

inputText?.addEventListener('keyup', handleEnter);
submitButton?.addEventListener('click', handleClick);

function handleClick() {
    const text = inputText?.value.trim();
    if (!text) {
        return;
    }
    generate(text);
}

function handleEnter(event) {
    if (event.key === 'Enter') {
        const text = inputText?.value.trim();
        if (!text) 
        {
            return;
        }
        generate(text);
    }
}

function generate(text) {
    chatroomUpdate(text, false);
    inputText.value = '';

    callServer(text);
}

function chatroomUpdate(text, isAi = false) {
    const div = document.createElement('div');
    div.className = isAi ? "flex flex-col justify-start m-6" : "flex flex-col gap-2 items-end m-6";
    const p = document.createElement('p');
    p.className = isAi ? "max-w-[75%] my-2" : "bg-neutral-800 px-3 py-2 rounded-xl max-w-[70%]";
    p.textContent = text;
    div.appendChild(p);
    chatRoom.appendChild(div);
    chatRoom.scrollTop = chatRoom.scrollHeight;
}

async function callServer(question) {
    try {
        const response = await fetch('https://dumm-lovat.vercel.app/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ question })
        });
        const data = await response.json();
        chatroomUpdate(data.output, true);
    } catch (error) {
        console.error('Error:', error);
    }
}