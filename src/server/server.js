const express = require('express');
var cors = require("cors");

const app = express();

app.use(cors());

// Your other server configurations...

const PORT = 7015;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// might not be using