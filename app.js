const config = require("./config");
const MongoClient = require("mongodb").MongoClient;
const userName = config.db_username;
const password = config.db_password;

const url = `mongodb+srv://${userName}:${password}@ciculationcluster.vc7fq.mongodb.net/test`;
const dbName = "circulation";
let database = "";

async function dbConnect() {
  try {
    const dbClient = new MongoClient(url);
    await dbClient.connect();
    database = await dbClient.db(dbName);
    console.log("Database Server Started");
  } catch (error) {
    console.log("Error while connecting to db server", error);
  }
}

dbConnect();

const loadData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("data ==>", data);
      console.log("database ==>", database);
      const results = await database.collection("newspapers").insertMany(data);
      resolve(results);
    } catch (error) {
      reject(error);
    }
  });
};

const getData = (query) => {
  return new Promise(async (resolve, reject) => {
    try {
      const results = database.collection("newspapers").find(query);
      resolve(await results.toArray());
    } catch (error) {
      reject(error);
    }
  });
};

const getOneData = (query) => {
  return new Promise(async (resolve, reject) => {
    try {
      const results = database.collection("newspapers").findOne(query);
      resolve(results);
    } catch (error) {
      reject(error);
    }
  });
};

const addData = (obj) => {
  return new Promise((resolve, reject) => {
    try {
      const result = database.collection("newspapers").insertOne(obj);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

const updateData = (id, obj) => {
  return new Promise((resolve, reject) => {
    try {
      const result = database
        .collection("newspapers")
        .findOneAndReplace({ id }, obj);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

const remove = (obj) => {
  return new Promise((resolve, reject) => {
    try {
      const result = database.collection("newspapers").deleteOne(obj);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { loadData, getData, getOneData, addData, updateData, remove };
