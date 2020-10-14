'use strict'
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var settings = require('../../settings')
//middlewares
var {handleErrorsExpress} = require('./middlewares/handleErrors');

//archivos de rutas
var routes_chat = require('./routes/chat')
var routes_users = require('./routes/users')
var routes_public = require('./routes/public');

let dataResponse = {
    "totalRam": {
        "name": "Total Ram",
        "value": " 508876 MB"
    },
    "freeRam": {
        "name": "Free Ram",
        "value": " 338783 MB"
    },
    "procArray": [
        {
            "id": 1,
            "name": "systemd",
            "rid": 0,
            "state": 1,
            "mem": "24576 MB",
            "user": "Grupo26"
        },
        {
            "id": 402,
            "name": "systemd-journal",
            "rid": 1,
            "state": 1,
            "mem": "24576 MB",
            "user": "Grupo26"
        },
        {
            "id": 432,
            "name": "systemd-udevd",
            "rid": 1,
            "state": 8,
            "mem": "24576 MB",
            "user": "Grupo26"
        },
        {
            "id": 573,
            "name": "multipathd",
            "rid": 1,
            "state": 1,
            "mem": "24576 MB",
            "user": "Grupo26"
        },
        {
            "id": 607,
            "name": "systemd-timesyn",
            "rid": 1,
            "state": 1,
            "mem": "24576 MB",
            "user": "Grupo26"
        },
        {
            "id": 648,
            "name": "systemd-network",
            "rid": 1,
            "state": 4,
            "mem": "24576 MB",
            "user": "Grupo26"
        },
        {
            "id": 664,
            "name": "systemd-resolve",
            "rid": 1,
            "state": 8,
            "mem": "24576 MB",
            "user": "Grupo26"
        },
        {
            "id": 678,
            "name": "accounts-daemon",
            "rid": 1,
            "state": 1,
            "mem": "24576 MB",
            "user": "Grupo26"
        },
        {
            "id": 681,
            "name": "cron",
            "rid": 1,
            "state": 1,
            "mem": "24576 MB",
            "user": "Grupo26"
        },
        {
            "id": 682,
            "name": "dbus-daemon",
            "rid": 1,
            "state": 1,
            "mem": "24576 MB",
            "user": "Grupo26"
        },
        {
            "id": 690,
            "name": "networkd-dispat",
            "rid": 1,
            "state": 1,
            "mem": "24576 MB",
            "user": "Grupo26"
        },
        {
            "id": 695,
            "name": "rsyslogd",
            "rid": 1,
            "state": 1,
            "mem": "24576 MB",
            "user": "Grupo26"
        },
        {
            "id": 697,
            "name": "snapd",
            "rid": 1,
            "state": 1,
            "mem": "24576 MB",
            "user": "Grupo26"
        },
        {
            "id": 703,
            "name": "systemd-logind",
            "rid": 1,
            "state": 1,
            "mem": "24576 MB",
            "user": "Grupo26"
        },
        {
            "id": 709,
            "name": "atd",
            "rid": 1,
            "state": 1,
            "mem": "24576 MB",
            "user": "Grupo26"
        },
        {
            "id": 722,
            "name": "agetty",
            "rid": 1,
            "state": 1,
            "mem": "24576 MB",
            "user": "Grupo26"
        },
        {
            "id": 738,
            "name": "unattended-upgr",
            "rid": 1,
            "state": 1,
            "mem": "24576 MB",
            "user": "Grupo26"
        },
        {
            "id": 743,
            "name": "sshd",
            "rid": 1,
            "state": 1,
            "mem": "24576 MB",
            "user": "Grupo26"
        },
        {
            "id": 771,
            "name": "polkitd",
            "rid": 1,
            "state": 1,
            "mem": "24576 MB",
            "user": "Grupo26"
        },
        {
            "id": 896,
            "name": "sshd",
            "rid": 743,
            "state": 1,
            "mem": "24576 MB",
            "user": "Grupo26"
        },
        {
            "id": 913,
            "name": "systemd",
            "rid": 1,
            "state": 1,
            "mem": "24576 MB",
            "user": "Grupo26"
        },
        {
            "id": 914,
            "name": "(sd-pam)",
            "rid": 913,
            "state": 1,
            "mem": "24576 MB",
            "user": "Grupo26"
        },
        {
            "id": 1029,
            "name": "sshd",
            "rid": 896,
            "state": 1,
            "mem": "24576 MB",
            "user": "Grupo26"
        },
        {
            "id": 1030,
            "name": "sftp-server",
            "rid": 1029,
            "state": 1,
            "mem": "24576 MB",
            "user": "Grupo26"
        },
        {
            "id": 1031,
            "name": "sshd",
            "rid": 743,
            "state": 1,
            "mem": "24576 MB",
            "user": "Grupo26"
        },
        {
            "id": 1106,
            "name": "sshd",
            "rid": 1031,
            "state": 1,
            "mem": "24576 MB",
            "user": "Grupo26"
        },
        {
            "id": 1107,
            "name": "bash",
            "rid": 1106,
            "state": 1,
            "mem": "24576 MB",
            "user": "Grupo26"
        },
        {
            "id": 12168,
            "name": "cat",
            "rid": 1107,
            "state": 0,
            "mem": "24576 MB",
            "user": "Grupo26"
        }
    ]
}

//middlewares de bodyparser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//servicio de archivos estaticos
app.use('/images',express.static(settings.path+'/uploads'));

//rutas
app.use('/user',routes_users);
app.use('/chat',routes_chat);
app.use('/public',routes_public);
app.get('/test',async (req, res) => {
    res.status(200).send(dataResponse);
})
//manejo de errores
app.use(handleErrorsExpress);

module.exports = app;
