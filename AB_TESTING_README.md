# 🎯 Simple A/B Testing System - Price Variants

## Overview
The Angel Oasis project includes a simple A/B testing system that randomly assigns users to one of three pricing tiers when they reach the VSL (Video Sales Letter): **$14**, **$17**, or **$24**. Each variant has its own UTM term for tracking.

## 🚀 How It Works

### Simple Random Assignment
- When a user reaches the VSL page, a random price is selected
- The price display and checkout button are updated immediately
- Each price has its own utm_term for tracking conversions

### Price Configuration
```javascript
Price $14: utm_term=price_14
Price $17: utm_term=price_17  
Price $24: utm_term=price_24
```

## ⚙️ Setup Instructions

### Update Your utm_term Values
Edit the `PRICE_VARIANTS` configuration in `index.html` (around line 820):

```javascript
const PRICE_VARIANTS = [
    {
        price: '$14',
        checkoutUrl: 'https://pay.hotmart.com/P101801752S?off=d6tzczic&utm_term=YOUR_14_TERM'
    },
    {
        price: '$17', 
        checkoutUrl: 'https://pay.hotmart.com/P101801752S?off=d6tzczic&utm_term=YOUR_17_TERM'
    },
    {
        price: '$24',
        checkoutUrl: 'https://pay.hotmart.com/P101801752S?off=d6tzczic&utm_term=YOUR_24_TERM'
    }
];
```

### Replace with your preferred utm_term values:
- `YOUR_14_TERM` - Your tracking term for $14 price
- `YOUR_17_TERM` - Your tracking term for $17 price  
- `YOUR_24_TERM` - Your tracking term for $24 price

## 📊 How to Track Results

### In Google Analytics or your tracking platform:
1. Look for the utm_term parameter in your traffic sources
2. Compare conversion rates for each utm_term:
   - `price_14` - $14 conversions
   - `price_17` - $17 conversions
   - `price_24` - $24 conversions

### Example tracking setup:
```
Campaign: Angel_Oasis_VSL
Source: organic
Medium: website
Term: price_14 | price_17 | price_24
```

## 🎯 Key Features

✅ **Simple** - No complex session storage or testing interfaces
✅ **Random** - Equal 33.33% chance for each price  
✅ **Tracked** - Each price has unique utm_term
✅ **Clean** - No console logs or debug code
✅ **Fast** - Updates price immediately when VSL loads

## 🔧 Technical Details

### When prices are assigned:
- User reaches the VSL page (offer screen)
- `updatePriceOnVSL()` function runs
- Random price is selected and applied immediately

### What gets updated:
- Price display (`.new-price` elements)
- Main checkout button (`#addToCartBtn`)
- Social proof button (`.social-proof-cta-btn`)

### No persistence:
- Each VSL visit = new random price
- No session storage or cookies
- Fresh random selection every time

## 📈 Success Metrics to Track

1. **Conversion Rate by utm_term** (most important)
2. **Revenue per utm_term**
3. **Click-through rate** from VSL to checkout
4. **Video completion rate** by price point

---

**Simple and effective!** Just update your utm_term values and start tracking which price converts best.