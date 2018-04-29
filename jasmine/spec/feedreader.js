/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /*
    * Houveram problemas de timeout durante os testes, então aumentei o padrão do jasmine
    * Error: Timeout - Async callback was not invoked within timeout specified by jasmine.DEFAULT_TIMEOUT_INTERVAL.
    */
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('possui URL preenchida', function() {
            allFeeds.forEach(function(currentFeed){
                let url = currentFeed.url;
                expect(url).toBeDefined();
                expect(url.length).not.toBe(0);
            });
        });

        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('possui nome preenchido', function(){
            allFeeds.forEach(function(currentFeed){
                let name  = currentFeed.name;
                expect(name).toBeDefined();
                expect(name.length).not.toBe(0);
            });

         });
    });

    /* Write a new test suite named "The menu" */
     describe('O menu', function(){

       /* Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('menu está oculto por padrão', function() {
            let body = $('body');
            expect(body.hasClass('menu-hidden')).toBe(true);
        });

        /* Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('menu altera visibilidade quando clicado no item de menu', function(){
            let menuIconLink = $('.menu-icon-link');
            let body = $('body');
            menuIconLink.trigger('click');
            expect(body.hasClass('menu-hidden')).toBe(false);
            menuIconLink.trigger('click');
            expect(body.hasClass('menu-hidden')).toBe(true);
        });
    });

    /*Write a new test suite named "Initial Entries" */
    describe('Entradas iniciais', function() {

       /* Write a test that ensures when t jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;he loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('apos loadFeed deve existir ao menos um elemento .entry no contêiner .feed ', function() {
            let feed = $('.feed');
            let entry = $('.entry');
            expect(feed.length).not.toBe(0);
            expect(entry.length).toBeGreaterThan(0);
        });

    });

    /* Write a new test suite named "New Feed Selection" */
    describe('Nova seleção de feed', function() {

        /* Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
         let oldFeedContent;
         beforeEach(function(done) {
            $('.feed').empty();
            loadFeed(0, function(){
                oldFeedContent = $('.feed').html();
                loadFeed(1, done);
            });

         });

        it('garante que quando um novo feed for carregado pela função loadFeed o conteúdo é alterado ', function() {
            let newFeedContent = $('.feed').html();
            expect(oldFeedContent).not.toBe(newFeedContent);
        });

     });

}());
