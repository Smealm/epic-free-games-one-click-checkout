# Epic Free Games — One-Click Checkout

**All the weekly freebies. One checkout link. You stay in control.**

A lightweight userscript that gathers Epic Games Store free offers across desktop, Android, and iOS, then combines eligible offers into one convenient checkout link.

Spend less time navigating individual game pages and more time building your library. Discover offers, review them in one place, and head to checkout with fewer clicks — while keeping the final claiming process in your hands.

## 📦 Installation

### Quick install

<a href="https://github.com/Smealm/epic-free-games-one-click-checkout/raw/refs/heads/main/Epic%20Games%20-%20All%20Free%20Games.user.js"><img alt="Install with your userscript manager" src="https://img.shields.io/badge/Install-Userscript-2ea44f?style=for-the-badge&logo=github&logoColor=white" /></a>

1. Install a compatible userscript manager from the recommendations below.
2. Click the install link or green button above.
3. Your userscript manager should open the script and prompt you to install it.
4. Review the script and confirm installation.
5. Visit the [Epic Games Store](https://store.epicgames.com/).
6. Click the floating **FREE GAMES** button that's located in the bottom right corner to open the offer panel.

If clicking the link displays the raw source code instead, open your userscript manager's dashboard, create a new script, and paste in the contents of the linked `.user.js` file.

### Recommended userscript managers

Choose the manager that best fits your browser and preferences.

- **[Violentmonkey](https://violentmonkey.github.io/)** — An open-source userscript manager for supported desktop browsers.
- **[ScriptCat](https://scriptcat.org/)** — A userscript manager with script management and automation features.
- **[Tampermonkey](https://www.tampermonkey.net/)** — A widely used userscript manager with support across several browsers.

Userscript-manager availability and permissions vary by browser. Make sure your manager is enabled and permitted to run scripts on the Epic Games Store.

## 🕹️ How to use

Once installed, the userscript runs while you browse the Epic Games Store.

1. **Sign in to Epic Games Store.** Use the account where you want to claim the games.
2. **Open the offer panel.** Click the floating **FREE GAMES / ALL PLATFORMS** button.

<img width="1915" height="937" alt="annotely_image" src="https://github.com/user-attachments/assets/a694b811-c895-4a62-a5bf-3623f4658ba7" />

3. **Review the offers.** Browse the discovered desktop and mobile giveaways and check the platform counters.
4. **Check ownership status.** When ownership checks succeed, games already in your library can be excluded from the combined checkout link. Offers whose ownership status cannot be confirmed should not be treated as verified unowned games.
5. **Open the combined checkout.** Click the checkout action to open the prepared link.

<img width="1918" height="950" alt="annotely_image(1)" src="https://github.com/user-attachments/assets/945d5c87-0874-410c-bc2d-cceb3f42ba57" />

6. **Review and claim.** Confirm the offers shown by Epic and complete checkout yourself.

<img width="1920" height="944" alt="{3D004978-2A63-4D28-A939-DDDDE7B7BB9A}" src="https://github.com/user-attachments/assets/c8b38172-9d2f-4d77-8a71-ddf94fda8ff4" />

The userscript prepares the checkout link; it does not automatically claim games for you. Offer availability, ownership results, and checkout acceptance may vary.

## 🤔 Why use this over other options?

There are several community projects that help people find or claim free Epic Games Store offers. The main difference is how you want to run the tool and how much of the process you want to automate.

### 1. [Vogler's Free Games Claimer](https://github.com/vogler/free-games-claimer)

A multi-store claiming tool that supports Epic Games Store and other services, including Amazon Prime Gaming and GOG, with experimental support for Unreal Engine assets.

**Best for:** Users who want a broader, automated claiming workflow across multiple gaming stores.

- Supports automated claiming workflows and notifications.
- Can run locally with Node.js or through Docker/Podman.
- Offers integrations and configuration options for users who want a more automated setup.
- Requires running and maintaining a separate tool rather than simply opening the Epic Games Store with a userscript enabled.

This userscript takes a narrower approach: it focuses on bringing eligible Epic offers together in your existing browser session and lets you complete checkout manually.

### 2. [claabs/epicgames-freegames-node](https://github.com/claabs/epicgames-freegames-node)

A Node.js-based project for discovering and claiming Epic Games Store giveaways. It supports scheduled runs, multiple accounts, notifications, and prepopulated checkout links that users can complete themselves.

**Best for:** Users who want a configurable, scheduled workflow, notifications, or multi-account support.

- Supports automated and scheduled tasks.
- Can provide a checkout link for you to review and complete.
- Supports notifications and multiple-account configurations.
- Requires setting up and running a separate Node.js application or container.

This userscript is intended for people who prefer a lightweight, browser-based workflow without maintaining a separate runtime, configuration, or scheduled job.

### 3. This userscript — Epic Free Games One-Click Checkout

**Best for:** Users who want to discover offers and prepare a combined checkout directly from the Epic Games Store website.

- Runs in a compatible userscript manager in your browser.
- Combines eligible desktop and mobile offers in one interface.
- Uses catalog matching to help resolve mobile offers to the identifiers needed for checkout.
- Checks ownership when possible, so confirmed-owned offers can be excluded.
- Prepares a combined checkout link without automatically completing the purchase or claim.
- Does not require you to set up a separate Node.js application, Python environment, Docker container, or local server.

It is intentionally focused on **discovery, ownership-aware filtering, and checkout preparation** rather than unattended claiming, notifications, or scheduling.

### Feature comparison

| Feature | Vogler's Free Games Claimer | Epic Games Free Games Node | This userscript |
|---|---|---|---|
| Runs inside your existing Epic store tab | No | No | **Yes** |
| Separate runtime or container required | Yes | Yes | **No** |
| Desktop free-game discovery | Yes | Yes | Yes |
| Mobile offer discovery in one interface | Not its main focus | Not its main focus | **Yes** |
| Automated or scheduled workflows | Yes | Yes | No |
| Notifications | Supported | Supported | No |
| Combined checkout link | Workflow-dependent | Yes | **Yes** |
| Ownership-aware checkout filtering | Not its main focus | Not its main focus | **Yes, when checks succeed** |
| User reviews and completes checkout | Depends on workflow | Supported | **Yes** |
| Multi-store support | Yes | Primarily Epic Games Store | Epic Games Store |

*Features and behavior can change between project versions. The table describes the general focus of each project, not a guarantee that every feature is available in every configuration.*

### Which should you choose?

- Choose **Vogler's Free Games Claimer** if you want a broader multi-store claiming tool.
- Choose **Epic Games Free Games Node** if you want scheduled runs, notifications, or a more configurable automated workflow.
- Choose **this userscript** if you want a simple, browser-based way to collect desktop and mobile offers, filter out games confirmed to be owned, and prepare one checkout link.

This userscript does not promise to avoid CAPTCHA or other anti-bot checks. Epic can change its APIs or request verification regardless of which tool you use.

## ✨ Features

- **Multi-platform offer discovery** — Gathers eligible free offers from desktop, Android, and iOS storefront data.
- **Combined checkout link** — Builds a checkout URL containing multiple matching Epic offer identifiers.
- **Ownership-aware filtering** — Checks whether offers are already owned and excludes confirmed-owned games from the combined checkout.
- **One unified interface** — Review discovered giveaways in a single floating panel.
- **Platform counters** — See the number of discovered desktop, Android, and iOS offers at a glance.
- **Visual offer cards** — Browse the collected games in a clear, organized layout.
- **Quick checkout access** — Move from discovering offers to reviewing a combined checkout without opening every game individually.
- **Manual claiming** — You decide when to proceed and complete the final checkout steps.

Ownership-aware filtering depends on successful ownership checks. If a check fails or returns an inconclusive result, the script should not treat that offer as confirmed unowned.

## 🎯 Why this project exists

Epic Games Store giveaways are a great way to expand your game library. The frustrating part can be the repetitive process of finding each offer, opening its page, and navigating through checkout — especially when offers are spread across desktop and mobile storefronts.

This project focuses on one simple improvement:

**Discover everything together. Prepare checkout once. Let the user decide what to claim.**

It isn't intended to replace the Epic Games Store, automate account activity, or remove the user's control. It reduces unnecessary navigation and makes it easier to get from offer discovery to checkout.

## 🔄 The workflow this streamlines

### Before

1. Search for the current free games.
2. Open a game page.
3. Navigate to checkout.
4. Repeat for each giveaway.
5. Check separate storefronts for mobile offers.
6. Keep track of which games you've already reviewed.

### After

1. Open the Epic Games Store with the userscript enabled.
2. Click **FREE GAMES / ALL PLATFORMS**.
3. Review the discovered offers, platform counters, and ownership results.
4. Click the combined checkout action.
5. Verify the games listed at checkout and complete the claiming process manually.

The main benefit is fewer repeated page visits and less navigation between storefronts. Instead of handling each offer as a separate browsing task, you can collect the eligible offers into one convenient starting point.

The generated link does not guarantee that every offer will be claimable. Availability may depend on the region, account, platform, promotion period, ownership-check results, and Epic's checkout behavior.

## 🎨 Interface and styling

The interface uses an Epic Games-inspired visual style, with a dark panel, bright cyan-blue accents, and a clear hierarchy for the main actions.

### The floating button

The **FREE GAMES / ALL PLATFORMS** button is the entry point to the workflow.

It is designed to be immediately recognizable without requiring a separate website or a complicated toolbar routine. The floating placement makes the tool accessible while browsing the store, and its label communicates both the purpose of the script and its cross-platform focus.

### The offer panel

The panel brings discovered offers together with:

- A dark background inspired by the storefront's visual language.
- Cyan-blue accents for interactive elements and visual emphasis.
- Individual offer cards that are easier to scan.
- Desktop, Android, and iOS counters for a quick overview.
- Ownership information when available.
- A prominent checkout action that makes the next step clear.

The goal is to make the userscript feel like a lightweight companion to the store rather than an entirely separate application.

**Design philosophy:** clear actions, readable offers, minimal friction, and no unnecessary complexity.

## ⚙️ How it works

The userscript connects offer discovery, catalog matching, ownership checks, and checkout-link generation.

### 1. Desktop offer discovery

The script reads Epic Games Store promotion data to identify current free-game offers available through the desktop storefront.

### 2. Mobile offer discovery

It also checks mobile storefront discovery data to identify eligible Android and iOS offers that may not appear in the desktop promotion listing in the same way.

### 3. Catalog matching

Mobile discovery data may not contain every identifier needed to construct a checkout URL. The script uses EGData catalog information to help resolve matching offers and their associated identifiers.

### 4. Ownership checks

The script attempts to check whether each offer is already owned by the signed-in Epic account. Confirmed-owned offers can be filtered out of the combined checkout link.

Ownership results depend on Epic's services and the browser's ability to complete the request. An unavailable or inconclusive result is not proof that a game is unowned.

### 5. Combined checkout generation

The script assembles matching namespace and offer identifiers into a single Epic Games Store checkout URL using the store's offer-based checkout format.

### 6. Manual checkout

The link opens the Epic checkout experience, where you can review the listed offers and complete the process yourself.

The script is designed to prepare the checkout flow, not to automatically redeem games, bypass CAPTCHA, or take control of your account.

## 🧭 Project philosophy

### Convenience over unnecessary automation

A repetitive task doesn't always need a bot that performs account actions. Sometimes, preparing the right information and leaving the final decision to the user is the better solution.

### One place to review everything

Desktop and mobile giveaways should be discoverable through one interface instead of requiring separate searches and browsing sessions.

### Transparency and user control

The script helps organize offers and prepare checkout. The user remains responsible for reviewing the included games and completing the claim.

### Lightweight and focused

The goal is to do one job well: find eligible giveaways, organize them, and reduce the steps needed to reach checkout.

### Maintainability

The script depends on storefront and catalog data that may change. Keeping the logic focused makes it easier to diagnose issues and update the script when upstream services change.

## 🧰 Data sources and community projects

This project builds on publicly accessible storefront and catalog information, alongside ideas explored by the Epic Games Store community.

- **Epic Games Store promotion data** — Used to discover desktop free-game promotions.
- **Epic Games Store mobile discovery data** — Helps surface mobile-specific offers.
- **[EGData](https://docs.egdata.app/docs)** — A community-maintained source of Epic Games Store catalog and offer information that helps resolve identifiers needed for checkout.
- **[Vogler's Free Games Claimer](https://github.com/vogler/free-games-claimer)** — A multi-store giveaway claiming project and useful point of comparison for different approaches to free-game automation.
- **[epicgames-freegames-node](https://github.com/claabs/epicgames-freegames-node)** — A relevant community project for free-game discovery, automation, and preparing checkout links for users to complete themselves.
- **[epicstore_api](https://epicstore-api.readthedocs.io/en/latest/)** — Community API documentation that can help developers understand and work with Epic Games Store data, including promotions.

### How these projects helped

The wider community's work makes it easier to understand how Epic's promotions and catalog data can be accessed and connected. EGData is particularly useful when matching mobile-discovered offers to catalog identifiers. Other free-game tools provide useful context for collecting giveaways and streamlining checkout.

These projects are credited as relevant data sources, references, and inspiration. This does **not** imply that their source code is included in this repository.

If specific code or assets from another project are copied or adapted, those portions should be attributed explicitly and used in accordance with the original project's license.

## ⚠️ Limitations

- Offers may be region-restricted, platform-specific, expired, or unavailable to particular accounts.
- Mobile offers may require additional catalog matching.
- Not every discovered offer will necessarily resolve to a valid checkout item.
- Ownership checks may fail or return inconclusive results; only confirmed ownership should be treated as such.
- Epic may change its APIs, catalog data, ownership-check behavior, or checkout URL format.
- A combined link does not guarantee that every offer will be accepted or successfully claimed.
- You should verify the games displayed at checkout before completing the process.

This is an independent community project and is not affiliated with, endorsed by, or officially supported by Epic Games.

## 🗺️ Possible future improvements

- More robust matching for mobile offers.
- Clearer indicators for expired, unavailable, or unresolved offers.
- Better error messages when data sources are unavailable.
- Offer filtering and sorting.
- Additional checks to avoid duplicate offers in checkout links.
- Troubleshooting guidance for storefront changes.

---

**Enjoy the freebies. Fewer clicks, one convenient checkout, and you're always in control.**
