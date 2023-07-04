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

// 2.2

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

// 2.3.2
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

// 2.3.3
(function () {
    interface ItemplateResp {
        first_name: string
        name?: string
    }

    const urlTask_3: string = 'https://random-data-api.com/api/name/random_name';

    function getNames(URL: string) {
        const arrResp: Response[] = [];
        const first = fetch(URL).then(response => {
            const parsedResponse = response;
            arrResp.push(parsedResponse)
            console.log('***-',arrResp[0]);
            return  parsedResponse;
        });
        const sec = fetch(URL).then(response => {
            return response.json();
        });
        const third = fetch(URL).then(response => {
            return response.json();
        });
        console.log('!-',first);
        console.log('//-',arrResp[0]);

        first.then(parsedData => {
          parsedData.json().then(parsedData=>{console.log('first', parsedData.first_name)})
        });
        sec.then(parsedData => {
            console.log('sec', parsedData.first_name);
        });
        third.then(parsedData => {
            console.log('third', parsedData.first_name);
        });

        /* let makeIteration = true;
         setTimeout(function () {
             console.log('setTimeout8000');
             makeIteration = false;
         }, 8000);

         while (makeIteration) if (result.length > 2) break;
         if (result.length > 2) resolve(result)
         else throw new Error("o_O");*/

    }

    getNames(urlTask_3)/*.then(function (response) {
        console.log('Result 2.3.3-', response);
    }).catch(e => console.log("fail", e));*/
}());


/*app.get('/', (req: Request, res: Response) => {

})*/
/*app.listen(port, () => {
    console.log(`Example MYapp listening on port ${port}`)
})*/


