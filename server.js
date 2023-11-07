const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/calculate", (req, res) => {
  const startHrTime = process.hrtime.bigint();
  const { num1, num2, operator } = req.body;
  let result = Number(num1);
  switch (operator) {
    case "+":
      result += Number(num2 || num1);
      break;
    case "-":
      result -= Number(num2 || num1);
      break;
    case "*":
      result *= Number(num2 || num1);
      break;
    case "/":
      result /= Number(num2 || num1);
      break;
    default:
      break;
  }
  const endHrTime = process.hrtime.bigint();
  const elapsedTimeInMs = Number(endHrTime - startHrTime) / 1000000.0;
  res.json({ result, responseTime: elapsedTimeInMs });
});

app.listen(8081, () => {
  console.log("Server is running on port 8081");
});
