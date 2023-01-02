import Page from '../../templates/page';
import Header from '../header/index';
import Cart from '../cart/index';
import ProductDetails from '../product-details/index';
import MainPage from '../main/index';

import ErrorPage, { ErrorTypes } from '../error/index';

export const enum PageIds {
    MainPage = 'main-page',
    ProductDetails = 'product-details',
    Cart = 'cart',
}

class App {
    private static container: HTMLElement = document.body;
    private static defaultPageId = 'current-page';
    private header: Header;

    static renderNewPage(idPage: string) {
        const currentPageHTML = document.querySelector(`#${App.defaultPageId}`);
        if (currentPageHTML) {
            currentPageHTML.remove();
        }
        let page: Page | null = null;

        if (idPage === PageIds.MainPage) {
            page = new MainPage(idPage);
        } else if (idPage.split('/')[0] === PageIds.ProductDetails) {
            page = new ProductDetails(idPage);
        } else if (idPage === PageIds.Cart) {
            page = new Cart(idPage);
        } else {
            page = new ErrorPage(idPage, ErrorTypes.Error_404);
        }

        if (page) {
            const pageHTML = page.render();
            pageHTML.id = App.defaultPageId;
            App.container.append(pageHTML);
        }
    }

    private enableRouteChange() {
        window.addEventListener('hashchange', () => {
            if (window.location.hash.slice(1).split('?')[0] !== 'main-page') {
                // if (
                //     window.location.hash.slice(1) === `${PageIds.ProductDetails}` &&
                //     window.location.hash.length === PageIds.ProductDetails.length
                // ) {
                //     const hash = `${PageIds.ProductDetails}`;
                //     console.log('2');
                //     App.renderNewPage(hash);
                // }
                const hash = window.location.hash.slice(1).split('?')[0];
                console.log('1');
                App.renderNewPage(hash);
            }
            if (window.location.hash.slice(1) === 'main-page' && window.location.hash.length === 10) {
                const hash = 'main-page';
                console.log('2');
                App.renderNewPage(hash);
            }
            console.log(window.location.hash);

            // let hash: string = '';

            // if (window.location.hash.slice(1).split('?')[0] !== 'main-page') {
            //     hash = window.location.hash.slice(1).split('?')[0];
            //     if (window.location.hash.slice(1).split('/')[0] === `${PageIds.ProductDetails}`) {
            //         console.log('asd');
            //         hash = window.location.hash.slice(1).split('/')[0];
            //         console.log(hash);
            //     }
            // }
            // if (window.location.hash.slice(1) === 'main-page' && window.location.hash.length === 10) {
            //     hash = 'main-page';
            // }
            // console.log(hash);
            // App.renderNewPage(hash);
        });
    }

    constructor() {
        this.header = new Header('header', 'header');
    }

    run() {
        App.container.append(this.header.render());
        App.renderNewPage('main-page');
        this.enableRouteChange();
    }
}

export default App;
