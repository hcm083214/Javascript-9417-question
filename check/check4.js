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

        // await page.goto("http://127.0.0.1:8080/test4", {
        //     waitUntil: "networkidle0", //不在有网络连接时候触发
        // });

        // 本地测试
        await page.goto("http://127.0.0.1:5500/test4/", {
            waitUntil: "networkidle0", //不在有网络连接时候触发
        });
        const { left: btnLeft, top: btnTop } = await page.$eval('.btn', (el) => {
            const { left, top } = el.getBoundingClientRect();
            return { left, top }
        });
        await page.mouse.click(btnLeft + 5, btnTop + 5);
        // await page.mouse.click(50, 20);
        // 判断是否有弹窗：弹窗是否加入到页面中
        const isAdd = await page.$('.modal');
        if (isAdd) {
            console.log('弹窗已加入到页面中')
        } else {
            console.log('测试不通过');
            process.exit(1);
        }
        const { left, top, height, width } = await page.$eval('#confirm', el => {
            const { left, top, height, width } = el.getBoundingClientRect()
            return { left, top, height, width, lens: el.length };
        });
        let value = '芝麻开门';
        await page.type('.message-body input', value);
        await page.mouse.click(Math.floor(left + width / 2), Math.floor(top + height / 2));
        let result = await page.$eval('.msg', el => el.innerText);
        if (result === '密码正确') {
            console.log('结果正确')
        } else {
            console.log('未得到输入的信息');
            process.exit(1);
        }
        await browser.close();
    })();
} catch (error) {
    console.log(error)
}
