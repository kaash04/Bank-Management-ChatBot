const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const prompt = `
customers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        branch_code INT NOT NULL,
        account_no BIGINT UNIQUE NOT NULL,
        account_type VARCHAR(50) NOT NULL,
        curr_balance DECIMAL(15,2) NOT NULL,
        name VARCHAR(255) NOT NULL,
        dob DATE NOT NULL,
        gender ENUM('Male', 'Female', 'Other') NOT NULL,
        phone VARCHAR(15) UNIQUE NOT NULL
    )
this is the table schema for one of my databases. I'll provide you with a natural language text, for which, the output must be generated in specific format. Be concise and to the point with the response. The response must follow the format specified:
First line of response is optional, and must have the sql query that would be required to perform that operation on the given table. If this line is present, it must begin with '@' symbol.
Give the output in above format only. NO FORMATTING. NO SPECIAL Text Decor for sql code part.
The next lines are to response for the user for the message being provided by him/her.
If the text is for creating a new customer, make sure all necessary fields are given. If not, notify the same. NO SQL QUERY IN THAT CASE. Even if one of the fields is required and missing (not provided by user). do not give SQL query.
If the answer/response to the text is output of the sql query instead, then give the sql query in specified format, followed by just "SQL" in 2nd line of response.
And the natural language text provided is:
`;

const paraphrasePrompt = `You are given a pair of user input and generated output. you need to paraphrase the output in user readable format. Make sure the output is in normal text, does not contain an decorations, tables, etc. If there is any data with fields in response, convert it to paragraph OR simply put it in new lines in a readble format.`;
const paraphrasePrompt2 = `You will be given below a string. if it is normal string, make sure its gramatically correct and return it as response. If it is an [Object] make sure to convert and paraphrase the following to make it readable paragraph. Avoid an special text decorations.`;

const paraphrase = async (ques, ans) => {
  const result = model.generateContent(
    paraphrasePrompt2 + "\nGiven String: " + ans
  );
  return result;
};

const gen = async (inp) => {
  const response = await model.generateContent(prompt + inp);
  const result = await paraphrase(inp, response);
  return response;
};
module.exports = { gen };
