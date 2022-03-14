
const express = require('express')
const filehandleRoutes = express();
const fs = require('fs');
const filepath = './sampledata/';

/**
 * Create new data
 */

filehandleRoutes.post('/', async (req, res, next) => {
    const existingdata = await fs.readFileSync(filepath + req.filename + '.json');
    let response = JSON.parse(existingdata.toString('utf-8'))
    let newdata = { ...req.body, id: Math.floor(Math.random() * 10001) }
    let data = [...response, newdata];
    const writeFile = await fs.writeFileSync(filepath + req.filename + '.json', JSON.stringify(data))
    res.status(200).json(newdata)
})



/**
 * Updata data by using Id
 */
filehandleRoutes.put('/:id', async (req, res, next) => {
    const existingdata = await fs.readFileSync(filepath + req.filename + '.json');
    let response = JSON.parse(existingdata.toString('utf-8'));

    response = response.map(x => {
        console.log(req.body)
        if (req.params.id == x.id) {
            console.log(req.body)
             x = { ...x, ...req.body }
            console.log(x)
            return x;
        }
        return x
    })


    await fs.writeFileSync(filepath + req.filename + '.json', JSON.stringify(response))
    res.status(200).json({ message: 'updated' })
})


/**
 * Get All data
 */

filehandleRoutes.get('/', async (req, res, next) => {
    try {

        const existingdata = await fs.readFileSync(filepath + req.filename + '.json');
        const response = JSON.parse(existingdata.toString('utf-8'))
        res.status(200).json(response)
    }
    catch (err) {
        res.status(400).json({ Error })
    }
})


/**
 * 
 * Get File data with Id
 */

filehandleRoutes.get('/:id', async (req, res, next) => {
    const existingdata = await fs.readFileSync(filepath + req.filename + '.json');
    let response = JSON.parse(existingdata.toString('utf-8'))
    response = response.filter(data => data.id == req.params.id);
    res.status(200).json(response.length?response[0]:{})
})

/**
 * Delete Method
 * 
 * remove data from the existing data
 */

filehandleRoutes.delete('/:id', async (req, res, next) => {
    const existingdata = await fs.readFileSync(filepath + req.filename + '.json');
    let response = JSON.parse(existingdata.toString('utf-8'))
    let newdata = response.filter(data => {
        if (data.id != req.params.id) {
            return data
        }
    });
    await fs.writeFileSync(filepath + req.filename + '.json', JSON.stringify(newdata))
    res.status(200).json(newdata.length?newdata[0]:{})
})



module.exports = filehandleRoutes;