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