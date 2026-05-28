import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ["localhost"
      // , "feverously-stoniest-sibyl.ngrok-free.dev"
    ],
    // headers: {
    //   "Cross-Origin-Opener-Policy": "unsafe-none",
    //   "Cross-Origin-Embedder-Policy": "unsafe-none",
    //   "Cross-Origin-Resource-Policy": "cross-origin",
    // },
    // proxy: {
    //   "/auth": {
    //     target: "http://localhost:3200", // Your Express backend
    //     changeOrigin: true,
    //     secure: false,
    //   },
    //   "/get-posts-data": {
    //     target: "http://localhost:3200", // Your Express backend
    //     changeOrigin: true,
    //     secure: false,
    //   },
    //   "/users-data": {
    //     target: "http://localhost:3200", // Your Express backend
    //     changeOrigin: true,
    //     secure: false,
    //   },
    //   "/profile": {
    //     target: "http://localhost:3200", // Your Express backend
    //     changeOrigin: true,
    //     secure: false,
    //   },
    //   "/profile/update-data": {
    //     target: "http://localhost:3200", // Your Express backend
    //     changeOrigin: true,
    //     secure: false,
    //   },
    //   "/create-post": {
    //     target: "http://localhost:3200", // Your Express backend
    //     changeOrigin: true,
    //     secure: false,
    //   },
    //   "/otp-creation": {
    //     target: "http://localhost:3200", // Your Express backend
    //     changeOrigin: true,
    //     secure: false,
    //   },
    //    "/auth/signup": {
    //     target: "http://localhost:3200", // Your Express backend
    //     changeOrigin: true,
    //     secure: false,
    //   },
    //   "/auth/login": {
    //     target: "http://localhost:3200", // Your Express backend
    //     changeOrigin: true,
    //     secure: false,
    //   },
    //   "/create-story": {
    //     target: "http://localhost:3200", // Your Express backend
    //     changeOrigin: true,
    //     secure: false,
    //   },
    //   "/get-story-data":{
    //      target:"http://localhost:3200",
    //      changeOrigin:true,
    //      secure:false,
    //   },
    //   "/get-story":{
    //      target:"http://localhost:3200",
    //      changeOrigin:true,
    //      secure:false,
    //   },
    //   "/update-following":{
    //      target:"http://localhost:3200",
    //      changeOrigin:true,
    //      secure:false,
    //   },
    //   "/update-follower":{
    //      target:"http://localhost:3200",
    //      changeOrigin:true,
    //      secure:false,
    //   },
    //   "/save-connect-request":{
    //      target:"http://localhost:3200",
    //      changeOrigin:true,
    //      secure:false,
    //   },
    //   "/accept-request":{
    //      target:"http://localhost:3200",
    //      changeOrigin:true,
    //      secure:false,
    //   },
    //   "/reject-request":{
    //      target:"http://localhost:3200",
    //      changeOrigin:true,
    //      secure:false,
    //   }
    // },
  },
});
