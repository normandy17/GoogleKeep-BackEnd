const Medias = require("../models/media");
const redis = require("redis");
const { promisify } = require("util");

const client = redis.createClient();
const GET_ASYNC = promisify(client.get).bind(client);
const SET_ASYNC = promisify(client.set).bind(client);

const getAllMedia=async(req, res) => {
  
  try{
      const reply=await GET_ASYNC("medias")
      if(reply){
          console.log("Used REDIS cache")
          return res.send(JSON.parse(reply))
      }
      
      const response=await Medias.find()
      const saveResult=await SET_ASYNC("medias",JSON.stringify(response),"EX",600)
      console.log("Data Cached into REDIS",saveResult)
      res.send(response)
  }    
  catch(err){
      res.status(400).json("Error: "+err)
  }
}

const getMedia = (req, res) => {
  const id = req.params.id;
  Medias.findById(id)
    .then((media) => {
      res.json(media);
    })
    .catch((err) => res.status(404).json("Media not Found"));
};

const getFavMedia = async (req, res) => {
  
  const list = req.body.list;
  var arr = [],
    temp = "";
  if (list.length == 0) {
    res.status(200).send([]);
  } else {
    list.map(async (id, i) => {
      await Medias.findById({ _id: id }).then((data) => {
        arr.push(data);
        
        if (i == list.length - 1) {
          res.status(200).send(arr);
        }
      });
    });
    
  }
};

const searchResult = (req, res) => {  
  let query = req.body.query;
  Medias.find({ title: { $regex: query, $options: "$i" } }).then((data) => {
    res.status(200).send(data);
  });
};

module.exports = { getAllMedia, getMedia, getFavMedia, searchResult };
