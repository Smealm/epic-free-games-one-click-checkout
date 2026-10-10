// ==UserScript==
// @name         Epic Games - All Free Games
// @namespace    local.epic-free-games
// @version      0.8.2
// @description  Discover desktop and mobile giveaways, check ownership, and build a combined checkout link
// @match        https://store.epicgames.com/*
// @match        https://www.epicgames.com/store/*
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// @connect      store-site-backend-static-ipv4.ak.epicgames.com
// @connect      egs-platform-service.store.epicgames.com
// @connect      api.egdata.app
// ==/UserScript==

(() => {
  "use strict";

  const DESKTOP_API =
    "https://store-site-backend-static-ipv4.ak.epicgames.com/" +
    "freeGamesPromotions?locale=en-US&country=US&allowCountries=US";

  const MOBILE_API =
    "https://egs-platform-service.store.epicgames.com/" +
    "api/v2/public/discover/home";

  const EGDATA_API =
    "https://api.egdata.app/free-games?country=US";

  const OWNERSHIP_API = "https://store.epicgames.com/graphql";
  const COUNTRY = "US";
  const LOCALE = "en";

  // Use the page's window for authenticated ownership requests.
  // Public feeds continue using GM_xmlhttpRequest.
  const pageWindow = unsafeWindow;

  const COLORS = {
    background: "#101014",
    surface: "#18181c",
    surfaceHover: "#232329",
    border: "rgba(255,255,255,0.10)",
    text: "#f5f5f7",
    muted: "#a1a1aa",
    accent: "#26bbff",
    accentHover: "#63ceff",
    blue: "#0078f2",
    warning: "#ffd166",
    success: "#4ade80",
    danger: "#f87171",
  };

  // ------------------------------------------------------------
  // UI
  // ------------------------------------------------------------

  const button = document.createElement("button");

  function setButtonLabel(scanning = false) {
    if (scanning) {
      button.innerHTML = `
        <span style="
          display:inline-block;
          width:13px;
          height:13px;
          border:2px solid rgba(255,255,255,.35);
          border-top-color:${COLORS.accent};
          border-radius:50%;
        "></span>
        <span>SCANNING OFFERS...</span>
      `;
      return;
    }

    button.innerHTML = `
      <span style="font-size:19px;line-height:1">✦</span>
      <span>FREE GAMES</span>
      <span style="
        margin-left:3px;
        padding:2px 6px;
        border-radius:4px;
        background:rgba(38,187,255,.16);
        color:${COLORS.accent};
        font-size:10px;
        letter-spacing:.6px;
      ">ALL PLATFORMS</span>
    `;
  }

  setButtonLabel();

  Object.assign(button.style, {
    position: "fixed",
    right: "24px",
    bottom: "24px",
    zIndex: "999999",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    padding: "14px 18px",
    border: "1px solid rgba(38,187,255,.5)",
    borderRadius: "9px",
    background: COLORS.background,
    color: COLORS.text,
    font: "700 13px/1.2 Inter, system-ui, sans-serif",
    letterSpacing: ".7px",
    cursor: "pointer",
    boxShadow: "0 8px 28px rgba(0,0,0,.45)",
    transition:
      "background .18s ease,border-color .18s ease,transform .18s ease",
  });

  button.addEventListener("mouseenter", () => {
    button.style.background = "#202027";
    button.style.borderColor = COLORS.accent;
    button.style.transform = "translateY(-2px)";
  });

  button.addEventListener("mouseleave", () => {
    button.style.background = COLORS.background;
    button.style.borderColor = "rgba(38,187,255,.5)";
    button.style.transform = "translateY(0)";
  });

  const panel = document.createElement("div");

  Object.assign(panel.style, {
    position: "fixed",
    right: "24px",
    bottom: "88px",
    zIndex: "999999",
    width: "min(470px, calc(100vw - 32px))",
    maxHeight: "min(720px, calc(100vh - 120px))",
    overflowY: "auto",
    boxSizing: "border-box",
    padding: "0",
    border: `1px solid ${COLORS.border}`,
    borderRadius: "12px",
    background: COLORS.background,
    color: COLORS.text,
    font: "14px/1.5 Inter, system-ui, -apple-system, sans-serif",
    boxShadow: "0 20px 70px rgba(0,0,0,.65)",
    display: "none",
    scrollbarWidth: "thin",
    scrollbarColor: "#404047 transparent",
  });

  document.body.append(button, panel);

  function el(tag, styles = {}, text = "") {
    const node = document.createElement(tag);
    Object.assign(node.style, styles);
    if (text) node.textContent = text;
    return node;
  }

  function makeHeader(subtitle = "Your weekly giveaway dashboard") {
    const header = el("div", {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "12px",
      padding: "18px 18px 16px",
      borderBottom: `1px solid ${COLORS.border}`,
      background: "linear-gradient(135deg, #1c222a 0%, #141419 65%)",
    });

    const left = el("div", {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      minWidth: "0",
    });

    const mark = el("div", {
      display: "grid",
      placeItems: "center",
      flexShrink: "0",
      width: "38px",
      height: "38px",
      borderRadius: "8px",
      background: "rgba(38,187,255,.12)",
      border: "1px solid rgba(38,187,255,.25)",
      color: COLORS.accent,
      fontSize: "22px",
      fontWeight: "700",
    }, "✦");

    const copy = el("div", { minWidth: "0" });

    const title = el("div", {
      color: COLORS.text,
      fontSize: "17px",
      fontWeight: "750",
      letterSpacing: "-.35px",
      lineHeight: "1.3",
    }, "Free Games");

    const caption = el("div", {
      marginTop: "3px",
      color: COLORS.muted,
      fontSize: "11px",
    }, subtitle);

    copy.append(title, caption);
    left.append(mark, copy);

    const close = el("button", {
      display: "grid",
      placeItems: "center",
      flexShrink: "0",
      width: "32px",
      height: "32px",
      padding: "0",
      border: "1px solid transparent",
      borderRadius: "6px",
      background: "transparent",
      color: COLORS.muted,
      fontSize: "21px",
      cursor: "pointer",
      transition: "background .15s ease,color .15s ease",
    }, "×");

    close.setAttribute("aria-label", "Close free games panel");

    close.addEventListener("mouseenter", () => {
      close.style.background = COLORS.surfaceHover;
      close.style.color = COLORS.text;
    });

    close.addEventListener("mouseleave", () => {
      close.style.background = "transparent";
      close.style.color = COLORS.muted;
    });

    close.addEventListener("click", () => {
      panel.style.display = "none";
    });

    header.append(left, close);
    return header;
  }

  // ------------------------------------------------------------
  // PUBLIC API REQUESTS
  // ------------------------------------------------------------

  function requestJson(url) {
    return new Promise((resolve, reject) => {
      GM_xmlhttpRequest({
        method: "GET",
        url,
        timeout: 20000,
        headers: { Accept: "application/json" },

        onload(response) {
          if (response.status < 200 || response.status >= 300) {
            reject(new Error(`HTTP ${response.status}: ${url}`));
            return;
          }

          try {
            resolve(JSON.parse(response.responseText));
          } catch {
            reject(new Error("Response was not valid JSON"));
          }
        },

        onerror() {
          reject(new Error(`Network request failed: ${url}`));
        },

        ontimeout() {
          reject(new Error(`Request timed out: ${url}`));
        },
      });
    });
  }

  // ------------------------------------------------------------
  // DIRECT PAGE-WINDOW FETCH
  //
  // No postMessage bridge or injected script.
  // Fetch is invoked through the page's window and includes
  // the Epic session credentials.
  // ------------------------------------------------------------

  async function pageContextFetchJson(
    url,
    options = {},
    timeoutMs = 20000
  ) {
    const Controller = pageWindow.AbortController;

    if (typeof Controller !== "function") {
      throw new Error(
        "The page's AbortController is unavailable"
      );
    }

    const controller = new Controller();

    const timer = pageWindow.setTimeout(() => {
      controller.abort();
    }, timeoutMs);

    try {
      const response = await pageWindow.fetch.call(
        pageWindow,
        url,
        {
          ...options,
          credentials: "include",
          signal: controller.signal,
        }
      );

      const text = await response.text();

      if (!response.ok) {
        throw new Error(
          `Ownership API returned HTTP ${response.status}: ` +
          text.slice(0, 300)
        );
      }

      try {
        return JSON.parse(text);
      } catch {
        throw new Error(
          "Ownership API returned invalid JSON: " +
          text.slice(0, 300)
        );
      }
    } catch (error) {
      if (error?.name === "AbortError") {
        throw new Error(
          `Ownership request timed out after ${timeoutMs} ms`
        );
      }

      throw error;
    } finally {
      pageWindow.clearTimeout(timer);
    }
  }

  // ------------------------------------------------------------
  // OWNERSHIP CHECK
  // ------------------------------------------------------------

  async function checkOfferOwnership(namespaceId, offerId) {
    const query = `
      query launcherQuery($namespace: String!, $offerId: String!) {
        Launcher {
          entitledOfferItems(
            namespace: $namespace,
            offerId: $offerId
          ) {
            entitledToAllItemsInOffer
            entitledToAnyItemInOffer
          }
        }
      }
    `;

    const json = await pageContextFetchJson(OWNERSHIP_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query,
        variables: {
          namespace: namespaceId,
          offerId,
        },
      }),
    });

    if (json.errors?.length) {
      throw new Error(
        json.errors
          .map(error => error.message)
          .filter(Boolean)
          .join("; ") || "Epic returned a GraphQL error"
      );
    }

    const result = json.data?.Launcher?.entitledOfferItems;

    if (
      !result ||
      typeof result.entitledToAnyItemInOffer !== "boolean" ||
      typeof result.entitledToAllItemsInOffer !== "boolean"
    ) {
      console.error(
        "[Epic Free Games] Unexpected ownership response:",
        json
      );

      throw new Error("Unexpected ownership response structure");
    }

    const owned =
      result.entitledToAnyItemInOffer === true ||
      result.entitledToAllItemsInOffer === true;

    return owned ? "owned" : "unowned";
  }

  async function checkGamesOwnership(games) {
    const candidates = games.filter(game =>
      game.checkoutEligible &&
      game.namespaceId &&
      game.offerId
    );

    let nextIndex = 0;
    let failures = 0;

    console.debug(
      "[Epic Free Games] Ownership candidates:",
      candidates.length
    );

    const workerCount = Math.min(3, candidates.length);

    async function worker() {
      while (nextIndex < candidates.length) {
        const index = nextIndex++;
        const game = candidates[index];

        try {
          game.ownershipStatus = await checkOfferOwnership(
            game.namespaceId,
            game.offerId
          );

          console.debug(
            `[Epic Free Games] ${game.title}: ${game.ownershipStatus}`
          );
        } catch (error) {
          game.ownershipStatus = "unknown";
          failures++;

          console.warn(
            "[Epic Free Games] Ownership check failed:",
            game.title,
            error
          );
        }
      }
    }

    await Promise.all(
      Array.from({ length: workerCount }, () => worker())
    );

    for (const game of games) {
      if (!game.ownershipStatus) {
        game.ownershipStatus = "unknown";
      }
    }

    console.info(
      `[Epic Free Games] Ownership checks complete: ` +
      `${candidates.length - failures} succeeded, ${failures} failed.`
    );

    return failures;
  }

  // ------------------------------------------------------------
  // DESKTOP GAME DISCOVERY
  // ------------------------------------------------------------

  function currentDesktopGames(json) {
    const elements =
      json?.data?.Catalog?.searchStore?.elements ?? [];

    const now = Date.now();
    const games = [];

    for (const game of elements) {
      const groups =
        game.promotions?.promotionalOffers ?? [];

      const isFreeNow = groups.some(group =>
        (group.promotionalOffers ?? []).some(offer => {
          const start = Date.parse(offer.startDate);
          const end = Date.parse(offer.endDate);

          return (
            Number.isFinite(start) &&
            Number.isFinite(end) &&
            start <= now &&
            now < end &&
            offer.discountSetting?.discountPercentage === 0
          );
        })
      );

      if (!isFreeNow) continue;

      const namespaceId = game.namespace;
      const offerId = game.id;

      const mapping = game.catalogNs?.mappings?.find(
        item => item.pageSlug
      );

      const slug =
        mapping?.pageSlug ||
        game.urlSlug ||
        game.productSlug;

      if (!namespaceId || !offerId || !slug) continue;

      const path =
        game.offerType === "BUNDLE" ? "bundles" : "p";

      games.push({
        title: game.title || "Unknown title",
        platform: "Desktop",
        namespaceId,
        offerId,
        checkoutEligible: true,
        ownershipStatus: "unknown",
        url:
          `https://store.epicgames.com/${LOCALE}-US/` +
          `${path}/${slug}`,
      });
    }

    return games;
  }

  // ------------------------------------------------------------
  // MOBILE GAME DISCOVERY
  // ------------------------------------------------------------

  function isActiveMobileClaim(content) {
    return (content?.purchase ?? []).some(entry =>
      entry?.purchaseType === "Claim" &&
      Number(entry?.price?.decimalPrice) === 0
    );
  }

  function currentMobileGames(json, platform) {
    const games = [];

    for (const section of json?.data ?? []) {
      if (section?.type !== "freeGame") continue;

      for (const offer of section.offers ?? []) {
        const content = offer?.content ?? {};
        const slug = content?.mapping?.slug;

        if (!slug || !isActiveMobileClaim(content)) continue;

        games.push({
          title: content.title || "Unknown title",
          platform,
          namespaceId: null,
          offerId: null,
          checkoutEligible: false,
          ownershipStatus: "unknown",
          url:
            `https://store.epicgames.com/${LOCALE}-US/p/${slug}`,
        });
      }
    }

    return games;
  }

  async function getMobileGames(platform) {
    const params = new URLSearchParams({
      count: "10",
      country: COUNTRY,
      locale: LOCALE,
      platform: platform.toLowerCase(),
      start: "0",
      store: "EGS",
    });

    const json = await requestJson(
      `${MOBILE_API}?${params.toString()}`
    );

    return currentMobileGames(json, platform);
  }

  // ------------------------------------------------------------
  // EGDATA MATCHING FOR MOBILE OFFERS
  // ------------------------------------------------------------

  function normalize(value) {
    return String(value ?? "")
      .normalize("NFKC")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "");
  }

  function getEntrySlug(entry) {
    return (
      entry.urlSlug ||
      entry.slug ||
      entry.productSlug ||
      entry.pageSlug ||
      ""
    );
  }

  function getEntryPlatforms(entry) {
    const values = [];

    for (const tag of entry.tags ?? []) {
      values.push(typeof tag === "string" ? tag : tag?.name);
    }

    for (const platform of entry.platforms ?? []) {
      values.push(
        typeof platform === "string" ? platform : platform?.name
      );
    }

    return values.filter(Boolean).map(normalize);
  }

  async function enrichMobileOffers(games) {
    const mobileGames = games.filter(
      game => game.platform !== "Desktop"
    );

    if (!mobileGames.length) return games;

    const response = await requestJson(EGDATA_API);

    const entries = Array.isArray(response)
      ? response
      : Array.isArray(response?.data)
        ? response.data
        : [];

    const now = Date.now();

    const activeEntries = entries.filter(entry => {
      if (!entry?.id || !entry?.namespace) return false;

      const startValue =
        entry.giveaway?.startDate ?? entry.startDate;

      const endValue =
        entry.giveaway?.endDate ?? entry.endDate;

      if (!startValue || !endValue) return true;

      const start = Date.parse(startValue);
      const end = Date.parse(endValue);

      return (
        Number.isFinite(start) &&
        Number.isFinite(end) &&
        start <= now &&
        now < end
      );
    });

    return games.map(game => {
      if (game.platform === "Desktop") return game;

      const desiredPlatform = normalize(game.platform);
      let gameSlug = "";

      try {
        gameSlug = new URL(game.url).pathname
          .split("/")
          .filter(Boolean)
          .pop();
      } catch {
        // Fall back to title matching.
      }

      const slugMatches = activeEntries.filter(entry =>
        normalize(getEntrySlug(entry)) === normalize(gameSlug)
      );

      const titleMatches = activeEntries.filter(entry => {
        if (normalize(entry.title) !== normalize(game.title)) {
          return false;
        }

        const platforms = getEntryPlatforms(entry);

        if (platforms.length) {
          return platforms.some(value =>
            value.includes(desiredPlatform) ||
            desiredPlatform.includes(value)
          );
        }

        return true;
      });

      const match = slugMatches.length === 1
        ? slugMatches[0]
        : titleMatches.length === 1
          ? titleMatches[0]
          : null;

      if (!match) {
        console.warn(
          "[Epic Free Games] Could not uniquely resolve mobile offer:",
          game.platform,
          game.title,
          { slugMatches, titleMatches }
        );

        return game;
      }

      return {
        ...game,
        namespaceId: match.namespace,
        offerId: match.id,
        checkoutEligible: true,
        ownershipStatus: "unknown",
      };
    });
  }

  // ------------------------------------------------------------
  // CHECKOUT — ONLY CONFIRMED-UNOWNED OFFERS
  // ------------------------------------------------------------

  function buildCheckoutUrl(games) {
    const checkoutGames = games.filter(game =>
      game.namespaceId &&
      game.offerId &&
      game.checkoutEligible &&
      game.ownershipStatus === "unowned"
    );

    if (!checkoutGames.length) return null;

    const params = new URLSearchParams();
    params.set("highlightColor", "0078f2");

    for (const game of checkoutGames) {
      params.append(
        "offers",
        `1-${game.namespaceId}-${game.offerId}`
      );
    }

    params.set("showNavigation", "true");

    return (
      "https://www.epicgames.com/store/purchase?" +
      params.toString()
    );
  }

  // ------------------------------------------------------------
  // RENDER RESULTS
  // ------------------------------------------------------------

  function render(games, errors) {
    panel.replaceChildren();
    panel.style.display = "block";
    panel.append(makeHeader("Current giveaways · US region"));

    const content = el("div", { padding: "16px" });

    const checkoutGames = games.filter(game =>
      game.namespaceId &&
      game.offerId &&
      game.checkoutEligible &&
      game.ownershipStatus === "unowned"
    );

    const ownedCount = games.filter(
      game => game.ownershipStatus === "owned"
    ).length;

    const unownedCount = games.filter(
      game => game.ownershipStatus === "unowned"
    ).length;

    const unknownCount = games.filter(
      game => game.ownershipStatus === "unknown"
    ).length;

    const stats = el("div", {
      display: "grid",
      gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
      gap: "8px",
      marginBottom: "18px",
    });

    const platforms = [
      {
        name: "Desktop",
        count: games.filter(game => game.platform === "Desktop").length,
      },
      {
        name: "Android",
        count: games.filter(game => game.platform === "Android").length,
      },
      {
        name: "iOS",
        count: games.filter(game => game.platform === "iOS").length,
      },
    ];

    for (const platform of platforms) {
      const tile = el("div", {
        padding: "11px 8px",
        border: `1px solid ${COLORS.border}`,
        borderRadius: "7px",
        background: COLORS.surface,
        textAlign: "center",
      });

      tile.append(
        el("div", {
          color: COLORS.accent,
          fontSize: "22px",
          fontWeight: "750",
          lineHeight: "1.2",
        }, String(platform.count)),
        el("div", {
          marginTop: "5px",
          color: COLORS.muted,
          fontSize: "11px",
          fontWeight: "600",
        }, platform.name)
      );

      stats.append(tile);
    }

    content.append(stats);

    const ownershipSummary = el("div", {
      display: "grid",
      gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
      gap: "7px",
      marginBottom: "16px",
    });

    const ownershipStats = [
      {
        label: "Not owned",
        count: unownedCount,
        color: COLORS.success,
        background: "rgba(34,197,94,.08)",
      },
      {
        label: "Already owned",
        count: ownedCount,
        color: COLORS.danger,
        background: "rgba(239,68,68,.08)",
      },
      {
        label: "Unknown",
        count: unknownCount,
        color: COLORS.warning,
        background: "rgba(255,209,102,.07)",
      },
    ];

    for (const stat of ownershipStats) {
      const tile = el("div", {
        padding: "10px 6px",
        border: `1px solid ${COLORS.border}`,
        borderRadius: "7px",
        background: stat.background,
        textAlign: "center",
        minWidth: "0",
      });

      tile.append(
        el("div", {
          color: stat.color,
          fontSize: "20px",
          fontWeight: "750",
          lineHeight: "1.2",
        }, String(stat.count)),
        el("div", {
          marginTop: "5px",
          color: stat.color,
          fontSize: "10px",
          fontWeight: "650",
          overflowWrap: "anywhere",
        }, stat.label)
      );

      ownershipSummary.append(tile);
    }

    content.append(ownershipSummary);

    if (errors.length) {
      const warning = el("div", {
        padding: "11px 12px",
        marginBottom: "14px",
        border: "1px solid rgba(255,209,102,.25)",
        borderRadius: "7px",
        background: "rgba(255,209,102,.07)",
        color: COLORS.warning,
        fontSize: "12px",
        overflowWrap: "anywhere",
      });

      warning.textContent =
        "Some feeds or lookups need attention: " + errors.join("; ");

      content.append(warning);
    }

    const sectionHeading = el("div", {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "8px",
      marginBottom: "8px",
    });

    sectionHeading.append(
      el("div", {
        color: COLORS.text,
        fontSize: "13px",
        fontWeight: "700",
      }, "AVAILABLE OFFERS"),
      el("div", {
        color: COLORS.muted,
        fontSize: "11px",
      }, `${games.length} found`)
    );

    content.append(sectionHeading);

    if (!games.length) {
      const empty = el("div", {
        padding: "24px 12px",
        border: `1px solid ${COLORS.border}`,
        borderRadius: "8px",
        background: COLORS.surface,
        color: COLORS.muted,
        textAlign: "center",
      });

      empty.append(
        el("div", {
          marginBottom: "8px",
          color: COLORS.accent,
          fontSize: "24px",
        }, "✦"),
        el("div", {
          color: COLORS.text,
          fontWeight: "600",
        }, "No current free offers found"),
        el("div", {
          marginTop: "4px",
          fontSize: "12px",
        }, "Try refreshing in a moment.")
      );

      content.append(empty);
      panel.append(content);
      return;
    }

    const list = el("div", {
      display: "flex",
      flexDirection: "column",
      gap: "7px",
    });

    for (const game of games) {
      const item = el("div", {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: "12px",
        padding: "12px",
        border: `1px solid ${COLORS.border}`,
        borderRadius: "8px",
        background: COLORS.surface,
        transition: "background .15s ease,border-color .15s ease",
      });

      item.addEventListener("mouseenter", () => {
        item.style.background = COLORS.surfaceHover;
        item.style.borderColor = "rgba(255,255,255,.18)";
      });

      item.addEventListener("mouseleave", () => {
        item.style.background = COLORS.surface;
        item.style.borderColor = COLORS.border;
      });

      const info = el("div", {
        minWidth: "0",
        flex: "1",
      });

      const title = el("div", {
        color: COLORS.text,
        fontSize: "13px",
        fontWeight: "650",
        lineHeight: "1.45",
        overflowWrap: "anywhere",
      }, game.title);

      const meta = el("div", {
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "6px",
        marginTop: "7px",
      });

      const platformBadge = el("span", {
        display: "inline-flex",
        alignItems: "center",
        padding: "3px 6px",
        borderRadius: "4px",
        background: "rgba(255,255,255,.07)",
        color: "#d4d4d8",
        fontSize: "10px",
        fontWeight: "650",
      }, game.platform.toUpperCase());

      const freeBadge = el("span", {
        display: "inline-flex",
        alignItems: "center",
        padding: "3px 6px",
        borderRadius: "4px",
        background: "rgba(38,187,255,.12)",
        color: COLORS.accent,
        fontSize: "10px",
        fontWeight: "750",
        letterSpacing: ".3px",
      }, "FREE");

      meta.append(platformBadge, freeBadge);

      const ownershipBadgeStyles = {
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        padding: "3px 6px",
        borderRadius: "4px",
        fontSize: "10px",
        fontWeight: "750",
      };

      if (game.ownershipStatus === "unowned") {
        meta.append(
          el("span", {
            ...ownershipBadgeStyles,
            background: "rgba(34,197,94,.12)",
            color: COLORS.success,
          }, "✓ NOT OWNED")
        );
      } else if (game.ownershipStatus === "owned") {
        meta.append(
          el("span", {
            ...ownershipBadgeStyles,
            background: "rgba(239,68,68,.12)",
            color: COLORS.danger,
          }, "✕ ALREADY OWNED")
        );
      } else {
        meta.append(
          el("span", {
            ...ownershipBadgeStyles,
            background: "rgba(255,209,102,.10)",
            color: COLORS.warning,
          }, "? UNKNOWN")
        );
      }

      if (!game.checkoutEligible) {
        const unresolved = el("div", {
          marginTop: "6px",
          color: COLORS.warning,
          fontSize: "11px",
        }, "Checkout IDs not resolved");

        info.append(title, meta, unresolved);
      } else {
        info.append(title, meta);
      }

      const openLink = el("a", {
        flexShrink: "0",
        alignSelf: "center",
        padding: "7px 9px",
        border: `1px solid ${COLORS.border}`,
        borderRadius: "5px",
        background: "rgba(255,255,255,.03)",
        color: COLORS.text,
        fontSize: "11px",
        fontWeight: "650",
        textDecoration: "none",
        whiteSpace: "nowrap",
        transition: "background .15s ease",
      }, "View ↗");

      openLink.href = game.url;
      openLink.target = "_blank";
      openLink.rel = "noopener noreferrer";

      openLink.addEventListener("mouseenter", () => {
        openLink.style.background = "#303038";
      });

      openLink.addEventListener("mouseleave", () => {
        openLink.style.background = "rgba(255,255,255,.03)";
      });

      item.append(info, openLink);
      list.append(item);
    }

    content.append(list);

    const checkout = el("button", {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "9px",
      width: "100%",
      marginTop: "16px",
      padding: "14px 12px",
      border: "1px solid rgba(38,187,255,.6)",
      borderRadius: "7px",
      background: COLORS.accent,
      color: "#101014",
      fontSize: "13px",
      fontWeight: "800",
      letterSpacing: ".3px",
      cursor: "pointer",
      transition:
        "background .15s ease,transform .15s ease,opacity .15s ease",
    });

    checkout.append(
      el("span", { fontSize: "16px" }, "↗"),
      el("span", {}, `CHECKOUT UNOWNED GAMES · ${checkoutGames.length}`)
    );

    checkout.disabled = checkoutGames.length === 0;

    if (checkout.disabled) {
      checkout.style.opacity = "0.45";
      checkout.style.cursor = "not-allowed";
    } else {
      checkout.addEventListener("mouseenter", () => {
        checkout.style.background = COLORS.accentHover;
        checkout.style.transform = "translateY(-1px)";
      });

      checkout.addEventListener("mouseleave", () => {
        checkout.style.background = COLORS.accent;
        checkout.style.transform = "translateY(0)";
      });
    }

    checkout.addEventListener("click", () => {
      const url = buildCheckoutUrl(games);

      if (!url) {
        alert(
          "No offers confirmed as unowned are currently available for checkout."
        );
        return;
      }

      window.location.href = url;
    });

    content.append(checkout);

    content.append(
      el("div", {
        marginTop: "11px",
        color: COLORS.muted,
        fontSize: "11px",
        lineHeight: "1.5",
        textAlign: "center",
      },
      "Only games confirmed as unowned are included. Unknown ownership is excluded. Review the games in Epic checkout before confirming your order.")
    );

    panel.append(content);
  }

  // ------------------------------------------------------------
  // MAIN SCAN
  // ------------------------------------------------------------

  button.addEventListener("click", async () => {
    button.disabled = true;
    button.style.opacity = "0.75";
    button.style.cursor = "wait";
    setButtonLabel(true);

    panel.replaceChildren();
    panel.style.display = "block";
    panel.append(makeHeader("Scanning desktop, Android and iOS"));

    const loading = el("div", {
      padding: "32px 16px",
      textAlign: "center",
      color: COLORS.muted,
    });

    loading.append(
      el("div", {
        marginBottom: "12px",
        color: COLORS.accent,
        fontSize: "28px",
      }, "✦"),
      el("div", {
        color: COLORS.text,
        fontWeight: "650",
      }, "Finding free games"),
      el("div", {
        marginTop: "5px",
        fontSize: "12px",
      }, "Checking promotions, resolving offer IDs, and checking ownership…")
    );

    panel.append(loading);

    const errors = [];

    try {
      const results = await Promise.allSettled([
        requestJson(DESKTOP_API),
        getMobileGames("Android"),
        getMobileGames("iOS"),
      ]);

      const games = [];

      if (results[0].status === "fulfilled") {
        games.push(...currentDesktopGames(results[0].value));
      } else {
        errors.push("Desktop feed failed");
        console.error(
          "[Epic Free Games] Desktop feed failed:",
          results[0].reason
        );
      }

      if (results[1].status === "fulfilled") {
        games.push(...results[1].value);
      } else {
        errors.push("Android feed failed");
        console.error(
          "[Epic Free Games] Android feed failed:",
          results[1].reason
        );
      }

      if (results[2].status === "fulfilled") {
        games.push(...results[2].value);
      } else {
        errors.push("iOS feed failed");
        console.error(
          "[Epic Free Games] iOS feed failed:",
          results[2].reason
        );
      }

      const unique = [
        ...new Map(
          games.map(game => [
            `${game.platform}:${game.namespaceId ?? game.url}`,
            game,
          ])
        ).values(),
      ];

      let enriched = unique;

      try {
        enriched = await enrichMobileOffers(unique);
      } catch (error) {
        console.error(
          "[Epic Free Games] EGData lookup failed:",
          error
        );
        errors.push(`Mobile ID lookup failed: ${error.message}`);
      }

      const ownershipFailures = await checkGamesOwnership(enriched);

      if (ownershipFailures > 0) {
        errors.push(
          `Ownership could not be verified for ${ownershipFailures} offer(s); those offers are excluded from checkout`
        );
      }

      const unresolvedCount = enriched.filter(game =>
        !game.checkoutEligible ||
        !game.namespaceId ||
        !game.offerId
      ).length;

      if (unresolvedCount > 0) {
        errors.push(
          `${unresolvedCount} offer(s) could not be matched to checkout IDs`
        );
      }

      render(enriched, errors);
    } catch (error) {
      console.error(
        "[Epic Free Games] Unexpected error:",
        error
      );

      panel.replaceChildren();
      panel.append(makeHeader("Something went wrong"));

      panel.append(
        el("div", {
          padding: "18px",
          color: COLORS.warning,
          overflowWrap: "anywhere",
        }, `Unexpected error: ${error.message}`)
      );
    } finally {
      button.disabled = false;
      button.style.opacity = "1";
      button.style.cursor = "pointer";
      setButtonLabel(false);
    }
  });
})();
