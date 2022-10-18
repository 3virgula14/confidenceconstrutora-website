const fs = require('fs');

fs.readdir(__dirname+"/public/portfolio_items", (err, files) => {
    if (err)
      console.log(err);
    else {
        let fileContentArr = []
        files.forEach(file => {
            const data = fs.readFileSync(__dirname+"/public/portfolio_items/"+file, 'utf8');
            fileContentArr+= data;
        })
        let finaljson = JSON.parse(`{"portfolio":[${fileContentArr}]}`)
        fs.writeFile(__dirname+"/public/data.json", JSON.stringify(finaljson), (err) =>{})
    }
  })
