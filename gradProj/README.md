# Graduation project

#1. Add key files
at gradProj\ui\src\keys.js

module.exports = {
    google:{
        clientID:"YOUR_GOOGLEAPP_CLIENT_ID",
    }
}

at gradProj\backend\src\config\keys.js

module.exports = {
    google:{
        clientID:"YOUR_GOOGLEAPP_CLIENT_ID",
        clientSecret:"YOUR_GOOGLEAPP_CLIENT_SECRET"
    },
    gmail:{
        gmailUser:"YOUR_GMAIL_LOGIN",
        gmailPassword:"YOUR_GMAIL_PASSWORD"
    }
}

#2 Run 

cd ui
npm install
npm start

cd backend
npm install
npm start