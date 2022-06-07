Feature('search');

Scenario('Yama is opening correctly', ({ I }) => {
    I.amOnPage('http://localhost:3000');
    I.see('YAMA');
});

Scenario('User can do a search', ({ I }) => {
    I.amOnPage('http://localhost:3000');
    I.fillField('.ais-SearchBox-input', "Water");
    I.pressKey('Enter');
    I.see("Waterworld")
});