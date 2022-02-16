/* globals gauge*/
"use strict";
const path = require('path');
const {
    $,
    openBrowser,
    write,
    closeBrowser,
    goto,
    press,
    screenshot,
    above,
    click,
    checkBox,
    listItem,
    toLeftOf,
    toRightOf,
    link,
    text,
    into,
    textBox,
    evaluate,
    hover,
    resizeWindow,
    goBack,
    scrollDown,
    currentURL,
    button,
    radioButton,
    scrollUp,
    below,
    focus,
    waitFor,
} = require('taiko');
const assert = require("assert");
const headless = process.env.headless_chrome.toLowerCase() === 'true';
const { Console } = require('console');
const expect = require("chai").expect;
beforeSuite(async () => {
    await openBrowser({
        headless: headless
    })
    await goto('https://ipon.hu/shop/termek/samsung-t220-galaxy-tab-a7-lite-87-32gb-wifi-szurke/1925626');
});


afterSuite(async () => {
    await closeBrowser();
});

// Return a screenshot file name
gauge.customScreenshotWriter = async function () {
    const screenshotFilePath = path.join(process.env['gauge_screenshots_dir'],
        `screenshot-${process.hrtime.bigint()}.png`);

    await screenshot({
        path: screenshotFilePath
    });
    return path.basename(screenshotFilePath);
};

step("Add task <item>", async (item) => {
    await write(item, into(textBox("What needs to be done?")));
    await press('Enter');
});

step("View <type> tasks", async function (type) {
    await click(link(type));
});

step("Complete tasks <table>", async function (table) {
    for (var row of table.rows) {
        await click(checkBox(toLeftOf(row.cells[0])));
    }
});

step("Clear all tasks", async function () {
    await evaluate(() => localStorage.clear());
});

step("Open todo application", async function () {
    await goto("todo.taiko.dev");
});

step("Must not have <table>", async function (table) {
    for (var row of table.rows) {
        assert.ok(!await text(row.cells[0]).exists(0, 0));
    }
});

step("Must display <message>", async function (message) {
    assert.ok(await text(message).exists(0, 0));
});

step("Add tasks <table>", async function (table) {
    for (var row of table.rows) {
        await write(row.cells[0]);
        await press('Enter');
    }
});

step("Must have <table>", async function (table) {
    for (var row of table.rows) {
        assert.ok(await text(row.cells[0]).exists());
    }
});

(step("Login as user", async function() {
    throw 'Nem implementált lépés';
    }));

(step("Navigate to project page", async function() {
    throw 'Unimplemented Step';
    }));


(step("Open <gauge.org> with headless mode <isheadless>", {continueOnFailure: true}, async function(page, isheadless) {
    var headlessParam = isheadless.toLowerCase() === 'true';
    await openBrowser({headless: headlessParam});
   // await resizeWindow({width: 700, height: 600});
    await goto(page);
    var currentUrl = await currentURL();
    expect(currentUrl).to.contain(page);
    }));

(step("Click on Documentaion button", async function() {
    await click("Documentation");
    }));

(step("Click on Search input", async function() {
    await click($(`#search`));
    }));

(step("Click on error button", async function() {
    /*try {
         await click($(`#error`));
    } catch(e) {
        console.log("Az error gomb nem található");
    }
    */
    }));

step("Hover on Blog button", async function() {
	await hover($(`.link_examples`));
});

step("Write <searchParam> in the search field", async function(searchParam) {
	await write(searchParam, $(`#search`));
});

step("Press Enter", async function() {
	await press('Enter');
});

step("Find Plugins nav item", async function() {
    var pluginsListItem = await listItem('Plugins');
    console.log(await pluginsListItem.attribute('class'));
    if (pluginsListItem.isVisible == true) {
        await click(pluginsListItem);
    }
	await click($(`.link_plugins`));
});

step("Find Plugins nav item2", async function() {
    var pluginsListItem = await $(`.link_plugins`);
    console.log(await pluginsListItem.attribute('class'));
    if (pluginsListItem.isVisible == true) {
        await click(pluginsListItem);
    }
	await click($(`.link_plugins`));
});

step("Click on bejelentkezes", async function() {
    //await resizeWindow({width: 700, height: 800});
	var loginBtn = await $(`a[class='site-sub-nav__link site-sub-nav__link--has-icon']`);
    var hamburgerMenu = await $(`.hamburger-box`);
    var megjelentALogin = await loginBtn.isVisible();
    if (megjelentALogin == true) {
        await click(loginBtn);
        
    } else {
        await click(hamburgerMenu);
        await click($(`a[href='/belepes']`));
    }
    
});

step("Write login inputs with <username> username and <password> password", async function(username, password) {
	await write(username, $('#_username'));
    await write(password, $('#_password'));
});

step("Uncheck the checkbox", async function() {
	await click($(`[class="control control--checkbox form-group__checkbox"]`));
});

step("Click on the X", async function() {
	await click($('.modal__close'))
});

step("Write dell in the search field", async function() {
	await write("dell", textBox({placeholder:"Keresés..."}));
});

step("Click on the MS116 mouse page", async function() {
	await click($(`a[href*=ms116]`));
});

step("Go back", async function() {
	await goBack();
});

step("Click on the third element", async function() {
	await click($(`//*[@id="app"]/div[1]/main/div/div[3]/div[3]/div[2]/div[1]/div[3]/div/div/a`));
});

step("Click on the result from right of KB216", async function() {
	await click(link('Dell', toRightOf($(`//*[@id="app"]/div[1]/main/div/div[3]/div[3]/div[2]/div[1]/div[1]/div/div/a`))));
});

step("Scroll down", async function() {
	await scrollDown(200);
});

step("Write out category names", async function() {
    let categoryList = await link({class:'home-shop-categories__card__link'}).elements();
    expect(await categoryList[0].text()).to.equal("Gépösszerakó");
    assert.strictEqual(await categoryList[0].text(), "Gépösszerakó");
    expect(await categoryList[1].text()).to.equal("Notebook");
    expect(await categoryList[0].text() == "Gépösszerakó").to.be.ok;
    expect(categoryList).to.have.lengthOf(10);

    /*for (let category of categoryList) {
        let szoveg = await category.text();
        console.log(await link(szoveg).attribute('href'));
    }*/
});

step("Control the menu's first item", {continueOnFailure: true}, async function() {
	let categoryList = await link({class:'site-nav__link js-subnav__link'}).elements();
    expect(await categoryList[0].text()).to.equal("Shop");
    expect(await categoryList[0].text()).to.be.a("string");
});

step("Control the menu's third item", async function() {
	let categoryList = await link({class:'site-nav__link js-subnav__link'}).elements();
    expect(await categoryList[2].text()).to.equal("Fórum");
});

step("Click on the basket button", async function() {
    await focus(button({class:'shop-to-cart-button shop-to-cart-button--vlg product__to-cart-button u-hide@mobile'}));
	await click(button({class:'shop-to-cart-button shop-to-cart-button--vlg product__to-cart-button u-hide@mobile'}));
});

step("The popup is visible with the right elements", async function() {
    await focus($(`#checkout-related-products-popup`));
    let popup = await $(`#checkout-related-products-popup`).isVisible();
    expect(await popup).to.equal(true);

    await focus($(`//*[@id="checkout-related-products-popup"]/div/div/div[2]/div/div[1]/div[1]/div`));
    let productList = await $(`//*[@id="checkout-related-products-popup"]/div/div/div[2]/div/div[1]/div[1]/div`).isVisible();
    expect(await productList).to.equal(true);

    await focus($(`//*[@id="checkout-related-products-popup"]/div/div/div[2]/div/div[1]/div[2]/div/div/div[2]/div/div`));
    let radioBtn = await $({class:'control control--radio control--radio--form form-group__radio'}).isVisible();
    expect(await radioBtn).to.equal(true);

    /*await focus($(`//*[@id="checkout-related-products-popup"]/div/div/div[2]`));
    let tovabb = await button($(`//*[@id="checkout-related-products-popup"]/div/div/div[2]/div/div[2]/button`)).isVisible();
    expect(await tovabb).to.equal(true);*/
});

step("Click on extra guarantee button", async function() {
    await radioButton('+1 év garancia (7 295 Ft)').select();
});

step("Click on the manufacturers page", async function() {
    await focus($(`//*[@id="app"]/div[1]/main/section[2]/div/div/div/div[3]/div[1]/div[1]/div[4]/a`));
    await click('Gyártó termékoldala');
});

step("Check on the extra guarantee price", async function() {
    await focus($(`//*[@id="app"]/div[1]/main/section[2]/div/div/div/div[3]/div[1]/div[2]/div/div[2]/div`), waitForEvents('DOMContentLoaded'));
    expect(await $({class: 'product__guarantee-value'}).isVisible()).to.equal(true);
	
});

step("Login", async function() {
	await click($(`a[class='site-sub-nav__link site-sub-nav__link--has-icon']`));
    await write('Zerdyl', $('#_username'));
    await write('FlowAcademy', $('#_password'));
    await click($(`[class="control control--checkbox form-group__checkbox"]`));
    await click(button({class:'button button--lg button--fluid form__button js-profile__login-button'}));
});

step("Click on the favorite button", async function() {
	await click($(`a[class='action-link action-link--right action-link--toggle js-product-save-link']`));
});

step("Click on Mentett termekek", async function() {
	await click($(`a[href*='profil/kedvencek']`));
});

step("The product is there", async function() {
	await focus($(`//*[@id="app"]/div[1]/main/div[3]/div/div/div[1]/div`));
    let product = await ($(`//*[@id="app"]/div[1]/main/div[3]/div/div/div[1]/div`)).isVisible();
    expect(await product).to.be.equal(true);
});

step("There is the toast message with the right elements", async function() {
	await focus($(`//*[@id="app"]/aside`));
    let toast = await ($(`//*[@id="app"]/aside`)).isVisible();
    expect(await toast).to.be.equal(true);
});

step("Check the URL for <page>", async function(page) {
	let pageUrl = await currentURL();
    expect(await pageUrl).contain(page);
});

step("Check on the pop-up", async function() {
	await focus($('#profile-login-popup'));
    let popup = await ($('#profile-login-popup')).isVisible();
    expect(await popup).to.be.equal(true);
});

step("Click and check on tovabb hyperlink", async function() {
	await focus($('a[href*=reszletek]'));
    await click($('a[href*=reszletek]'));
    await focus($(`//*[@id="app"]/div[1]/main/section[8]/div/div/div[2]/div/div/div[1]`));
    let title = await $(`//*[@id="app"]/div[1]/main/section[8]/div/div/div[2]/div/div/div[1]/h3`).isVisible();
    expect(await title).to.be.equal(true);
});

step("Click on ertekeles", async function() {
	await focus($('a[href*=velemenyek]'));
    await click($('a[href*=velemenyek]'));
});

step("Check on the rating section", async function() {
	await focus($(`div[class='product-box__accordion__content product-reviews-header']`));
    let topic = await $(`div[class='product-box__accordion__content product-reviews-header']`).isVisible();
    expect(await topic).to.be.equal(true);
});

step("Click on the second picture button", async function() {
	await focus($('#slick-slide-control51'));
    await click($('#slick-slide-control51'));
    await focus($(`//*[@id="slick-slide51"]/a`));
    let firstPic = await $(`a[href*='media.icdn.hu/product/GalleryMod/2021-05/701724/resp/1650412_samsung_t225_galaxy_tab_a7_lite_87_32gb_lte_szurke.webp']`).isVisible();
    expect(await firstPic).to.be.equal(true);
});