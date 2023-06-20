### Run the backend
Go to Backend
npm i
npm start

### Run the frontend
Go to Frontend
npm i
npm start

--IN FORONT-END--
For data table, I created component StarWarsTable.jsx,
in this i used useRef for initially api call (without using a useEffect hook).  -->line no. 33
In api it is giving next and previous page like so i used this to navigate page. --> line no. 37 and 43
also i added upload function to upload file within the Backend folder --> line no. 49
I used axios for api call
I added all necessary css in index.css file

--IN BACK-END--
in Backend, I added code only in index.js file of backend at  line no.14
I used express-fileupload package to upload file
line no. 15 to 17 i created uploads folder (if doesn't exist) to store uploaded file
Error handled at line no 20 to 22
line no  25 i moved created file to uploads folder
