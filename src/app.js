const express = require("express");
const app = express();

const { setupRoutes } = require("./modules");

app.use(express.json());
app.use('/api', setupRoutes());
app.use((data, _req, res, _next) => res.json({
    data,
    is_success:true,
}));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

