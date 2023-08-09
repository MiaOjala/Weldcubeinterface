const express = require("express");
const morgan = require("morgan");
const { createProxyMiddleware } = require("http-proxy-middleware");
const { token } = require("morgan");
require("dotenv").config();

// Create Express Server
const app = express();

// Configuration
const PORT = 5000;
const HOST = "localhost";
const API_BASE_URL = "http://weldcube.ky.local/api/v4";
const  API_KEY_VALUE  = "dc55e8bbc6b73dbb17c5ecf360a0aeb1";
const API_ENDING = `?api_key=${API_KEY_VALUE}`;
// Logging the requests
app.use(morgan("dev"));

// Proxy Logic :  Proxy endpoints
app.use("/Welds/*/ChangeState" ,
    createProxyMiddleware({
        target: API_BASE_URL,
        changeOrigin: true,
        onProxyRes:function(proxyRes, req, res) {
            proxyRes.headers["access-control-allow-origin"] = "*";
            
        },
        pathRewrite: function (path, req) {
           return path+"&api_key="+API_KEY_VALUE;
        },
    })
    )
app.use(
    "/Welds/*",
    createProxyMiddleware({
        changeOrigin: true,
        onProxyReq:function(proxyReq,req ,res){
            
        },
        onProxyRes:function(proxyRes, req, res) {
            proxyRes.headers["access-control-allow-origin"] = "*";
            
        },
        pathRewrite: function (path, req) {
           return path+API_ENDING;
        },
        target: API_BASE_URL  ,
    })
);
app.use(
    "/Welds" ,
    createProxyMiddleware({
        target: API_BASE_URL,
        changeOrigin: true,
        onProxyRes:function(proxyRes, req, res) {
            proxyRes.headers["access-control-allow-origin"] = "*";
        },
        pathRewrite: function (path, req) {
           return path+API_ENDING;
        },
    })
);


// Starting Proxy server
app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`);
});
