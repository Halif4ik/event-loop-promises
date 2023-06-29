import express, {Request, Response} from 'express'
import fetch from 'node-fetch';

const app = express()
const port = 3000

app.get('/', (req: Request, res: Response) => {
   /* const dataSourceUrl = 'https://api.ipify.org/?format=json';
    let sixTask: string

    async function world(a: number): Promise<string> {
        const url1 = 'https://jokes-by-api-ninjas.p.rapidapi.com/v1/jokes';
        const url = 'https://feeds.datafeedwatch.com/61736/abdd76f2e6bfde1eb3d3d48c82182138ca8643b6.json';
      /!*  const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '7bbacf0e59msh8ca84c2a43e822ap1ebd8djsnc590f2b7b745',
                'X-RapidAPI-Host': 'jokes-by-api-ninjas.p.rapidapi.com'
            }
        };*!/

        try {
            const response = await fetch(url);
            const result = await response.json();
            return result.toString()
        } catch (error) {
            console.error(error);
        }

        return "*".repeat(a)
    }
    const hello = async (): Promise<string> => {
        const tempProm: string = await world(10);
        console.log(typeof tempProm);
        return tempProm
    }

    hello().then(function (response: string) {
        sixTask = `6LAST ${response} `;
        res.send([ sixTask]);
        return console.log(response)
    }).catch(e => console.log("fail"));*/
      /*fetch('https://feeds.datafeedwatch.com/61736/abdd76f2e6bfde1eb3d3d48c82182138ca8643b6.json')
            .then(res => {
                    const response = res.json();
                    console.log(typeof response);
                    console.log( 'response-',response);
                    return response;
                }
            ).then(response=>{
            console.log(typeof response);
            console.log( 'response-',response.products[0]);
        });*/
    const url: string = 'https://jokes-by-api-ninjas.p.rapidapi.com/v1/jokes';
    interface IAPIOptions {
        method: string;
        headers: {
            'X-RapidAPI-Key': string;
            'X-RapidAPI-Host': string;
        };
    }
    const options: IAPIOptions = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '7bbacf0e59msh8ca84c2a43e822ap1ebd8djsnc590f2b7b745',
            'X-RapidAPI-Host': 'jokes-by-api-ninjas.p.rapidapi.com',
        },
    };
    async function getJokes() {
        try {
            const response = await fetch(url, options);
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error:', error);
        }
    }
    getJokes();


})

app.listen(port, () => {
    console.log(`Example MYapp listening on port ${port}`)
})

