const express = require('express');  
const analyserouter = express.Router();    
const axios = require('axios');    



analyserouter.post ('/' , async function(req,res) {

    const { sentence } = req.body; // Destructure the sentence from the request body. 

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', 
        { 
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system', 
                    content: 'You are a helpful assistant that rephrases the following sentences in a more formal tone. Only return the rephrased sentence with no additional information and after the sentence also ask for their name' 
                },
                {
                    role: 'user', 
                    content: sentence
                }
            ],
            max_tokens: 50,
            temperature: 0.7,
            n: 1, 
            stop: null     
        },
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.API_KEY}`   
            }
        });

        console.log(response.data); // Log the rephrased sentence to the console
        res.json({ content: response.data.choices[0].message.content });
    } catch (error) {
        console.log(error);
        if (error.response && error.response.status === 429) {
            res.status(429).json({ error: 'Too many requests. Please try again later.' ,
        apikey : process.env.API_KEY}); // Send a response to the client when the rate limit is exceeded.
        } else {
            res.status(500).json({ error: 'An error occurred. Please try again.' });
        }
    }
})



module.exports = analyserouter;  // Export the router to be used in the main index.js file.  


