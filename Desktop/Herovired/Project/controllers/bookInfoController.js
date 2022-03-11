const bookData = require('../data.js');
var notfound = false;
const showBookInfo = (req, res) => {
    let data;
    for(let i=0;i<bookData.length;i++)
    {
        if(bookData[i].id == req.params.id)
        {
            data = bookData[i];
            break;
            notfound = false;
        }
        else
        {
            
            var notfound = true;
        }
    }
    if(notfound==false)
    {
    console.log('Found!');
    res.json(data);

    }
    else{
        throw new Error('Not Found..!')
    }
}

module.exports = {showBookInfo};