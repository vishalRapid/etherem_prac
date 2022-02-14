const {create} = require('ipfs-http-client');
const ipfs = create('http://localhost:5002');
const fs = require('fs');
const baseUrl = 'https://ipfs.io/ipfs/'


// upload file to ipfs and update json
const uploadFileToIPFS = async (imgPath, name)=>{
    // fetch image
    let fileUrl;
    try{
        const file = await fs.readFileSync(imgPath)
        const {cid} = await ipfs.add({path: name, content: file});
        fileUrl = `${baseUrl}${cid.toString()}`;
        console.log(`Image url :${fileUrl}`)
    }catch(err){
        console.error(`Error while updating file to ipfs:${err}`)
        return;
    }
   

     // update the json file
     try{

         let jsonFile = await fs.readFileSync(__dirname + `/json_metadata/${name}.json`,'utf-8')
         jsonFile = JSON.parse(jsonFile);
         jsonFile.image = fileUrl;
         console.log("Updated json", jsonFile)
         await fs.writeFileSync(__dirname + `/json_metadata/${name}.json`,JSON.stringify(jsonFile));
     }catch(err){
         console.error("Error while updating json file")
     }
}


// upload meta data
const uploadMetaToIPFS = async (filePath, name)=>{
    // fetch image
    let fileUrl;
    try{
        const file = await fs.readFileSync(filePath)
        const {cid} = await ipfs.add({path: name, content: file});
        fileUrl = `${baseUrl}${cid.toString()}`;
        console.log(`Meta data url :${fileUrl}`)
    }catch(err){
        console.error(`Error while updating meta data to ipfs:${err}`)
        return;
    }
}


// uploadMetaToIPFS(__dirname + '/json_metadata/1.json','1') // https://ipfs.io/ipfs/QmQCE46jsKFZLvE9yujTZhptNumfpFiev83a86VTNeKpH3
// uploadMetaToIPFS(__dirname + '/json_metadata/2.json','2') // https://ipfs.io/ipfs/QmR7aw2ZMSMy59TYRAWLeTo2dCDtKWXJ1b2aWpedDvFMqp
