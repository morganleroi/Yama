Feature('search');

Scenario('Yama is opening correctly', ({ I }) => {
    I.amOnPage('https://yama.azureedge.net/');
    I.see('YAMA');
});

Scenario('User can do a search', ({ I }) => {
    I.amOnPage('https://yama.azureedge.net/');
    I.fillField('.ais-SearchBox-input', "Water");
    I.pressKey('Enter');
    I.see("Waterworld")
});

Scenario('User can create a new movie', ({ I }) => {
    I.amOnPage('https://yama.azureedge.net/');
    I.click('or add a new one!');
    I.fillField('#title', "Star Wars Episode 42");
    I.fillField('#year', "2042");
    I.click('Create a new movie');
    I.waitForElement('#success', 10);
    I.see('🙌 Hooray 🙌')
});