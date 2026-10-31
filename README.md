# WYC — Wear Your Choice

A responsive clothing storefront built with HTML, CSS, and vanilla JavaScript. Browse T-shirts, shirts, and jeans; compare offer prices; choose a size; add products to the cart; and enter contact and delivery details in the demo checkout.

## Run the website

No build tools or package installation are needed.

1. Download or clone this repository.
2. Open `index.html` in a browser.

For local development, you can also open the folder in Visual Studio Code and use an extension such as Live Server.

## Add or update product images

Product data is in the `PRODUCTS` array near the top of `app.js`. Each product has an `images` array. Put one or more **direct image URLs** inside it:

```js
{
  id: 1,
  name: 'Black polo',
  price: 499,
  category: 'tee',
  images: [
    'https://example.com/black-polo-front.jpg',
    'https://example.com/black-polo-back.jpg'
  ]
}
```

Use the direct image address, not a product-page URL, and do not add a `src:` prefix. The gallery arrows appear when a product has more than one image. If an image URL is empty or cannot load, the page displays a placeholder.

Each product uses:

- `id`: unique product number
- `name`: product name
- `price`: price in rupees
- `category`: `tee`, `full`, or `jeans`
- `images`: array of direct image URLs
- `sizes`: optional size list; jeans use waist sizes, while other products default to S, M, L, and XL

## Features

- Product filters for all products, T-shirts, full-sleeve shirts, and jeans
- Multiple images per product
- Product size selection
- Sale prices, offer badges, and savings shown in the cart
- Shopping cart with item removal, subtotal, savings, and total
- Demo login/signup and checkout fields for name, phone, email, and delivery address
- Responsive layout, animated product cards, and smooth drawer transitions

## Project files

- `index.html` — storefront, filters, cart, and checkout form
- `login.html` — demo login and account-creation page
- `style.css` — shared layout and visual styles
- `app.js` — product data, image galleries, filters, cart, and checkout behavior
- `auth.js` — demo authentication behavior
- `README.md` — setup and project notes

## Demo limitations

This is a front-end demonstration. Cart items, accounts, and sessions are stored in the browser's local storage. Checkout displays a confirmation but does not send contact or delivery details to a server, accept payment, or arrange shipping. The offer/compare-at prices are sample storefront data and should be checked and updated before publishing. Do not use real passwords.
