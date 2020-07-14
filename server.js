const express = require('express')// ExpressJS
const app = express()

const path = require('path')// EJS

const bodyParser = require('body-parser')//Body Parser

const port = 3000;//Local Host 3000


const fs = require('fs');
let data = JSON.parse(fs.readFileSync('./data.json'));//Membaca Data Objek JSON

app.set('views', path.join(__dirname, 'views'))//join : menggabungkan 2 path, dirname : jika aplikasi dipindah-pindah agar tetap menyesuaikan 
app.set('view engine', 'ejs')

//Body-Parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => res.render('index', { data }));//render : merender tampilan index

app.get('/add', (req, res) => res.render('add'));//Membuat Router baru add

app.post('/add', (req, res) => {

    let dat = req.body;

    data.push(dat);//mempush data
    fs.writeFileSync('data.json', JSON.stringify(data));//membuat objek menjadi string
    res.redirect('/')//mendirect kembali ke router pertama '/'
});

app.get('/delete/:id', (req, res) => {//arti : menghapus berdasarkan id
    let id = req.params.id;
    data.splice(id, 1);
    fs.writeFileSync('data.json', JSON.stringify(data));//membuat objek menjadi string
    res.redirect('/')
})

app.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    res.render('edit', { item: { ...data[id] }, id });//memecah beberapa data pada id
})

app.post('/edit/:id', (req, res) => {
    console.log(req.params.id, req.body);
    const id = req.params.id;//request params id
    //request body item edit
    const edit = {
        string: req.body.string,
        integer: req.body.integer,
        float: req.body.float,
        date: req.body.date,
        boolean: req.body.boolean
    }
    data.splice(id, 1, edit);//id: pointer, 1: jumlah yang dihapus sebanyak 1, edit : penambahan data yang sudah edit
    fs.writeFileSync('data.json', JSON.stringify(data));//membuat objek menjadi string
    res.redirect('/')
});

app.listen(port, () => console.log(`Aplikasi Berjalan at http://localhost:${port}`))







