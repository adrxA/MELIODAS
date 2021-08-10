const puppeteer = require("puppeteer");

module.exports = async (search) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`https://www.youtube.com/results?search_query=${search}`);

  const result = await page.evaluate(() => {
    const title = document.querySelector(
      "#contents ytd-video-renderer yt-formatted-string"
    ).textContent;

    const thumbnail = document
      .querySelector("#contents ytd-video-renderer #img")
      .getAttribute("src")
      .split("?")[0];

    const source =
      "https://www.youtube.com" +
      document
        .querySelector("#contents ytd-video-renderer a#video-title")
        .getAttribute("href");

    return {
      result: {
        title,
        thumbnail,
        source,
      },
      status: true,
    };
  });

  await page.close();
  await browser.close();

  return result;
};
