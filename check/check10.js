const puppeteer = require("puppeteer");
const { hideMineArr } = require('../test10/main.js')
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
        // await page.goto("http://127.0.0.1:8080/test10", {
        //     waitUntil: "networkidle0", //不在有网络连接时候触发
        // });

        // 本地测试
        await page.goto("http://127.0.0.1:5500/test10/", {
            waitUntil: "networkidle0", //不在有网络连接时候触发
        });
        const correctResult = [
            ['', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', ''],
            ['', '', '', 2, 2, 1, 1, '', ''],
            [1, 2, '', 1, 0, 0, 1, '', ''],
            [0, 1, '', 1, 0, 0, 1, '', ''],
            [0, 1, '', 1, 0, 0, 1, 1, 1],
            [0, 1, 1, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]
        const { left, top } = await page.$eval('#sel', (el) => {
            const { left, top } = el.getBoundingClientRect();
            return { left, top }
        })

        await page.mouse.click(left + 10, top + 10);

        const result = await page.$$eval('td', tds => {
            const result = [];
            let temp = [];
            Array.from(tds).map((item, index) => {
                if (index && index % 9 == 0) {
                    result.push(temp);
                    temp = [];
                }
                temp.push(item.dataset.raw);
            })
            result.push(temp);
            return result
        })
        let i=0;
        function isResultExpecting(expect, result) {
            let isPass = false
            if (expect == result) {
                console.log(`第${++i}次符合预期`)
                isPass = true;
            } else {
                console.log('测试不通过', expect, result);
                isPass = false;
                process.exit(1);
            }
            return isPass;
        }
        for (let i = 0; i < result.length; i++) {
            let lens = result[i].length;
            for (let j = 0; j < lens; j++) {
                isResultExpecting(correctResult[i][j], result[i][j]);
            }
        }
    })();
} catch (error) {

}