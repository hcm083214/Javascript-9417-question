const puppeteer = require("puppeteer");
try {
    (async function () {
        const browser = await puppeteer.launch({
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
        });
        // 本地测试
        // const browser = await puppeteer.launch({
        //     headless: false
        // });
        const page = await browser.newPage();
        await page.setViewport({ width: 1200, height: 750 });


        await page.goto("http://127.0.0.1:8080/test3", {
            waitUntil: "networkidle0", //不在有网络连接时候触发
        });

        // 本地测试
        // await page.goto("http://127.0.0.1:5500/test3/", {
        //     waitUntil: "networkidle0", //不在有网络连接时候触发
        // });
        await page.mouse.move(50, 80);
        await page.mouse.down();
        for (let i = 50; i < 200; i++) {
            await page.mouse.move(50 + i, 100);
        }
        await page.mouse.up();
        const arriveDesignCount = await page.$eval('.design', ele => {
            return ele.children.length;
        });
        const shapeCount = await page.$$eval('#shape', ele => {
            return ele.length;
        });
        const movingCount = await page.$$eval('#moving', ele => {
            return ele.length;
        });
        if (arriveDesignCount === 1 && shapeCount === 1 && movingCount === 1) {
            console.log('结果正确')
        } else {
            console.log('测试不通过');
            process.exit(1);
        }
        await browser.close();
    })();
} catch (error) {
    console.log(error)
}