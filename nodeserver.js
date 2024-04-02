import { readFile, readdir } from 'node:fs/promises';
import express from 'express';

const app = express()
const port = 3000

const path = './html/'

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


app.get('/', (req, res) => {
    res.write(htmlPages[3]);
    res.end();
})

app.get('/about',(req,res)=>{
    res.write(htmlPages[1])
    res.end();
})

app.get('/contact-me',(req,res)=>{
    res.write(htmlPages[2])
    res.end();
})

app.use((req,res,next)=>{
    res.write(htmlPages[0]);
    res.end();
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})