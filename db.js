const { Model, STRING, Sequelize } = require('sequelize');
const db = new Sequelize( process.env.DATABASE_URL || 'postgres://localhost/acmePPT' );

class People extends Model {};
People.init({
  name: {
    type: STRING
  }
}, { sequelize: db, modelName: 'people'});

class Places extends Model {};
Places.init({
  name: {
    type: STRING
  }
}, { sequelize: db, modelName: 'places'});

class Things extends Model {};
Things.init({
  name: {
    type: STRING
  }
}, { sequelize: db, modelName: 'things'});

const data = {
  people: ['moe', 'larry', 'lucy', 'ethyl'],
  places: ['paris', 'nyc', 'chicago', 'london'],
  things: ['foo', 'bar', 'bazz', 'quq']
};

const syncAndSeed = async() => {
  try {
    await db.sync({ force: true });

    await Promise.all(
      data.people.map(name => People.create({ name }))
    );

    await Promise.all(
      data.places.map(name => Places.create({ name }))
    );

    await Promise.all(
      data.plthings.map(name => Things.create({ name }))
    );
  }
  catch(err) {
    console.log(err);
  }
};

module.exports = {
  db,
  syncAndSeed,
  models: { People, Places, Things }
}
