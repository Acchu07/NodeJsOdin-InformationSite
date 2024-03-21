import http from 'node:http';
import { readFile, readdir } from 'node:fs/promises';


const path = '../html/'
const htmlPages = []
try
{
    const files = await readdir(path);
    for (const file of files)
    {
        try
        {
            htmlPages.push(await readFile(path + file))
        } catch (err)
        {
            console.error(err.message);
        }
    }
} catch (err)
{
    console.error(err);
}


function setResponseObjectWrite(stringUrl, responseObject)
{
    responseObject.setHeader('content-type', 'text/html')
    switch (stringUrl)
    {
        case '/':
            responseObject.write(htmlPages[3]);
            break;
        case '/about':
            responseObject.write(htmlPages[1]);
            break;
        case '/contact-me':
            responseObject.write(htmlPages[2]);
            break;
        default:
            responseObject.write(htmlPages[0]);
            break;
    }
    responseObject.end();
}

const server = http.createServer((req, res) =>
{
    setResponseObjectWrite(req.url, res)


});

server.listen(8080, () =>
{
    // console.log('listening @ 8080');
});
