const puppeteer = require("puppeteer");
try {
    (async function () {
        // 本地测试
        // const browser = await puppeteer.launch({
        //     headless: false
        // });
        // const page = await browser.newPage();
        // await page.goto("http://127.0.0.1:5500/test8/", {
        //     waitUntil: "networkidle0", //不在有网络连接时候触发
        // });

        // 环境测试
        const browser = await puppeteer.launch({
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
        });

        const page = await browser.newPage();
        await page.setViewport({ width: 1200, height: 750 });
        await page.goto("http://127.0.0.1:8080/test7", {
            waitUntil: "networkidle0", //不在有网络连接时候触发
        });
        const sleep = function (times) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve()
                }, times)
            })
        }

        await sleep(3900);
        const lisCounts = await page.$$eval('li', lis => lis.length);
        if(lisCounts !=10){
            console.log('测试不通过');
            process.exit(1);
        }

        await sleep(5000);
        const lis2Counts = await page.$$eval('li', lis => lis.length);
        if(lis2Counts !=20){
            console.log('测试不通过');
            process.exit(1);
        }

        await sleep(3900);
        const lis3Counts = await page.$$eval('li', lis => lis.length);
        if(lis3Counts !=25){
            console.log('测试不通过');
            process.exit(1);
        }
        console.log("测试通过")
        await browser.close();
    })();
} catch (error) {

}
