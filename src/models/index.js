'use strict';

// src/models/index.js

import Sequelize from 'sequelize';
import process from 'process';
import mysql2 from "mysql2";
import configFile from '../../config/config.json' assert { type: 'json' };


import pujas from './PujaModels/pujas.js';
import pujaPackages from './PujaModels/pujaPackages.js';
import pujaImages from './PujaModels/pujaImages.js'; 
import pujaFaqs from './PujaModels/pujaFaqs.js'; 
import pujaOfferings from './PujaModels/pujaOfferings.js'; 

import templeHistory from './templeModels/templeHistory.js'; 

import chadhava from './ChadhavaModels/chadhava.js';
import chadhavaBanner from './ChadhavaModels/chadhavaBanner.js';
import chadhavaFaqs from './ChadhavaModels/chadhavaFaqs.js';
import chadhavaPackages from './ChadhavaModels/chadhavaPackages.js';
import recommendedChadawa from './ChadhavaModels/recommendedChadawa.js';
import pujaPerformed from './ChadhavaModels/pujaPerformed.js';

import Aartis from './ArticelsModels/Aartis.js';
import Chalisas from './ArticelsModels/Chalisas.js';
import Festivals from './ArticelsModels/Festivals.js';
import Wishes from './ArticelsModels/Wishes.js';
import Horoscopes from './ArticelsModels/Horoscopes.js';

import testimonials from './testimonialModels/testimonials.js';

const env = process.env.NODE_ENV || 'development';
const config = configFile[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], {
    ...config,
    dialect: "mysql",
    dialectModule: mysql2,   // ✅ force mysql2
  });
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, {
    ...config,
    dialect: "mysql",
    dialectModule: mysql2,   // ✅ force mysql2
  });
}

// Initialize each model and add it to the 'db' object
db.pujas = pujas(sequelize, Sequelize.DataTypes);
db.pujaPackages = pujaPackages(sequelize, Sequelize.DataTypes);
db.pujaImages  = pujaImages(sequelize, Sequelize.DataTypes);
db.pujaFaqs = pujaFaqs(sequelize, Sequelize.DataTypes);
db.pujaOfferings = pujaOfferings(sequelize, Sequelize.DataTypes);

db.templeHistory = templeHistory(sequelize, Sequelize.DataTypes);

db.chadhava = chadhava(sequelize, Sequelize.DataTypes);
db.chadhavaBanner = chadhavaBanner(sequelize, Sequelize.DataTypes);
db.chadhavaFaqs = chadhavaFaqs(sequelize, Sequelize.DataTypes);
db.chadhavaPackages = chadhavaPackages(sequelize, Sequelize.DataTypes);
db.recommendedChadawa = recommendedChadawa(sequelize, Sequelize.DataTypes);
db.pujaPerformed = pujaPerformed(sequelize, Sequelize.DataTypes);

db.Aartis = Aartis(sequelize, Sequelize.DataTypes);
db.Chalisas = Chalisas(sequelize, Sequelize.DataTypes);
db.Festivals = Festivals(sequelize, Sequelize.DataTypes);
db.Wishes = Wishes(sequelize, Sequelize.DataTypes);
db.Horoscopes = Horoscopes(sequelize, Sequelize.DataTypes);

db.testimonials = testimonials(sequelize, Sequelize.DataTypes);

// This part for setting up associations remains the same and will work correctly
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;