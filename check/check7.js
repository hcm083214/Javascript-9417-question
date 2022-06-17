const puppeteer = require("puppeteer");
try {
    (async function () {
        // const browser = await puppeteer.launch({
        //     args: ["--no-sandbox", "--disable-setuid-sandbox"],
        // });
        // 本地测试
        const browser = await puppeteer.launch({
            headless: false
        });
        const page = await browser.newPage();
        await page.setViewport({ width: 1200, height: 750 });
        // await page.goto("http://127.0.0.1:8080/test7", {
        //     waitUntil: "networkidle0", //不在有网络连接时候触发
        // });

        // 本地测试
        await page.goto("http://127.0.0.1:5500/test7/", {
            waitUntil: "networkidle0", //不在有网络连接时候触发
        });
        await page.keyboard.press('ArrowRight');
        const sleep = function (times) {
            return new Promise(resolve => {
                setTimeout(() => resolve(1), 200 * times)
            })
        }
        await sleep(6);
        const snakeHeadLeft = await page.$eval('.snake-head', el => parseInt(el.style.left));
        const snakeBodyLeftArr = await page.$$eval('.snake-body', els => Array.from(els).map(el => parseInt(el.style.left)));
        if (snakeBodyLeftArr.length !== 3) {
            console.log('测试不通过');
            process.exit(1);
        }
        if (snakeHeadLeft === 160 &&
            snakeBodyLeftArr[0] === 140 &&
            snakeBodyLeftArr[1] === 120 &&
            snakeBodyLeftArr[2] === 100
        ) {
            console.log('测试通过');
        } else {
            console.log('测试不通过');
            process.exit(1);
        }
        await browser.close();
    })();
} catch (error) {

}
