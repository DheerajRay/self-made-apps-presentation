# Specific Software. Deliberate AI.

## Speaker notes for a 10–15 minute presentation

## Central argument

These applications began as solutions to specific personal problems. They are useful examples of a broader product discipline: deciding where AI improves an experience, where deterministic software must remain in control, and how the whole application can stay affordable and manageable after the initial build.

The presentation has three connected stories:

1. Each product began with a different use context and therefore needed a different kind of intelligence.
2. AI was attached only where ambiguity, interpretation, or useful variation was part of the user problem.
3. The building and operating system became progressively stronger, while remaining low-tether and relatively inexpensive.

The phrase **“Where does AI earn its place?”** is still the central question, but it is no longer the answer to every slide. It is the product-decision framework that connects the applications to their architecture.

The development learnings appear once, as a chronological process timeline. The rest of the presentation focuses on product value, performance, architecture, operating economics, limitations, and future improvements.

---

# Slide 00 — Opening

## Specific software. Deliberate AI.

### Talking notes

I built these applications because I wanted very specific tools to exist. They were not attempts to find a generic use for AI. Each started with a practical situation: playing through a complex rules system in a browser, managing food while standing next to a refrigerator, turning free-form thoughts into useful structures, and making music through a responsive browser instrument.

The common question was not “How can AI be added?” It was “What kind of intelligence does this particular experience need?”

Sometimes the answer was a model. Food images and unstructured language contain ambiguity that traditional interface logic does not resolve comfortably. In other situations, the answer was explicitly not a model. Card-game rules and musical timing require deterministic, immediate, explainable behavior.

The second part of the story is operational. These are independently built applications, so they cannot require a large infrastructure team or constant attention. Their architecture uses static interfaces, PWAs, serverless functions, managed data services, selective model requests, Git history, and automated tests to remain relatively inexpensive and possible to revisit.

The presentation therefore covers four products, but its real subject is deliberate placement: placing intelligence where it adds value and keeping operational weight out of everything else.

### Optional personal detail

Add one short example of a very specific frustration that made you begin one of the applications. The strongest example is the one that would not normally justify buying or commissioning a commercial product.

---

# Slide 01 — The premise

## Intelligence is a product decision, not a feature checklist.

### Talking notes

Adding a model is easy to demonstrate. Designing a product that remains useful when the model is slow, uncertain, unavailable, or wrong is the real engineering problem.

I use five questions before deciding how intelligence belongs in an application.

First, what is the exact physical or behavioral context? FreshKeeper is used with a phone near the refrigerator. NoteMaker is used through rapid, tactile browser interaction. Those contexts immediately change the acceptable latency and interface design.

Second, what is the source of truth? Duel resolution, card zones, audio timing, quantities, permissions, and saved records cannot be probabilistic. They need deterministic application logic.

Third, where is uncertainty genuinely part of the problem? A food photograph may be incomplete. A free-form note may represent several possible structures. Those are appropriate places for model judgment.

Fourth, what happens while the model is working or if it fails? The primary interface should respond locally. Model work should be narrow, asynchronous, validated, and correctable.

Finally, what does it cost to keep the feature alive? Every external service adds operational responsibility. A useful AI feature must justify its latency, cost, security boundary, and maintenance burden.

This framework keeps AI subordinate to product judgment.

---

# Slide 02 — Product showcase

## Each application upgraded the process.

The product showcase remains the interactive center of the presentation. Spend most of the application discussion here. Open only the products that are healthy and useful to demonstrate; the static previews already preserve the story when a live service is unavailable.

## Duel Engine

Duel Engine is a browser-based card duel system built around a complex deterministic rules domain. Cards move between zones, turns progress through phases, effects change state, and every outcome needs to be internally consistent.

AI does not earn control over duel truth. A model-generated battle result would be difficult to reproduce, debug, or trust. The reducer and rules engine remain deterministic so state transitions can be explained and tested.

AI can still support work around the core—such as implementation exploration, test generation, debugging assistance, or optional peripheral ideas—but the product remains fast because normal play does not wait for a model.

This application also exposed the need for product memory. As the first and least planned build, it accumulated changes faster than their reasoning could be remembered. Changelogs made the evolution visible, and unit tests became the sanity boundary for every functional update.

If authentication is unavailable because the Supabase project is paused, say so directly. The static product preview still demonstrates the interface and deterministic product decision.

## FreshKeeper

FreshKeeper has a different physical context. It is intended to be used while holding a phone, taking a picture of food, recording freshness details, and noting where an item is stored.

That use case made mobile layout and installability essential rather than optional. A PWA offered an efficient middle path: the reach and update model of a website with an application-like presence on the phone.

The product separates structured inventory from uncertain interpretation. Quantities, storage zones, shopping lists, and saved items remain conventional application data. AI earns its role when the input is ambiguous: recognizing food from an image, adding shelf-life context, interpreting a storage question, or suggesting meals from incomplete ingredients.

The performance principle is important. Photographing or recording an item should feel immediate. Model interpretation can occur as a bounded follow-up, and the user must be able to confirm or correct the result.

## FlowWays

FlowWays begins with free-form capture. A thought may describe a task, checklist, workflow, timeline, journal entry, or reminder. Traditional interfaces often require the user to choose the structure before they can record the idea.

Here, AI earns a product role by proposing structure after the user expresses the thought naturally. The model provides judgment, but it does not own the contract. Structured schemas, validation, fallbacks, and user correction protect the workflow.

The difficulty was not producing a successful classification demonstration. It was handling overlapping categories and inconsistent real-world inputs. That led to Playwright smoke scenarios, screenshots, and traces that could show exactly how a classification behaved in the browser.

The longer-term goal is a closed loop: preserve a failure as evidence, create an issue from that evidence, repair the behavior, and retain the scenario as a regression test.

## NoteMaker

NoteMaker is a useful counterexample to the idea that every application needs runtime AI. Musical timing, sequencing, playback state, and tactile controls demand precision and low latency. These stay in browser logic and Web Audio rather than being delegated to a model.

Its AI story is primarily in the building process. NoteMaker was the fastest build despite including unfamiliar audio behavior and a highly detailed hardware-inspired interface. Earlier decisions had already been turned into skills, tests, deployment practices, plugins, and personas.

This distinction is valuable: AI did not earn a place in the instrument’s timing loop, but an AI building agent earned a substantial role in exploring, implementing, debugging, testing, and refining the instrument.

### Transition

The four applications do not use the same AI architecture because they do not have the same product problem. The next slide extracts the shared decision rule.

---

# Slide 03 — Where AI earns its place

## Use models for interpretation—not for truth.

### Talking notes

The decision map separates predictable truth from ambiguous input.

Duel resolution belongs on the predictable side. The same state and action should always produce the same result. Musical timing also belongs there because the interaction requires precision and immediate feedback.

Food interpretation belongs on the ambiguous side. A photograph, storage environment, and freshness description may be incomplete. Free-form capture also belongs there because the same sentence may support several useful structures.

Using a model introduces a performance contract.

The application responds locally first. Opening a panel, recording an item, saving a draft, or interacting with an instrument should not wait for a remote model.

The request is narrow. The model receives the decision that genuinely needs interpretation rather than becoming the application runtime.

The result is validated. The application owns the schema, security boundary, fallback, and correction path. A model output is a proposal entering a deterministic system.

The simple test is: if the model response is late or imperfect, does the application remain understandable and recoverable? If not, AI has been placed too close to the product’s source of truth.

---

# Slide 04 — Architecture and performance

## Keep the experience close. Call the network with intent.

### Talking notes

The architecture follows the product decision.

The browser or PWA contains the interface and deterministic application core. Responsive layouts, local interaction state, rules, validation, and audio behavior stay close to the user. This is the fast path.

A server boundary is used when a request needs protected credentials, model access, or durable shared services. Vercel functions keep OpenAI credentials out of the browser and provide a place to constrain and shape model requests.

OpenAI is called for interpretation. Its latency and usage cost are variable, so the request should be selective and meaningful.

Supabase provides durable truth: authentication, Postgres data, and row-level policies where the application needs shared or synchronized state.

This separation affects perceived performance. Most interaction remains local and immediate. Network latency is introduced only where persistence or interpretation creates enough value to justify it.

It also affects resilience. A temporary model problem should reduce an enhancement, not collapse the whole interface. Manual entry, saved local state, validation messages, or editable results provide recovery paths.

Avoid claiming that every application implements every layer identically. This is the shared architectural pattern and decision logic, not a statement that all four codebases have the same stack.

---

# Slide 05 — How the process evolved

## Each hard problem left one reusable advantage.

### Talking notes

This is the only slide that retells the applications as a chronological development sequence.

Duel Engine created the need for product memory and unit-test sanity. Changelogs made the story of changes visible, while unit tests protected the deterministic core.

FreshKeeper changed the interface-planning default. Mobile layout, camera use, responsive behavior, and PWA delivery were considered from the beginning. Later projects inherited mobile planning rather than treating it as a retrofit.

FlowWays made browser evidence essential. Unit tests were still necessary, but they could not explain the complete interaction or show a classification error in context. Playwright added scenarios, screenshots, traces, and a path from observed failure to retained regression coverage.

NoteMaker demonstrated reuse. Git, Vercel, Supabase, Playwright, skills, plugins, and product personas reduced the amount of process that had to be rediscovered. That allowed more attention to go toward audio behavior and interface quality.

The important principle is promotion: when a solution works repeatedly, it should become a default, test, skill, plugin, checklist, or architecture rule. Otherwise the learning remains trapped in one conversation or one codebase.

---

# Slide 06 — Low-tether economics

## Low tether by design.

### Talking notes

Low tether does not simply mean low hosting cost. It means reducing three kinds of weight: idle infrastructure, ongoing administration, and the effort required to understand an older application again.

Static interfaces and PWAs keep the product shell inexpensive to serve and responsive to open. There is little reason to run dedicated compute continuously for these use cases.

Functions and model requests are invoked on demand. Compute and token usage occur when an interaction needs server-side work or interpretation. Selective AI is therefore both a product decision and a cost-control mechanism.

Vercel and Supabase provide managed foundations. They remove server patching, custom authentication infrastructure, manual database hosting, and much of the deployment ceremony. That exchanges some control and portability for lower administration.

Git history, changelogs, tests, and deployment records reduce revival cost. An older application is expensive when nobody remembers its environment, data service, last stable behavior, or reason for a particular design. Process memory makes dormant products less fragile.

The operating equation is: less always-on infrastructure, selective intelligence, and managed operations produce a low-tether application. It does not produce a maintenance-free application.

---

# Slide 07 — Limits and tradeoffs

## Low tether is a tradeoff, not an absence of limits.

### Talking notes

The most credible version of this story includes the failure modes.

The first constraint is free-tier capacity. Supabase currently limits how many projects can remain active, which can leave authentication or data unavailable for a product such as Duel Engine. Low cost can therefore reduce demo reliability.

The response should be an application health manifest and revival runbook. For each product, record the deployment URL, repository, database project, authentication state, required environment variables, last verification date, and exact recovery steps.

The second constraint is model latency and variance. Model calls are slower and less predictable than local logic. The response is an asynchronous interface, structured validation, fallbacks, and user correction.

The third constraint is managed-service coupling. Vercel, Supabase, and OpenAI remove substantial operational work, but the applications inherit their quotas, APIs, policy changes, and availability. Data exports, documented service boundaries, and replaceable adapters reduce that risk.

The fourth constraint is the live presentation itself. Authentication, network access, frame policies, or a paused backend can interrupt an embedded demonstration. Every product should have a three-level presentation path: live application, short recorded interaction, and the existing static product preview.

The goal is not to hide these constraints. It is to show that the architecture includes an explicit response to them.

---

# Slide 08 — What improves next

## Move from repeatable to measurable.

### Talking notes

The current process is increasingly repeatable. The next stage is making its health and performance visible.

The immediate improvement is operational clarity. Create an application health manifest, a revival runbook, and a verified demo fallback for every product. This directly addresses the difficulty of returning to projects built at different times.

The next improvement is quality budgeting. FreshKeeper and FlowWays should have golden AI cases: representative inputs with expected acceptable structures and unacceptable failure modes. Model changes can then be evaluated against retained product behavior.

Latency and token budgets make the cost of intelligence explicit. A feature should have an expected response-time range, maximum useful request size, fallback behavior, and a reason its model cost is justified.

Preview deployment gates can connect the existing tools. A change creates a Vercel preview, runs unit tests and Playwright smoke scenarios, records evidence, and blocks promotion when important behavior fails.

The later improvement is a reusable platform for the building process. Skills and personas should be versioned and connected to the projects that validated them. Shared observability should expose application health without requiring every product to be opened manually. The Supabase strategy should also become deliberate: consolidate with strong isolation, rotate active projects with a documented process, or pay for reliability when the value justifies it.

The objective is not a large internal platform. It is the smallest system that makes product health, AI quality, operating cost, and reusable learning visible.

---

# Slide 09 — Closing

## AI should increase usefulness without increasing weight.

### Talking notes

The opportunity is not to build the greatest possible number of applications or attach AI to every interaction.

It is now practical for an individual builder to create software for use cases that are too specific for conventional product economics. That creates a new responsibility: the intelligence, architecture, and operating model need to be chosen deliberately.

AI earns its place where interpretation or useful variation improves the user’s outcome. Deterministic software preserves truth, timing, security, and explainability. Lean architecture keeps the product affordable to host and possible to revisit. Tests, evidence, changelogs, skills, and plugins keep the development process from starting at zero.

The final idea is simple:

**Specific problem. Deliberate intelligence. Sustainable software.**

---

# Details to personalize before presenting

- One concrete example of a FreshKeeper model response that saved user effort.
- One FlowWays classification failure that became a Playwright scenario.
- The approximate build-time difference between NoteMaker and the earlier applications.
- Which skills, plugins, or personas produced the most measurable improvement.
- Whether the Supabase strategy will be project rotation, consolidation, or a paid reliability tier.
- A confirmed demo status for every application on the day of the presentation.