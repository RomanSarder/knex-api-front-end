const express = require('express');
const path = require('path');
// Create our app
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
// Handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', (request, response) => {
    response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

app.listen(PORT, function() {
    console.log(`Express server is up on port ${PORT}`);
});