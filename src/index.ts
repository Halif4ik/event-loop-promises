import fetch, {Response} from 'node-fetch';
import express from 'express'

const app = express()
const port: number = 3000;
// 2.1 node-fetch чтобы make request await fetch
const urlTask_1: string = 'https://jokes-by-api-ninjas.p.rapidapi.com/v1/jokes';

async function getJokes() {
    const response = await fetch(urlTask_1);
    const data = await response.text();
    console.log('Result 2.1-', data);
    return data;
}

getJokes();

// 2.2 возвращает ваш айпи
const urlTask_2: string = 'https://api.ipify.org/?format=json';

async function getMyIp(URL: string): Promise<string> {
    const response = await fetch(URL);
    const data = await response.json();
    return data && data.ip;
}

/*const tempProm: string = await getMyIp(urlTask_2);*/
getMyIp(urlTask_2).then(function (response: string) {
    console.log('Result 2.2-', response);
}).catch(e => console.log("fail"));
// 2.3.1
(function () {
    interface ItemplateResp {
        first_name: string
        name?: string
    }

    const urlTask_3: string = 'https://random-data-api.com/api/name/random_name';

    async function getNames(URL: string): Promise<string[]> {
        const arrResponses = await Promise.all([
            fetch(URL),
            fetch(URL),
            fetch(URL),
        ]);
        let first = await arrResponses[0].json() as ItemplateResp;
        const sec = await arrResponses[1].json() as ItemplateResp;
        const third = await arrResponses[2].json() as ItemplateResp;
        /*let {first, sec, third} = arrResponses;
        first = arrResponses[0].json().first_name;
        sec = sec.json().first_name;
        third = third.json().first_name;*/
        return [first && first.first_name, sec && sec.first_name, third && third.first_name];
    }

    getNames(urlTask_3).then(function (response: string[]) {
        console.log('Result 2.3.1-', response[0], response[1], response[2],);
    }).catch(e => console.log("fail"));
    ;
}());

// 2.3.2 async/await + Promise.all
(function () {
    interface ItemplateResp {
        first_name: string
        name?: string
    }

    const urlTask_3: string = 'https://random-data-api.com/api/name/random_name';

    async function getNames(URL: string): Promise<string[]> {
        let response: Response[] = [];
        for (let i = 0; i < 3; i++) {
            response.push(await fetch(URL));
        }
        const first = await response[0].json() as ItemplateResp;
        const sec = await response[1].json() as ItemplateResp;
        const third = await response[2].json() as ItemplateResp;
        return [first && first.first_name, sec && sec.first_name, third && third.first_name];
    }

    getNames(urlTask_3).then(function (response: string[]) {
        console.log('Result 2.3.2-', response[0], response[1], response[2],);
    }).catch(e => console.log("fail"));
}());

// 2.3.3 без async/await, but без Promise.all
(function () {
    interface ItemplateResp {
        first_name: string
        name?: string
    }

    const urlTask_3: string = 'https://random-data-api.com/api/name/random_name';

    function getNames(URL: string): Promise<any> {
        const first = fetch(URL).then(response => {
            return response.json();
        });
        const sec = fetch(URL).then(response => response.json());
        const third = fetch(URL).then(response => response.json());

        return new Promise(function (resolve, reject) {
            const arrResp: Response[] = [];
            first.then(parsedData => {
                arrResp.push(parsedData.first_name)
                if (arrResp.length === 3) resolve(arrResp);
            });
            sec.then(parsedData => {
                arrResp.push(parsedData.first_name);
                if (arrResp.length === 3) resolve(arrResp);
            });
            third.then(parsedData => {
                arrResp.push(parsedData.first_name);
                if (arrResp.length === 3) resolve(arrResp);
            });
        });
    }

    getNames(urlTask_3).then(function (response) {
        console.log('Result 2.3.3-', response[0], response[1], response[2]);
    }).catch(e => console.log("fail", e));
}());

// 2.4.1 без async/await
(function () {
    const urlTask_4: string = 'https://random-data-api.com/api/users/random_user';
    let i = 0;

    function getNames(URL: string): Promise<string> {
        return new Promise(function (resolve, reject) {
            const p: Promise<void | Response> = fetch(URL).then(response => {
                return response.json();
            }).then(parsedData => {
                console.log(`${i}-`, parsedData.gender);
                i++;
                if (parsedData.gender === "Female") {
                    resolve(parsedData.gender);
                } else resolve(getNames(URL));
            });
        });
    }

    getNames(urlTask_4).then(function (response: string) {
        console.log('Result 2.4.1-', response);
    });
}());

// 2.4.2 с async/await
(async function () {
    const urlTask_4: string = 'https://random-data-api.com/api/users/random_user';
    let i = 0;

    async function getNames(URL: string): Promise<string> {
        const response: Response = await fetch(URL);
        const jsonResp = await response.json();
        console.log(`${i++}-`, jsonResp.gender);
        return jsonResp.gender === "Female" ? (jsonResp.gender) : getNames(URL);
    }

    const response: string = await getNames(urlTask_4);
    console.log('Result 2.4.1-', response);

}());

// 2.5
(async function () {
    function getCurrentIP(callback: (ip: string) => string): Promise<string> {
        return new Promise(function (resolve) {
            setTimeout(() => {
                const currentIP = '192.168.0.1';
                resolve(callback(currentIP));
            }, 1000);
        });
    }

    function futureCallback(ip: string): string {
        return 'My-Ip:' + ip;
    }

    const response: string = await getCurrentIP(futureCallback);
    console.log('Result 2.5-', response);
}());
// 2.6
(async function () {
    const urlTask_2: string = 'https://api.ipify.org/?format=json';
    async function getMyIp1(URL: string): Promise<string> {
        const response = await fetch(URL);
        const data = await response.json();
        return data && data.ip;
    }

    async function getCurrentIP2(callback: (ip: string) => string) {
        const response: string = await getMyIp1(urlTask_2);
        return new Promise(function (resolve,reject) {
            resolve(callback(response));
        });
    }

    function futureCallback(ip: string): string {
       return `I am Callback, first param- ${ip}`;
    }
    console.log('Result 2.6-', await getCurrentIP2(futureCallback));
}());



