const express = require('express');
const pa11y = require('pa11y');
const puppeteer = require('puppeteer');
const { AxePuppeteer } = require('axe-puppeteer');

const app = express();
const PORT = process.env.PORT || 3000; 

app.use(express.json());
app.use(cors()); 

async function runpa11yTest(url){
    return await pa11y(url);

}

async function runAxeCoreTest(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const axeResults = await new AxePuppeteer(page).analyze();

    await browser.close();
    return axeResults;
}

app.post('/api/test', async (req, res) => {
    const url = req.body;

    if(url){
        return res.status(400).json({error: 'URL is required'});
    }

    try{
        const pa11yResults = await runpa11yTest(url);
        const axeResults = await runAxeCoreTest(url);

        return res.json({pa11yResults, axeResults});

    }catch(err){
        console.error(err);
        return res.status(500).json({error: 'Internal server error'});
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
