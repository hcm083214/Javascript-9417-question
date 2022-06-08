const puppeteer = require("puppeteer");
const data = [{ id: 1, content: '明日方舟' }, { id: 2, content: '明朝' }, { id: 3, content: '明天会更好' }, { id: 4, content: '明星' }, { id: 4, content: 'm' }, { id: 5, content: 'mi' }, { id: 6, content: 'min' }, , { id: 6, content: 'ming' }]
try {
    (async () => {
        let searchText = 'm';
        const searchList = data.filter(item => item.content.indexOf(searchText) !== -1)
        const browser = await puppeteer.launch({
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
        });
        //本地测试
        // const browser = await puppeteer.launch({
        //     headless: false
        // });
        const page = await browser.newPage();
        await page.setViewport({ width: 1200, height: 750 });


        await page.goto("http://127.0.0.1:8080/test1", {
            waitUntil: "networkidle0", //不在有网络连接时候触发
        });

        //本地测试
        // await page.goto("http://127.0.0.1:5500/test1/", {
        //     waitUntil: "networkidle0", //不在有网络连接时候触发
        // });

        await page.type("#input-search", searchText);


        const searchListResult = await page.$eval(".search-list", (el) => {
            let result;
            if (el.children.length !== 0) {
                result = Array.from(el.children).map(item => item.innerText);
            } else {
                result = [];
            }
            return result;
        });

        if (searchList.length !== searchListResult.length) {
            console.log('fail')
            process.exit(1);
        } else {
            console.log("检测通过");
        }
        //关闭puppeteer
        await browser.close();
    })();
} catch (error) {
    console.log("🚀 ~ file: test1.js ~ line 21 ~ error", error);
    process.exit(1);
}



