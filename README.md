# Epic Weekly Free Checkout

**All the weekly freebies. One checkout link. You stay in control.**

A lightweight Tampermonkey userscript that brings Epic Games Store's current free game offers together across desktop, Android, and iOS, then builds a combined checkout link so you can claim eligible games with fewer clicks.

Instead of checking multiple storefronts, opening individual game pages, and repeating the checkout process for every offer, this script gathers the available offers into one place and streamlines the process into a single checkout entry point.

## ✨ Features

- **Multi-platform discovery** — Finds eligible free offers across desktop, Android, and iOS storefronts.
- **Combined checkout link** — Collects matching Epic offer identifiers and builds a checkout URL containing multiple offers.
- **One convenient interface** — Displays discovered offers in a single floating panel on the Epic Games Store.
- **Platform counters** — Shows how many offers were found for desktop, Android, and iOS.
- **Offer cards** — Presents games in a more readable, visual list so you can review what is available.
- **Quick access** — Open the panel, review the offers, and proceed to checkout without navigating through every game individually.
- **Manual claiming** — You remain in control of the final checkout and claim process. The script is designed to reduce navigation, not to automate account actions.

## 🎯 The idea behind the project

Epic's weekly giveaways are a great way to build a game library, but finding and claiming every available offer can become repetitive, particularly when giveaways are distributed across different storefronts and platforms.

The usual workflow can look like this:

1. Visit a page listing free games.
2. Open a game page.
3. Sign in or navigate through the store as needed.
4. Start the checkout process.
5. Repeat for the next game.
6. Switch storefronts or devices to find mobile offers.

This project takes a different approach: **discover first, consolidate second, claim manually at the end.**

The goal is not to replace Epic's store or remove the user's involvement. It is to eliminate unnecessary navigation between offers and make the final claiming step more convenient.

## 🔄 The workflow improvement

### Before

- Search for current giveaways across storefronts.
- Open each game individually.
- Repeat the checkout flow for each eligible offer.
- Check other platforms separately.
- Keep track of which games you have already reviewed.

### After

1. Open the Epic Games Store with the userscript installed.
2. Click the floating **FREE GAMES / ALL PLATFORMS** button.
3. Review the discovered desktop, Android, and iOS offers.
4. Use the combined checkout action to open a checkout link containing the matching offers.
5. Verify that the expected games appear, then complete any required steps manually.

The biggest improvement is the reduction in repetitive page navigation. Rather than treating every game as a separate browsing session, the script treats eligible offers as a collection that can be reviewed together.

*The script prepares a checkout link; it does not guarantee that every offer is claimable for every account, region, device, or storefront.*

## 🎨 Interface and visual design

The interface uses an Epic Games-inspired dark theme, with a clean, high-contrast layout and bright cyan-blue accents.

### Floating action button

The **FREE GAMES / ALL PLATFORMS** button acts as the entry point to the entire workflow.

Its purpose is to make the feature easy to discover without taking over the store page. Rather than requiring a separate website or a complicated toolbar workflow, the button stays available while you browse the Epic Games Store.

### Offer panel

The panel brings the collected offers into one place, using:

- A dark background inspired by the storefront's visual language.
- Cyan-blue highlights to draw attention to interactive elements.
- Distinct offer cards to make game information easier to scan.
- Separate desktop, Android, and iOS counters for a quick overview.
- A prominent checkout action to make the next step obvious.

The styling is intentionally practical: the interface should feel like a natural companion to the store, not a separate application competing for attention.

**Design principle:** make the useful action obvious, keep the information readable, and avoid adding friction to a workflow intended to remove it.

## ⚙️ How it works

The userscript combines offer discovery with checkout-link construction.

### 1. Discover desktop offers

The script reads Epic Games Store's public free-game promotion data to identify current offers available through the desktop storefront.

### 2. Discover mobile offers

It also checks the mobile storefront discovery source for eligible Android and iOS offers, which may not be represented in the same way as desktop promotions.

### 3. Match offers to catalog identifiers

Mobile discovery results may need additional catalog information before they can be represented in an Epic checkout URL. The script uses EGData's catalog data to help resolve the relevant offer identifiers.

### 4. Build the combined checkout URL

The script assembles the matching namespace and offer identifiers into a single checkout URL using Epic's offer-based checkout format.

### 5. Let the user review and claim

The generated link opens Epic's checkout experience. You can review the included offers and complete the process yourself.

The script does not automatically redeem games, bypass CAPTCHA, or take over the final claiming decision.

## 🧭 Project philosophy

This project follows a few simple principles:

**Convenience over automation for its own sake**

Not every repetitive task needs a bot that performs account actions. Sometimes the most useful improvement is to prepare everything and let the user complete the final step.

**One place to review everything**

Desktop and mobile offers should be discoverable through one interface rather than requiring separate searches and browsing sessions.

**Transparency and user control**

The script helps prepare the checkout flow, but the user remains responsible for reviewing the offers and confirming the final transaction or claim.

**Lightweight and focused**

The project aims to do one job well: find eligible giveaways, organize them, and reduce the number of steps needed to reach checkout.

**Respect for upstream services**

The project relies on available storefront and catalog data rather than claiming ownership of Epic's catalog, APIs, or game metadata. Upstream services can change, so the script may need maintenance when their response formats or checkout behavior change.

## 📦 Installation

### 1. Install a userscript manager

Install a userscript manager compatible with your browser. Recommended options include:

- **[Violentmonkey](https://violentmonkey.github.io/)** — An open-source userscript manager with support for major desktop browsers.
- **[ScriptCat](https://scriptcat.org/)** — A userscript manager offering script management and additional automation features.
- **[Tampermonkey](https://www.tampermonkey.net/)** — Another widely used option for managing and running userscripts.

Choose the manager that best fits your browser and preferences.

### 2. Install the userscript

1. Open your userscript manager's dashboard.
2. Create a new userscript.
3. Copy the userscript source from this repository and paste it into the editor, or use the repository's raw userscript link once available.
4. Save the script and make sure it is enabled.

### 3. Open the Epic Games Store

Visit the [Epic Games Store](https://store.epicgames.com/) in the browser where your userscript manager is installed.

Click the floating **FREE GAMES / ALL PLATFORMS** button to open the offer panel, review the available giveaways, and generate your combined checkout link.

**Note:** Browser compatibility and userscript-manager permissions can vary. Make sure your manager is enabled for the Epic Games Store and that the script has permission to run on the relevant store pages.

## 🧰 Dependencies and data sources

This project builds on publicly accessible storefront and catalog information.

- **Epic Games Store promotion data** — The primary source for discovering desktop free-game promotions. Epic's storefront data includes promotion information used by other community projects as well.
- **Epic Games Store mobile discovery data** — Used to discover mobile-specific offers that may not be surfaced by the desktop promotion listing.
- **[EGData](https://docs.egdata.app/docs)** — A community-maintained Epic Games Store catalog and data service. Its offer and catalog information helps resolve offer metadata and identifiers needed to construct checkout links.

These services provide data and infrastructure; they are not the same thing as direct code dependencies. The userscript uses their information to connect discovery with checkout.

## 🙏 Credits and inspiration

This project exists in a broader community of developers who have explored Epic Games Store promotions, catalog data, and streamlined checkout workflows.

- **[EGData](https://docs.egdata.app/docs)** — Thanks to the maintainers for making Epic Games Store catalog and offer information accessible. That data helps bridge the gap between mobile offer discovery and the identifiers needed for checkout.
- **[epicgames-freegames-node](https://github.com/claabs/epicgames-freegames-node)** — A useful reference point for the broader idea of collecting Epic's free games and preparing a checkout link, while leaving the final checkout interaction to the user.
- **[epicstore_api](https://epicstore-api.readthedocs.io/en/latest/)** — A community API wrapper documenting access to Epic Games Store data, including free-game promotions. It is a helpful reference for understanding the storefront's available promotion data.

### A note on attribution

These projects are credited for relevant ideas, data access, and technical reference material—not as a claim that their code is included in this userscript.

If code, snippets, or other assets are copied or adapted from a specific upstream project, the relevant files and sections should be attributed directly, and any applicable license requirements should be followed. Verify the actual code lineage and license before describing any project as a direct code source.

## ⚠️ Limitations

- Offers may be region-restricted, platform-specific, expired, or unavailable to particular accounts.
- Mobile offers may require additional catalog matching, and not every discovered offer will necessarily resolve to a valid checkout item.
- Epic may change its APIs, storefront behavior, or checkout URL format without notice.
- A combined checkout link does not guarantee that every listed offer will be accepted or successfully claimed.
- Users should verify the games shown on the checkout page before completing the process.

This project is an independent community tool and is not affiliated with, endorsed by, or officially supported by Epic Games.

## 🗺️ Roadmap

Potential future improvements include:

- More robust handling of missing or unmatched mobile offers.
- Clearer status indicators for expired, unavailable, or unresolved offers.
- Improved error messages when a data source is unavailable.
- Better filtering and sorting for larger sets of giveaways.
- Additional safeguards to prevent duplicate offers in the combined checkout URL.
- Documentation and troubleshooting guidance for common storefront changes.

## 📄 License

Choose and add a license file before publishing this project. If the userscript is original work, a permissive license such as MIT may be suitable, but confirm that any incorporated code and assets are compatible before selecting one.

---

**Enjoy the freebies. Spend less time navigating, and keep control of your claims.**
