# Google Publisher Tag (GPT) - Setup Guide

This guide covers the complete setup of Google Publisher Tag ads on IspiAI.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Configuration](#configuration)
3. [Testing & Validation](#testing--validation)
4. [Monitoring](#monitoring)
5. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### 1. Google Ad Manager Account
- Sign up at [https://admanager.google.com](https://admanager.google.com)
- Note your **Network Code** (found in Admin → Global Settings)
- Format: 8-digit number (e.g., `12345678`)

### 2. Google AdSense (Optional)
- If using AdSense, note your **Publisher ID** (format: `pub-XXXXXXXXXXXXXXXX`)
- Found in AdSense account settings

---

## Configuration

### Step 1: Update Network Code

Edit `src/lib/gpt-config.ts` and replace `XXXXXX` with your Network Code:

```typescript
const NETWORK_CODE = "12345678"; // Replace with your Network Code
```

### Step 2: Create Ad Units in Ad Manager

Create the following ad units in Google Ad Manager:

| Ad Unit Name | Sizes | Placement |
|--------------|-------|-----------|
| `top_leaderboard` | 970×250, 728×90, 320×100, 320×50 | Home (above-the-fold) |
| `infeed_home` | 300×250, 320×250 | Home (between articles) |
| `sticky_bottom_mobile` | 320×50, 320×100 | Home & Article (mobile only) |
| `article_mid` | 728×90, 300×250 | Article (after first section) |
| `inarticle` | 300×250, 336×280 | Article (in-content) |
| `sidebar_mpu` | 300×250, 300×600 | Home sidebar (desktop only) |

**Path format:** `/NETWORK_CODE/ispiai/[ad_unit_name]`

Example: `/12345678/ispiai/top_leaderboard`

### Step 3: Update ads.txt

Edit `public/ads.txt` and replace placeholders:

```
google.com, pub-1234567890123456, DIRECT, f08c47fec0942fa0
```

**Important:** 
- Deploy `ads.txt` to the **root** of your domain (`https://ispiai.com/ads.txt`)
- Must be publicly accessible
- Validate at [https://adstxt.guru](https://adstxt.guru)

### Step 4: Create Line Items & Orders

In Ad Manager:
1. Go to **Delivery → Orders**
2. Create a new Order
3. Add Line Items for each ad unit
4. Set targeting (geo, device, etc.)
5. Upload creatives or enable programmatic demand

---

## Testing & Validation

### 1. Publisher Console (Debug Mode)

Add `?google_console=1` to any URL:

```
https://ispiai.com/?google_console=1
```

This opens the GPT console where you can:
- ✅ Verify slots are defined correctly
- ✅ Check size mappings
- ✅ See ad requests and responses
- ✅ Debug targeting issues

### 2. CLS (Cumulative Layout Shift)

Test with [PageSpeed Insights](https://pagespeed.web.dev/):

```bash
# Target: CLS < 0.1
```

**If CLS is high:**
- Verify `min-height` is set correctly in `AdSlot` component
- Check that size mappings match actual ad sizes
- Ensure ads load with lazy load (BTF ads shouldn't affect CLS)

### 3. Viewability

In Ad Manager:
1. Go to **Reporting → New Report**
2. Add dimension: "Ad unit"
3. Add metric: "Active View viewable impressions %"
4. Target: **>70% viewability**

**If viewability is low:**
- Adjust `fetchMarginPercent` in `src/lib/gpt-config.ts`
- Increase to 50-100 for earlier fetching (trades off performance)

### 4. Ad Density (Mobile)

Measure density to comply with Better Ads Standards:

```
Ad Density = (Total Ad Height) / (Content Height) × 100
Target: ≤30%
```

**Example calculation:**
```typescript
// Home page mobile
const contentHeight = 2500; // px
const adsHeight = 100 + 250 + 250 + 50; // top + infeed1 + infeed2 + sticky = 650px
const density = (650 / 2500) * 100; // 26% ✓
```

---

## Monitoring

### Key Metrics to Track

| Metric | Target | Where to Check |
|--------|--------|----------------|
| Fill Rate | >90% | Ad Manager → Reporting |
| Viewability | >70% | Ad Manager → Active View |
| CLS | <0.1 | PageSpeed Insights |
| eCPM | Benchmark | Ad Manager → Revenue |
| Ad Density (mobile) | ≤30% | Manual calculation |

### Ad Manager Reports

Create custom reports for:
1. **Revenue by Ad Unit** (daily)
2. **Viewability by Device** (weekly)
3. **Fill Rate by Geography** (weekly)

---

## Troubleshooting

### Ads Not Showing

**Check:**
1. ✅ Network Code is correct in `gpt-config.ts`
2. ✅ Ad units exist in Ad Manager
3. ✅ Line items are active and have inventory
4. ✅ Publisher Console shows no errors (`?google_console=1`)
5. ✅ Browser isn't blocking ads (disable ad blockers)

**Common errors:**
- "Slot not defined" → Check slot ID matches `AD_SLOTS` key
- "No ad returned" → Check line item targeting and inventory
- "Slot already defined" → Make sure `useGPT()` is called only once

### CLS Issues

**Check:**
1. ✅ `min-height` is set on ad containers
2. ✅ Size mappings match actual ad sizes
3. ✅ Lazy load is enabled (BTF ads)
4. ✅ No conflicting CSS (`height: auto` overrides `min-height`)

### Low Viewability

**Solutions:**
1. Increase `fetchMarginPercent` (e.g., 50)
2. Move ads closer to main content
3. Reduce total number of ad slots
4. Check ad refresh settings (if using refresh)

### ads.txt Errors

**Check:**
1. ✅ File is at root: `https://ispiai.com/ads.txt`
2. ✅ File is publicly accessible (not behind auth)
3. ✅ Syntax is correct (no extra spaces)
4. ✅ Publisher ID matches Ad Manager account
5. ✅ Wait 24-48h for crawlers to pick up changes

Validate at: [https://adstxt.guru](https://adstxt.guru)

---

## Better Ads Standards Compliance

Ensure compliance to avoid blocking by Chrome and other browsers:

### ❌ Do NOT use:
- Pop-ups or pop-unders
- Prestitials with countdown timers
- Large sticky footers (>30% of screen on mobile)
- Auto-playing video ads with sound
- Flashing/animated ads over 5 seconds

### ✅ Do use:
- Clearly labeled ads ("Publicidade")
- Reasonable ad density (≤30% on mobile)
- Lazy loading for BTF ads
- Responsive sizes

More info: [https://www.betterads.org/standards/](https://www.betterads.org/standards/)

---

## Advanced: Refresh Ads

If you want to refresh ads (e.g., every 30s), add this to `useGPT.ts`:

```typescript
// Only refresh viewable slots
googletag.pubads().addEventListener('impressionViewable', (event) => {
  const slot = event.slot;
  
  setTimeout(() => {
    googletag.pubads().refresh([slot]);
  }, 30000); // 30 seconds minimum
});
```

**Warning:** Refresh can reduce eCPM if done too aggressively. Test carefully.

---

## Resources

- [GPT Reference](https://developers.google.com/publisher-tag/reference)
- [Ad Best Practices](https://developers.google.com/publisher-tag/guides/ad-best-practices)
- [Better Ads Standards](https://www.betterads.org/standards/)
- [ads.txt Spec](https://iabtechlab.com/ads-txt/)
- [Ad Manager Help](https://support.google.com/admanager)

---

## Checklist

### Setup
- [ ] Network Code updated in `gpt-config.ts`
- [ ] Ad units created in Ad Manager
- [ ] Line items and orders configured
- [ ] `ads.txt` deployed and validated

### Testing
- [ ] Publisher Console shows all slots (`?google_console=1`)
- [ ] Ads display correctly on mobile/tablet/desktop
- [ ] CLS < 0.1 on PageSpeed Insights
- [ ] Viewability >70% in Ad Manager reports

### Compliance
- [ ] Ad density ≤30% on mobile
- [ ] All ads labeled "Publicidade"
- [ ] No Better Ads violations
- [ ] Privacy settings enabled (GDPR/CCPA)

### Monitoring
- [ ] Revenue reports set up in Ad Manager
- [ ] Viewability tracking enabled
- [ ] Performance alerts configured

---

**Need help?** Check the [GPT documentation](https://developers.google.com/publisher-tag) or [Ad Manager support](https://support.google.com/admanager).
