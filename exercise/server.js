const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

const members = [
    'Sophia',
    'Terry',
    'Betty',
    'Jason',
    'Odin'
];

app.get('/api/members', (req, res) => {

    res.send(members);

});

app.get('/api/members/:name', (req, res) => {

    res.send(members.filter((member) => member === req.params.name));

});

app.listen(process.env.PORT || 3000, () => {

    console.log('Now listening...');
    
});
