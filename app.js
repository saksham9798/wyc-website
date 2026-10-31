// Add one or more direct image URLs to each product's images array.
const PRODUCTS = [
  { id: 1, name: 'Black polo', price: 499, compareAtPrice: 749, category: 'tee', images: ['https://rukminim2.flixcart.com/image/1420/1420/xif0q/t-shirt/m/s/a/m-et-ss-zephyr-black-blackberrys-original-imahq7c7fgnhcgff.jpeg?q=90',
    'https://rukminim2.flixcart.com/image/1420/1420/xif0q/t-shirt/2/7/n/m-et-ss-zephyr-black-blackberrys-original-imahq7c7dzuzpzd9.jpeg?q=90'
  ] },
  { id: 2, name: 'Light Blue Flat Knit', price: 549, compareAtPrice: 799, category: 'tee', images: ['https://rukminim2.flixcart.com/image/1714/1714/xif0q/t-shirt/c/2/0/-original-imahqycjqxphaert.jpeg?q=90',
    'https://rukminim2.flixcart.com/image/1714/1714/xif0q/t-shirt/j/x/z/-original-imahqyckh5zne5mv.jpeg?q=90'
  ] },
  { id: 3, name: 'Solid Beige', price: 529, compareAtPrice: 699, category: 'tee', images: ['https://rukminim2.flixcart.com/image/1714/1714/xif0q/t-shirt/p/t/i/m-vskprg10005428-van-heusen-sport-original-imahrup2aftxx6fs.jpeg?q=90',
    'https://rukminim2.flixcart.com/image/1714/1714/xif0q/t-shirt/q/1/d/m-vskprg10005428-van-heusen-sport-original-imahrup2wy6c68yq.jpeg?q=90'
  ] },
  { id: 4, name: 'Regular Fit Striped Casual Shirt', price: 799, compareAtPrice: 1199, category: 'full', images: ['https://rukminim2.flixcart.com/image/1714/1714/xif0q/shirt/r/2/5/l-4sfs116-03-snitch-original-imahmygf594dmu2j.jpeg?q=90'] },
  { id: 5, name: 'Floral Print Shirt', price: 849, compareAtPrice: 1299, category: 'full', images: ['https://rukminim2.flixcart.com/image/1714/1714/xif0q/shirt/a/h/5/s-4mss4698-01-snitch-original-imahkhsyezknmh76.jpeg?q=90',
    'https://rukminim2.flixcart.com/image/1714/1714/xif0q/shirt/q/q/f/s-4mss4698-01-snitch-original-imahkhsyzpfqyygd.jpeg?q=90'
  ] },
  { id: 6, name: 'Black Shirt', price: 799, compareAtPrice: 1199, category: 'full', images: ['https://rukminim2.flixcart.com/image/1714/1714/xif0q/shirt/z/f/6/m-4sfs0081-04-snitch-original-imahrx2fpv6ghhq3.jpeg?q=90',
    'https://rukminim2.flixcart.com/image/1714/1714/xif0q/shirt/2/v/m/m-4sfs0081-04-snitch-original-imahrx2fhdwwgxsx.jpeg?q=90'
  ] },
  { id: 7, name: 'Classic Blue Jeans', price: 1299, compareAtPrice: 1799, category: 'jeans', sizes: ['28', '30', '32', '34', '36'], images: ['https://rukminim2.flixcart.com/image/1714/1714/xif0q/jean/5/m/v/36-dnm-bonsy-mb-onl-the-bear-house-original-imahqkbhcxaektzz.jpeg?q=90',
    'https://rukminim2.flixcart.com/image/1714/1714/xif0q/jean/x/q/u/36-dnm-bonsy-mb-onl-the-bear-house-original-imahqkbhcryyyhqy.jpeg?q=90'
  ] },
  { id: 8, name: 'Black Straight Jeans', price: 1399, compareAtPrice: 1899, category: 'jeans', sizes: ['28', '30', '32', '34', '36'], images: ['https://rukminim2.flixcart.com/image/1714/1714/xif0q/jean/v/h/w/-original-imahr68xy9hcgkph.jpeg?q=90',
    'https://rukminim2.flixcart.com/image/1714/1714/xif0q/jean/n/k/b/-original-imahr68xzcqqwuqa.jpeg?q=90'
  ] }
];

const SIZES = ['S', 'M', 'L', 'XL'];
const JEANS_SIZES = ['28', '30', '32', '34', '36'];
const $ = id => document.getElementById(id);
const formatPrice = price => `₹${Number(price).toLocaleString('en-IN')}`;

function getDiscountPercent(product) {
  if (!product.compareAtPrice || product.compareAtPrice <= product.price) return 0;
  return Math.round((1 - product.price / product.compareAtPrice) * 100);
}

function createImagePreview(imageUrl, altText, className) {
  const preview = document.createElement('div');
  preview.className = className;

  function showPlaceholder() {
    const message = document.createElement('p');
    message.className = 'image-placeholder';
    message.textContent = 'No image available';
    preview.replaceChildren(message);
  }

  const url = (imageUrl || '').trim();
  if (!url) {
    showPlaceholder();
    return preview;
  }

  const image = document.createElement('img');
  image.src = url;
  image.alt = altText;
  image.loading = 'lazy';
  image.addEventListener('error', showPlaceholder, { once: true });
  preview.append(image);
  return preview;
}

function createProductGallery(product) {
  const imageUrls = (product.images || [])
    .map(url => (url || '').trim())
    .filter(Boolean);
  let currentImage = 0;

  const gallery = document.createElement('div');
  gallery.className = 'product-gallery';
  let preview = createImagePreview(
    imageUrls[currentImage],
    `${product.name}, image 1`,
    'image-preview card-image'
  );
  gallery.append(preview);

  if (imageUrls.length > 1) {
    const controls = document.createElement('div');
    controls.className = 'gallery-controls';

    const previous = document.createElement('button');
    previous.className = 'gallery-arrow';
    previous.type = 'button';
    previous.textContent = '‹';
    previous.setAttribute('aria-label', `Previous ${product.name} image`);

    const count = document.createElement('span');
    count.className = 'gallery-count';

    const next = document.createElement('button');
    next.className = 'gallery-arrow';
    next.type = 'button';
    next.textContent = '›';
    next.setAttribute('aria-label', `Next ${product.name} image`);

    function showImage(index) {
      currentImage = (index + imageUrls.length) % imageUrls.length;
      const updatedPreview = createImagePreview(
        imageUrls[currentImage],
        `${product.name}, image ${currentImage + 1}`,
        'image-preview card-image'
      );
      preview.replaceWith(updatedPreview);
      preview = updatedPreview;
      count.textContent = `${currentImage + 1} / ${imageUrls.length}`;
    }

    previous.addEventListener('click', () => showImage(currentImage - 1));
    next.addEventListener('click', () => showImage(currentImage + 1));
    controls.append(previous, count, next);
    gallery.append(controls);
    count.textContent = `1 / ${imageUrls.length}`;
  }

  return gallery;
}

// ---------- Shop ----------
function renderGrid(filter = 'all') {
  const products = PRODUCTS.filter(product =>
    filter === 'all' || product.category === filter
  );
  $('visibleCount').textContent = products.length;

  const cards = products.map(product => {
    const card = document.createElement('article');
    card.className = 'pcard';
    card.append(createProductGallery(product));

    const discount = getDiscountPercent(product);
    if (discount) {
      const badge = document.createElement('span');
      badge.className = 'sale-badge';
      badge.textContent = `-${discount}%`;
      card.querySelector('.product-gallery').append(badge);
    }

    const name = document.createElement('h3');
    name.textContent = product.name;
    const price = document.createElement('div');
    price.className = 'product-price';
    const currentPrice = document.createElement('strong');
    currentPrice.textContent = formatPrice(product.price);
    price.append(currentPrice);
    if (discount) {
      const oldPrice = document.createElement('del');
      oldPrice.textContent = formatPrice(product.compareAtPrice);
      price.append(oldPrice);
    }

    const sizeLabel = document.createElement('label');
    sizeLabel.className = 'size-label';
    sizeLabel.textContent = 'Size';

    const sizeSelect = document.createElement('select');
    sizeSelect.className = 'product-size';
    sizeSelect.setAttribute('aria-label', `${product.name} size`);
    const sizes = product.sizes || SIZES;
    const defaultSize = sizes.includes('M') ? 'M' : '30';
    sizeSelect.innerHTML = sizes.map((size, index) =>
      `<option value="${size}"${size === defaultSize ? ' selected' : ''}>${size}</option>`
    ).join('');

    const addButton = document.createElement('button');
    addButton.className = 'btn full';
    addButton.type = 'button';
    addButton.textContent = 'Add to cart';
    addButton.addEventListener('click', () => {
      addToCart(product, sizeSelect.value);
    });

    card.append(name, price, sizeLabel, sizeSelect, addButton);
    return card;
  });

  $('grid').replaceChildren(...cards);
}

document.querySelectorAll('[data-f]').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-f]').forEach(filterButton => {
      const selected = filterButton === button;
      filterButton.classList.toggle('on', selected);
      filterButton.setAttribute('aria-pressed', String(selected));
    });
    renderGrid(button.dataset.f);
  });
});

// ---------- Cart ----------
let cart = store.get('wyc_cart') || [];
if (!Array.isArray(cart)) cart = [];
let cartOpenTimer = null;
let cartCloseTimer = null;

function saveCart() {
  store.set('wyc_cart', cart);
  renderCart();
}

function addToCart(product, size) {
  cart.push({
    id: product.id,
    name: product.name,
    size,
    price: product.price,
    compareAtPrice: product.compareAtPrice || product.price
  });
  saveCart();
  openCart();
}

function renderCart() {
  $('cartCount').textContent = cart.length;
  $('cartCountTitle').textContent = cart.length;
  const subtotal = cart.reduce((total, item) => total + Number(item.compareAtPrice || item.price || 0), 0);
  const total = cart.reduce((sum, item) => sum + Number(item.price || 0), 0);
  $('subtotal').textContent = formatPrice(subtotal);
  $('savings').textContent = `−${formatPrice(subtotal - total)}`;
  $('total').textContent = formatPrice(total);

  $('cartItems').innerHTML = cart.length
    ? cart.map((item, index) => {
      const compareAtPrice = Number(item.compareAtPrice || item.price || 0);
      return `<div class="ci"><div><b>${escapeHTML(item.name)}</b><span>Size ${escapeHTML(item.size)}</span></div><div class="cart-line-price"><strong>${formatPrice(item.price)}</strong>${compareAtPrice > item.price ? `<del>${formatPrice(compareAtPrice)}</del>` : ''}</div><button type="button" data-n="${index}">Remove</button></div>`;
    }).join('')
    : '<div class="empty-bag"><span aria-hidden="true">✳</span><p>Your bag is taking a breather.</p><small>Find something you’ll reach for again.</small></div>';

  $('checkout').disabled = !cart.length;
  if (!cart.length) hideCheckoutForm();
}

function escapeHTML(value) {
  return String(value ?? '').replace(/[&<>"']/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[character]));
}

$('cartItems').addEventListener('click', event => {
  if (event.target.dataset.n === undefined) return;

  cart.splice(Number(event.target.dataset.n), 1);
  saveCart();
});

function openCart() {
  clearTimeout(cartOpenTimer);
  clearTimeout(cartCloseTimer);
  $('cart').classList.remove('is-closing');
  $('drawerBackdrop').classList.remove('is-closing');
  $('cart').classList.add('is-opening');
  $('drawerBackdrop').classList.add('is-opening');
  $('cart').hidden = false;
  $('drawerBackdrop').hidden = false;
  document.body.classList.add('dialog-open');
  cartOpenTimer = setTimeout(() => {
    $('cart').classList.remove('is-opening');
    $('drawerBackdrop').classList.remove('is-opening');
  }, 20);
  $('closeCart').focus();
}

function closeCart() {
  if ($('cart').hidden) return;
  clearTimeout(cartOpenTimer);
  $('cart').classList.remove('is-opening');
  $('drawerBackdrop').classList.remove('is-opening');
  $('cart').classList.add('is-closing');
  $('drawerBackdrop').classList.add('is-closing');
  clearTimeout(cartCloseTimer);
  cartCloseTimer = setTimeout(() => {
    $('cart').hidden = true;
    $('drawerBackdrop').hidden = true;
    $('cart').classList.remove('is-closing');
    $('drawerBackdrop').classList.remove('is-closing');
    document.body.classList.remove('dialog-open');
    $('cartBtn').focus();
  }, 300);
}

function hideCheckoutForm() {
  $('checkoutForm').hidden = true;
  $('checkout').hidden = false;
}

$('cartBtn').addEventListener('click', openCart);
$('closeCart').addEventListener('click', closeCart);
$('cart').addEventListener('click', event => {
  if (event.target === $('cart')) closeCart();
});
$('drawerBackdrop').addEventListener('click', closeCart);

$('checkout').addEventListener('click', () => {
  if (!cart.length) return;
  if (!currentUser()) {
    location.href = 'login.html?next=index.html';
    return;
  }

  $('checkout').hidden = true;
  $('checkoutForm').hidden = false;
  const user = currentUser();
  if (!$('customerName').value) $('customerName').value = user.name || '';
  if (!$('customerEmail').value) $('customerEmail').value = user.email || '';
  $('customerName').focus();
});

$('checkoutForm').addEventListener('submit', event => {
  event.preventDefault();
  if (!cart.length || !currentUser()) return;

  const customerName = $('customerName').value.trim();
  const orderTotal = $('total').textContent;
  const orderSavings = $('savings').textContent;
  alert(`Thanks ${customerName}! Your order of ${orderTotal} is placed successfully. You saved ${orderSavings.replace('−', '')}.`);
  cart = [];
  saveCart();
  $('checkoutForm').reset();
  closeCart();
});

$('checkoutForm').addEventListener('reset', hideCheckoutForm);

document.addEventListener('keydown', event => {
  if ($('cart').hidden) return;

  if (event.key === 'Escape') {
    event.preventDefault();
    closeCart();
    return;
  }

  if (event.key !== 'Tab') return;

  const focusable = [...$('cart').querySelectorAll(
    'button:not([disabled]):not([hidden]),a[href],input:not([disabled]),textarea:not([disabled]),select:not([disabled])'
  )].filter(element => !element.closest('[hidden]'));
  if (!focusable.length) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

renderGrid();
renderCart();
