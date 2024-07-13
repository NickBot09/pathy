const express = require('express')
const router = express.Router()
const isAuth = require('../helpers/auth-check')
const puppeteer = require('puppeteer');
require('dotenv').config();

router.use(express.json())

async function solve(url) {
  // Launch a new browser instance
    const browser = await puppeteer.launch({
      headless: true,
      defaultViewport: null,
      executablePath: '/usr/bin/google-chrome',
      args: ['--no-sandbox'],
  }); // set headless: true if you don't need to see the browser
// const browser = await puppeteer.launch({headless: true})
  const page = await browser.newPage();

  try {
    // Navigate to the login page
    await page.goto(`http://localhost:${process.env.PORT}/login`);
    // await page.goto(url)

    // Enter the username and password
    await page.type('input[name="username"]', 'admin');
    await page.type('input[name="password"]', 'aSuperSecureAndVeryLongPassw0rd');

    // // Click the login button
    await page.click('input[id="submit"]');

    // // Wait for navigation after login
    await page.waitForNavigation();

    // // Navigate to the saved posts page
    await page.goto(url);

    // // Click the button on the saved posts page
    // await page.click('button'); // Adjust the selector if needed

    // Optionally, wait for any actions after clicking the button
    // await page.waitForTimeout(3000); // Adjust the timeout as needed

  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    // Close the browser
    await browser.close();
  }
}

router.post("/flag", isAuth, async (req, res) => {
  const url = req.body.url
  // console.log(req.user)
  const regexPattern = new RegExp(`^http:\/\/localhost:${process.env.PORT}?\/.*$`);
  const isValidUrl = regexPattern.test(url);
  // console.log(regexPattern)

  if (!isValidUrl) {
    res.json({msg: `Invalid URL. Only http://localhost:${process.env.PORT}/* is allowed`})
  } else {
    solve(url)
    res.json({msg:'Admin will visit the link in 5 seconds'})
  }
})

module.exports = router