// ============================================================================
// src/data/blogPosts.js — NutriScope Learn Hub — Blogs
// ----------------------------------------------------------------------------
// All bodies are original, in-house Markdown strings rendered with
// react-markdown (no build-step plugins needed — spec §8 Option A).
// Safety guardrails (spec §10): no diagnosis, no prescriptive medical
// claims, no dosages or medication advice. Condition-tagged articles
// (Diabetes, PCOS, Thyroid) stick to general lifestyle education only.
// ============================================================================

export const blogPosts = [
  {
    slug: "protein-combining-myth",
    title: "You Don't Need to Combine Proteins at Every Meal",
    excerpt:
      "The old dal-rice-in-one-bite rule is outdated — here's what current research actually says about plant proteins and amino acids.",
    body: `## The myth that won't die

For decades, vegetarians and vegans were told they had to eat dal and rice *together in the same meal* to get a "complete protein." The idea came from a 1971 book that popularised the term "incomplete protein" for plant foods — but the science it was based on was outdated even then. The scientific nutrition community moved on within a few years, and the original author herself softened her position. Yet the rule still gets repeated in kitchens and gyms today.

## What your body actually does

Here is the key insight: your body does not process each meal in isolation. When you digest protein, it is broken down into amino acids and released into a shared **amino acid pool** that circulates in your blood. Your cells draw from this pool continuously — not just at the moment you eat.

> This means your body "remembers" what you ate for breakfast when it builds protein after lunch. Across a normal day, a varied plant-based diet supplies all nine essential amino acids without any forced pairing.

## So where did the rule come from?

Animal products happen to contain all nine essential amino acids in generous amounts in one package, so they were labelled "complete." Most single plant foods are lower in one or two amino acids — grains are typically lower in lysine, legumes lower in methionine. That statistical difference was turned, incorrectly, into a rule about the same plate.

| Food | Lower in | Pairs naturally with |
|---|---|---|
| Rice, wheat, oats | Lysine | Dal, chickpeas, kidney beans |
| Dal, chickpeas, peas | Methionine | Rice, roti, millets |
| Nuts, seeds | Lysine | Legumes, dairy, soy |

Notice that these "complementary" pairings already exist in traditional Indian meals — dal-chawal, chole-chawal, khichdi. The culture had the right combinations all along; the *strict timing* rule was never necessary.

## What actually matters

Three things genuinely affect how well your body uses plant protein. First, **total daily protein** — most people fall short regardless of diet type, so aim for protein at more than one meal a day. Second, **variety across the day** — rotating grains, legumes, dairy or soy, nuts and seeds across meals naturally covers every amino acid. Third, **leucine**, the amino acid that most strongly triggers muscle building, which is relatively lower in plants; adding dairy, soy, or a serving of peanuts helps close that gap.

## The takeaway

Eat dal with rice because it tastes great, not because your muscles will fall apart without it. Spread a variety of plant proteins across your day, hit a sensible total, and let the old one-bite rule retire with dignity.

*This article is general education, not medical advice. If you have a kidney condition or a specific protein requirement, talk to a doctor or registered dietitian.*`,
    tags: ["protein", "vegetarian", "myth-busting"],
    dietaryPatternTags: ["vegetarian", "vegan"],
    healthFlagTags: [],
    goalTags: ["muscleGain", "balanced"],
    nutrientTags: ["protein"],
    author: "NutriScope Editorial",
    publishedDate: "2026-08-01",
    readTimeMinutes: 4,
  },
  {
    slug: "iron-absorption-guide",
    title: "Iron Isn't Just About Eating More Spinach",
    excerpt:
      "Two types of iron behave very differently in your body. Understanding absorption — not just intake — is the real game changer for vegetarians.",
    body: `## Two kinds of iron

All the iron in food comes in one of two forms, and your gut treats them very differently. **Heme iron**, found in meat and fish, is absorbed at roughly 15–35%. **Non-heme iron**, found in plants — dal, spinach, jaggery, sesame — is absorbed at only about 2–20%, and that number swings wildly depending on what else is on your plate.

This is why simply "eating more spinach" so often disappoints. The iron is there, but a large fraction never makes it into your bloodstream.

## The helpers and the blockers

The single most useful habit for vegetarian iron absorption is pairing iron-rich foods with **vitamin C**. Ascorbic acid converts non-heme iron into a form your gut can absorb much more readily. A squeeze of lemon over dal, tomatoes cooked into your sambar, or an orange after your meal — small things, real effect.

On the other side, **tannins and polyphenols** in tea and coffee bind iron in your gut and block absorption. This is one of the most common — and most fixable — contributors to low iron in India, where chai after every meal is a way of life. The advice isn't to quit tea; it's to keep it an hour or so away from your biggest iron-containing meal.

| Helps absorption | Hurts absorption (near iron-rich meals) |
|---|---|
| Lemon, amla, citrus, tomatoes | Tea, coffee |
| Fermented foods | High-calcium supplements taken with the meal |
| Cooking in cast-iron cookware | Very high-fiber bran layers (moderate effect) |

## The calcium catch

Calcium and iron compete for the same absorption pathway. That doesn't mean you can't have curd with lunch — but if a doctor has told you to take an iron supplement, take it separately from dairy or calcium tablets rather than with them.

## Signs worth noticing

Fatigue that doesn't match your sleep, unusual paleness, breathlessness climbing stairs, and hair fall are common (though non-specific) signs of low iron. They have many possible causes — which is exactly why the right move is a simple blood test rather than self-prescribing iron pills. Iron supplements taken without need can cause constipation, nausea, and in the long run, iron overload.

## The takeaway

Think **iron + vitamin C, minus tea**, and your dal, rajma, chana, and greens will work far harder for you. If you suspect a problem, get tested — and act on numbers, not symptoms alone.

*General education only. Persistent fatigue or suspected anemia should be evaluated by a doctor before starting any supplement.*`,
    tags: ["iron", "vegetarian", "absorption"],
    dietaryPatternTags: ["vegetarian", "vegan"],
    healthFlagTags: ["Anemia"],
    goalTags: [],
    nutrientTags: ["iron"],
    author: "NutriScope Editorial",
    publishedDate: "2026-08-03",
    readTimeMinutes: 5,
  },
  {
    slug: "read-any-food-label",
    title: "How to Read Any Food Label in Under 30 Seconds",
    excerpt:
      "The packet says 'healthy' — but does the label agree? A practical 30-second framework for every grocery trip.",
    body: `## Why labels beat marketing

The front of the packet is advertising. The back of the packet is evidence. "No added sugar," "multigrain," "lightly salted" — these claims are chosen to persuade you. The nutrition facts table and the ingredient list, by contrast, are regulated and tell a more honest story. Thirty seconds on the back is worth more than thirty seconds of front-of-pack slogans.

## The 30-second framework

**Second 1–5: Check the serving size.** Everything on the label is "per serving," and manufacturers sometimes choose a serving size so small that the numbers look flattering. If a pack contains two servings and you eat the whole pack, you eat double everything listed. Some labels also show "per 100 g" — use it to compare products of different pack sizes fairly.

**Second 5–15: Scan added sugars.** In India, added sugars hide under many names: sugar, sucrose, high-fructose corn syrup, jaggery syrup, glucose syrup, maltodextrin, fruit concentrate. If any form of sugar appears in the first three ingredients, the product is more of a sweet than a snack. A useful shortcut: 4 grams of sugar is about one teaspoon — visualize that.

**Second 15–25: Check sodium and trans fats.** High sodium creeps into breads, sauces, noodles, and even biscuits. And despite "0 g trans fat" labels, check the ingredients for **partially hydrogenated oils** — in some labelling regimes, tiny amounts per serving can still round down to zero.

**Second 25–30: Read the ingredient list top to bottom.** Ingredients are listed by weight. A short list you can pronounce is a good sign; a long list where sugar, refined flour, and flavourings dominate tells you what the product really is.

## "Multigrain" doesn't mean whole grain

A bread can be multigrain and still be mostly refined flour with a few seeds sprinkled in. Look for the word **whole** before wheat, oats, or millet as the first ingredient — that's the genuine article.

## The takeaway

You don't need a nutrition degree to shop smarter. Serving size, added sugar, sodium, and the first three ingredients — four checks, thirty seconds, every trip. Over a year, that small habit quietly reshapes what your family actually eats.

*General education only. People managing specific conditions should follow the label guidance their doctor or dietitian has given them.*`,
    tags: ["food-labels", "awareness", "sugar"],
    dietaryPatternTags: [],
    healthFlagTags: ["Diabetes"],
    goalTags: ["balanced", "weightLoss"],
    nutrientTags: ["sugar"],
    author: "NutriScope Editorial",
    publishedDate: "2026-08-05",
    readTimeMinutes: 4,
  },
  {
    slug: "vitamin-d-india-paradox",
    title: "Vitamin D in a Sunny Country: India's Quiet Deficiency",
    excerpt:
      "India gets abundant sunshine, yet studies find widespread low vitamin D. Here's why — and what actually helps.",
    body: `## The sunny-country paradox

India is one of the sunniest countries on Earth — and yet survey after survey finds a large share of the population with low vitamin D levels, across cities and villages alike. How is that possible? Because the vitamin D you make depends less on how much sun exists and more on **how your skin actually experiences it**.

## Why the sun isn't doing its job

The main reason is indirect exposure. Vitamin D synthesis needs **midday sunlight on a meaningful area of bare skin** — face, arms, and ideally legs — without sunscreen on that area. Most daily routines don't provide this: commuting happens in the early morning or late evening when the sun's angle is too low for synthesis; offices keep people indoors through midday; and clothing, hats, and sunscreen block the UVB rays that trigger production.

There is also a skin-tone factor worth understanding honestly: darker skin contains more melanin, which is natural sun protection — and the same protection that slows vitamin D production. People with darker skin often need *more* midday sun exposure than lighter-skinned people to make the same amount of vitamin D.

## Food helps, but only so much

Very few foods contain meaningful vitamin D. Fatty fish (for those who eat it), egg yolks, and mushrooms exposed to sunlight contribute small amounts. Fortified milk and cereals help at the margins. This is why, for many people, food alone rarely corrects a genuine deficiency — and why testing matters.

## What you can do

The practical habit is short, regular, direct exposure: roughly 10–30 minutes of midday sun on arms and legs, a few times a week, adjusted for your skin tone and the season. Morning and evening sun is wonderful for mood and routine, but its UVB is too weak to make vitamin D. If a blood test shows you are low — and many people in India are — a doctor may recommend a supplement at an appropriate dose for you. That is a medical decision, not a DIY one: vitamin D is fat-soluble, and excessive long-term dosing can cause harm.

| Myth | Reality |
|---|---|
| "Sitting by a window counts" | Window glass blocks UVB — no vitamin D made |
| "Morning sun is enough" | Early/late sun is too low-angle for synthesis |
| "Food will fix it" | Food sources are too small for most people |
| "Sunscreen always on is fine" | Sunscreened skin doesn't synthesise vitamin D |

## The takeaway

Think of vitamin D as something you *schedule*, not something that happens by accident. A few midday minutes, a conversation with your doctor, and — if needed — a measured supplement dose.

*General education only. Testing and supplement dosing should be guided by a doctor.*`,
    tags: ["vitamin-d", "sunlight", "deficiency"],
    dietaryPatternTags: [],
    healthFlagTags: [],
    goalTags: [],
    nutrientTags: ["vitaminD"],
    author: "NutriScope Editorial",
    publishedDate: "2026-08-07",
    readTimeMinutes: 5,
  },
  {
    slug: "diabetes-plate-method",
    title: "The Plate Method: A Diabetes-Friendly Indian Thali, Simplified",
    excerpt:
      "You don't need a calculator at dinner. The plate method turns any Indian meal into a balanced one — no calorie counting required.",
    body: `## Counting is hard. Dividing a plate is easy.

For anyone managing prediabetes or diabetes, the overwhelming advice can sound impossible: count carbs, watch the glycemic index, measure portions. The **plate method** — used by diabetes educators worldwide — replaces the arithmetic with something you already own: your plate.

## How it works

Picture your thali divided into sections. **Half the plate** is non-starchy vegetables — sabzi made with minimal oil, salads, cucumber-tomato-onion, greens, beans. **One quarter** is your starch — rice, roti, or millets. **One quarter** is protein — dal, chana, rajma, paneer, tofu, curd, eggs, or fish. That's the whole method.

| Plate section | What goes here | Indian examples |
|---|---|---|
| Half | Non-starchy vegetables | Lauki, bhindi, spinach, beans, salad |
| Quarter | Starch | Rice, 1–2 roti, millets (jowar, bajra) |
| Quarter | Protein | Dal, chana, paneer, curd, eggs |

## Why it works for blood sugar

The vegetables add fiber, which slows how quickly glucose from the starch enters your bloodstream. The protein adds satiety, which helps you eat the starch portion at a natural, moderate size without feeling deprived. It's not a diet restriction — it's a rebalancing of a meal format India invented.

## Practical touches for the Indian kitchen

A few adjustments multiply the benefit. Swap white rice for brown rice, red rice, or millets where you can. Keep the roti portion honest — two medium rotis, not four, when rice is also served. Be careful with the "hidden starch": aloo sabzi plus rice plus roti is starch on starch, even when each looks innocent alone. And remember the plate method says nothing about fried snacks, sweets, and sugary drinks — those stay as occasional treats, not plate residents.

## This is lifestyle education, not a prescription

The plate method is a general structure taught by diabetes educators. It is not a replacement for the individualized meal plan your doctor or dietitian has given you — especially if you take medication, where meal timing and carbohydrate consistency matter medically. Use it as a starting point for that conversation, not as a substitute for it.

## The takeaway

Half vegetables, quarter starch, quarter protein. Every meal, any cuisine, no math. It's the single most shareable piece of diabetes-friendly eating advice there is.

*General education only. Individualized dietary advice for diabetes should come from your doctor or a registered dietitian.*`,
    tags: ["diabetes", "plate-method", "blood-sugar"],
    dietaryPatternTags: [],
    healthFlagTags: ["Diabetes"],
    goalTags: ["balanced"],
    nutrientTags: [],
    author: "NutriScope Editorial",
    publishedDate: "2026-08-09",
    readTimeMinutes: 5,
  },
];
