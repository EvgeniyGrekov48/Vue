import express from 'express'
import bodyParser from 'body-parser'
import {Sequelize, Model, DataTypes} from 'sequelize'
import cors from "cors";
import moment from "moment";


const port = 8080;
const app = express()
app.use(cors())

const router = express.Router()
app.use('/api', router)


const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});


class NoteModel extends Model {
}

NoteModel.init({
    name: DataTypes.STRING,
    comment: DataTypes.STRING,
    updatedAt: {
        type: DataTypes.DATE,
        get() {
            return moment(this.getDataValue('updatedAt')).format('DD.MM.YYYY HH:mm:ss');
        }
    },
}, {sequelize, modelName: 'note'});

sequelize.sync();

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());


router.get('/', async (req, res) => {
    const notes = await NoteModel.findAll();
    res.json(notes);
});

router.post('/add', async (req, res) => {
    const note = await NoteModel.create(req.body);
    res.json(note);
});

router.post('/update', async (req, res) => {
    await NoteModel.update(req.body, {
        where: {
            id: req.body.id
        }
    });
    const note = await NoteModel.findByPk(req.body.id)
    res.json(note);
});

router.post('/delete', async (req, res) => {
    await NoteModel.destroy({
        where: {
            id: req.body.id
        }
    });
    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

