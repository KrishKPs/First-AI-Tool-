require('dotenv').config();

const express = require('express');  
const app = express();   
const PORT = process.env.PORT || 3099;
const cors = require('cors');   
const analyserouter = require('./Routes/analyse');
const grammercheckrouter = require('./Routes/grammercheck');
const spellcheckrouter = require('./Routes/spellcheck');

app.use(express.json());
app.use(cors()); 

//  https://api.openai.com/v1/chat/completions

app.use('/api/analyse' , analyserouter); 
app.use('/api/checkgrammer' , grammercheckrouter); 
app.use('/api/checkspelling' , spellcheckrouter); 


app.listen(PORT, () => {    
  console.log(`Server is running on port: ${PORT}`); 
}       );
