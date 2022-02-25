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
    doubleClick,
    highlight,
    tableCell,
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
    expect(await popup).to.be.equal(true);

    await focus($(`//*[@id="checkout-related-products-popup"]/div/div/div[2]/div/div[1]/div[1]/div`));
    let productList = await $(`//*[@id="checkout-related-products-popup"]/div/div/div[2]/div/div[1]/div[1]/div`).isVisible();
    expect(await productList).to.be.equal(true);

    await radioButton('+1 év garancia (7 295 Ft)').select();

    await click(button('TOVÁBB'));

    await focus($(`//*[@id="app"]/aside`));
    let sidebar = await $(`//*[@id="app"]/aside`).isVisible();
    expect(await sidebar).to.be.equal(true);
});

step("Click on extra guarantee button", async function() {
    await radioButton('+1 év garancia (7 295 Ft)').select();
});

step("Click on the manufacturers page", async function() {
    await focus($(`//*[@id="app"]/div[1]/main/section[2]/div/div/div/div[3]/div[1]/div[1]/div[4]/a`));
    await click('Gyártó termékoldala');
});

step("Check on the extra guarantee price", async function() {
    await focus($('a[href*=reszletek]'));
    await focus($(`//*[@id="app"]/div[1]/main/section[2]/div/div/div/div[3]/div[1]/div[2]/div/div[2]/div`));
    expect(await $(`//*[@id="app"]/div[1]/main/section[2]/div/div/div/div[3]/div[1]/div[2]/div/div[2]/div`).isVisible()).to.be.equal(true);
	
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
    await click($(`//*[@id="app"]/div[1]/main/div[3]/div/div/div[1]/div`));
});

step("There is the toast message with the right elements", async function() {
	await focus($(`//*[@id="app"]/aside`));
    let visible = await ($(`//*[@id="app"]/aside`)).isVisible();
    expect(await visible).to.be.equal(true);

    await focus($('.basket-card__content'));
    visible = await $('.basket-card__content').isVisible();
    expect(await visible).to.be.equal(true);

    await focus($('.basket-card__gift__body'));
    visible = await $('.basket-card__gift__body').isVisible();
    expect(await visible).to.be.equal(true);

    await focus($('.basket__total-gross-price'));
    visible = await $('.basket__total-gross-price').isVisible();
    expect(await visible).to.be.equal(true);

    await focus($(`//*[@id="app"]/aside/div/div/div/div[4]/div/div`));
    visible = await $(`//*[@id="app"]/aside/div/div/div/div[4]/div/div`).isVisible();
    expect(await visible).to.be.equal(true);

    await click(link('MEGVESZEM'));

    await focus($('#checkout-login-popup'));
    visible = await $('#checkout-login-popup').isVisible();
    expect(await visible).to.be.equal(true);
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
});

step("Click on the silver colored button", async function() {
	await focus($(`//*[@id="app"]/div[1]/main/section[2]/div/div/div/div[3]/div[1]/div[1]/div[1]/div/div[2]/a`));
    await click($(`//*[@id="app"]/div[1]/main/section[2]/div/div/div/div[3]/div[1]/div[1]/div[1]/div/div[2]/a`));
});

step("Click on the main picture of the product", async function() {
	await focus($(`//*[@id="app"]/div[1]/main/section[2]/div/div/div/div[3]/div[1]/div[1]/div[3]/div/div/div/a/img`));
    await click($(`//*[@id="app"]/div[1]/main/section[2]/div/div/div/div[3]/div[1]/div[1]/div[3]/div/div/div/a/img`));
});

step("Check on the main picture", async function() {
	await focus($(`//*[@id="app"]/div[1]/main/section[2]/div/div/div/div[2]`));
    let picture = await $(`//*[@id="app"]/div[1]/main/section[2]/div/div/div/div[2]`).isVisible();
    expect(await picture).to.be.equal(true);
});

step("Click on csatlakozz most hyperlink", async function() {
	await focus($(`//*[@id="app"]/div[1]/main/section[2]/div/div/div/div[3]/div[1]/div[2]/div/div[2]/a`));
    await click('csatlakozz most');
});

step("Check on the subsrciption pop-up", async function() {
	await focus ($('#subscription-popup'));
    let popup = await $('#subscription-popup').isVisible();
    expect(await popup).to.be.equal(true);

});

step("Click on subscription button", async function() {
	await focus($(`a[href*='/profil/elofizetes']`));
    await click($(`a[href*='/profil/elofizetes']`));
});

step("Check on some input fileds", async function() {
	await focus($('#subscription_lastname'));
    let isVisible = await $('#subscription_lastname').isVisible();
    expect(await isVisible).to.be.equal(true);

    await focus($('#subscription_firstname'));
    isVisible = await $('#subscription_firstname').isVisible();
    expect(await isVisible).to.be.equal(true);

    await focus($('#subscription_email'));
    isVisible = await $('#subscription_email').isVisible();
    expect(await isVisible).to.be.equal(true);

    await focus($('#subscription_address'));
    isVisible = await $('#subscription_address').isVisible();
    expect(await isVisible).to.be.equal(true);

    await focus(button('ELŐFIZETÉS'));
    isVisible = await button('ELŐFIZETÉS').isVisible();
    expect(await isVisible).to.be.equal(true);
});

step("Scroll down to some extent", async function() {
	await focus($(`//*[@id="app"]/div[1]/main/section[2]/div/div/div/div[3]/div[1]/div[2]/div/div[2]/a`));
});

step("Check on the toast message elements", async function() {
	await focus($('.product-sticky__title-body-wrapper'));
    let isVisible = await $('.product-sticky__title-body-wrapper').isVisible();
    expect(await isVisible).to.be.equal(true);

    await focus($('.product-sticky__price-wrapper'));
    isVisible = await $('.product-sticky__price-wrapper').isVisible();
    expect(await isVisible).to.be.equal(true);

    await focus($(`//*[@id="app"]/div[1]/main/div[1]/div/div/div[3]`));
    isVisible = await $(`//*[@id="app"]/div[1]/main/div[1]/div/div/div[3]`).isVisible();
    expect(await isVisible).to.be.equal(true);

    await focus($('.product-sticky__button-wrapper'));
    isVisible = await $('.product-sticky__button-wrapper').isVisible();
    expect(await isVisible).to.be.equal(true);
});

step("Resize window", async function() {
	await resizeWindow({width: 1300, height: 700});
});

step("Click on vissza a tetejere", async function() {
	await focus(link('vissza a tetejére'));
    await click(link('vissza a tetejére'));
});

step("Check the page is on top", async function() {
	await focus($('.page-top-nav'));
    let topNav = await $('.page-top-nav').isVisible();
    expect(await topNav).to.be.equal(true);
});

step("Click on Arfigyelo tab", async function() {
	await focus(link('Árfigyelő'));
    await click(link('Árfigyelő'));
});

step("Check on Arfigyelo topic", async function() {
	await focus($('#arfigyelo'));
    let isVisible = await $('#arfigyelo').isVisible();
    expect(await isVisible).to.be.equal(true);
});

step("Scroll down to Reszletes leiras", async function() {
    await focus(button('Kérdezek'));
	await focus($(`//*[@id="app"]/div[1]/main/section[8]`));
});

step("Check if the Reszletek tab is highlighted", async function() {
	await focus(listItem({class: 'product-sticky__nav__item is-active is-active-gumshoe'}));
    let reszletek = await listItem({class: 'product-sticky__nav__item is-active is-active-gumshoe'}).text();
    expect(await reszletek).to.be.equal('Részletek');
});

step("Delete the default value and write <input> in the count textbox", async function(input) {
	await focus($(`//*[@id="app"]/div[1]/main/div[1]/div/div/div[3]`));
    await click($(`//*[@id="app"]/div[1]/main/div[1]/div/div/div[3]`));
    await press('Backspace');
    await write(input);

});

step("Check on the error message", async function() {
	await focus($('#toast-container'));
    let isVisible = ($('#toast-container')).isVisible();
    expect(await isVisible).to.be.equal(true);
});

step("Click on the basket button in the toast message", async function() {
	await focus($('.product-sticky__button-wrapper'));
    await click($('.product-sticky__button-wrapper'));
});

step("Write <price> in the price notification textbox", async function(price) {
	await focus($('.product-pricegraph__notification__input'));
    await doubleClick($('.product-pricegraph__notification__input'));
    await press('Delete');
    await doubleClick($('.product-pricegraph__notification__input'));
    await press('Delete');
    await write(price);
});

step("Check on the price watcher pop-up", async function() {
    await focus($('#price-watcher-popup'));
	let visible = await $('#price-watcher-popup').isVisible();
    expect(await visible).to.be.equal(true);

    await focus($('#price_watcher_email'));
    visible = await $('#price_watcher_email').isVisible();
    expect(await visible).to.be.equal(true);

    await focus($('#price_watcher_price'));
    visible = await $('#price_watcher_price').isVisible();
    expect(await visible).to.be.equal(true);

    await focus(button({class:'product-pricegraph__notification__button button button--primary button--text--default button--cta'}));
    visible = await button({class:'product-pricegraph__notification__button button button--primary button--text--default button--cta'}).isVisible();
    expect(await visible).to.be.equal(true);
});

step("Click on ertesitest kerek button", async function() {
	await focus(button('Értesítést kérek'));
    await click(button('Értesítést kérek'));
});

step("Click on Teljes specifikacio button", async function() {
	await focus($(`//*[@id="specifikacio"]/div/div[2]/div[2]`));
    await click($('//*[@id="specifikacio"]/div/div[2]/div[2]'));
});

step("Check on the last element in the specification", async function() {
    await focus(link('Hibás adat?'));
    await focus($(`//*[@id="specifikacio"]/div/div[2]`));
    let text = await tableCell({row:18, col:1}).text();
    expect(await text).to.be.equal('Súly');
});

step("Click on Mutass kevesebbet button", async function() {
	await focus($(`//*[@id="specifikacio"]/div/div[2]/div[2]`));
    await click($('//*[@id="specifikacio"]/div/div[2]/div[2]'));
});

step("Scroll up", async function() {
	await focus(link('Hibás adat?'));
});

step("Click on Vissza az oldal tetejere button at the bottom of the page", async function() {
	await focus($(`//*[@id="app"]/div[1]/footer/div[1]/a`));
    await focus($(`//*[@id="app"]/div[1]/main/section[9]/div/div/div/div[5]/div[1]/div/div/button`));
    await click($(`//*[@id="app"]/div[1]/footer/div[1]/a`));
});

step("Check on the second picture", async function() {
	await focus($('#slick-slide51'));
    await click($('#slick-slide51'));
    await focus(listItem({id:'splide01-slide02'}));
    let visible = listItem({id:'splide01-slide02'}).isVisible();
    expect(await visible).to.be.equal(true);
    press('Escape');
});

step("Click on the fifth picture button", async function() {
	await focus($('#slick-slide-control54')); 
    await click($('#slick-slide-control54'));
});

step("Check on the fifth picture", async function() {
	await focus($('#slick-slide54'));
    await click($('#slick-slide54'));
    await focus(listItem({id:'splide01-slide04'}));
    let visible = listItem({id:'splide01-slide04'}).isVisible();
    expect(await visible).to.be.equal(true);
});