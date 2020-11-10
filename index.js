const puppeteer = require('puppeteer');

const openBrowser = async (user) => {
    const browser = await puppeteer.launch({
        headless: false,
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        userDataDir: './profile/' + user,
        defaultViewport: false,
    });
    const [page] = await browser.pages();
    if (page) return page;
    return browser.newPage();
};

const loginFacebook = async (page) => {
    await page.goto('https://www.facebook.com');
    const profile = await page.$('[aria-label="Akun"]');
    if (profile) return;
    await page.type('#email', '085155099696');
    await page.type('#pass', 'SehatKayaSukses$123' + '\n');
    await page.waitForSelector('[aria-label="Akun"]');
};

const addFriends = async (page, timesOneDay, delayMin, delayMax) => {
    await page.goto('https://www.facebook.com/friends');
    for (let i = 0; i < timesOneDay; i++) {
        await page.click('[aria-label="Tambah Teman"]');
        await page.waitForTimeout((Math.random() * (delayMax - delayMin) + delayMin) * 1000 * 60);
    }
}

(async () => {
    const page = await openBrowser('mabaru');
    await loginFacebook(page);
    await addFriends(page, 2, 5, 30);
})();