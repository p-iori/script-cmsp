
let notificationCount = 0;

function createAndShowNotification(message) {
    return new Promise((resolve) => {
        if (document.getElementById('notification-styles') === null) {
            const e = document.createElement("style");
            e.id = 'notification-styles';
            e.innerHTML = `
                .notification {
                    position: fixed;
                    right: -320px;
                    background-color: #333;
                    color: #fff;
                    padding: 10px;
                    border-radius: 10px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
                    z-index: 1000;
                    width: 320px;
                    height: 60px;
                    transition: right 0.5s ease;
                }
                .notification-content {
                    position: relative;
                    height: 100%;
                }
                .close-btn {
                    position: absolute;
                    top: 5px;
                    right: 10px;
                    cursor: pointer;
                    font-size: 20px;
                }
                .notification-content p {
                    margin: 0;
                    padding-top: 0;
                }
                .progress-bar {
                    position: absolute;
                    bottom: 5px;
                    left: 50%;
                    transform: translateX(-50%);
                    height: 5px;
                    background-color: #555;
                    border-radius: 5px;
                    width: 90%;
                    overflow: hidden;
                }
                .progress-bar div {
                    height: 100%;
                    background-color: #bbb;
                    width: 100%;
                    animation: progress 5s linear forwards;
                }
                @keyframes progress {
                    from {
                        width: 100%;
                    }
                    to {
                        width: 0;
                    }
                }
            `;
            document.head.appendChild(e);
        }

        notificationCount++;

        const t = document.createElement("div");
        t.id = `notification-${notificationCount}`; 
        t.className = "notification";
        t.style.bottom = `${20 + (notificationCount - 1) * 70}px`; 
        t.style.right = "20px";
        t.innerHTML = `
            <div class="notification-content">
                <span id="close-btn-${notificationCount}" class="close-btn">&times;</span>
                <p>${message}</p>
                <div class="progress-bar"><div></div></div>
            </div>
        `;
        document.body.appendChild(t);

        const n = document.getElementById(`close-btn-${notificationCount}`);

        n.onclick = function() {
            t.style.right = "-300px";
            setTimeout(() => {
                t.style.display = "none";
                notificationCount--; 
                resolve(); 
            }, 500);
        };

        setTimeout(() => {
            t.style.right = "20px"; 
        }, 10);

        setTimeout(() => {
            t.style.right = "-300px";
            setTimeout(() => {
                t.style.display = "none";
                notificationCount--; 
                resolve(); 
            }, 500);
        }, 5000);
    });
}

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function fazerlicaonormal(ra, password, damn) {
   
    if (ra === '' || password === '') {
        document.getElementById('name').value = '';
        document.getElementById('password').value = '';
        return alert('preeche os dadoskk');
    }

    createAndShowNotification("https://discord.gg/platformdestroyer")
    createAndShowNotification("SE VC PAGOU POR ISSO VC FOI SCAMMADO")
    createAndShowNotification("PEGANDO INFORMACOES...");

    const raEncoded = encodeURIComponent(ra);
    const passwordEncoded = encodeURIComponent(password);

    const pre_getinfo_response = await fetch(`https://cmsp-cheeto-v2.vercel.app/getporra?ra=${raEncoded}&password=${passwordEncoded}&porra=${damn}`);
    if (!pre_getinfo_response.ok) {
        createAndShowNotification('Erro ao entrar na conta :( tente dnv');
        return;
    }

    const getinfo_response = await pre_getinfo_response.json(); 

    console.log(`[DEBUG] RA: ${ra} PASSWORD: ${password}`);
    createAndShowNotification("LOGADO NA CONTA, PEGANDO LICOES...");

    if (getinfo_response && getinfo_response.x_auth_key && getinfo_response.room_code) {
        const x_auth_key = getinfo_response.x_auth_key;
        const room_code = getinfo_response.room_code;

        let getlessons_response = await fetch(`https://cmsp-cheeto-v2.vercel.app/getlesson_normal?x_auth_key=${x_auth_key}&room_code=${room_code}&porra=${damn}`);
        if (!getlessons_response.ok) {
            getlessons_response = await fetch(`https://cmsp-cheeto-v2.vercel.app/getlesson_normal_2?x_auth_key=${x_auth_key}&room_code=${room_code}&porra=${damn}`);
            if (!getlessons_response.ok) {
                createAndShowNotification('Erro ao carregar licoes. Verifique sua conexão e tente novamente.');
                return;
            }
        }
        const lessons = await getlessons_response.text();

        createAndShowNotification("LICOES CARREGADAS COM SUCESSO!");
        if (lessons === '[]') {
            createAndShowNotification("Nenhuma Licao Encontrada bruh");
            return;
        }

        const catapimbas = JSON.parse(lessons); 
        for (const lesson of catapimbas) {
            const titleUpper = lesson.title.toUpperCase();
            if (titleUpper.includes("PROVA PAULISTA") || titleUpper.includes("SARESP") || titleUpper.includes("RECUPERAÇÃO") || titleUpper.includes("REDAÇÃO")) {
               createAndShowNotification(`Ignorando a ATIVIDADE: ${lesson.title}`);
               continue; 
            }
            createAndShowNotification(`FAZENDO LIÇÃO ${lesson.title}`);
            console.log(lesson.title);

            try {
                await delay(1000); 
                const dolesson_response = await fetch(`https://cmsp-cheeto-v2.vercel.app/dolesso?x_auth_key=${x_auth_key}&room_code=${room_code}&lesson_id=${lesson.id}&porra=${damn}`);
                if (dolesson_response.ok) {
                    console.log(`tuche, atividade ${lesson.title} FEITA!`);
                } else {
                    console.error(`Erro ao fazer a atividade ${lesson.title}`);
                    createAndShowNotification(`Erro ao fazer a atividade ${lesson.title}. Tente novamente.`);
                }
            } catch (error) {
                console.error('Erro na requisição dolesson:', error);
                createAndShowNotification('Erro ao fazer a lição. Verifique sua conexão e tente novamente.');
            }
        }

    } else {
        console.error('Resposta inválida do servidor');
        createAndShowNotification('Erro ao carregar lições. Verifique sua conexão e tente novamente.');
    }
}

async function fazerlicaoatrasada(ra, password, damn) {
   
    if (ra === '' || password === '') {
        document.getElementById('name').value = '';
        document.getElementById('password').value = '';
        return alert('preeche os dadoskk');
    }
    
    createAndShowNotification("CHEAT FEITO POR MARCOS10PC")
    createAndShowNotification("SE VC PAGOU POR ISSO VC FOI SCAMMADOKKKKKKKKKKKKK")

    createAndShowNotification("PEGANDO INFORMACOES...");

    const raEncoded = encodeURIComponent(ra);
    const passwordEncoded = encodeURIComponent(password);

    const pre_getinfo_response = await fetch(`https://cmsp-cheeto-v2.vercel.app/getporra?ra=${raEncoded}&password=${passwordEncoded}&porra=${damn}`);
    if (!pre_getinfo_response.ok) {
        createAndShowNotification('Erro ao entrar na conta :( tente dnv');
        return;
    }

    const getinfo_response = await pre_getinfo_response.json(); 

    console.log(`[DEBUG] RA: ${ra} PASSWORD: ${password}`);
    createAndShowNotification("LOGADO NA CONTA, PEGANDO LICOES...");

    if (getinfo_response && getinfo_response.x_auth_key && getinfo_response.room_code) {
        const x_auth_key = getinfo_response.x_auth_key;
        const room_code = getinfo_response.room_code;

        let getlessons_response = await fetch(`https://cmsp-cheeto-v2.vercel.app/getlesson_expired?x_auth_key=${x_auth_key}&room_code=${room_code}&porra=${damn}`);
        if (!getlessons_response.ok) {
            getlessons_response = await fetch(`https://cmsp-cheeto-v2.vercel.app/getlesson_expired_2?x_auth_key=${x_auth_key}&room_code=${room_code}&porra=${damn}`);
            if (!getlessons_response.ok) {
                createAndShowNotification('Erro ao carregar licoes. Verifique sua conexão e tente novamente.');
                return;
            }
        }
        const lessons = await getlessons_response.text();

        createAndShowNotification("LICOES CARREGADAS COM SUCESSO!");
        if (lessons === '[]') {
            createAndShowNotification("Nenhuma Licao Encontrada bruh");
            return;
        }

        const catapimbas = JSON.parse(lessons); 
        for (const lesson of catapimbas) {
            const titleUpper = lesson.title.toUpperCase();
            if (titleUpper.includes("PROVA PAULISTA") || titleUpper.includes("SARESP") || titleUpper.includes("RECUPERAÇÃO") || titleUpper.includes("REDAÇÃO")) {
               createAndShowNotification(`Ignorando a ATIVIDADE: ${lesson.title}`);
               continue; 
            }
            createAndShowNotification(`FAZENDO LIÇÃO ${lesson.title}`);
            console.log(lesson.title);

            try {
                await delay(1000);
                const dolesson_response = await fetch(`https://cmsp-cheeto-v2.vercel.app/dolesso?x_auth_key=${x_auth_key}&room_code=${room_code}&lesson_id=${lesson.id}&porra=${damn}`);
                if (dolesson_response.ok) {
                    console.log(`tuche, atividade ${lesson.title} FEITA!`);
                } else {
                    console.error(`Erro ao fazer a atividade ${lesson.title}`);
                    createAndShowNotification(`Erro ao fazer a atividade ${lesson.title}. Tente novamente.`);
                }
            } catch (error) {
                console.error('Erro na requisição dolesson:', error);
                createAndShowNotification('Erro ao fazer a lição. Verifique sua conexão e tente novamente.');
            }
        }

    } else {
        console.error('Resposta inválida do servidor');
        createAndShowNotification('Erro ao carregar lições. Verifique sua conexão e tente novamente.');
    }
}
