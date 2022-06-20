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
        // await page.goto("http://127.0.0.1:8080/test9", {
        //     waitUntil: "networkidle0", //不在有网络连接时候触发
        // });

        // 本地测试
        await page.goto("http://127.0.0.1:5500/test9/", {
            waitUntil: "networkidle0", //不在有网络连接时候触发
        });
        const logResult = ['fn1','fn2','fn3','end fn2','end fn1'];
        function isResultExpecting(expect, result) {
            let isPass = false
            if (expect == result) {
                console.log(`第${i}次符合预期`)
                isPass = true;
            } else {
                console.log('测试不通过', expect, result);
                isPass = false;
                process.exit(1);
            }
            return isPass;
        }
        await page.on('console', (msg) => {
            for (let i = 0; i < msg.args().length; ++i) {
                let result = msg.args()[i]._remoteObject.value;
                isResultExpecting(logResult[i], result);
            }
        })
        await browser.close();
    })();
} catch (error) {

}